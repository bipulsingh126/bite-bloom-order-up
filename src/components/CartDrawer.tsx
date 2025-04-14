import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Sheet, 
  SheetContent, 
  SheetHeader, 
  SheetTitle, 
  SheetDescription,
  SheetFooter
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Minus, Plus, ShoppingBag, Trash2, Tag, ShieldCheck } from 'lucide-react';
import { useCart, formatInr } from '@/context/CartContext';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';

// Convert USD to INR (approximate conversion rate)
const usdToInr = (price: number): number => {
  return price * 75; // 1 USD ≈ 75 INR
};

const CartDrawer: React.FC = () => {
  const { 
    items, 
    isCartOpen, 
    setIsCartOpen, 
    removeFromCart, 
    updateQuantity, 
    getSubtotal,
    getDeliveryFee,
    getTotal,
    applyPromoCode,
    activePromoCode,
    promoDiscount
  } = useCart();
  const [promoInput, setPromoInput] = useState('');
  const navigate = useNavigate();

  const handleCheckout = () => {
    setIsCartOpen(false);
    navigate('/checkout');
  };

  const calculateItemTotal = (index: number) => {
    const item = items[index];
    let itemTotal = item.price * item.quantity;
    
    if (item.selectedOptions) {
      Object.values(item.selectedOptions).forEach(optionGroup => {
        optionGroup.forEach(option => {
          itemTotal += (option.price) * item.quantity;
        });
      });
    }
    
    return itemTotal;
  };
  
  const handlePromoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (promoInput.trim()) {
      const success = applyPromoCode(promoInput.trim());
      if (success) {
        setPromoInput(''); // Clear input on success
      }
    }
  };

  return (
    <Sheet open={isCartOpen} onOpenChange={setIsCartOpen}>
      <SheetContent className="flex flex-col w-full sm:max-w-md">
        <SheetHeader className="pb-4">
          <SheetTitle className="flex items-center">
            <ShoppingBag className="mr-2 text-primary" size={20} />
            Your Cart
          </SheetTitle>
          <SheetDescription>
            {items.length === 0 
              ? "Your cart is empty." 
              : `You have ${items.length} item(s) in your cart.`}
          </SheetDescription>
        </SheetHeader>
        
        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center flex-1 text-center">
            <ShoppingBag className="h-16 w-16 text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">Your cart is empty</h3>
            <p className="text-sm text-muted-foreground mb-6">
              Add some delicious items to your cart and they will appear here.
            </p>
            <Button 
              onClick={() => setIsCartOpen(false)} 
              className="bg-gradient-to-r from-teal-500 to-blue-500 hover:from-teal-600 hover:to-blue-600 text-white"
            >
              Browse Food
            </Button>
          </div>
        ) : (
          <>
            <ScrollArea className="flex-1 -mx-6 px-6">
              <div className="space-y-4">
                {items.map((item, index) => (
                  <div key={item.id} className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm border border-gray-100 dark:border-gray-700">
                    <div className="flex justify-between">
                      <div className="flex-1">
                        <h4 className="font-medium">{item.name}</h4>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          {formatInr(item.price)} each
                        </div>
                        
                        {/* Selected options (if any) */}
                        {item.selectedOptions && Object.keys(item.selectedOptions).length > 0 && (
                          <div className="mt-2">
                            {Object.entries(item.selectedOptions).map(([category, options]) => (
                              <div key={category} className="text-xs text-gray-500 dark:text-gray-400">
                                <span className="font-medium">{category}:</span>{" "}
                                {options.map((option, i) => (
                                  <span key={option.id}>
                                    {option.name}{option.price > 0 && ` (+${formatInr(option.price)})`}
                                    {i < options.length - 1 ? ", " : ""}
                                  </span>
                                ))}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                      <div className="flex items-start">
                        <img 
                          src={item.image} 
                          alt={item.name} 
                          className="h-16 w-16 object-cover rounded-md ml-3"
                        />
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between mt-4">
                      <div className="flex items-center">
                        <Button 
                          variant="outline" 
                          size="icon" 
                          className="h-8 w-8"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        >
                          <Minus size={16} />
                        </Button>
                        <span className="mx-3 w-6 text-center">{item.quantity}</span>
                        <Button 
                          variant="outline" 
                          size="icon" 
                          className="h-8 w-8"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        >
                          <Plus size={16} />
                        </Button>
                      </div>
                      <div className="flex items-center">
                        <div className="font-medium mr-3 text-primary">
                          {formatInr(calculateItemTotal(index))}
                        </div>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-8 w-8 text-destructive"
                          onClick={() => removeFromCart(item.id)}
                        >
                          <Trash2 size={16} />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
            
            {/* Promo Code Section */}
            <div className="pt-4">
              <form onSubmit={handlePromoSubmit} className="flex items-center gap-2">
                <div className="relative flex-1">
                  <Input
                    placeholder="Enter promo code"
                    value={promoInput}
                    onChange={(e) => setPromoInput(e.target.value)}
                    className="pr-8"
                    disabled={!!activePromoCode}
                  />
                  <Tag className="absolute right-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                </div>
                <Button 
                  type="submit" 
                  variant="outline"
                  size="sm" 
                  disabled={!!activePromoCode || !promoInput.trim()}
                >
                  Apply
                </Button>
              </form>
              
              {activePromoCode && (
                <div className="mt-2 p-2 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-900 rounded-md flex items-center text-sm text-green-700 dark:text-green-400">
                  <ShieldCheck className="h-4 w-4 mr-2" />
                  <span>
                    {activePromoCode === 'FREEDEL' ? 
                      'Free delivery applied!' : 
                      `${formatInr(promoDiscount)} discount applied!`}
                  </span>
                </div>
              )}
            </div>
            
            <div className="pt-4">
              <Separator className="mb-4" />
              <div className="space-y-1.5 mb-4">
                <div className="flex justify-between">
                  <span className="text-gray-500 dark:text-gray-400">Subtotal</span>
                  <span>{formatInr(getSubtotal())}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500 dark:text-gray-400">Delivery Fee</span>
                  <span>{formatInr(getDeliveryFee())}</span>
                </div>
                
                {promoDiscount > 0 && (
                  <div className="flex justify-between text-green-600 dark:text-green-400">
                    <span>Discount</span>
                    <span>-{formatInr(promoDiscount)}</span>
                  </div>
                )}
                
                <Separator className="my-2" />
                <div className="flex justify-between font-medium text-lg">
                  <span>Total</span>
                  <span className="text-primary">{formatInr(getTotal())}</span>
                </div>
              </div>
              
              <SheetFooter className="flex flex-col gap-3 sm:flex-col">
                <Button 
                  onClick={handleCheckout} 
                  size="lg" 
                  className="w-full bg-gradient-to-r from-teal-500 to-blue-500 hover:from-teal-600 hover:to-blue-600 text-white"
                >
                  Proceed to Checkout
                </Button>
                <Button
                  variant="outline" 
                  size="lg"
                  className="w-full"
                  onClick={() => setIsCartOpen(false)}
                >
                  Continue Shopping
                </Button>
              </SheetFooter>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default CartDrawer;
