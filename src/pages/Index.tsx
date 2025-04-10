
import React from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import InfiniteFoodGrid from "@/components/InfiniteFoodGrid";
import Footer from "@/components/Footer";
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
      className: "frosted-glass"
    });
  };

  return (
    <div className="min-h-screen transition-colors">
      <Navbar />
      <Hero />
      <div id="featured-section" className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold mb-8 text-center relative inline-block mx-auto">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
            Featured Menu Items
          </span>
          <span className="absolute -bottom-1 left-0 w-full h-1 bg-gradient-to-r from-primary to-secondary rounded-full"></span>
        </h2>
        <InfiniteFoodGrid 
          foodItems={mockFoodItems} 
          onFoodClick={handleFoodClick}
        />
      </div>
      <Footer />
    </div>
  );
};

export default Index;
