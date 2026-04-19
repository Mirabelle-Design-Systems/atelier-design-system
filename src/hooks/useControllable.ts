import { useState, useCallback, useRef, useEffect } from "react";

/**
 * Manages controlled vs uncontrolled state.
 * If `controlledValue` is defined, it acts as the source of truth.
 * Otherwise, internal state is used with `defaultValue` as the initial value.
 */
export function useControllable<T>(
  controlledValue: T | undefined,
  defaultValue: T,
  onChange?: (value: T) => void,
): [T, (next: T) => void] {
  const isControlled = controlledValue !== undefined;
  const [internal, setInternal] = useState(defaultValue);
  const value = isControlled ? controlledValue : internal;

  // Keep a ref to onChange to avoid stale closures
  const onChangeRef = useRef(onChange);
  useEffect(() => {
    onChangeRef.current = onChange;
  });

  const setValue = useCallback(
    (next: T) => {
      if (!isControlled) {
        setInternal(next);
      }
      onChangeRef.current?.(next);
    },
    [isControlled],
  );

  return [value, setValue];
}
