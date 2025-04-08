
import React, { createContext, useState, useContext, useEffect } from 'react';
import { FoodItem } from '../data/mockData';

export interface CartItem {
  item: FoodItem;
  quantity: number;
  selectedOptions?: {
    [key: string]: {
      id: string;
      name: string;
      price: number;
    }[];
  };
}

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (item: FoodItem, quantity: number, selectedOptions?: any) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  isCartOpen: boolean;
  setIsCartOpen: React.Dispatch<React.SetStateAction<boolean>>;
  getTotalItems: () => number;
  getTotalPrice: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Load cart from localStorage on component mount
  useEffect(() => {
    const savedCart = localStorage.getItem('biteBloomCart');
    if (savedCart) {
      try {
        setCartItems(JSON.parse(savedCart));
      } catch (error) {
        console.error('Failed to parse cart from localStorage:', error);
      }
    }
  }, []);

  // Save cart to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('biteBloomCart', JSON.stringify(cartItems));
  }, [cartItems]);

  const findCartItemIndex = (id: string) => {
    return cartItems.findIndex((cartItem) => cartItem.item.id === id);
  };

  const addToCart = (item: FoodItem, quantity: number, selectedOptions?: any) => {
    const existingItemIndex = findCartItemIndex(item.id);

    if (existingItemIndex !== -1) {
      // Item exists, update quantity
      const updatedCartItems = [...cartItems];
      updatedCartItems[existingItemIndex].quantity += quantity;
      setCartItems(updatedCartItems);
    } else {
      // Item doesn't exist, add it
      setCartItems([...cartItems, { item, quantity, selectedOptions }]);
    }
    
    // Open cart drawer when an item is added
    setIsCartOpen(true);
  };

  const removeFromCart = (id: string) => {
    setCartItems(cartItems.filter((item) => item.item.id !== id));
  };

  const updateQuantity = (id: string, quantity: number) => {
    const existingItemIndex = findCartItemIndex(id);
    if (existingItemIndex !== -1) {
      const updatedCartItems = [...cartItems];
      if (quantity <= 0) {
        // Remove item if quantity is 0 or less
        updatedCartItems.splice(existingItemIndex, 1);
      } else {
        // Update quantity
        updatedCartItems[existingItemIndex].quantity = quantity;
      }
      setCartItems(updatedCartItems);
    }
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => {
      let optionsPrice = 0;
      
      if (item.selectedOptions) {
        Object.values(item.selectedOptions).forEach(options => {
          options.forEach(option => {
            optionsPrice += option.price;
          });
        });
      }
      
      return total + ((item.item.price + optionsPrice) * item.quantity);
    }, 0);
  };

  const value = {
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    isCartOpen,
    setIsCartOpen,
    getTotalItems,
    getTotalPrice
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
