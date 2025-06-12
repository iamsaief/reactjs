/**
 * Product Grid Component
 * Displays filtered products in a responsive grid layout
 * Handles loading, error, and empty states
 */

import { SearchX } from "lucide-react";
import { useShoppingContext } from "../ShoppingContext";
import { LoadingSpinner } from "./LoadingSpinner";
import { ProductCard } from "./ProductCard";

export const ProductGrid = () => {
  const { filteredProducts, isLoading, error } = useShoppingContext();

  // Show loading spinner while products are being fetched
  if (isLoading) {
    return <LoadingSpinner />;
  }

  // Show error state with retry option
  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-destructive mb-4">{error}</p>
        <button onClick={() => window.location.reload()} className="text-primary hover:underline">
          Try Again
        </button>
      </div>
    );
  }

  // Show empty state when no products match filters
  if (filteredProducts.length === 0) {
    return (
      <div className="text-center py-12">
        <span className="flex items-center justify-center mb-1">
          <SearchX className="text-7xl w-10 h-10 text-(--muted-foreground)" />
        </span>
        <p className="text-muted-foreground text-lg">No products found</p>
        <p className="text-sm text-muted-foreground mt-2">Try adjusting your search or filter criteria</p>
      </div>
    );
  }

  // Render products in responsive grid
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {filteredProducts.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};
