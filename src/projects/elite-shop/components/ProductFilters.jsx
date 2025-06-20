/**
 * Product Filters Component
 * Provides search and category filtering functionality
 * Updates global filter state through shopping context
 */

import { useEffect, useState } from "react";
import { useDebounce } from "../../../hooks/useDebounce";
import { useShoppingContext } from "../ShoppingContext";
import { Button } from "./Button";
import { Spinner } from "./Spinner";
import { LoadingSpinner } from "./LoadingSpinner";

export const ProductFilters = () => {
  const [inputValue, setInputValue] = useState("");

  const {
    categories, // Available product categories
    selectedCategory, // Currently selected category
    filterByCategory, // Function to update category filter
    searchProducts, // Function to update search filter
  } = useShoppingContext();

  const debouncedSearch = useDebounce(inputValue, 300);

  useEffect(() => {
    searchProducts(debouncedSearch);
  }, [debouncedSearch, searchProducts]);

  return (
    <div className="space-y-4 mb-8">
      {/* Search input section */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1 relative">
          <input
            type="search"
            className="flex h-10 w-full rounded-md border border-(--input) bg-background px-3 py-2 text-base ring-offset-background placeholder:text-(--muted-foreground) focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--ring) focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
            placeholder="Search products..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            aria-label="Search products"
          />
        </div>
      </div>

      {/* Category filter buttons */}
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <Button
            key={category}
            variant={selectedCategory === category ? "default" : "outline"}
            size="sm"
            onClick={() => filterByCategory(category)}
            className="transition-transform duration-200 hover:scale-105"
          >
            {category}
          </Button>
        ))}
      </div>
    </div>
  );
};
