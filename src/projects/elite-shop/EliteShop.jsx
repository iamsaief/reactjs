/**
 * EliteShop main component
 * Main landing page displaying product catalog with filters and cart
 * Manages cart sidebar visibility state
 */

import "./styles.css";

export const EliteShop = () => {
  return (
    <ShoppingProvider>
      <div>Elite Shop Root Component</div>
    </ShoppingProvider>
  );
};
