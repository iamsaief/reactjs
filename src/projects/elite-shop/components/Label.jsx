import { forwardRef } from "react";

export const Label = forwardRef(({ className = "", ...props }, ref) => (
  <label
    ref={ref}
    className={`mb-2 block text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70" ${className}`}
    {...props}
  />
));
