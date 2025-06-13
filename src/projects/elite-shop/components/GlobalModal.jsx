import { useShoppingContext } from "../ShoppingContext";
import { Button } from "./Button";
import { Modal } from "./Modal";

export const GlobalModal = () => {
  const { cart, dispatch, removeFromCart, clearCart } = useShoppingContext();
  const { type, data } = cart.modal;

  const handleRemoveItem = (id) => {
    dispatch({ type: "REMOVE_ITEM", payload: { id } });
    dispatch({ type: "CLOSE_MODAL" });
    removeFromCart(id);
  };

  const handleClearCart = () => {
    dispatch({ type: "CLOSE_MODAL" });
    clearCart();
  };

  if (!type) return null;

  return (
    <Modal isOpen={!!type} onClose={() => dispatch({ type: "CLOSE_MODAL" })} showCloseButton={false}>
      {type === "REMOVE_ITEM" && (
        <div className="space-y-4">
          <h4 className="text-lg font-semibold mb-3">Remove Item</h4>
          <p className="text-sm text-(--muted-foreground)">
            Are you sure you want to remove "{data?.name}" from your cart?
          </p>

          <div className="flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2">
            <Button variant="outline" className="" onClick={() => dispatch({ type: "CLOSE_MODAL" })}>
              Cancel
            </Button>

            <Button variant="default" className="" onClick={() => handleRemoveItem(data?.id)}>
              Remove
            </Button>
          </div>
        </div>
      )}

      {type === "CLEAR_CART" && (
        <div className="space-y-4">
          <h4 className="text-lg font-semibold mb-3">Clear Cart</h4>
          <p className="text-sm text-(--muted-foreground)">
            Are you sure you want to clear your entire cart? This action cannot be undone.
          </p>

          <div className="flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2">
            <Button variant="outline" className="" onClick={() => dispatch({ type: "CLOSE_MODAL" })}>
              Cancel
            </Button>

            <Button variant="default" className="" onClick={() => handleClearCart()}>
              Clear Cart
            </Button>
          </div>
        </div>
      )}
    </Modal>
  );
};
