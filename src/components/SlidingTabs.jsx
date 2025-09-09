import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { LayoutGrid, LayoutList, List, Package } from "lucide-react";
import { cn } from "../utils/cn";

/**
 * SlidingTabs: Reusable measured sliding-pill tabs that work for any number of items.
 * - items: [{ key, label, icon, onClick? }] or route-bound where parent handles navigation
 * - activeKey: the currently active item's key
 * - onSelect: optional callback with (key, index)
 * - className/buttonClassName: optional extra classes
 *
 * Behavior:
 * - Measures offsetLeft/offsetWidth of active button
 * - Positions pill without animation on first paint (avoids jump on refresh)
 * - Animates subsequent moves
 */
export const SlidingTabs = ({
  items = [],
  activeKey,
  onSelect,
  className = "",
  buttonClassName = "",
  pillClassName = "",
}) => {
  const containerRef = useRef(null);
  const slidingBgRef = useRef(null);
  const buttonsRef = useRef([]);
  const didInitRef = useRef(false);
  const [isMobile, setIsMobile] = useState(false);

  const activeIndex = useMemo(
    () =>
      Math.max(
        0,
        items.findIndex((it) => it.key === activeKey),
      ),
    [items, activeKey],
  );

  // Why: sliding pill can misalign on crowded, small viewports
  // Rule: on mobile with >2 items, disable pill and style the active button instead
  const isSlidingEnabled = useMemo(
    () => !(isMobile && items.length > 2),
    [isMobile, items.length],
  );
  // When pill is disabled, allow horizontal scroll for overflowed tabs
  const isScrollable = useMemo(
    () => isMobile && items.length > 2,
    [isMobile, items.length],
  );

  // Detect mobile once and keep it in state (updates on resize/media change)
  useEffect(() => {
    try {
      const mq = window.matchMedia("(max-width: 640px)");
      const update = () => setIsMobile(mq.matches);
      update();
      mq.addEventListener("change", update);
      return () => mq.removeEventListener("change", update);
    } catch {
      // Fallback if matchMedia is unavailable
      const handleResize = () => setIsMobile(window.innerWidth <= 640);
      handleResize();
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }
  }, []);

  // Places/measures the pill under the active button
  const placePill = (animate) => {
    const pill = slidingBgRef.current;
    const activeButton = buttonsRef.current[activeIndex];
    if (!pill || !activeButton) return;
    const { offsetLeft, offsetWidth } = activeButton;

    if (!animate) {
      const prevTransition = pill.style.transition;
      pill.style.transition = "none";
      pill.style.transform = `translateX(${offsetLeft}px)`;
      pill.style.width = `${offsetWidth}px`;
      // force reflow
      pill.offsetHeight;
      pill.style.transition =
        "transform 300ms cubic-bezier(0.4, 0, 0.2, 1), width 300ms cubic-bezier(0.4, 0, 0.2, 1)";
      return;
    }

    pill.style.transform = `translateX(${offsetLeft}px)`;
    pill.style.width = `${offsetWidth}px`;
  };

  // Initial placement (no animation) then animate on subsequent updates
  useLayoutEffect(() => {
    if (!isSlidingEnabled) return;
    if (!didInitRef.current) {
      placePill(false);
      didInitRef.current = true;
    } else {
      placePill(true);
    }
  }, [activeIndex, items.length, isSlidingEnabled]);

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative flex gap-1 rounded-full border border-gray-700 bg-slate-900/70 p-1 backdrop-blur-sm",
        isScrollable
          ? "flex-nowrap justify-start overflow-x-auto whitespace-nowrap"
          : "justify-center",
        className,
      )}
    >
      {/* Sliding pill: only when enabled (desktop or <=2 items) */}
      {isSlidingEnabled && (
        <span
          ref={slidingBgRef}
          className={cn(
            "absolute top-1 bottom-1 rounded-full bg-white",
            pillClassName,
          )}
          style={{ left: 0, width: 0, transform: "translateX(0px)" }}
        />
      )}

      {items.map((item, index) => {
        const Icon = item.icon;
        const isActive = item.key === activeKey;
        return (
          <button
            key={item.key ?? index}
            ref={(el) => (buttonsRef.current[index] = el)}
            onClick={() => {
              item.onClick?.();
              onSelect?.(item.key, index);
            }}
            className={cn(
              "relative z-10 inline-flex shrink-0 items-center justify-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-colors duration-300",
              // Active style: pill paints the background; when pill is off, paint the button
              isActive
                ? isSlidingEnabled
                  ? "text-black"
                  : "bg-white text-black"
                : "text-gray-300 hover:bg-gray-700/40 hover:text-white",
              buttonClassName,
            )}
          >
            {Icon ? <Icon className="h-4 w-4" /> : null}
            {item.label}
          </button>
        );
      })}
    </div>
  );
};

export default function SlidingTabsDemo() {
  const items = useMemo(
    () => [
      { key: "grid", label: "Grid", icon: LayoutGrid },
      { key: "list", label: "Detailed", icon: LayoutList },
      { key: "simple", label: "Simple", icon: List },
      { key: "components", label: "Components", icon: Package },
    ],
    [],
  );
  const [active, setActive] = useState(items[0]?.key ?? "grid");

  return (
    <>
      <h1 className="mb-4 text-2xl font-bold">Sliding Tabs</h1>
      <div className="space-y-4">
        <SlidingTabs
          items={items}
          activeKey={active}
          onSelect={(key) => setActive(key)}
          className="bg-slate-800"
        />
        <div className="text-sm text-slate-600 dark:text-slate-300">
          Active:{" "}
          <span className="font-semibold">
            {items.find((item) => item.key === active)?.label}
          </span>
        </div>
        {active === "grid" && (
          <div className="grid grid-cols-2 gap-3">
            {[1, 2, 3, 4].map((n) => (
              <div
                key={n}
                className="h-20 rounded-lg border border-slate-200 bg-slate-50 p-3 text-slate-700 shadow-xs"
              >
                Grid card {n}
              </div>
            ))}
          </div>
        )}
        {active === "list" && (
          <ul className="divide-y divide-slate-200 overflow-hidden rounded-lg border border-slate-200">
            {["Alpha", "Beta", "Gamma", "Delta"].map((label) => (
              <li key={label} className="p-3">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-slate-700">{label}</span>
                  <span className="text-xs text-slate-500">details</span>
                </div>
              </li>
            ))}
          </ul>
        )}
        {active === "simple" && (
          <div className="rounded-lg border border-slate-200 bg-slate-50 p-4 text-slate-700">
            This is a minimal view. Put any simple summary here.
          </div>
        )}
        {active === "components" && (
          <div className="space-y-3 rounded-lg border border-slate-200 bg-slate-50 p-4">
            <div className="flex gap-2">
              <button className="rounded-md bg-slate-900 px-3 py-1 text-sm text-white">
                Button A
              </button>
              <button className="rounded-md bg-slate-900/80 px-3 py-1 text-sm text-white">
                Button B
              </button>
            </div>
            <p className="text-sm text-slate-600">
              Showcase UI components related content here.
            </p>
          </div>
        )}
      </div>
    </>
  );
}
