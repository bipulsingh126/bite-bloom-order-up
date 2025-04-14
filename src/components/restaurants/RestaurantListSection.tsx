import React from 'react';
import { Restaurant } from '@/data/mockData';
import InfiniteRestaurantGrid from '@/components/InfiniteRestaurantGrid';

interface RestaurantListSectionProps {
  filteredRestaurants: Restaurant[];
}

const RestaurantListSection: React.FC<RestaurantListSectionProps> = ({ 
  filteredRestaurants 
}) => {
  return (
    <div className="space-y-8">
      {filteredRestaurants.length > 0 ? (
        <InfiniteRestaurantGrid restaurants={filteredRestaurants} pageSize={6} />
      ) : (
        <div className="py-12 text-center">
          <p className="text-lg text-muted-foreground">No restaurants found matching your criteria.</p>
          <p className="mt-2">Try adjusting your filters or search term.</p>
        </div>
      )}
    </div>
  );
};

export default RestaurantListSection;
