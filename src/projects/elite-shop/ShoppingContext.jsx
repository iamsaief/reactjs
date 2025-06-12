/**
 * Shopping Context Provider
 * Manages global state for products, cart, and user interactions
 * Provides centralized access to all shopping-related functionality
 */

import { createContext, useContext, useReducer, useEffect, useState } from "react";
import { cartReducer } from "./cartReducer";
import productsData from "./data/products.json";

// Initial empty cart state
const initialCartState = {
  items: [],
  total: 0,
  itemCount: 0,
  tax: 0,
  discount: 0,
  isLoading: false,
  error: null,
};

// Create context with undefined default to enforce provider usage
const ShoppingContext = createContext(undefined);

/**
 * Custom hook to access shopping context
 * Ensures component is wrapped in ShoppingProvider
 */
export const useShoppingContext = () => {
  const context = useContext(ShoppingContext);
  if (!context) {
    throw new Error("useShoppingContext must be used within a ShoppingProvider");
  }
  return context;
};

/**
 * Loads cart data from localStorage on app initialization
 * @returns Saved cart state or initial state if no data exists
 */
const loadCartFromStorage = () => {
  try {
    const savedCart = localStorage.getItem("shoppingCart");
    if (savedCart) {
      return JSON.parse(savedCart);
    }
  } catch (error) {
    console.error("Error loading cart from localStorage:", error);
  }
  return initialCartState;
};

/**
 * Saves current cart state to localStorage
 * @param cart - Cart state to persist
 */
const saveCartToStorage = (cart) => {
  try {
    localStorage.setItem("shoppingCart", JSON.stringify(cart));
  } catch (error) {
    console.error("Error saving cart to localStorage:", error);
  }
};

/**
 * Shopping Provider Component
 * Wraps the app to provide shopping context to all child components
 */
export const ShoppingProvider = ({ children }) => {
  // Cart state managed by reducer with localStorage persistence
  const [cart, dispatch] = useReducer(cartReducer, initialCartState, loadCartFromStorage);

  // Product and UI state
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Filter and search state
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  // Persist cart to localStorage whenever it changes
  useEffect(() => {
    saveCartToStorage(cart);
  }, [cart]);

  // Load products on component mount (simulating API call)
  useEffect(() => {
    const loadProducts = async () => {
      try {
        setIsLoading(true);
        // Simulate network delay for realistic loading experience
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // Load products from JSON file (mock API)
        setProducts(productsData);
        setFilteredProducts(productsData);
        setError(null);
      } catch (err) {
        setError("Failed to load products. Please try again.");
        console.error("Error loading products:", err);
      } finally {
        setIsLoading(false);
      }
    };

    loadProducts();
  }, []);

  // Filter products when category or search query changes
  useEffect(() => {
    let filtered = products;

    // Apply category filter
    if (selectedCategory !== "All") {
      filtered = filtered.filter((product) => product.category === selectedCategory);
    }

    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter(
        (product) =>
          product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredProducts(filtered);
  }, [products, selectedCategory, searchQuery]);

  // Generate categories list from products
  const categories = ["All", ...Array.from(new Set(products.map((p) => p.category)))];

  /**
   * Adds a product to the cart
   * Validates stock availability before adding
   */
  const addToCart = (product) => {
    if (!product.inStock) {
      setError("This item is currently out of stock");
      return;
    }
    dispatch({ type: "ADD_ITEM", payload: product });
  };

  /**
   * Removes a product from the cart completely
   */
  const removeFromCart = (productId) => {
    dispatch({ type: "REMOVE_ITEM", payload: productId });
  };

  /**
   * Updates quantity of a specific cart item
   * Removes item if quantity is 0 or less
   */
  const updateQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    dispatch({ type: "UPDATE_QUANTITY", payload: { id: productId, quantity } });
  };

  /**
   * Empties the entire cart
   */
  const clearCart = () => {
    dispatch({ type: "CLEAR_CART" });
  };

  /**
   * Filters products by category
   */
  const filterByCategory = (category) => {
    setSelectedCategory(category);
  };

  /**
   * Searches products by name or description
   */
  const searchProducts = (query) => {
    setSearchQuery(query);
  };

  // Context value object containing all state and methods
  const value = {
    products,
    cart,
    isLoading,
    error,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    filterByCategory,
    searchProducts,
    filteredProducts,
    categories,
    selectedCategory,
    searchQuery,
  };

  return (
    <ShoppingContext.Provider value={value}>
      {/* Basic CSS for modal animations (can be inlined or in a <style> tag if preferred) */}
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
      {children}
    </ShoppingContext.Provider>
  );
};
