/**
 * Header Component
 * Displays app branding and cart toggle button with item count
 * Sticky positioned for consistent navigation access
 */

import { ShoppingCart } from "lucide-react";
import { useShoppingContext } from "../ShoppingContext";
import { Button } from "./Button";
import { Link } from "react-router";

export const Header = ({ onCartToggle }) => {
  const { cart } = useShoppingContext();

  return (
    <header className="sticky top-0 z-50 bg-(--background)/95 backdrop-blur supports-[backdrop-filter]:bg-(--background)/60 border-b border-(--border)">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Brand section */}
          <Link to="/projects/elite-shop" className="flex items-center space-x-4">
            <h1 className="text-2xl font-bold text-foreground">EliteShop</h1>
            <span className="text-sm text-muted-foreground hidden sm:inline">Premium E-commerce Experience</span>
          </Link>

          {/* Cart button with item count badge */}
          <Button
            variant="outline"
            size="sm"
            onClick={onCartToggle}
            className="relative hover:scale-105 transition-transform duration-200"
            aria-label={`Shopping cart with ${cart.itemCount} items`}
          >
            <ShoppingCart className="h-5 w-5" />

            {/* Item count badge - only shown when cart has items */}
            {cart.itemCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-(--primary) text-(--primary-foreground) text-xs rounded-full h-5 w-5 flex items-center justify-center animate-pulse">
                {cart.itemCount}
              </span>
            )}

            {/* Cart text - hidden on mobile */}
            <span className="ml-2 hidden sm:inline">Cart</span>
          </Button>
        </div>
      </div>
    </header>
  );
};
