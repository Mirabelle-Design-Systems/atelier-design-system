import {
  createContext,
  forwardRef,
  useContext,
  useEffect,
  useId,
  useState,
  type InputHTMLAttributes,
  type LabelHTMLAttributes,
  type ReactNode,
} from "react";
import { cn } from "@/lib/utils";
import styles from "./AtelierTextField.module.css";

/* ----- Context ----- */

type TextFieldContextValue = {
  inputId: string;
  descriptionId: string;
  errorId: string;
  invalid: boolean;
  disabled: boolean;
  required: boolean;
  size: "sm" | "md" | "lg";
  hasDescription: boolean;
  setHasDescription: (has: boolean) => void;
};

const TextFieldContext = createContext<TextFieldContextValue | null>(null);

function useTextFieldContext(part: string) {
  const ctx = useContext(TextFieldContext);
  if (!ctx) {
    throw new Error(
      `<AtelierTextField.${part}> must be used within <AtelierTextField>`,
    );
  }
  return ctx;
}

/* =========================================================================
   AtelierTextField (Root)
   ========================================================================= */

export interface AtelierTextFieldProps {
  invalid?: boolean;
  disabled?: boolean;
  required?: boolean;
  size?: "sm" | "md" | "lg";
  /** Stable id root; auto-generated via useId if omitted */
  id?: string;
  className?: string;
  children: ReactNode;
}

const AtelierTextFieldRoot = forwardRef<HTMLDivElement, AtelierTextFieldProps>(
  (
    {
      invalid = false,
      disabled = false,
      required = false,
      size = "md",
      id: externalId,
      className,
      children,
    },
    ref,
  ) => {
    const autoId = useId();
    const inputId = externalId ?? `atelier-textfield-${autoId}`;
    const descriptionId = `${inputId}-description`;
    const errorId = `${inputId}-error`;

    const [hasDescription, setHasDescription] = useState(false);

    return (
      <TextFieldContext.Provider
        value={{
          inputId,
          descriptionId,
          errorId,
          invalid,
          disabled,
          required,
          size,
          hasDescription,
          setHasDescription,
        }}
      >
        <div
          ref={ref}
          className={cn(styles.root, className)}
          data-disabled={disabled || undefined}
          data-invalid={invalid || undefined}
        >
          {children}
        </div>
      </TextFieldContext.Provider>
    );
  },
);

AtelierTextFieldRoot.displayName = "AtelierTextField";

/* =========================================================================
   AtelierTextField.Label
   ========================================================================= */

export interface AtelierTextFieldLabelProps
  extends Omit<LabelHTMLAttributes<HTMLLabelElement>, "htmlFor"> {
  children: ReactNode;
}

const Label = forwardRef<HTMLLabelElement, AtelierTextFieldLabelProps>(
  ({ className, children, ...rest }, ref) => {
    const { inputId, required, disabled } = useTextFieldContext("Label");
    return (
      <label
        ref={ref}
        htmlFor={inputId}
        className={cn(styles.label, disabled && styles.labelDisabled, className)}
        {...rest}
      >
        {children}
        {required && (
          <span aria-hidden="true" className={styles.requiredMark}>
            *
          </span>
        )}
      </label>
    );
  },
);
Label.displayName = "AtelierTextField.Label";

/* =========================================================================
   AtelierTextField.Description
   ========================================================================= */

export interface AtelierTextFieldDescriptionProps {
  className?: string;
  children: ReactNode;
}

const Description = forwardRef<HTMLParagraphElement, AtelierTextFieldDescriptionProps>(
  ({ className, children }, ref) => {
    const { descriptionId, setHasDescription } = useTextFieldContext("Description");

    useEffect(() => {
      setHasDescription(true);
      return () => setHasDescription(false);
    }, [setHasDescription]);

    return (
      <p
        ref={ref}
        id={descriptionId}
        className={cn(styles.description, className)}
      >
        {children}
      </p>
    );
  },
);
Description.displayName = "AtelierTextField.Description";

/* =========================================================================
   AtelierTextField.Input
   ========================================================================= */

export interface AtelierTextFieldInputProps
  extends Omit<
    InputHTMLAttributes<HTMLInputElement>,
    "id" | "aria-invalid" | "aria-required" | "aria-describedby" | "aria-errormessage" | "size"
  > {
  className?: string;
}

const Input = forwardRef<HTMLInputElement, AtelierTextFieldInputProps>(
  ({ className, disabled: inputDisabled, required: inputRequired, ...rest }, ref) => {
    const {
      inputId,
      descriptionId,
      errorId,
      invalid,
      disabled,
      required,
      size,
      hasDescription,
    } = useTextFieldContext("Input");

    const isDisabled = disabled || inputDisabled;
    const isRequired = required || inputRequired;

    const describedByIds = [
      hasDescription ? descriptionId : null,
      invalid ? errorId : null,
    ]
      .filter(Boolean)
      .join(" ");

    return (
      <input
        ref={ref}
        id={inputId}
        aria-invalid={invalid || undefined}
        aria-required={isRequired || undefined}
        aria-describedby={describedByIds || undefined}
        aria-errormessage={invalid ? errorId : undefined}
        disabled={isDisabled}
        required={isRequired}
        className={cn(
          styles.input,
          styles[`size-${size}`],
          invalid && styles.inputInvalid,
          className,
        )}
        {...rest}
      />
    );
  },
);
Input.displayName = "AtelierTextField.Input";

/* =========================================================================
   AtelierTextField.Error
   ========================================================================= */

export interface AtelierTextFieldErrorProps {
  className?: string;
  children: ReactNode;
}

const ErrorMessage = forwardRef<HTMLParagraphElement, AtelierTextFieldErrorProps>(
  ({ className, children }, ref) => {
    const { errorId, invalid } = useTextFieldContext("Error");

    if (!invalid) return null;

    return (
      <p
        ref={ref}
        id={errorId}
        role="alert"
        className={cn(styles.error, className)}
      >
        {children}
      </p>
    );
  },
);
ErrorMessage.displayName = "AtelierTextField.Error";

/* ----- Compound exports ----- */

type AtelierTextFieldComponent = typeof AtelierTextFieldRoot & {
  Label: typeof Label;
  Description: typeof Description;
  Input: typeof Input;
  Error: typeof ErrorMessage;
};

export const AtelierTextField = AtelierTextFieldRoot as AtelierTextFieldComponent;
AtelierTextField.Label = Label;
AtelierTextField.Description = Description;
AtelierTextField.Input = Input;
AtelierTextField.Error = ErrorMessage;

export {
  Label as AtelierTextFieldLabel,
  Description as AtelierTextFieldDescription,
  Input as AtelierTextFieldInput,
  ErrorMessage as AtelierTextFieldError,
};
