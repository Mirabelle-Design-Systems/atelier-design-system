import {
  forwardRef,
  type ButtonHTMLAttributes,
  type ElementType,
  type ReactNode,
} from "react";
import { cn } from "@/lib/utils";
import styles from "./AtelierButton.module.css";

export type AtelierButtonVariant =
  | "primary"
  | "secondary"
  | "outline"
  | "ghost"
  | "destructive"
  | "link";

export type AtelierButtonSize = "sm" | "md" | "lg" | "icon";

export interface AtelierButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  as?: ElementType;
  variant?: AtelierButtonVariant;
  size?: AtelierButtonSize;
  loading?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  href?: string;
  target?: string;
  rel?: string;
}

function Spinner({ className }: { className?: string }) {
  return (
    <svg
      className={cn(styles.spinner, className)}
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
    >
      <circle
        cx="8"
        cy="8"
        r="6"
        stroke="currentColor"
        strokeOpacity="0.25"
        strokeWidth="2.5"
      />
      <path
        d="M14 8a6 6 0 0 0-6-6"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

export const AtelierButton = forwardRef<HTMLButtonElement, AtelierButtonProps>(
  (
    {
      as,
      variant = "primary",
      size = "md",
      loading = false,
      leftIcon,
      rightIcon,
      disabled,
      className,
      children,
      ...rest
    },
    ref,
  ) => {
    const Component = as || "button";

    const buttonProps =
      Component === "button"
        ? { type: rest.type ?? "button" }
        : {};

    const isDisabled = disabled || loading;

    return (
      <Component
        ref={ref}
        disabled={isDisabled}
        aria-disabled={isDisabled || undefined}
        aria-busy={loading || undefined}
        className={cn(
          styles.button,
          styles[variant],
          styles[size],
          loading && styles.loading,
          className,
        )}
        {...buttonProps}
        {...rest}
      >
        {loading ? <Spinner /> : leftIcon}
        {children}
        {!loading && rightIcon}
      </Component>
    );
  },
);

AtelierButton.displayName = "AtelierButton";
