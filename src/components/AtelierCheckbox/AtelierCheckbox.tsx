import {
  forwardRef,
  useCallback,
  useId,
  type KeyboardEvent,
  type ReactNode,
} from "react";
import { cn } from "@/lib/utils";
import { useControllable } from "@/hooks/useControllable";
import styles from "./AtelierCheckbox.module.css";

export type AtelierCheckboxState = boolean | "indeterminate";

export interface AtelierCheckboxProps {
  /** Controlled state. Pass "indeterminate" for the tri-state mixed value. */
  checked?: AtelierCheckboxState;
  /** Uncontrolled default. Defaults to false. */
  defaultChecked?: AtelierCheckboxState;
  onCheckedChange?: (checked: AtelierCheckboxState) => void;
  disabled?: boolean;
  required?: boolean;
  /** Form name; when set, a hidden checkbox is rendered for native form submission. */
  name?: string;
  /** Form value for the hidden input; defaults to "on". */
  value?: string;
  id?: string;
  className?: string;
  children?: ReactNode;
  "aria-label"?: string;
  "aria-labelledby"?: string;
  "aria-describedby"?: string;
}

function isChecked(state: AtelierCheckboxState): boolean {
  return state === true;
}

function isIndeterminate(state: AtelierCheckboxState): boolean {
  return state === "indeterminate";
}

function ariaCheckedValue(state: AtelierCheckboxState): "true" | "false" | "mixed" {
  if (state === "indeterminate") return "mixed";
  return state ? "true" : "false";
}

export const AtelierCheckbox = forwardRef<HTMLButtonElement, AtelierCheckboxProps>(
  (
    {
      checked: controlledChecked,
      defaultChecked = false,
      onCheckedChange,
      disabled = false,
      required = false,
      name,
      value = "on",
      id: externalId,
      className,
      children,
      ...ariaProps
    },
    ref,
  ) => {
    const autoId = useId();
    const id = externalId ?? autoId;
    const labelId = `${id}-label`;

    const [state, setState] = useControllable<AtelierCheckboxState>(
      controlledChecked,
      defaultChecked,
      onCheckedChange,
    );

    const toggle = useCallback(() => {
      if (disabled) return;
      // APG: clicking an indeterminate checkbox transitions to checked.
      setState(state === true ? false : true);
    }, [disabled, state, setState]);

    const handleKeyDown = useCallback(
      (e: KeyboardEvent<HTMLButtonElement>) => {
        // APG: only Space toggles checkboxes. Enter would otherwise trigger
        // the native button click; preventDefault suppresses that so the
        // checkbox role behaves per spec.
        if (e.key === " ") {
          e.preventDefault();
          toggle();
        } else if (e.key === "Enter") {
          e.preventDefault();
        }
      },
      [toggle],
    );

    const checked = isChecked(state);
    const indeterminate = isIndeterminate(state);

    return (
      <div className={cn(styles.wrapper, className)}>
        <button
          ref={ref}
          id={id}
          type="button"
          role="checkbox"
          aria-checked={ariaCheckedValue(state)}
          aria-labelledby={children ? labelId : undefined}
          aria-required={required || undefined}
          disabled={disabled}
          onClick={toggle}
          onKeyDown={handleKeyDown}
          data-state={indeterminate ? "indeterminate" : checked ? "checked" : "unchecked"}
          className={cn(
            styles.box,
            checked && styles.boxChecked,
            indeterminate && styles.boxIndeterminate,
          )}
          {...ariaProps}
        >
          {checked && (
            <svg
              aria-hidden="true"
              viewBox="0 0 16 16"
              fill="none"
              className={styles.icon}
            >
              <path
                d="M3 8.5l3.5 3.5L13 5"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          )}
          {indeterminate && (
            <svg
              aria-hidden="true"
              viewBox="0 0 16 16"
              fill="none"
              className={styles.icon}
            >
              <path
                d="M3.5 8h9"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          )}
        </button>

        {name && (
          <input
            type="checkbox"
            name={name}
            value={value}
            checked={checked}
            required={required}
            disabled={disabled}
            aria-hidden="true"
            tabIndex={-1}
            readOnly
            className={styles.hiddenInput}
          />
        )}

        {children && (
          <label
            id={labelId}
            htmlFor={id}
            className={cn(styles.label, disabled && styles.labelDisabled)}
          >
            {children}
          </label>
        )}
      </div>
    );
  },
);

AtelierCheckbox.displayName = "AtelierCheckbox";
