/**
 * EliteShop main component
 * Main landing page displaying product catalog with filters and cart
 * Manages cart sidebar visibility state
 */

import { useState } from "react";

import { CartSidebar } from "./components/CartSidebar";
import { Footer } from "./components/Footer";
import { ProductGrid } from "./components/ProductGrid";
import { ProductFilters } from "./components/ProductFilters";
import { Header } from "./components/Header";
import { ShoppingProvider } from "./ShoppingContext";
import "./styles.css";
import { GlobalModal } from "./components/GlobalModal";

export const EliteShop = () => {
  // Local state for cart sidebar visibility
  const [isCartOpen, setIsCartOpen] = useState(false);

  /**
   * Toggles cart sidebar open/closed state
   */
  const toggleCart = () => {
    setIsCartOpen((prev) => !prev);
  };

  return (
    <ShoppingProvider>
      <style>{`
        :root {
          --background: hsl(0 0% 100%);
          --foreground: hsl(222.2 84% 4.9%);
          --card: hsl(0 0% 100%);
          --card-foreground: hsl(222.2 84% 4.9%);
          --popover: hsl(0 0% 100%);
          --popover-foreground: hsl(222.2 84% 4.9%);
          --primary: hsl(222.2 47.4% 11.2%);
          --primary-foreground: hsl(210 40% 98%);
          --secondary: hsl(210 40% 96.1%);
          --secondary-foreground: hsl(222.2 47.4% 11.2%);
          --muted: hsl(210 40% 96.1%);
          --muted-foreground: hsl(215.4 16.3% 46.9%);
          --accent: hsl(210 40% 96.1%);
          --accent-foreground: hsl(222.2 47.4% 11.2%);
          --destructive: hsl(0 84.2% 60.2%);
          --destructive-foreground: hsl(210 40% 98%);
          --border: hsl(214.3 31.8% 91.4%);
          --input: hsl(214.3 31.8% 91.4%);
          --ring: hsl(222.2 84% 4.9%);
        }
      `}</style>
      <div className="elite-shop-root bg-(--background) text-(--foreground) min-h-screen bg-background flex flex-col">
        {/* Fixed header with cart toggle */}
        <Header onCartToggle={toggleCart} />

        {/* Main content area */}
        <main className="flex-1 container mx-auto px-4 py-8">
          {/* Hero section with page title and description */}
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-foreground mb-2">Discover Premium Products</h2>
            <p className="text-muted-foreground">Curated collection of high-quality items for the modern lifestyle</p>
          </div>

          {/* Product filtering and search controls */}
          <ProductFilters />

          {/* Product display grid */}
          <ProductGrid />
        </main>

        {/* Site footer */}
        <Footer />

        {/* Cart sidebar overlay */}
        <CartSidebar isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />

        {/* Modals */}
        <GlobalModal />
      </div>
    </ShoppingProvider>
  );
};
