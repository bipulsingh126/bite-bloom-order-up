
import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import InfiniteFoodGrid from "@/components/InfiniteFoodGrid";
import Footer from "@/components/Footer";
import { FoodItem, mockFoodItems, categories } from "@/data/mockData";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import FoodItemDialog from "@/components/FoodItemDialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Index = () => {
  const { toast } = useToast();
  const [selectedCategory, setSelectedCategory] = useState("Popular");
  const [selectedFood, setSelectedFood] = useState<FoodItem | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  
  // Filter for popular items or by selected category
  const filteredItems = selectedCategory === "Popular" 
    ? mockFoodItems.filter(item => item.popular) 
    : selectedCategory === "All" 
      ? mockFoodItems
      : mockFoodItems.filter(item => item.category === selectedCategory);
  
  // Handler for food item clicks
  const handleFoodClick = (food: FoodItem) => {
    setSelectedFood(food);
    setIsDialogOpen(true);
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
        
        <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="mb-8">
          <div className="overflow-x-auto pb-2">
            <TabsList className="flex w-full border-b overflow-x-auto">
              {categories.slice(0, 8).map((category) => (
                <TabsTrigger 
                  key={category} 
                  value={category}
                  className="px-4 py-2"
                >
                  {category}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>
        </Tabs>
        
        <InfiniteFoodGrid 
          foodItems={filteredItems} 
          onFoodClick={handleFoodClick}
          pageSize={8}
        />
        
        <div className="flex justify-center mt-8">
          <Button 
            variant="outline" 
            className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
            onClick={() => window.location.href = "/restaurants"}
          >
            Explore All Restaurants
          </Button>
        </div>
      </div>
      
      {/* Food Item Dialog */}
      <FoodItemDialog 
        food={selectedFood} 
        isOpen={isDialogOpen} 
        onClose={() => setIsDialogOpen(false)}
      />
      
      <Footer />
    </div>
  );
};

export default Index;
