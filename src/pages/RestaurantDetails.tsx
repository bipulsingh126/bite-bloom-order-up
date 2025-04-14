
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import FoodItemDialog from '@/components/FoodItemDialog';
import InfiniteFoodGrid from '@/components/InfiniteFoodGrid';
import CartDrawer from '@/components/CartDrawer';
import LocationMap from '@/components/LocationMap';
import { Button } from '@/components/ui/button';
import { mockRestaurants, mockFoodItems, FoodItem, Restaurant } from '@/data/mockData';
import { Star, Clock, Navigation, Phone, IndianRupee, MapPin } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

// USD to INR conversion rate
const USD_TO_INR_RATE = 75;

const RestaurantDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [restaurant, setRestaurant] = useState<Restaurant | null>(null);
  const [restaurantFoods, setRestaurantFoods] = useState<FoodItem[]>([]);
  const [selectedFood, setSelectedFood] = useState<FoodItem | null>(null);
  const [isFoodDialogOpen, setIsFoodDialogOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string>('All');

  useEffect(() => {
    if (id) {
      const foundRestaurant = mockRestaurants.find(restaurant => restaurant.id === id);
      if (foundRestaurant) {
        setRestaurant(foundRestaurant);
        const foods = mockFoodItems.filter(food => food.restaurantId === id);
        setRestaurantFoods(foods);
      }
    }
  }, [id]);

  if (!restaurant) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 pt-24 pb-12 flex items-center justify-center">
          <p>Restaurant not found</p>
        </div>
      </div>
    );
  }

  const foodCategories = ['All', ...Array.from(new Set(restaurantFoods.map(food => food.category)))];
  
  const filteredFoods = activeCategory === 'All' 
    ? restaurantFoods 
    : restaurantFoods.filter(food => food.category === activeCategory);

  const handleFoodClick = (food: FoodItem) => {
    setSelectedFood(food);
    setIsFoodDialogOpen(true);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Restaurant Header */}
      <div className="relative pt-16">
        {/* Restaurant Cover Image */}
        <div className="w-full h-64 md:h-80 overflow-hidden">
          <img 
            src={restaurant.image} 
            alt={restaurant.name}
            className="w-full h-full object-cover gradient-mask-b-0"
          />
        </div>
        
        {/* Restaurant Info Card */}
        <div className="container mx-auto px-4">
          <div className="relative -mt-20 bg-card rounded-lg shadow-lg p-6 mb-8">
            <div className="md:flex md:items-center md:justify-between">
              <div>
                <h1 className="text-3xl font-bold mb-2">{restaurant.name}</h1>
                <p className="text-muted-foreground mb-4">{restaurant.description}</p>
                
                <div className="flex flex-wrap gap-4 mb-2">
                  <div className="flex items-center">
                    <Star className="h-5 w-5 text-yellow-400 fill-yellow-400 mr-1" />
                    <span className="font-medium">{restaurant.rating}</span>
                    <span className="text-muted-foreground ml-1">(200+ reviews)</span>
                  </div>
                  
                  <div className="flex items-center">
                    <Clock className="h-5 w-5 text-muted-foreground mr-1" />
                    <span>{restaurant.minDeliveryTime}-{restaurant.maxDeliveryTime} min</span>
                  </div>
                  
                  <div className="flex items-center">
                    <IndianRupee className="h-5 w-5 text-muted-foreground mr-1" />
                    <span>Delivery fee: ₹{(restaurant.deliveryFee * USD_TO_INR_RATE).toFixed(2)}</span>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <MapPin className="h-5 w-5 text-muted-foreground mr-1" />
                  <span className="text-muted-foreground">{restaurant.address}</span>
                </div>
              </div>
              
              <div className="flex mt-4 md:mt-0 space-x-3">
                <Button variant="outline" size="sm" className="flex items-center">
                  <Phone className="h-4 w-4 mr-2" />
                  <span>Call</span>
                </Button>
                <Button variant="outline" size="sm" className="flex items-center">
                  <Navigation className="h-4 w-4 mr-2" />
                  <span>Directions</span>
                </Button>
                <Button size="sm" className="flex items-center">
                  <span>View Menu</span>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Menu Section - Left 2/3 */}
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold mb-6">Menu</h2>
            
            <Tabs defaultValue="All" value={activeCategory} onValueChange={setActiveCategory}>
              <div className="overflow-x-auto">
                <TabsList className="mb-6 flex w-full border-b overflow-x-auto">
                  {foodCategories.map(category => (
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
              
              {filteredFoods.length > 0 ? (
                <InfiniteFoodGrid 
                  foodItems={filteredFoods} 
                  onFoodClick={handleFoodClick} 
                  pageSize={8}
                />
              ) : (
                <div className="text-center py-12">
                  <p className="text-lg text-muted-foreground">No items found in this category</p>
                </div>
              )}
            </Tabs>
          </div>
          
          {/* Location Map - Right 1/3 */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold mb-4">Location</h2>
            <LocationMap restaurant={restaurant} className="sticky top-24" />
          </div>
        </div>
      </div>
      
      {/* Food Detail Dialog */}
      <FoodItemDialog 
        food={selectedFood} 
        isOpen={isFoodDialogOpen} 
        onClose={() => setIsFoodDialogOpen(false)}
      />

      {/* Cart Drawer */}
      <CartDrawer />
      
      {/* Simple Footer */}
      <footer className="bg-card py-8 px-4 mt-12">
        <div className="container mx-auto text-center text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} BiteBloom. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default RestaurantDetails;
