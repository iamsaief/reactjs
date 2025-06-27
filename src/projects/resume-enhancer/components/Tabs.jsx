import { useState, createContext, useContext, useRef, useEffect } from "react";
import { cn } from "../../../utils/cn";

// Context for managing tab state
const TabsContext = createContext();

// Main Tabs component
const Tabs = ({ defaultValue, className = "", children, orientation = "horizontal" }) => {
  const [activeTab, setActiveTab] = useState(defaultValue);
  const [tabIds] = useState(new Set());
  const tabListRef = useRef(null);

  const registerTab = (tabId) => {
    tabIds.add(tabId);
  };

  const unregisterTab = (tabId) => {
    tabIds.delete(tabId);
  };

  const getTabIds = () => Array.from(tabIds);

  const focusTab = (tabId) => {
    const tabElement = document.querySelector(`[data-tab-id="${tabId}"]`);
    if (tabElement) {
      tabElement.focus();
    }
  };

  const handleKeyDown = (event, currentTabId) => {
    const tabIdArray = getTabIds();
    const currentIndex = tabIdArray.indexOf(currentTabId);

    let nextIndex = currentIndex;
    let shouldActivate = false;

    switch (event.key) {
      case "ArrowRight":
        if (orientation === "horizontal") {
          event.preventDefault();
          nextIndex = (currentIndex + 1) % tabIdArray.length;
          shouldActivate = true;
        }
        break;
      case "ArrowLeft":
        if (orientation === "horizontal") {
          event.preventDefault();
          nextIndex = currentIndex === 0 ? tabIdArray.length - 1 : currentIndex - 1;
          shouldActivate = true;
        }
        break;
      case "ArrowDown":
        if (orientation === "vertical") {
          event.preventDefault();
          nextIndex = (currentIndex + 1) % tabIdArray.length;
          shouldActivate = true;
        }
        break;
      case "ArrowUp":
        if (orientation === "vertical") {
          event.preventDefault();
          nextIndex = currentIndex === 0 ? tabIdArray.length - 1 : currentIndex - 1;
          shouldActivate = true;
        }
        break;
      case "Home":
        event.preventDefault();
        nextIndex = 0;
        shouldActivate = true;
        break;
      case "End":
        event.preventDefault();
        nextIndex = tabIdArray.length - 1;
        shouldActivate = true;
        break;
      case "Enter":
      case " ":
        event.preventDefault();
        setActiveTab(currentTabId);
        break;
    }

    if (shouldActivate && nextIndex !== currentIndex) {
      const nextTabId = tabIdArray[nextIndex];
      setActiveTab(nextTabId);
      focusTab(nextTabId);
    }
  };

  return (
    <TabsContext.Provider
      value={{
        activeTab,
        setActiveTab,
        registerTab,
        unregisterTab,
        handleKeyDown,
        orientation,
      }}
    >
      <div className={className}>{children}</div>
    </TabsContext.Provider>
  );
};

// TabsList component
const TabsList = ({ className = "", children, "aria-label": ariaLabel }) => {
  const { orientation } = useContext(TabsContext);

  return (
    <div
      className={cn("inline-flex h-10 items-center justify-center rounded-md bg-gray-100 p-1 text-gray-600", className)}
      role="tablist"
      aria-label={ariaLabel || "Tab navigation"}
      aria-orientation={orientation}
    >
      {children}
    </div>
  );
};

// TabsTrigger component
const TabsTrigger = ({ value, className = "", children, onClick, disabled = false }) => {
  const { activeTab, setActiveTab, registerTab, unregisterTab, handleKeyDown } = useContext(TabsContext);
  const isActive = activeTab === value;
  const tabId = `tab-${value}`;
  const panelId = `panel-${value}`;

  useEffect(() => {
    registerTab(value);
    return () => unregisterTab(value);
  }, [value, registerTab, unregisterTab]);

  const handleClick = () => {
    if (disabled) return;
    setActiveTab(value);
    if (onClick) onClick();
  };

  const handleKeyDownInternal = (event) => {
    if (disabled) return;
    handleKeyDown(event, value);
  };

  const baseClasses =
    "inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-1 focus-visible:ring-blue-500";
  const activeClasses = isActive ? "bg-white text-gray-900 shadow-sm" : "hover:bg-gray-50 hover:text-gray-900";
  const disabledClasses = disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer";

  return (
    <button
      id={tabId}
      data-tab-id={value}
      className={cn(baseClasses, activeClasses, disabledClasses, className)}
      onClick={handleClick}
      onKeyDown={handleKeyDownInternal}
      type="button"
      role="tab"
      aria-selected={isActive}
      aria-controls={panelId}
      aria-disabled={disabled}
      tabIndex={isActive ? 0 : -1}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

// TabsContent component
const TabsContent = ({ value, className = "", children }) => {
  const { activeTab } = useContext(TabsContext);
  const isActive = activeTab === value;
  const tabId = `tab-${value}`;
  const panelId = `panel-${value}`;

  return (
    <div
      id={panelId}
      className={cn(
        "mt-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2",
        className,
        !isActive ? "hidden" : ""
      )}
      role="tabpanel"
      aria-labelledby={tabId}
      aria-hidden={!isActive}
      tabIndex={isActive ? 0 : -1}
    >
      {isActive && children}
    </div>
  );
};

export { Tabs, TabsList, TabsTrigger, TabsContent, TabsContext };
