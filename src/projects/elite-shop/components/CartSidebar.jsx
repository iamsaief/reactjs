import { useState } from "react";
import { X, Plus, Minus, Trash2, MinusCircle, ShoppingCart } from "lucide-react";
import { useShoppingContext } from "../ShoppingContext";
import { useNavigate } from "react-router";
import { Button } from "./Button";
import { Modal } from "./Modal";

export const CartSidebar = ({ isOpen, onClose }) => {
  const [showRemoveConfirm, setShowRemoveConfirm] = useState(false);
  const [showClearCartConfirm, setShowClearCartConfirm] = useState(false);

  const { cart, updateQuantity, removeFromCart, clearCart } = useShoppingContext();
  const navigate = useNavigate();

  const handleQuantityChange = (id, newQuantity) => {
    updateQuantity(id, newQuantity);
  };

  const handleRemoveItem = (id) => {
    removeFromCart(id);
  };

  const handleClearCart = () => {
    clearCart();
  };

  const handleCheckout = () => {
    onClose();
    navigate("/projects/elite-shop/checkout");
  };

  const handleCloseConfirmRemove = () => {};

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="absolute right-0 top-0 h-full w-full max-w-md bg-background shadow-lg">
        <div className=" bg-white text-black shadow-sm h-full rounded-none border-0">
          <div className="p-6 flex flex-row items-center justify-between space-y-0 pb-4">
            <h3 className="text-2xl font-semibold leading-none tracking-tight">Shopping Cart ({cart.itemCount})</h3>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>

          <div className="p-6 pt-0 flex-1 overflow-y-auto">
            {cart.items.length === 0 ? (
              <div className="text-center py-8 flex flex-col items-center justify-center space-y-4">
                <ShoppingCart className="w-12 h-12 text-(--muted-foreground)" />
                <p className="text-muted-foreground text-lg">Your cart is empty</p>
              </div>
            ) : (
              <div className="space-y-4">
                {cart.items.map((item) => (
                  <div key={item.id} className="flex items-center space-x-3 py-3">
                    <img src={item.image} alt={item.name} className="h-16 w-16 rounded-lg object-cover" />
                    <div className="flex-1 space-y-1">
                      <h4 className="font-medium text-sm line-clamp-1">{item.name}</h4>
                      <p className="text-sm font-semibold">${item.price.toFixed(2)}</p>
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                          className="h-6! w-6! p-0"
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        <span className="text-sm w-8 text-center">{item.quantity}</span>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                          className="h-6! w-6 p-0"
                        >
                          <Plus className="h-3 w-3" />
                        </Button>

                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-6! w-6 p-0 text-(--destructive) hover:text-(destructive)"
                          onClick={() => {
                            setShowRemoveConfirm(true);
                            handleCloseConfirmRemove();
                          }}
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>

                        <Modal
                          isOpen={showRemoveConfirm}
                          onClose={() => setShowRemoveConfirm(false)}
                          showCloseButton={false} // No "X" button for delete confirmation
                        >
                          <div className="space-y-4">
                            <h4 className="text-lg font-semibold mb-3">Remove Item</h4>
                            <p className="text-sm text-(--muted-foreground)">
                              Are you sure you want to remove "{item.name}" from your cart?
                            </p>

                            <div className="flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2">
                              <Button variant="outline" className="" onClick={() => setShowRemoveConfirm(false)}>
                                Cancel
                              </Button>

                              <Button
                                variant="default"
                                className=""
                                onClick={() => {
                                  handleRemoveItem(item.id);
                                  setShowRemoveConfirm(false);
                                }}
                              >
                                Remove
                              </Button>
                            </div>
                          </div>
                        </Modal>
                      </div>
                    </div>
                  </div>
                ))}

                <div className="shrink-0 bg-border h-[1px] w-full" />

                <div className="space-y-2">
                  {cart.discount > 0 && (
                    <div className="flex justify-between text-sm">
                      <span className="text-green-600">Discount (10%):</span>
                      <span className="text-green-600">-${cart.discount.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-sm">
                    <span>Tax:</span>
                    <span>${cart.tax.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between font-semibold text-lg">
                    <span>Total:</span>
                    <span>${cart.total.toFixed(2)}</span>
                  </div>
                </div>

                <div className="space-y-2 pt-4">
                  <Button onClick={handleCheckout} className="w-full" disabled={cart.items.length === 0}>
                    Proceed to Checkout
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full text-(--destructive) hover:text-(--destructive)"
                    onClick={() => setShowClearCartConfirm(true)}
                  >
                    Clear Cart
                  </Button>
                  <Modal
                    isOpen={showClearCartConfirm}
                    onClose={() => setShowClearCartConfirm(false)}
                    showCloseButton={false} // No "X" button for delete confirmation
                  >
                    <div className="space-y-4">
                      <h4 className="text-lg font-semibold mb-3">Clear Cart</h4>
                      <p className="text-sm text-(--muted-foreground)">
                        Are you sure you want to clear your entire cart? This action cannot be undone.
                      </p>

                      <div className="flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2">
                        <Button variant="outline" className="" onClick={() => setShowClearCartConfirm(false)}>
                          Cancel
                        </Button>

                        <Button
                          variant="default"
                          className=""
                          onClick={() => {
                            handleClearCart();
                            setShowClearCartConfirm(false);
                          }}
                        >
                          Clear Cart
                        </Button>
                      </div>
                    </div>
                  </Modal>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
