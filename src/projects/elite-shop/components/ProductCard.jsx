/**
 * Product Card Component
 * Displays individual product information with add to cart functionality
 * Handles visual states for featured items, stock status, and cart status
 */

import { Plus, Check } from "lucide-react";
import { useShoppingContext } from "../ShoppingContext";
import { Button } from "./Button";

export const ProductCard = ({ product }) => {
  const { addToCart, cart } = useShoppingContext();

  // Check if product is already in cart
  const isInCart = cart.items.some((item) => item.id === product.id);

  /**
   * Handles adding product to cart
   * Only adds if product is not already in cart
   */
  const handleAddToCart = () => {
    if (!isInCart) {
      addToCart(product);
    }
  };

  return (
    <div className="rounded-lg border border-(--border) bg-(--card) text-(--card-foreground) shadow-sm group overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
      {/* Product image with overlay states */}
      <div className="relative overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
          loading="lazy" // Optimize loading for better performance
        />

        {/* Featured badge */}
        {product.featured && (
          <span className="absolute top-3 left-3 bg-(--primary) text-(--primary-foreground) text-xs font-medium px-2 py-1 rounded-full">
            Featured
          </span>
        )}

        {/* Out of stock overlay */}
        {!product.inStock && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <span className="text-white font-medium">Out of Stock</span>
          </div>
        )}
      </div>

      {/* Product information */}
      <div className="p-4">
        <div className="space-y-3">
          {/* Product name and description */}
          <div>
            <h3 className="font-semibold text-lg text-foreground line-clamp-1" title={product.name}>
              {product.name}
            </h3>
            <p className="text-sm text-muted-foreground line-clamp-2 mt-1">{product.description}</p>
          </div>

          {/* Price and action section */}
          <div className="flex items-center justify-between">
            {/* Price and rating */}
            <div className="space-y-1">
              <p className="text-2xl font-bold text-foreground">${product.price.toFixed(2)}</p>
              <div className="flex items-center space-x-1">
                <span className="text-sm text-yellow-500">★</span>
                <span className="text-sm text-muted-foreground">{product.rating}</span>
              </div>
            </div>

            {/* Add to cart button with state-dependent styling */}
            <Button
              onClick={handleAddToCart}
              disabled={!product.inStock || isInCart}
              size="sm"
              className={`transition-transform duration-200 ease-in-out ${
                isInCart ? "bg-green-500 hover:bg-green-500 cursor-default" : "hover:scale-105"
              }`}
              aria-label={`Add ${product.name} to cart`}
            >
              {isInCart ? (
                <>
                  <Check className="h-4 w-4 mr-1" />
                  Added
                </>
              ) : (
                <>
                  <Plus className="h-4 w-4 mr-1" />
                  Add to Cart
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
