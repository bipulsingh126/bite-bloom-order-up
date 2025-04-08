
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import FoodCard from '@/components/FoodCard';
import RestaurantCard from '@/components/RestaurantCard';
import CartDrawer from '@/components/CartDrawer';
import FoodItemDialog from '@/components/FoodItemDialog';
import { Button } from '@/components/ui/button';
import { mockFoodItems, mockRestaurants, categories, FoodItem, Restaurant } from '@/data/mockData';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const Index = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedFood, setSelectedFood] = useState<FoodItem | null>(null);
  const [isFoodDialogOpen, setIsFoodDialogOpen] = useState(false);
  
  const popularFood = mockFoodItems.filter(item => item.popular);
  const featuredRestaurants = mockRestaurants.filter(restaurant => restaurant.featured);

  const handleFoodClick = (food: FoodItem) => {
    setSelectedFood(food);
    setIsFoodDialogOpen(true);
  };

  const handleRestaurantClick = (restaurant: Restaurant) => {
    navigate(`/restaurants/${restaurant.id}`);
  };

  const handleCloseFoodDialog = () => {
    setIsFoodDialogOpen(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Hero />

      {/* Featured Restaurants Section */}
      <section className="py-16 px-4" id="featured-section">
        <div className="container mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold">Featured Restaurants</h2>
            <Button variant="outline" onClick={() => navigate('/restaurants')}>
              See All
            </Button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredRestaurants.map(restaurant => (
              <RestaurantCard
                key={restaurant.id}
                restaurant={restaurant}
                onClick={() => handleRestaurantClick(restaurant)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Popular Food Section */}
      <section className="py-16 px-4 bg-muted/50">
        <div className="container mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold">Popular Items</h2>
            <Button variant="outline">See All</Button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {popularFood.map(food => (
              <FoodCard
                key={food.id}
                food={food}
                onClick={() => handleFoodClick(food)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold mb-8">Explore by Category</h2>
          
          <Tabs defaultValue="All" className="w-full">
            <TabsList className="mb-8 flex flex-wrap h-auto overflow-auto">
              {categories.map(category => (
                <TabsTrigger 
                  key={category} 
                  value={category}
                  className="px-4 py-2"
                >
                  {category}
                </TabsTrigger>
              ))}
            </TabsList>
            
            {categories.map(category => (
              <TabsContent key={category} value={category} className="mt-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {mockFoodItems
                    .filter(food => 
                      category === 'All' ? true : 
                      category === 'Popular' ? food.popular :
                      mockRestaurants.find(r => r.id === food.restaurantId)?.cuisineType === category
                    )
                    .map(food => (
                      <FoodCard
                        key={food.id}
                        food={food}
                        onClick={() => handleFoodClick(food)}
                      />
                    ))
                  }
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-bitebloom-50 to-bitebloom-100">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center text-center">
              <div className="w-20 h-20 rounded-full bg-bitebloom-500 text-white flex items-center justify-center text-2xl font-bold mb-4">
                1
              </div>
              <h3 className="text-xl font-semibold mb-2">Choose Your Food</h3>
              <p className="text-muted-foreground">
                Browse through our extensive menu of delicious options from top restaurants in your area.
              </p>
            </div>
            
            <div className="flex flex-col items-center text-center">
              <div className="w-20 h-20 rounded-full bg-bitebloom-500 text-white flex items-center justify-center text-2xl font-bold mb-4">
                2
              </div>
              <h3 className="text-xl font-semibold mb-2">Place Your Order</h3>
              <p className="text-muted-foreground">
                Customize your meal, add it to your cart, and checkout with our secure payment options.
              </p>
            </div>
            
            <div className="flex flex-col items-center text-center">
              <div className="w-20 h-20 rounded-full bg-bitebloom-500 text-white flex items-center justify-center text-2xl font-bold mb-4">
                3
              </div>
              <h3 className="text-xl font-semibold mb-2">Enjoy Your Delivery</h3>
              <p className="text-muted-foreground">
                Track your order in real-time and enjoy your delicious meal delivered right to your doorstep.
              </p>
            </div>
          </div>
          
          <div className="text-center mt-12">
            <Button size="lg" className="bg-primary hover:bg-primary/90">
              Order Now
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card py-10 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="text-2xl font-bold mb-4">
                Bite<span className="text-primary">Bloom</span>
              </div>
              <p className="text-muted-foreground">
                Connecting hungry customers with their favorite local restaurants.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li><a href="/" className="text-muted-foreground hover:text-primary">Home</a></li>
                <li><a href="/restaurants" className="text-muted-foreground hover:text-primary">Restaurants</a></li>
                <li><a href="/about" className="text-muted-foreground hover:text-primary">About</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Get Help</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-muted-foreground hover:text-primary">FAQs</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-primary">Delivery Info</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-primary">Contact Us</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Download Our App</h4>
              <p className="text-muted-foreground mb-4">
                Get the full BiteBloom experience on your phone.
              </p>
              <div className="flex space-x-2">
                <Button variant="outline">App Store</Button>
                <Button variant="outline">Google Play</Button>
              </div>
            </div>
          </div>
          
          <div className="border-t border-border mt-8 pt-8 text-center text-muted-foreground">
            <p>&copy; {new Date().getFullYear()} BiteBloom. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Food Detail Dialog */}
      <FoodItemDialog 
        food={selectedFood} 
        isOpen={isFoodDialogOpen} 
        onClose={handleCloseFoodDialog}
      />

      {/* Cart Drawer */}
      <CartDrawer />
    </div>
  );
};

export default Index;
