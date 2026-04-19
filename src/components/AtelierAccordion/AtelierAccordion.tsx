import {
  createContext,
  forwardRef,
  useCallback,
  useContext,
  useId,
  useRef,
  type KeyboardEvent,
  type ReactNode,
} from "react";
import { cn } from "@/lib/utils";
import { useControllable } from "@/hooks/useControllable";
import styles from "./AtelierAccordion.module.css";

/* ----- Root context ----- */

type AccordionContextValue = {
  openItems: string[];
  toggle: (value: string) => void;
  triggerRefs: React.MutableRefObject<Map<string, HTMLButtonElement>>;
  itemOrder: React.MutableRefObject<string[]>;
};

const AccordionContext = createContext<AccordionContextValue | null>(null);

function useAccordionContext() {
  const ctx = useContext(AccordionContext);
  if (!ctx) {
    throw new Error("Accordion compound components must be used within <AtelierAccordion>");
  }
  return ctx;
}

/* ----- Item context ----- */

type ItemContextValue = {
  value: string;
  isOpen: boolean;
  triggerId: string;
  panelId: string;
};

const ItemContext = createContext<ItemContextValue | null>(null);

function useItemContext() {
  const ctx = useContext(ItemContext);
  if (!ctx) {
    throw new Error("AccordionItem compound components must be used within <AtelierAccordionItem>");
  }
  return ctx;
}

/* =========================================================================
   AtelierAccordion (Root)
   ========================================================================= */

type SingleProps = {
  type?: "single";
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
};

type MultipleProps = {
  type: "multiple";
  value?: string[];
  defaultValue?: string[];
  onValueChange?: (value: string[]) => void;
};

type AtelierAccordionProps = (SingleProps | MultipleProps) & {
  className?: string;
  children: ReactNode;
};

export const AtelierAccordion = forwardRef<HTMLDivElement, AtelierAccordionProps>(
  (props, ref) => {
    const { type = "single", className, children } = props;
    const triggerRefs = useRef<Map<string, HTMLButtonElement>>(new Map());
    const itemOrder = useRef<string[]>([]);

    const [singleValue, setSingleValue] = useControllable(
      type === "single" ? (props as SingleProps).value : undefined,
      type === "single" ? ((props as SingleProps).defaultValue ?? "") : "",
      type === "single" ? (props as SingleProps).onValueChange : undefined,
    );

    const [multipleValue, setMultipleValue] = useControllable(
      type === "multiple" ? (props as MultipleProps).value : undefined,
      type === "multiple" ? ((props as MultipleProps).defaultValue ?? []) : [],
      type === "multiple" ? (props as MultipleProps).onValueChange : undefined,
    );

    const openItems =
      type === "single"
        ? singleValue
          ? [singleValue]
          : []
        : multipleValue;

    const toggle = useCallback(
      (itemValue: string) => {
        if (type === "single") {
          setSingleValue(singleValue === itemValue ? "" : itemValue);
        } else {
          setMultipleValue(
            multipleValue.includes(itemValue)
              ? multipleValue.filter((v) => v !== itemValue)
              : [...multipleValue, itemValue],
          );
        }
      },
      [type, singleValue, setSingleValue, multipleValue, setMultipleValue],
    );

    itemOrder.current = [];

    return (
      <AccordionContext.Provider value={{ openItems, toggle, triggerRefs, itemOrder }}>
        <div ref={ref} className={cn(styles.root, className)}>
          {children}
        </div>
      </AccordionContext.Provider>
    );
  },
);

AtelierAccordion.displayName = "AtelierAccordion";

/* =========================================================================
   AtelierAccordionItem
   ========================================================================= */

export interface AtelierAccordionItemProps {
  value: string;
  className?: string;
  children: ReactNode;
}

export const AtelierAccordionItem = forwardRef<HTMLDivElement, AtelierAccordionItemProps>(
  ({ value, className, children }, ref) => {
    const autoId = useId();
    const { openItems, itemOrder } = useAccordionContext();

    const triggerId = `atelier-accordion-trigger-${autoId}`;
    const panelId = `atelier-accordion-panel-${autoId}`;
    const isOpen = openItems.includes(value);

    if (!itemOrder.current.includes(value)) {
      itemOrder.current.push(value);
    }

    return (
      <ItemContext.Provider value={{ value, isOpen, triggerId, panelId }}>
        <div ref={ref} className={className} data-state={isOpen ? "open" : "closed"}>
          {children}
        </div>
      </ItemContext.Provider>
    );
  },
);

AtelierAccordionItem.displayName = "AtelierAccordionItem";

/* =========================================================================
   AtelierAccordionTrigger
   ========================================================================= */

export interface AtelierAccordionTriggerProps {
  className?: string;
  children: ReactNode;
}

export const AtelierAccordionTrigger = forwardRef<
  HTMLButtonElement,
  AtelierAccordionTriggerProps
>(({ className, children }, ref) => {
  const { toggle, triggerRefs, itemOrder } = useAccordionContext();
  const { value, isOpen, triggerId, panelId } = useItemContext();

  const setRef = useCallback(
    (node: HTMLButtonElement | null) => {
      if (typeof ref === "function") ref(node);
      else if (ref) (ref as React.MutableRefObject<HTMLButtonElement | null>).current = node;

      if (node) {
        triggerRefs.current.set(value, node);
      } else {
        triggerRefs.current.delete(value);
      }
    },
    [ref, triggerRefs, value],
  );

  const handleKeyDown = useCallback(
    (e: KeyboardEvent<HTMLButtonElement>) => {
      const order = itemOrder.current;
      const currentIndex = order.indexOf(value);
      let targetValue: string | undefined;

      switch (e.key) {
        case "ArrowDown":
          e.preventDefault();
          targetValue = order[(currentIndex + 1) % order.length];
          break;
        case "ArrowUp":
          e.preventDefault();
          targetValue = order[(currentIndex - 1 + order.length) % order.length];
          break;
        case "Home":
          e.preventDefault();
          targetValue = order[0];
          break;
        case "End":
          e.preventDefault();
          targetValue = order[order.length - 1];
          break;
      }

      if (targetValue) {
        triggerRefs.current.get(targetValue)?.focus();
      }
    },
    [itemOrder, triggerRefs, value],
  );

  return (
    <h3>
      <button
        ref={setRef}
        id={triggerId}
        type="button"
        aria-expanded={isOpen}
        aria-controls={panelId}
        onClick={() => toggle(value)}
        onKeyDown={handleKeyDown}
        className={cn(styles.trigger, className)}
      >
        {children}
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          aria-hidden="true"
          className={cn(styles.chevron, isOpen && styles.chevronOpen)}
        >
          <path
            d="M4 6l4 4 4-4"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
    </h3>
  );
});

AtelierAccordionTrigger.displayName = "AtelierAccordionTrigger";

/* =========================================================================
   AtelierAccordionContent
   ========================================================================= */

export interface AtelierAccordionContentProps {
  className?: string;
  children: ReactNode;
}

export const AtelierAccordionContent = forwardRef<
  HTMLDivElement,
  AtelierAccordionContentProps
>(({ className, children }, ref) => {
  const { isOpen, triggerId, panelId } = useItemContext();

  return (
    <div
      ref={ref}
      id={panelId}
      role="region"
      aria-labelledby={triggerId}
      hidden={!isOpen}
      className={cn(styles.panel, isOpen && styles.panelOpen)}
    >
      <div className={styles.panelInner}>
        <div className={cn(styles.panelContent, className)}>
          {children}
        </div>
      </div>
    </div>
  );
});

AtelierAccordionContent.displayName = "AtelierAccordionContent";
