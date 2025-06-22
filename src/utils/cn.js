/**
 * Utility function to combine class names and merges Tailwind CSS classes
 *
 * @param {...string} inputs - Class names to combine
 * @returns {string} - Merged class names
 * @example
 * const buttonClass = cn(
 *   "px-4 py-2 text-white",
 *   isPrimary ? "bg-blue-500" : "bg-gray-500",
 *   isDisabled && "opacity-50 cursor-not-allowed",
 *   "p-6" // overrides earlier padding
 * );
 */

import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(...inputs));
}
