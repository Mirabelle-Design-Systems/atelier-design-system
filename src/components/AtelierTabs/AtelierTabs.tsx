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
import styles from "./AtelierTabs.module.css";

/* ----- Root context ----- */

type TabsContextValue = {
  activeValue: string;
  setActiveValue: (value: string) => void;
  orientation: "horizontal" | "vertical";
  tabRefs: React.MutableRefObject<Map<string, HTMLButtonElement>>;
  tabOrder: React.MutableRefObject<string[]>;
  disabledTabs: React.MutableRefObject<Set<string>>;
  baseId: string;
};

const TabsContext = createContext<TabsContextValue | null>(null);

function useTabsContext() {
  const ctx = useContext(TabsContext);
  if (!ctx) {
    throw new Error(
      "AtelierTabs compound components must be used within <AtelierTabs>",
    );
  }
  return ctx;
}

/* =========================================================================
   AtelierTabs (Root)
   ========================================================================= */

export interface AtelierTabsProps {
  value?: string;
  defaultValue: string;
  onValueChange?: (value: string) => void;
  orientation?: "horizontal" | "vertical";
  className?: string;
  children: ReactNode;
}

export const AtelierTabs = forwardRef<HTMLDivElement, AtelierTabsProps>(
  (
    {
      value,
      defaultValue,
      onValueChange,
      orientation = "horizontal",
      className,
      children,
    },
    ref,
  ) => {
    const baseId = useId();
    const tabRefs = useRef<Map<string, HTMLButtonElement>>(new Map());
    const tabOrder = useRef<string[]>([]);
    const disabledTabs = useRef<Set<string>>(new Set());

    const [activeValue, setActiveValue] = useControllable(
      value,
      defaultValue,
      onValueChange,
    );

    // Reset order each render so it re-collects in DOM order
    tabOrder.current = [];
    disabledTabs.current = new Set();

    return (
      <TabsContext.Provider
        value={{
          activeValue,
          setActiveValue,
          orientation,
          tabRefs,
          tabOrder,
          disabledTabs,
          baseId,
        }}
      >
        <div
          ref={ref}
          className={cn(
            styles.root,
            orientation === "vertical" && styles.rootVertical,
            className,
          )}
          data-orientation={orientation}
        >
          {children}
        </div>
      </TabsContext.Provider>
    );
  },
);

AtelierTabs.displayName = "AtelierTabs";

/* =========================================================================
   AtelierTabList
   ========================================================================= */

export interface AtelierTabListProps {
  className?: string;
  children: ReactNode;
}

export const AtelierTabList = forwardRef<HTMLDivElement, AtelierTabListProps>(
  ({ className, children }, ref) => {
    const { orientation } = useTabsContext();

    return (
      <div
        ref={ref}
        role="tablist"
        aria-orientation={orientation}
        className={cn(
          styles.tabList,
          orientation === "vertical" && styles.tabListVertical,
          className,
        )}
      >
        {children}
      </div>
    );
  },
);

AtelierTabList.displayName = "AtelierTabList";

/* =========================================================================
   AtelierTab
   ========================================================================= */

export interface AtelierTabProps {
  value: string;
  disabled?: boolean;
  className?: string;
  children: ReactNode;
}

export const AtelierTab = forwardRef<HTMLButtonElement, AtelierTabProps>(
  ({ value, disabled = false, className, children }, ref) => {
    const {
      activeValue,
      setActiveValue,
      orientation,
      tabRefs,
      tabOrder,
      disabledTabs,
      baseId,
    } = useTabsContext();

    const isActive = activeValue === value;

    // Register in render order
    if (!tabOrder.current.includes(value)) {
      tabOrder.current.push(value);
    }
    if (disabled) {
      disabledTabs.current.add(value);
    }

    const tabId = `${baseId}-tab-${value}`;
    const panelId = `${baseId}-panel-${value}`;

    const setRef = useCallback(
      (node: HTMLButtonElement | null) => {
        if (typeof ref === "function") ref(node);
        else if (ref)
          (ref as React.MutableRefObject<HTMLButtonElement | null>).current =
            node;

        if (node) {
          tabRefs.current.set(value, node);
        } else {
          tabRefs.current.delete(value);
        }
      },
      [ref, tabRefs, value],
    );

    const getNextEnabledTab = useCallback(
      (startIndex: number, direction: 1 | -1): string | undefined => {
        const order = tabOrder.current;
        const len = order.length;
        for (let i = 1; i <= len; i++) {
          const idx = (startIndex + direction * i + len) % len;
          const candidate = order[idx];
          if (candidate && !disabledTabs.current.has(candidate)) {
            return candidate;
          }
        }
        return undefined;
      },
      [tabOrder, disabledTabs],
    );

    const handleKeyDown = useCallback(
      (e: KeyboardEvent<HTMLButtonElement>) => {
        const order = tabOrder.current;
        const currentIndex = order.indexOf(value);
        let targetValue: string | undefined;

        const nextKey =
          orientation === "horizontal" ? "ArrowRight" : "ArrowDown";
        const prevKey =
          orientation === "horizontal" ? "ArrowLeft" : "ArrowUp";

        switch (e.key) {
          case nextKey:
            e.preventDefault();
            targetValue = getNextEnabledTab(currentIndex, 1);
            break;
          case prevKey:
            e.preventDefault();
            targetValue = getNextEnabledTab(currentIndex, -1);
            break;
          case "Home":
            e.preventDefault();
            // Find first non-disabled tab
            targetValue = order.find((v) => !disabledTabs.current.has(v));
            break;
          case "End":
            e.preventDefault();
            // Find last non-disabled tab
            for (let i = order.length - 1; i >= 0; i--) {
              const item = order[i];
              if (item && !disabledTabs.current.has(item)) {
                targetValue = item;
                break;
              }
            }
            break;
        }

        if (targetValue) {
          tabRefs.current.get(targetValue)?.focus();
          setActiveValue(targetValue);
        }
      },
      [
        orientation,
        tabOrder,
        tabRefs,
        disabledTabs,
        value,
        setActiveValue,
        getNextEnabledTab,
      ],
    );

    return (
      <button
        ref={setRef}
        id={tabId}
        type="button"
        role="tab"
        aria-selected={isActive}
        aria-controls={panelId}
        tabIndex={isActive ? 0 : -1}
        disabled={disabled}
        onClick={() => {
          if (!disabled) setActiveValue(value);
        }}
        onKeyDown={handleKeyDown}
        className={cn(
          styles.tab,
          isActive && styles.tabActive,
          !isActive && styles.tabInactive,
          disabled && styles.tabDisabled,
          className,
        )}
      >
        {children}
      </button>
    );
  },
);

AtelierTab.displayName = "AtelierTab";

/* =========================================================================
   AtelierTabPanel
   ========================================================================= */

export interface AtelierTabPanelProps {
  value: string;
  className?: string;
  children: ReactNode;
}

export const AtelierTabPanel = forwardRef<HTMLDivElement, AtelierTabPanelProps>(
  ({ value, className, children }, ref) => {
    const { activeValue, baseId } = useTabsContext();

    const isActive = activeValue === value;
    const tabId = `${baseId}-tab-${value}`;
    const panelId = `${baseId}-panel-${value}`;

    if (!isActive) return null;

    return (
      <div
        ref={ref}
        id={panelId}
        role="tabpanel"
        aria-labelledby={tabId}
        tabIndex={0}
        className={cn(styles.panel, className)}
      >
        {children}
      </div>
    );
  },
);

AtelierTabPanel.displayName = "AtelierTabPanel";
