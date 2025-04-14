
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import CartDrawer from '@/components/CartDrawer';
import InfiniteRestaurantGrid from '@/components/InfiniteRestaurantGrid';
import { mockRestaurants } from '@/data/mockData';
import { Search, SlidersHorizontal, MapPin } from 'lucide-react';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

const Restaurants = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [cuisineFilter, setCuisineFilter] = useState('');
  const [sortBy, setSortBy] = useState('rating');
  const [locationFilter, setLocationFilter] = useState('');
  
  // Extract unique cuisine types for filter
  const cuisineTypes = ['All', ...Array.from(new Set(mockRestaurants.map(r => r.cuisineType)))];

  // Extract location areas - in a real app these would be neighborhoods or districts
  const locationAreas = ['All', 'Downtown', 'Uptown', 'Midtown', 'Suburb'];
  
  // Filter and sort restaurants
  const filteredRestaurants = mockRestaurants
    .filter(restaurant => 
      (searchTerm ? restaurant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                   restaurant.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                   restaurant.address.toLowerCase().includes(searchTerm.toLowerCase()) : true) &&
      (cuisineFilter && cuisineFilter !== 'All' ? restaurant.cuisineType === cuisineFilter : true) &&
      (locationFilter && locationFilter !== 'All' ? restaurant.address.toLowerCase().includes(locationFilter.toLowerCase()) : true)
    )
    .sort((a, b) => {
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'delivery') return a.minDeliveryTime - b.minDeliveryTime;
      if (sortBy === 'price') return a.deliveryFee - b.deliveryFee;
      return 0;
    });

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 pt-24 pb-12">
        <h1 className="text-3xl font-bold mb-2">Restaurants</h1>
        <p className="text-muted-foreground mb-6">Discover the best restaurants in your area</p>
        
        {/* Search and Filter Bar */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-grow">
            <Input
              placeholder="Search restaurants or locations..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          </div>
          <div className="flex flex-col sm:flex-row gap-2">
            <Select value={cuisineFilter} onValueChange={setCuisineFilter}>
              <SelectTrigger className="w-full sm:w-[160px]">
                <SelectValue placeholder="Cuisine type" />
              </SelectTrigger>
              <SelectContent>
                {cuisineTypes.map(cuisine => (
                  <SelectItem key={cuisine} value={cuisine}>
                    {cuisine}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={locationFilter} onValueChange={setLocationFilter}>
              <SelectTrigger className="w-full sm:w-[160px]">
                <SelectValue placeholder="Location" />
              </SelectTrigger>
              <SelectContent>
                {locationAreas.map(area => (
                  <SelectItem key={area} value={area}>
                    {area}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-full sm:w-[160px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="rating">Top rated</SelectItem>
                <SelectItem value="delivery">Fastest delivery</SelectItem>
                <SelectItem value="price">Lowest delivery fee</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        {/* Mobile Filters */}
        <Accordion type="single" collapsible className="md:hidden mb-6">
          <AccordionItem value="filters">
            <AccordionTrigger className="flex items-center gap-2">
              <SlidersHorizontal className="h-4 w-4" />
              <span>Additional Filters</span>
            </AccordionTrigger>
            <AccordionContent>
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2">Dietary</h4>
                  <div className="flex flex-wrap gap-2">
                    <div className="flex items-center gap-1.5">
                      <input type="checkbox" id="vegan" className="rounded" />
                      <label htmlFor="vegan">Vegan</label>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <input type="checkbox" id="vegetarian" className="rounded" />
                      <label htmlFor="vegetarian">Vegetarian</label>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <input type="checkbox" id="gluten" className="rounded" />
                      <label htmlFor="gluten">Gluten free</label>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Price Range</h4>
                  <div className="flex flex-wrap gap-2">
                    <div className="flex items-center gap-1.5">
                      <input type="checkbox" id="price1" className="rounded" />
                      <label htmlFor="price1">$</label>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <input type="checkbox" id="price2" className="rounded" />
                      <label htmlFor="price2">$$</label>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <input type="checkbox" id="price3" className="rounded" />
                      <label htmlFor="price3">$$$</label>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Distance</h4>
                  <div className="flex flex-wrap gap-2">
                    <div className="flex items-center gap-1.5">
                      <input type="checkbox" id="dist1" className="rounded" />
                      <label htmlFor="dist1">Under 1 km</label>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <input type="checkbox" id="dist2" className="rounded" />
                      <label htmlFor="dist2">1-3 km</label>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <input type="checkbox" id="dist3" className="rounded" />
                      <label htmlFor="dist3">3+ km</label>
                    </div>
                  </div>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        
        {/* Location Banner */}
        <div className="bg-card mb-8 p-4 rounded-lg border flex items-center gap-3">
          <div className="bg-primary/10 p-2 rounded-full">
            <MapPin className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h3 className="font-medium">Delivering to: Foodville, CA</h3>
            <p className="text-sm text-muted-foreground">Change location to see restaurants in other areas</p>
          </div>
          <button className="ml-auto text-sm font-medium text-primary hover:underline">
            Change
          </button>
        </div>
        
        {/* Restaurant Cards with Infinite Scroll */}
        {filteredRestaurants.length > 0 ? (
          <InfiniteRestaurantGrid restaurants={filteredRestaurants} pageSize={6} />
        ) : (
          <div className="py-12 text-center">
            <p className="text-lg text-muted-foreground">No restaurants found matching your criteria.</p>
            <p className="mt-2">Try adjusting your filters or search term.</p>
          </div>
        )}

        {/* Alternative Pagination (as a backup navigation option) */}
        <div className="mt-12">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious href="#" />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#" isActive>1</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">2</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">3</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
              <PaginationItem>
                <PaginationNext href="#" />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </div>

      {/* Simple Footer */}
      <footer className="bg-card py-8 px-4 mt-12">
        <div className="container mx-auto text-center text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} BiteBloom. All rights reserved.</p>
        </div>
      </footer>

      {/* Cart Drawer */}
      <CartDrawer />
    </div>
  );
};

export default Restaurants;
