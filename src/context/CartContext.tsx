import React, { createContext, useState, useContext, useEffect } from 'react';
import { FoodItem } from '../data/mockData';
import { useToast } from '@/hooks/use-toast';
import { toast } from '@/components/ui/use-toast';

// Convert USD to INR (approximate conversion rate)
const usdToInr = (price: number): number => {
  return price * 75; // 1 USD ≈ 75 INR
};

// Format price in Indian Rupees
export const formatInr = (price: number): string => {
  return `₹${price.toFixed(2)}`;
};

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  restaurant: string;
  selectedOptions?: {
    [key: string]: {
      id: string;
      name: string;
      price: number;
    }[];
  };
}

interface DeliveryFees {
  [key: string]: {
    [key: string]: number;
  };
}

// Delivery fees based on city and area (in INR)
const deliveryFees: DeliveryFees = {
  'Mumbai': {
    'Andheri': 45,
    'Bandra': 50,
    'Colaba': 60,
    'Juhu': 40,
    'Powai': 55,
    'Worli': 45
  },
  'Delhi': {
    'Connaught Place': 50,
    'Hauz Khas': 45,
    'Lajpat Nagar': 40,
    'Saket': 55,
    'Vasant Kunj': 60
  },
  'Bangalore': {
    'Indiranagar': 40,
    'Koramangala': 35,
    'HSR Layout': 45,
    'Whitefield': 65,
    'JP Nagar': 50
  },
  // Default fee for other locations
  'default': {
    'default': 50
  }
};

interface PromoCodeDetails {
  type: 'percentage' | 'fixed' | 'free_delivery';
  value: number; // percentage or fixed amount
}

interface CartContextType {
  items: CartItem[];
  favoriteItems: CartItem[];
  addToCart: (
    item: FoodItem | CartItem,
    quantity?: number,
    selectedOptions?: {
      [key: string]: {
        id: string;
        name: string;
        price: number;
      }[];
    }
  ) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  getSubtotal: () => number;
  getDeliveryFee: () => number;
  getTaxes: () => number;
  getTotal: () => number;
  applyPromoCode: (code: string) => boolean;
  activePromoCode: string | null;
  promoDiscount: number;
  resetPromoCode: () => void;
  addToFavorites: (item: CartItem) => void;
  removeFromFavorites: (id: string) => void;
  isFavorite: (id: string) => boolean;
  getBillingBreakdown: () => BillingBreakdown;
  isCartOpen: boolean;
  setIsCartOpen: (isOpen: boolean) => void;
}

// Available promo codes
const promoCodes: { [key: string]: PromoCodeDetails } = {
  'WELCOME50': { type: 'fixed', value: 50 }, // 50 INR off
  'SPECIAL100': { type: 'fixed', value: 100 }, // 100 INR off
  'FREEDEL': { type: 'free_delivery', value: 0 }, // Free delivery
  'FIRST20': { type: 'percentage', value: 20 }, // 20% off
  'FESTIVE15': { type: 'percentage', value: 15 }, // 15% off
};

const CartContext = createContext<CartContextType | undefined>(undefined);

