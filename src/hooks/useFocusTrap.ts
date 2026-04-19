import { useEffect, useRef, useCallback } from "react";

/**
 * Returns all focusable elements within a container, in DOM order.
 */
function getFocusableElements(container: HTMLElement): HTMLElement[] {
  const selector = [
    'a[href]',
    'button:not([disabled])',
    'input:not([disabled])',
    'select:not([disabled])',
    'textarea:not([disabled])',
    '[tabindex]:not([tabindex="-1"])',
  ].join(", ");

  return Array.from(container.querySelectorAll<HTMLElement>(selector)).filter(
    (el) => !el.hasAttribute("disabled") && el.offsetParent !== null,
  );
}

export interface UseFocusTrapOptions {
  /** Whether the trap is currently active */
  enabled: boolean;
  /** Element to return focus to on unmount. Defaults to the element focused when the trap activated. */
  returnFocusTo?: HTMLElement | null;
}

/**
 * Traps keyboard focus within a container element.
 *
 * - Tab / Shift+Tab cycle through focusable children
 * - Auto-focuses the first focusable element on activation
 * - Returns focus to the previously focused element on deactivation
 */
export function useFocusTrap<T extends HTMLElement = HTMLElement>(
  options: UseFocusTrapOptions,
) {
  const containerRef = useRef<T | null>(null);
  const previouslyFocused = useRef<HTMLElement | null>(null);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key !== "Tab" || !containerRef.current) return;

    const focusable = getFocusableElements(containerRef.current);
    if (focusable.length === 0) {
      e.preventDefault();
      return;
    }

    const first = focusable[0]!;
    const last = focusable[focusable.length - 1]!;

    if (e.shiftKey) {
      // Shift+Tab on first element → wrap to last
      if (document.activeElement === first) {
        e.preventDefault();
        last.focus();
      }
    } else {
      // Tab on last element → wrap to first
      if (document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
  }, []);

  useEffect(() => {
    if (!options.enabled || !containerRef.current) return;

    // Store the element that had focus before the trap activated
    previouslyFocused.current =
      options.returnFocusTo ?? (document.activeElement as HTMLElement | null);

    // Auto-focus the first focusable element inside the container
    const focusable = getFocusableElements(containerRef.current);
    if (focusable.length > 0) {
      focusable[0]!.focus();
    } else {
      // If nothing is focusable, focus the container itself
      containerRef.current.focus();
    }

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);

      // Return focus to the element that was focused before the trap
      previouslyFocused.current?.focus();
    };
  }, [options.enabled, options.returnFocusTo, handleKeyDown]);

  return containerRef;
}
