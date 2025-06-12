/**
 * Product Filters Component
 * Provides search and category filtering functionality
 * Updates global filter state through shopping context
 */

import { useShoppingContext } from "../ShoppingContext";
import { Button } from "./Button";

export const ProductFilters = () => {
  const {
    categories, // Available product categories
    selectedCategory, // Currently selected category
    searchQuery, // Current search term
    filterByCategory, // Function to update category filter
    searchProducts, // Function to update search filter
  } = useShoppingContext();

  return (
    <div className="space-y-4 mb-8">
      {/* Search input section */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <input
            type="text"
            className="flex h-10 w-full rounded-md border border-(--input) bg-background px-3 py-2 text-base ring-offset-background placeholder:text-(--muted-foreground) focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--ring) focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => searchProducts(e.target.value)}
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
