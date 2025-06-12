/**
 * Footer Component
 * Displays company information, links, and branding
 * Responsive layout with multiple columns on larger screens
 */

import { Heart } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="bg-(--muted)/30 border-(--border) border-t mt-16">
      <div className="container mx-auto px-4 py-8">
        {/* Main footer content grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Company information section */}
          <div>
            <h3 className="font-semibold text-lg mb-4">EliteShop</h3>
            <p className="text-(--muted-foreground) text-sm">
              Your one-stop destination for premium products. Experience quality and convenience in every purchase.
            </p>
          </div>

          {/* Quick links section */}
          <div>
            <h4 className="font-medium mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm text-(--muted-foreground)">
              <li>
                <a href="#" className="hover:text-(--foreground) transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-(--foreground) transition-colors">
                  Contact
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-(--foreground) transition-colors">
                  FAQ
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-(--foreground) transition-colors">
                  Shipping
                </a>
              </li>
            </ul>
          </div>

          {/* Customer service section */}
          <div>
            <h4 className="font-medium mb-4">Customer Service</h4>
            <ul className="space-y-2 text-sm text-(--muted-foreground)">
              <li>
                <a href="#" className="hover:text-(--foreground) transition-colors">
                  Returns
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-(--foreground) transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-(--foreground) transition-colors">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-(--foreground) transition-colors">
                  Support
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Footer bottom section */}
        <div className="border-(--border) border-t mt-8 pt-6 text-center">
          <p className="text-(--muted-foreground) text-sm flex items-center justify-center gap-1">
            Made with <Heart className="h-4 w-4 text-(--primary)" /> by{" "}
            <a href="https://www.linkedin.com/in/saiefalemon/" className="hover:underline">
              Saief Al Emon
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};
