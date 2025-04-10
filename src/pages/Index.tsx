
import React from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import InfiniteFoodGrid from "@/components/InfiniteFoodGrid";
import { NavbarThemeToggle } from "@/components/NavbarThemeToggle";
import { FoodItem, mockFoodItems } from "@/data/mockData";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const { toast } = useToast();
  
  // Handler for food item clicks
  const handleFoodClick = (food: FoodItem) => {
    toast({
      title: `${food.name} selected`,
      description: `You selected ${food.name}. Price: ₹${(food.price * 75).toFixed(2)}`,
      duration: 3000,
    });
  };

  return (
    <div className="min-h-screen transition-colors">
      <Navbar />
      <NavbarThemeToggle />
      <Hero />
      <div className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold mb-8 text-center">Featured Menu Items</h2>
        <InfiniteFoodGrid 
          foodItems={mockFoodItems} 
          onFoodClick={handleFoodClick}
        />
      </div>
    </div>
  );
};

export default Index;
