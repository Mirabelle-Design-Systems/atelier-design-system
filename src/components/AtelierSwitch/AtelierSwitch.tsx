import { forwardRef, useCallback, useId, type KeyboardEvent } from "react";
import { cn } from "@/lib/utils";
import { useControllable } from "@/hooks/useControllable";
import styles from "./AtelierSwitch.module.css";

export interface AtelierSwitchProps {
  checked?: boolean;
  defaultChecked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  disabled?: boolean;
  required?: boolean;
  name?: string;
  value?: string;
  id?: string;
  className?: string;
  children?: React.ReactNode;
  "aria-label"?: string;
  "aria-labelledby"?: string;
  "aria-describedby"?: string;
}

export const AtelierSwitch = forwardRef<HTMLButtonElement, AtelierSwitchProps>(
  (
    {
      checked: controlledChecked,
      defaultChecked = false,
      onCheckedChange,
      disabled = false,
      required,
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

    const [isChecked, setChecked] = useControllable(
      controlledChecked,
      defaultChecked,
      onCheckedChange,
    );

    const toggle = useCallback(() => {
      if (!disabled) {
        setChecked(!isChecked);
      }
    }, [disabled, isChecked, setChecked]);

    const handleKeyDown = useCallback(
      (e: KeyboardEvent<HTMLButtonElement>) => {
        if (e.key === " " || e.key === "Enter") {
          e.preventDefault();
          toggle();
        }
      },
      [toggle],
    );

    return (
      <div className={cn(styles.wrapper, className)}>
        <button
          ref={ref}
          id={id}
          role="switch"
          type="button"
          aria-checked={isChecked}
          aria-labelledby={children ? labelId : undefined}
          aria-required={required || undefined}
          disabled={disabled}
          onClick={toggle}
          onKeyDown={handleKeyDown}
          className={cn(styles.track, isChecked && styles.trackChecked)}
          {...ariaProps}
        >
          <span
            aria-hidden="true"
            className={cn(styles.thumb, isChecked && styles.thumbChecked)}
          />
        </button>

        {name && (
          <input
            type="hidden"
            name={name}
            value={isChecked ? value : ""}
            aria-hidden="true"
            tabIndex={-1}
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

AtelierSwitch.displayName = "AtelierSwitch";
