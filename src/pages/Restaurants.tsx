import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import CartDrawer from '@/components/CartDrawer';
import { mockRestaurants } from '@/data/mockData';
import SearchBar from '@/components/restaurants/SearchBar';
import FilterBar from '@/components/restaurants/FilterBar';
import MobileFilters from '@/components/restaurants/MobileFilters';
import ImprovedLocationBanner from '@/components/restaurants/ImprovedLocationBanner';
import RestaurantListSection from '@/components/restaurants/RestaurantListSection';

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
        <h1 className="text-3xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-teal-500 to-blue-500">Restaurants</h1>
        <p className="text-gray-600 dark:text-gray-300 mb-6">Discover the best food from top restaurants in your area</p>
        
        {/* Location Banner */}
        <ImprovedLocationBanner />
        
        {/* Search and Filter Bar */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          <FilterBar 
            cuisineFilter={cuisineFilter}
            setCuisineFilter={setCuisineFilter}
            locationFilter={locationFilter}
            setLocationFilter={setLocationFilter}
            sortBy={sortBy}
            setSortBy={setSortBy}
            cuisineTypes={cuisineTypes}
            locationAreas={locationAreas}
          />
        </div>
        
        {/* Mobile Filters */}
        <MobileFilters />
        
        {/* Restaurant Cards with Infinite Scroll */}
        <RestaurantListSection filteredRestaurants={filteredRestaurants} />
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
