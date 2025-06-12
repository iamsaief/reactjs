import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { Button } from "./Button";
import { Input } from "./Input";
import { Label } from "./Label";

export const CheckoutForm = ({ onComplete, onBack, total }) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    zipCode: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
  });

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Valid email is required";
    }
    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required";
    }
    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required";
    }
    if (!formData.address.trim()) {
      newErrors.address = "Address is required";
    }
    if (!formData.city.trim()) {
      newErrors.city = "City is required";
    }
    if (!formData.zipCode.trim()) {
      newErrors.zipCode = "ZIP code is required";
    }
    if (!formData.cardNumber.replace(/\s/g, "") || formData.cardNumber.replace(/\s/g, "").length < 13) {
      newErrors.cardNumber = "Valid card number is required";
    }
    if (!formData.expiryDate || !/^\d{2}\/\d{2}$/.test(formData.expiryDate)) {
      newErrors.expiryDate = "Valid expiry date is required (MM/YY)";
    }
    if (!formData.cvv || formData.cvv.length < 3) {
      newErrors.cvv = "Valid CVV is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const formatCardNumber = (value) => {
    const cleaned = value.replace(/\s/g, "");
    const chunks = cleaned.match(/.{1,4}/g);
    return chunks ? chunks.join(" ") : cleaned;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      // Validation Error
      return;
    }

    setIsProcessing(true);

    // Simulate payment processing
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));

      //   Order Successful!

      onComplete();
    } catch (error) {
      // Payment processing failed
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2">
        <Button variant="ghost" size="sm" onClick={onBack}>
          <ArrowLeft className="h-4 w-4" />
          Back to Shopping
        </Button>
      </div>

      <div className="rounded-lg border border-(--border) bg-white text-black shadow-sm">
        <div className="flex flex-col space-y-1.5 p-6">
          <h3 className="text-2xl font-semibold leading-none tracking-tight">Order Summary</h3>
        </div>
        <div className="p-6 pt-0">
          <div className="flex justify-between font-semibold">
            <span>Total: ${total.toFixed(2)}</span>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-3">
          <h4 className="font-medium">Contact Information</h4>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
              className={errors.email ? "border-destructive" : ""}
              required
            />
            {errors.email && <p className="text-xs text-destructive mt-1">{errors.email}</p>}
          </div>
        </div>

        <div className="space-y-3">
          <h4 className="font-medium">Shipping Address</h4>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label htmlFor="firstName">First Name</Label>
              <Input
                id="firstName"
                value={formData.firstName}
                onChange={(e) => handleInputChange("firstName", e.target.value)}
                className={errors.firstName ? "border-destructive" : ""}
                required
              />
              {errors.firstName && <p className="text-xs text-destructive mt-1">{errors.firstName}</p>}
            </div>
            <div>
              <Label htmlFor="lastName">Last Name</Label>
              <Input
                id="lastName"
                value={formData.lastName}
                onChange={(e) => handleInputChange("lastName", e.target.value)}
                className={errors.lastName ? "border-destructive" : ""}
                required
              />
              {errors.lastName && <p className="text-xs text-destructive mt-1">{errors.lastName}</p>}
            </div>
          </div>
          <div>
            <Label htmlFor="address">Address</Label>
            <Input
              id="address"
              value={formData.address}
              onChange={(e) => handleInputChange("address", e.target.value)}
              className={errors.address ? "border-destructive" : ""}
              required
            />
            {errors.address && <p className="text-xs text-destructive mt-1">{errors.address}</p>}
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label htmlFor="city">City</Label>
              <Input
                id="city"
                value={formData.city}
                onChange={(e) => handleInputChange("city", e.target.value)}
                className={errors.city ? "border-destructive" : ""}
                required
              />
              {errors.city && <p className="text-xs text-destructive mt-1">{errors.city}</p>}
            </div>
            <div>
              <Label htmlFor="zipCode">ZIP Code</Label>
              <Input
                id="zipCode"
                value={formData.zipCode}
                onChange={(e) => handleInputChange("zipCode", e.target.value)}
                className={errors.zipCode ? "border-destructive" : ""}
                required
              />
              {errors.zipCode && <p className="text-xs text-destructive mt-1">{errors.zipCode}</p>}
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <h4 className="font-medium">Payment Information</h4>
          <div>
            <Label htmlFor="cardNumber">Card Number</Label>
            <Input
              id="cardNumber"
              value={formData.cardNumber}
              onChange={(e) => handleInputChange("cardNumber", formatCardNumber(e.target.value))}
              placeholder="1234 5678 9012 3456"
              maxLength={19}
              className={errors.cardNumber ? "border-destructive" : ""}
              required
            />
            {errors.cardNumber && <p className="text-xs text-destructive mt-1">{errors.cardNumber}</p>}
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label htmlFor="expiryDate">Expiry Date</Label>
              <Input
                id="expiryDate"
                value={formData.expiryDate}
                onChange={(e) => handleInputChange("expiryDate", e.target.value)}
                placeholder="MM/YY"
                maxLength={5}
                className={errors.expiryDate ? "border-destructive" : ""}
                required
              />
              {errors.expiryDate && <p className="text-xs text-destructive mt-1">{errors.expiryDate}</p>}
            </div>
            <div>
              <Label htmlFor="cvv">CVV</Label>
              <Input
                id="cvv"
                value={formData.cvv}
                onChange={(e) => handleInputChange("cvv", e.target.value)}
                placeholder="123"
                maxLength={4}
                className={errors.cvv ? "border-destructive" : ""}
                required
              />
              {errors.cvv && <p className="text-xs text-destructive mt-1">{errors.cvv}</p>}
            </div>
          </div>
        </div>

        <Button type="submit" className="w-full mt-4" disabled={isProcessing}>
          {isProcessing ? "Processing..." : `Complete Order - $${total.toFixed(2)}`}
        </Button>
      </form>
    </div>
  );
};
