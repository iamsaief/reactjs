/**
 * Checkout Page Component
 * Handles the checkout process with form validation and order completion
 * Redirects empty carts back to shopping and clears cart on successful checkout
 */

import { useShoppingContext } from "../ShoppingContext";
import { useNavigate } from "react-router";
// import CheckoutForm from '../components/CheckoutForm';
// import { Button } from '@/components/ui/button';
import { ArrowLeft, ShoppingCart } from "lucide-react";
import { Button } from "./Button";
import { CheckoutForm } from "./CheckoutForm";

export const Checkout = () => {
  const { cart, clearCart } = useShoppingContext();
  const navigate = useNavigate();

  /**
   * Handles successful checkout completion
   * Clears cart and redirects to home page
   */
  const handleCheckoutComplete = () => {
    clearCart();
    navigate("/projects/elite-shop");
  };

  /**
   * Navigates back to shopping page
   */
  const handleBack = () => {
    navigate("/projects/elite-shop");
  };

  // Show empty cart message if no items present
  if (cart.items.length === 0) {
    return (
      <div className="min-h-screen bg-(--background)">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-md mx-auto text-center flex flex-col items-center justify-center space-y-4">
            <ShoppingCart className="w-12 h-12" />
            <h1 className="text-2xl font-bold mb-4">Your cart is empty</h1>
            <p className="text-(--muted-foreground) mb-6">Add some items to your cart before checking out.</p>
            <Button onClick={handleBack}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Continue Shopping
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // Render checkout form for carts with items
  return (
    <div className="min-h-screen bg-(--background)">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center justify-center mb-6">
            <h1 className="text-3xl font-bold">Checkout</h1>
          </div>

          {/* Checkout form component */}
          <CheckoutForm onComplete={handleCheckoutComplete} onBack={handleBack} total={cart.total} />
        </div>
      </div>
    </div>
  );
};
