
import React from 'react';
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
import { Minus, Plus, ShoppingBag, Trash2 } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';

const CartDrawer: React.FC = () => {
  const { cartItems, isCartOpen, setIsCartOpen, removeFromCart, updateQuantity, getTotalPrice } = useCart();
  const navigate = useNavigate();

  const handleCheckout = () => {
    setIsCartOpen(false);
    navigate('/checkout');
  };

  const calculateItemTotal = (index: number) => {
    const item = cartItems[index];
    let optionsTotal = 0;
    
    if (item.selectedOptions) {
      Object.values(item.selectedOptions).forEach(options => {
        options.forEach(option => {
          optionsTotal += option.price;
        });
      });
    }
    
    return ((item.item.price + optionsTotal) * item.quantity).toFixed(2);
  };

  return (
    <Sheet open={isCartOpen} onOpenChange={setIsCartOpen}>
      <SheetContent className="flex flex-col w-full sm:max-w-md">
        <SheetHeader className="pb-4">
          <SheetTitle className="flex items-center">
            <ShoppingBag className="mr-2" size={20} />
            Your Cart
          </SheetTitle>
          <SheetDescription>
            {cartItems.length === 0 
              ? "Your cart is empty." 
              : `You have ${cartItems.length} item(s) in your cart.`}
          </SheetDescription>
        </SheetHeader>
        
        {cartItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center flex-1 text-center">
            <ShoppingBag className="h-16 w-16 text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">Your cart is empty</h3>
            <p className="text-sm text-muted-foreground mb-6">
              Add some delicious items to your cart and they will appear here.
            </p>
            <Button onClick={() => setIsCartOpen(false)}>
              Browse Food
            </Button>
          </div>
        ) : (
          <>
            <ScrollArea className="flex-1 -mx-6 px-6">
              <div className="space-y-4">
                {cartItems.map((cartItem, index) => (
                  <div key={cartItem.item.id} className="bg-accent/40 rounded-lg p-4">
                    <div className="flex justify-between">
                      <div className="flex-1">
                        <h4 className="font-medium">{cartItem.item.name}</h4>
                        <div className="text-sm text-muted-foreground">
                          ${cartItem.item.price.toFixed(2)} each
                        </div>
                        
                        {/* Selected options (if any) */}
                        {cartItem.selectedOptions && Object.keys(cartItem.selectedOptions).length > 0 && (
                          <div className="mt-2">
                            {Object.entries(cartItem.selectedOptions).map(([category, options]) => (
                              <div key={category} className="text-xs text-muted-foreground">
                                <span className="font-medium">{category}:</span>{" "}
                                {options.map((option, i) => (
                                  <span key={option.id}>
                                    {option.name}{option.price > 0 && ` (+$${option.price.toFixed(2)})`}
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
                          src={cartItem.item.image} 
                          alt={cartItem.item.name} 
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
                          onClick={() => updateQuantity(cartItem.item.id, cartItem.quantity - 1)}
                        >
                          <Minus size={16} />
                        </Button>
                        <span className="mx-3 w-6 text-center">{cartItem.quantity}</span>
                        <Button 
                          variant="outline" 
                          size="icon" 
                          className="h-8 w-8"
                          onClick={() => updateQuantity(cartItem.item.id, cartItem.quantity + 1)}
                        >
                          <Plus size={16} />
                        </Button>
                      </div>
                      <div className="flex items-center">
                        <div className="font-medium mr-3">
                          ${calculateItemTotal(index)}
                        </div>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-8 w-8 text-destructive"
                          onClick={() => removeFromCart(cartItem.item.id)}
                        >
                          <Trash2 size={16} />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
            
            <div className="pt-6">
              <Separator className="mb-4" />
              <div className="space-y-1.5 mb-4">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>${getTotalPrice().toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Delivery Fee</span>
                  <span>$3.99</span>
                </div>
                <Separator className="my-2" />
                <div className="flex justify-between font-medium text-lg">
                  <span>Total</span>
                  <span>${(getTotalPrice() + 3.99).toFixed(2)}</span>
                </div>
              </div>
              
              <SheetFooter className="flex flex-col gap-3 sm:flex-col">
                <Button 
                  onClick={handleCheckout} 
                  size="lg" 
                  className="w-full bg-primary hover:bg-primary/90"
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
