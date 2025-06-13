/**
 * Cart reducer managing all cart state changes
 * Handles adding/removing items, quantity updates, and price calculations
 */

// Business constants for pricing calculations
const TAX_RATE = 0.08; // 8% sales tax
const DISCOUNT_THRESHOLD = 500; // $500 minimum for 10% discount
const DISCOUNT_RATE = 0.1; // 10% discount rate

/**
 * Calculates totals, tax, and discounts for cart items
 * @param items - Array of cart items
 * @returns Object containing calculated totals
 */
const calculateTotals = (items) => {
  // Calculate subtotal from all items
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  // Count total items in cart
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  // Apply discount if subtotal meets threshold
  const discount = subtotal >= DISCOUNT_THRESHOLD ? subtotal * DISCOUNT_RATE : 0;
  const discountedSubtotal = subtotal - discount;

  // Calculate tax on discounted amount
  const tax = discountedSubtotal * TAX_RATE;

  // Final total with tax
  const total = discountedSubtotal + tax;

  return {
    total: Math.round(total * 100) / 100, // Round to 2 decimal places
    itemCount,
    tax: Math.round(tax * 100) / 100,
    discount: Math.round(discount * 100) / 100,
  };
};

/**
 * Cart reducer function handling all cart state mutations
 * @param state - Current cart state
 * @param action - Action to perform on the cart
 * @returns New cart state
 */
export const shoppingReducer = (state, action) => {
  switch (action.type) {
    case "ADD_ITEM": {
      // Check if item already exists in cart
      const existingItem = state.items.find((item) => item.id === action.payload.id);
      let newItems;

      if (existingItem) {
        // Increment quantity if item exists
        newItems = state.items.map((item) =>
          item.id === action.payload.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        // Add new item with quantity 1
        newItems = [...state.items, { ...action.payload, quantity: 1 }];
      }

      // Recalculate totals with new items
      const totals = calculateTotals(newItems);

      return {
        ...state,
        items: newItems,
        ...totals,
        error: null, // Clear any previous errors
      };
    }

    case "REMOVE_ITEM": {
      // Filter out the item to be removed
      const newItems = state.items.filter((item) => item.id !== action.payload);
      const totals = calculateTotals(newItems);

      return {
        ...state,
        items: newItems,
        ...totals,
        error: null,
      };
    }

    case "UPDATE_QUANTITY": {
      // Update quantity for specific item
      const newItems = state.items.map((item) =>
        item.id === action.payload.id ? { ...item, quantity: action.payload.quantity } : item
      );

      const totals = calculateTotals(newItems);

      return {
        ...state,
        items: newItems,
        ...totals,
        error: null,
      };
    }

    case "CLEAR_CART": {
      // Reset cart to empty state
      return {
        ...state,
        items: [],
        total: 0,
        itemCount: 0,
        tax: 0,
        discount: 0,
        error: null,
      };
    }

    case "OPEN_MODAL":
      return { ...state, modal: { type: action.payload.type, data: action.payload.data } };

    case "CLOSE_MODAL":
      return { ...state, modal: { type: null, data: null } };

    case "SET_LOADING": {
      // Update loading state for async operations
      return {
        ...state,
        isLoading: action.payload,
      };
    }

    case "SET_ERROR": {
      // Set error message
      return {
        ...state,
        error: action.payload,
      };
    }

    default:
      // Return current state for unknown actions
      return state;
  }
};
