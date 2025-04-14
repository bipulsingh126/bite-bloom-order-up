import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import { useCart, formatInr } from '@/context/CartContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { toast } from '@/hooks/use-toast';
import { CreditCard, MapPin } from 'lucide-react';

const Checkout = () => {
  const navigate = useNavigate();
  const { 
    items, 
    getTotal, 
    clearCart, 
    getSubtotal, 
    getDeliveryFee, 
    getTaxes, 
    getBillingBreakdown 
  } = useCart();
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('credit-card');
  
  useEffect(() => {
    // Debug cart contents
    console.log("Cart items in Checkout:", items);
  }, [items]);
  
  const handleCheckout = async () => {
    setIsProcessing(true);
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Show success toast
      toast({
        title: "Order placed successfully!",
        description: "Your order has been received and is being processed.",
        duration: 5000,
      });
      
      // Clear cart
      clearCart();
      
      // Redirect to home
      navigate('/', { state: { orderPlaced: true } });
    } catch (error) {
      console.error('Payment error:', error);
      toast({
        title: "Payment failed",
        description: "There was an issue processing your payment. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };
  
  // Get all price components from the cart context
  const { subtotal, deliveryFee, taxes, promoDiscount, total } = getBillingBreakdown();
  
  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 pt-24 pb-12">
          <div className="max-w-md mx-auto text-center py-8">
            <h1 className="text-2xl font-bold mb-4">Your cart is empty</h1>
            <p className="text-muted-foreground mb-6">Add some items to your cart before proceeding to checkout.</p>
            <Button onClick={() => navigate('/')}>Browse Restaurants</Button>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 pt-24 pb-12">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">Checkout</h1>
          
          <div className="grid md:grid-cols-3 gap-8">
            {/* Left side - Order summary */}
            <div className="md:col-span-2">
              <div className="bg-card rounded-lg p-6 mb-6">
                <h2 className="text-xl font-semibold mb-4">Delivery Address</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="fullName">Full Name</Label>
                    <Input id="fullName" placeholder="Your full name" className="mt-1" />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input id="phone" placeholder="Your phone number" className="mt-1" />
                  </div>
                  <div className="md:col-span-2">
                    <Label htmlFor="address">Street Address</Label>
                    <Input id="address" placeholder="Street address" className="mt-1" />
                  </div>
                  <div>
                    <Label htmlFor="city">City</Label>
                    <Input id="city" placeholder="City" className="mt-1" />
                  </div>
                  <div>
                    <Label htmlFor="zipCode">Zip Code</Label>
                    <Input id="zipCode" placeholder="Zip code" className="mt-1" />
                  </div>
                  <div className="md:col-span-2">
                    <Label htmlFor="instructions">Delivery Instructions (optional)</Label>
                    <Input id="instructions" placeholder="Add any special instructions" className="mt-1" />
                  </div>
                </div>
              </div>
              
              <div className="bg-card rounded-lg p-6">
                <h2 className="text-xl font-semibold mb-4">Payment Method</h2>
                <RadioGroup 
                  value={paymentMethod} 
                  onValueChange={setPaymentMethod} 
                  className="space-y-4"
                >
                  <div className="flex items-center space-x-2 border rounded-md p-4">
                    <RadioGroupItem value="credit-card" id="credit-card" />
                    <Label htmlFor="credit-card" className="flex items-center">
                      <CreditCard className="mr-2 h-5 w-5" /> Credit/Debit Card
                    </Label>
                  </div>
                  
                  {paymentMethod === 'credit-card' && (
                    <div className="pl-6 space-y-4">
                      <div>
                        <Label htmlFor="cardNumber">Card Number</Label>
                        <Input id="cardNumber" placeholder="1234 5678 9012 3456" className="mt-1" />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="expiryDate">Expiry Date</Label>
                          <Input id="expiryDate" placeholder="MM/YY" className="mt-1" />
                        </div>
                        <div>
                          <Label htmlFor="cvv">CVV</Label>
                          <Input id="cvv" placeholder="123" className="mt-1" />
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="nameOnCard">Name on Card</Label>
                        <Input id="nameOnCard" placeholder="Full name on card" className="mt-1" />
                      </div>
                    </div>
                  )}
                  
                  <div className="flex items-center space-x-2 border rounded-md p-4">
                    <RadioGroupItem value="cash" id="cash" />
                    <Label htmlFor="cash">Cash on Delivery</Label>
                  </div>
                </RadioGroup>
              </div>
            </div>
            
            {/* Right side - Order summary */}
            <div>
              <div className="bg-card rounded-lg p-6 sticky top-24">
                <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
                
                <div className="space-y-4 mb-4">
                  {items.map((item) => (
                    <div key={item.id} className="flex justify-between items-center">
                      <div className="flex items-center">
                        <span className="bg-muted w-6 h-6 flex items-center justify-center rounded-full mr-2">
                          {item.quantity}
                        </span>
                        <span className="font-medium">{item.name}</span>
                      </div>
                      <span>{formatInr(item.price * item.quantity)}</span>
                    </div>
                  ))}
                </div>
                
                <Separator className="my-4" />
                
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>{formatInr(subtotal)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Delivery Fee</span>
                    <span>{formatInr(deliveryFee)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Tax (5%)</span>
                    <span>{formatInr(taxes)}</span>
                  </div>
                  {promoDiscount > 0 && (
                    <div className="flex justify-between text-green-500">
                      <span>Discount</span>
                      <span>-{formatInr(promoDiscount)}</span>
                    </div>
                  )}
                </div>
                
                <Separator className="my-4" />
                
                <div className="flex justify-between font-semibold text-lg mb-6">
                  <span>Total</span>
                  <span>{formatInr(total)}</span>
                </div>
                
                <Button 
                  onClick={handleCheckout}
                  disabled={isProcessing}
                  className="w-full"
                >
                  {isProcessing ? "Processing..." : "Place Order"}
                </Button>
                
                <p className="text-xs text-muted-foreground text-center mt-4">
                  By placing your order, you agree to our Terms of Service and Privacy Policy.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <footer className="bg-card py-8 px-4 mt-12">
        <div className="container mx-auto text-center text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} BiteBloom. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Checkout;