interface BillingBreakdown {
  subtotal: number;
  deliveryFee: number;
  taxes: number;
  promoDiscount: number;
  total: number;
}

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [favoriteItems, setFavoriteItems] = useState<CartItem[]>([]);
  const [activePromoCode, setActivePromoCode] = useState<string | null>(null);
  const [promoDiscount, setPromoDiscount] = useState<number>(0);
  const [city, setCity] = useState<string>("Mumbai");
  const [area, setArea] = useState<string>("Andheri");
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);

  // Load cart from localStorage on initial mount
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    const savedFavorites = localStorage.getItem('favorites');
    const savedPromo = localStorage.getItem('activePromoCode');
    const savedDiscount = localStorage.getItem('promoDiscount');

    if (savedCart) {
      try {
        setItems(JSON.parse(savedCart));
      } catch (error) {
        console.error('Failed to parse cart from localStorage:', error);
      }
    }

    if (savedFavorites) {
      try {
        setFavoriteItems(JSON.parse(savedFavorites));
      } catch (error) {
        console.error('Failed to parse favorites from localStorage:', error);
      }
    }

    if (savedPromo) {
      setActivePromoCode(savedPromo);
    }

    if (savedDiscount) {
      try {
        setPromoDiscount(Number(savedDiscount));
      } catch (error) {
        console.error('Failed to parse promo discount from localStorage:', error);
      }
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(items));
    localStorage.setItem('favorites', JSON.stringify(favoriteItems));
    localStorage.setItem('activePromoCode', activePromoCode || '');
    localStorage.setItem('promoDiscount', promoDiscount.toString());
  }, [items, favoriteItems, activePromoCode, promoDiscount]);

  const findCartItemIndex = (id: string) => {
    return items.findIndex((item) => item.id === id);
  };

  const addToCart = (
    item: FoodItem | CartItem,
    quantity?: number,
    selectedOptions?: {
      [key: string]: {
        id: string;
        name: string;
        price: number;
      }[];
    }
  ) => {
    // Handle case where item is already a CartItem (added directly)
    if ('quantity' in item) {
      const cartItem = item as CartItem;
      const existingItemIndex = findCartItemIndex(cartItem.id);

      if (existingItemIndex !== -1) {
        // Item exists, update quantity
        const updatedItems = [...items];
        updatedItems[existingItemIndex].quantity += cartItem.quantity;
        setItems(updatedItems);
      } else {
        // Item doesn't exist, add it
        setItems([...items, cartItem]);
      }
    } 
    // Handle case where item is a FoodItem with quantity and options
    else {
      const foodItem = item as FoodItem;
      const newCartItem: CartItem = {
        id: foodItem.id,
        name: foodItem.name,
        price: usdToInr(foodItem.price),
        quantity: quantity || 1,
        image: foodItem.image,
        restaurant: foodItem.restaurantId || "Unknown",
        selectedOptions: selectedOptions
      };
      
      const existingItemIndex = findCartItemIndex(newCartItem.id);

      if (existingItemIndex !== -1) {
        // Item exists, update quantity
        const updatedItems = [...items];
        updatedItems[existingItemIndex].quantity += newCartItem.quantity;
        setItems(updatedItems);
      } else {
        // Item doesn't exist, add it
        setItems([...items, newCartItem]);
      }
    }
    
    // Open cart drawer when an item is added
    setIsCartOpen(true);
  };

  const removeFromCart = (id: string) => {
    setItems(items.filter((item) => item.id !== id));
    
    // Show toast when item is removed
    toast({
      title: "Item removed",
      description: "Item has been removed from your cart",
      variant: "default",
    });
  };

  const updateQuantity = (id: string, quantity: number) => {
    const existingItemIndex = findCartItemIndex(id);
    if (existingItemIndex !== -1) {
      const updatedItems = [...items];
      if (quantity <= 0) {
        // Remove item if quantity is 0 or less
        updatedItems.splice(existingItemIndex, 1);
      } else {
        // Update quantity
        updatedItems[existingItemIndex].quantity = quantity;
      }
      setItems(updatedItems);
    }
  };

  const clearCart = () => {
    setItems([]);
    setActivePromoCode(null);
    setPromoDiscount(0);
    
    toast({
      title: "Cart cleared",
      description: "All items have been removed from your cart",
      variant: "default",
    });
  };

  const getSubtotal = () => {
    return items.reduce((total, item) => {
      let itemTotal = item.price * item.quantity;
      
      // Add any selected options price
      if (item.selectedOptions) {
        Object.values(item.selectedOptions).forEach(optionGroup => {
          optionGroup.forEach(option => {
            // Convert option price to INR and add to total
            itemTotal += usdToInr(option.price) * item.quantity;
          });
        });
      }
      
      return total + itemTotal;
    }, 0);
  };
  
  const getDeliveryFee = () => {
    // Skip delivery fee if promo code for free delivery is applied
    if (activePromoCode === 'FREEDEL') return 0;
  
    // Get selected location from localStorage
    const city = localStorage.getItem('selectedCity') || 'default';
    const area = localStorage.getItem('selectedArea') || 'default';
    
    // Get delivery fee based on location
    const cityFees = deliveryFees[city] || deliveryFees['default'];
    return cityFees[area] || cityFees['default'] || deliveryFees['default']['default'];
  };
  
  const getTaxes = () => {
    // Calculate taxes as 5% of the subtotal
    const subtotal = getSubtotal();
    return Math.round(subtotal * 0.05);
  };
  
  const getTotal = () => {
    const subtotal = getSubtotal();
    const deliveryFee = getDeliveryFee();
    const taxes = getTaxes();
    
    return subtotal + deliveryFee + taxes - promoDiscount;
  };
  
  const applyPromoCode = (code: string): boolean => {
    const promoCode = code.toUpperCase();
    
    if (promoCodes.hasOwnProperty(promoCode)) {
      const promoDetails = promoCodes[promoCode];
      setActivePromoCode(promoCode);
      
      switch (promoDetails.type) {
        case 'free_delivery':
          // Special code for free delivery
          setPromoDiscount(getDeliveryFee());
          toast({
            title: "Promo code applied!",
            description: "Free delivery applied to your order",
            variant: "success",
          });
          break;
          
        case 'percentage':
          // Percentage discount
          const subtotal = getSubtotal();
          const discountAmount = (subtotal * promoDetails.value) / 100;
          setPromoDiscount(discountAmount);
          toast({
            title: "Promo code applied!",
            description: `${promoDetails.value}% discount (₹${discountAmount.toFixed(2)}) applied to your order`,
            variant: "success",
          });
          break;
          
        case 'fixed':
          // Fixed amount discount
          setPromoDiscount(promoDetails.value);
          toast({
            title: "Promo code applied!",
            description: `₹${promoDetails.value} discount applied to your order`,
            variant: "success",
          });
          break;
      }
      
      return true;
    }
    
    // Invalid promo code
    toast({
      title: "Invalid promo code",
      description: "The promo code you entered is invalid or expired",
      variant: "destructive",
    });
    
    return false;
  };

  const resetPromoCode = () => {
    setActivePromoCode(null);
    setPromoDiscount(0);
  };

  const addToFavorites = (item: CartItem) => {
    if (!favoriteItems.some(favItem => favItem.id === item.id)) {
      setFavoriteItems(prev => [...prev, item]);
      toast({
        title: "Added to favorites",
        description: `${item.name} has been added to your favorites`,
        variant: "success",
      });
    }
  };

  const removeFromFavorites = (id: string) => {
    setFavoriteItems(prev => prev.filter(item => item.id !== id));
    toast({
      title: "Removed from favorites",
      description: "Item has been removed from your favorites",
      variant: "default",
    });
  };

  const isFavorite = (id: string) => {
    return favoriteItems.some(item => item.id === id);
  };

  const getBillingBreakdown = (): BillingBreakdown => {
    const subtotal = getSubtotal();
    const deliveryFee = getDeliveryFee();
    const taxes = getTaxes();
    
    return {
      subtotal,
      deliveryFee,
      taxes,
      promoDiscount,
      total: subtotal + deliveryFee + taxes - promoDiscount
    };
  };

  const value = {
    items,
    favoriteItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getSubtotal,
    getDeliveryFee,
    getTaxes,
    getTotal,
    applyPromoCode,
    activePromoCode,
    promoDiscount,
    resetPromoCode,
    addToFavorites,
    removeFromFavorites,
    isFavorite,
    getBillingBreakdown,
    isCartOpen,
    setIsCartOpen,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
