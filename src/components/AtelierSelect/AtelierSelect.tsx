import {
  createContext,
  forwardRef,
  useCallback,
  useContext,
  useEffect,
  useId,
  useLayoutEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { createPortal } from "react-dom";
import { cn } from "@/lib/utils";
import { useControllable } from "@/hooks/useControllable";
import styles from "./AtelierSelect.module.css";

/* ----- Types ----- */

type SelectOption = {
  value: string;
  label: string;
  disabled?: boolean;
};

type SelectContextValue = {
  open: boolean;
  setOpen: (open: boolean) => void;
  selectedValue: string;
  setSelectedValue: (value: string) => void;
  highlightedIndex: number;
  setHighlightedIndex: (index: number) => void;
  optionsRef: React.MutableRefObject<SelectOption[]>;
  options: SelectOption[];
  registerOption: (option: SelectOption) => void;
  unregisterOption: (value: string) => void;
  listboxId: string;
  triggerId: string;
  disabled: boolean;
  triggerRef: React.RefObject<HTMLButtonElement | null>;
  listboxRef: React.RefObject<HTMLUListElement | null>;
  placeholder?: string;
  isContentVisible: boolean;
};

const SelectContext = createContext<SelectContextValue | null>(null);

function useSelectContext() {
  const ctx = useContext(SelectContext);
  if (!ctx) {
    throw new Error(
      "AtelierSelect compound components must be used within <AtelierSelect>",
    );
  }
  return ctx;
}

/* =========================================================================
   AtelierSelect (Root)
   ========================================================================= */

export interface AtelierSelectProps {
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  disabled?: boolean;
  placeholder?: string;
  children: ReactNode;
}

export function AtelierSelect({
  value: controlledValue,
  defaultValue = "",
  onValueChange,
  disabled = false,
  placeholder,
  children,
}: AtelierSelectProps) {
  const [selectedValue, setSelectedValue] = useControllable(
    controlledValue,
    defaultValue,
    onValueChange,
  );

  const [open, setOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const [options, setOptions] = useState<SelectOption[]>([]);
  const optionsRef = useRef<SelectOption[]>([]);

  const autoId = useId();
  const listboxId = `atelier-select-listbox-${autoId}`;
  const triggerId = `atelier-select-trigger-${autoId}`;

  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const listboxRef = useRef<HTMLUListElement | null>(null);

  const registerOption = useCallback((option: SelectOption) => {
    setOptions((prev) => {
      const existing = prev.findIndex((o) => o.value === option.value);
      if (existing !== -1) {
        // Update if label or disabled changed
        if (
          prev[existing]!.label === option.label &&
          prev[existing]!.disabled === option.disabled
        ) {
          return prev;
        }
        const updated = [...prev];
        updated[existing] = option;
        optionsRef.current = updated;
        return updated;
      }
      const next = [...prev, option];
      optionsRef.current = next;
      return next;
    });
  }, []);

  const unregisterOption = useCallback((value: string) => {
    setOptions((prev) => {
      const next = prev.filter((o) => o.value !== value);
      optionsRef.current = next;
      return next;
    });
  }, []);

  return (
    <SelectContext.Provider
      value={{
        open,
        setOpen,
        selectedValue,
        setSelectedValue,
        highlightedIndex,
        setHighlightedIndex,
        optionsRef,
        options,
        registerOption,
        unregisterOption,
        listboxId,
        triggerId,
        disabled,
        triggerRef,
        listboxRef,
        placeholder,
        isContentVisible: open,
      }}
    >
      <div className={styles.root}>{children}</div>
    </SelectContext.Provider>
  );
}

/* =========================================================================
   AtelierSelectTrigger
   ========================================================================= */

export interface AtelierSelectTriggerProps {
  className?: string;
  children?: ReactNode;
  "aria-label"?: string;
  "aria-labelledby"?: string;
}

export const AtelierSelectTrigger = forwardRef<
  HTMLButtonElement,
  AtelierSelectTriggerProps
>(({ className, children, "aria-label": ariaLabel, "aria-labelledby": ariaLabelledBy }, ref) => {
  const ctx = useSelectContext();
  const {
    open,
    setOpen,
    highlightedIndex,
    setHighlightedIndex,
    optionsRef,
    options,
    selectedValue,
    setSelectedValue,
    listboxId,
    triggerId,
    disabled,
    triggerRef,
  } = ctx;

  const typeaheadBuffer = useRef("");
  const typeaheadTimer = useRef<ReturnType<typeof setTimeout>>();

  const setRef = useCallback(
    (node: HTMLButtonElement | null) => {
      if (typeof ref === "function") ref(node);
      else if (ref)
        (ref as React.MutableRefObject<HTMLButtonElement | null>).current = node;
      (triggerRef as React.MutableRefObject<HTMLButtonElement | null>).current =
        node;
    },
    [ref, triggerRef],
  );

  const getEnabledIndices = useCallback(
    (opts?: SelectOption[]) => {
      const list = opts ?? optionsRef.current;
      return list
        .map((o, i) => ({ ...o, index: i }))
        .filter((o) => !o.disabled)
        .map((o) => o.index);
    },
    [optionsRef],
  );

  const findNextEnabled = useCallback(
    (current: number, direction: 1 | -1, opts?: SelectOption[]): number => {
      const enabled = getEnabledIndices(opts);
      if (enabled.length === 0) return -1;
      if (current === -1) {
        return direction === 1 ? enabled[0]! : enabled[enabled.length - 1]!;
      }
      const currentEnabledIdx = enabled.indexOf(current);
      if (currentEnabledIdx === -1) {
        return enabled[0]!;
      }
      const nextIdx = currentEnabledIdx + direction;
      if (nextIdx < 0) return enabled[enabled.length - 1]!;
      if (nextIdx >= enabled.length) return enabled[0]!;
      return enabled[nextIdx]!;
    },
    [getEnabledIndices],
  );

  const handleTypeahead = useCallback(
    (char: string) => {
      if (!open) return;

      clearTimeout(typeaheadTimer.current);
      typeaheadBuffer.current += char.toLowerCase();

      const search = typeaheadBuffer.current;
      const opts = optionsRef.current;
      const matchIndex = opts.findIndex(
        (o) => !o.disabled && o.label.toLowerCase().startsWith(search),
      );

      if (matchIndex !== -1) {
        setHighlightedIndex(matchIndex);
      }

      typeaheadTimer.current = setTimeout(() => {
        typeaheadBuffer.current = "";
      }, 500);
    },
    [open, optionsRef, setHighlightedIndex],
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (disabled) return;
      const opts = optionsRef.current;

      switch (e.key) {
        case "ArrowDown": {
          e.preventDefault();
          if (!open) {
            setOpen(true);
            const selected = opts.findIndex(
              (o) => o.value === selectedValue,
            );
            const startIdx =
              selected !== -1 ? selected : findNextEnabled(-1, 1, opts);
            setHighlightedIndex(startIdx);
          } else {
            setHighlightedIndex(findNextEnabled(highlightedIndex, 1, opts));
          }
          break;
        }
        case "ArrowUp": {
          e.preventDefault();
          if (!open) {
            setOpen(true);
            const selected = opts.findIndex(
              (o) => o.value === selectedValue,
            );
            const startIdx =
              selected !== -1 ? selected : findNextEnabled(-1, -1, opts);
            setHighlightedIndex(startIdx);
          } else {
            setHighlightedIndex(findNextEnabled(highlightedIndex, -1, opts));
          }
          break;
        }
        case "Home": {
          if (open) {
            e.preventDefault();
            const enabled = getEnabledIndices(opts);
            if (enabled.length > 0) setHighlightedIndex(enabled[0]!);
          }
          break;
        }
        case "End": {
          if (open) {
            e.preventDefault();
            const enabled = getEnabledIndices(opts);
            if (enabled.length > 0)
              setHighlightedIndex(enabled[enabled.length - 1]!);
          }
          break;
        }
        case "Enter":
        case " ": {
          e.preventDefault();
          if (!open) {
            setOpen(true);
            const selected = opts.findIndex(
              (o) => o.value === selectedValue,
            );
            setHighlightedIndex(
              selected !== -1 ? selected : findNextEnabled(-1, 1, opts),
            );
          } else {
            const highlighted = opts[highlightedIndex];
            if (highlighted && !highlighted.disabled) {
              setSelectedValue(highlighted.value);
              setOpen(false);
            }
          }
          break;
        }
        case "Escape": {
          if (open) {
            e.preventDefault();
            setOpen(false);
          }
          break;
        }
        case "Tab": {
          if (open) {
            setOpen(false);
          }
          break;
        }
        default: {
          if (e.key.length === 1 && !e.ctrlKey && !e.metaKey && !e.altKey) {
            handleTypeahead(e.key);
          }
        }
      }
    },
    [
      disabled,
      open,
      setOpen,
      highlightedIndex,
      setHighlightedIndex,
      optionsRef,
      selectedValue,
      setSelectedValue,
      findNextEnabled,
      getEnabledIndices,
      handleTypeahead,
    ],
  );

  const handleClick = useCallback(() => {
    if (disabled) return;
    const opts = optionsRef.current;
    if (open) {
      setOpen(false);
    } else {
      setOpen(true);
      const selected = opts.findIndex((o) => o.value === selectedValue);
      setHighlightedIndex(
        selected !== -1 ? selected : findNextEnabled(-1, 1, opts),
      );
    }
  }, [
    disabled,
    open,
    setOpen,
    optionsRef,
    selectedValue,
    setHighlightedIndex,
    findNextEnabled,
  ]);

  const activeDescendant =
    open && highlightedIndex >= 0 && options[highlightedIndex]
      ? `${listboxId}-option-${highlightedIndex}`
      : undefined;

  return (
    <button
      ref={setRef}
      id={triggerId}
      type="button"
      role="combobox"
      aria-expanded={open}
      aria-haspopup="listbox"
      aria-controls={open ? listboxId : undefined}
      aria-activedescendant={activeDescendant}
      aria-disabled={disabled || undefined}
      aria-label={ariaLabel}
      aria-labelledby={ariaLabelledBy}
      disabled={disabled}
      className={cn(styles.trigger, className)}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
    >
      <span className={styles.triggerText}>{children}</span>
      <svg
        className={cn(styles.chevron, open && styles.chevronOpen)}
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M4 6l4 4 4-4"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
});

AtelierSelectTrigger.displayName = "AtelierSelectTrigger";

/* =========================================================================
   AtelierSelectValue
   ========================================================================= */

export interface AtelierSelectValueProps {
  placeholder?: string;
}

export const AtelierSelectValue = forwardRef<
  HTMLSpanElement,
  AtelierSelectValueProps
>(({ placeholder: localPlaceholder }, ref) => {
  const { selectedValue, options, placeholder: rootPlaceholder } =
    useSelectContext();

  const displayPlaceholder = localPlaceholder ?? rootPlaceholder;
  const selectedOption = options.find((o) => o.value === selectedValue);

  return (
    <span ref={ref} className={styles.value}>
      {selectedOption ? (
        selectedOption.label
      ) : displayPlaceholder ? (
        <span className={styles.placeholder}>{displayPlaceholder}</span>
      ) : null}
    </span>
  );
});

AtelierSelectValue.displayName = "AtelierSelectValue";

/* =========================================================================
   AtelierSelectContent
   ========================================================================= */

export interface AtelierSelectContentProps {
  className?: string;
  children: ReactNode;
}

export const AtelierSelectContent = forwardRef<
  HTMLDivElement,
  AtelierSelectContentProps
>(({ className, children }, ref) => {
  const { open, setOpen, listboxId, triggerId, triggerRef, listboxRef } =
    useSelectContext();

  const contentRef = useRef<HTMLDivElement | null>(null);
  const [position, setPosition] = useState<{
    top: number;
    left: number;
    width: number;
    openAbove: boolean;
  }>({ top: 0, left: 0, width: 0, openAbove: false });

  const setContentRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (typeof ref === "function") ref(node);
      else if (ref)
        (ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
      contentRef.current = node;
    },
    [ref],
  );

  // Position the dropdown
  useEffect(() => {
    if (!open || !triggerRef.current) return;

    const updatePosition = () => {
      const rect = triggerRef.current!.getBoundingClientRect();
      const spaceBelow = window.innerHeight - rect.bottom;
      const spaceAbove = rect.top;
      const dropdownMaxHeight = 240;
      const openAbove =
        spaceBelow < dropdownMaxHeight && spaceAbove > spaceBelow;

      setPosition({
        top: openAbove
          ? rect.top + window.scrollY
          : rect.bottom + window.scrollY,
        left: rect.left + window.scrollX,
        width: rect.width,
        openAbove,
      });
    };

    updatePosition();
    window.addEventListener("resize", updatePosition);
    window.addEventListener("scroll", updatePosition, true);

    return () => {
      window.removeEventListener("resize", updatePosition);
      window.removeEventListener("scroll", updatePosition, true);
    };
  }, [open, triggerRef]);

  // Click outside closes
  useEffect(() => {
    if (!open) return;

    const handlePointerDown = (e: PointerEvent) => {
      const target = e.target as Node;
      if (
        contentRef.current &&
        !contentRef.current.contains(target) &&
        triggerRef.current &&
        !triggerRef.current.contains(target)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("pointerdown", handlePointerDown);
    return () =>
      document.removeEventListener("pointerdown", handlePointerDown);
  }, [open, setOpen, triggerRef]);

  const positionStyle: React.CSSProperties = position.openAbove
    ? {
        position: "absolute",
        left: position.left,
        top: "auto",
        bottom: `${document.documentElement.scrollHeight - position.top}px`,
        width: position.width,
      }
    : {
        position: "absolute",
        left: position.left,
        top: position.top,
        width: position.width,
      };

  return createPortal(
    <div
      ref={setContentRef}
      className={cn(
        styles.content,
        open && styles.contentOpen,
        open &&
          (position.openAbove ? styles.contentAbove : styles.contentBelow),
        className,
      )}
      style={open ? positionStyle : { position: "absolute", left: -9999 }}
      data-atelier-select-portal=""
      hidden={!open}
    >
      <ul
        ref={listboxRef as React.Ref<HTMLUListElement>}
        id={listboxId}
        role="listbox"
        aria-labelledby={triggerId}
        tabIndex={-1}
        className={styles.listbox}
      >
        {children}
      </ul>
    </div>,
    document.body,
  );
});

AtelierSelectContent.displayName = "AtelierSelectContent";

/* =========================================================================
   AtelierSelectItem
   ========================================================================= */

export interface AtelierSelectItemProps {
  value: string;
  disabled?: boolean;
  className?: string;
  children: ReactNode;
}

export const AtelierSelectItem = forwardRef<
  HTMLLIElement,
  AtelierSelectItemProps
>(({ value, disabled = false, className, children }, ref) => {
  const ctx = useSelectContext();
  const {
    selectedValue,
    setSelectedValue,
    setOpen,
    highlightedIndex,
    setHighlightedIndex,
    options,
    registerOption,
    unregisterOption,
    listboxId,
    isContentVisible,
  } = ctx;

  const label = typeof children === "string" ? children : "";

  useLayoutEffect(() => {
    registerOption({ value, label, disabled });
    return () => unregisterOption(value);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, label, disabled]);

  const optionIndex = options.findIndex((o) => o.value === value);
  const isHighlighted = highlightedIndex === optionIndex;
  const isSelected = selectedValue === value;

  const handleClick = useCallback(() => {
    if (disabled) return;
    setSelectedValue(value);
    setOpen(false);
  }, [disabled, setSelectedValue, value, setOpen]);

  const handlePointerEnter = useCallback(() => {
    if (disabled) return;
    setHighlightedIndex(optionIndex);
  }, [disabled, setHighlightedIndex, optionIndex]);

  const optionId = `${listboxId}-option-${optionIndex}`;

  // When content is hidden, render nothing visible but keep mounted for registration
  if (!isContentVisible) return null;

  return (
    <li
      ref={ref}
      id={optionId}
      role="option"
      aria-selected={isSelected}
      aria-disabled={disabled || undefined}
      className={cn(
        styles.item,
        isHighlighted && styles.itemHighlighted,
        isSelected && styles.itemSelected,
        disabled && styles.itemDisabled,
        className,
      )}
      onClick={handleClick}
      onPointerEnter={handlePointerEnter}
    >
      <span className={styles.itemIndicator}>
        {isSelected && (
          <svg
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M11 4L5.5 9.5L3 7"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </span>
      <span className={styles.itemText}>{children}</span>
    </li>
  );
});

AtelierSelectItem.displayName = "AtelierSelectItem";
