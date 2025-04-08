
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import RestaurantCard from '@/components/RestaurantCard';
import { Restaurant } from '@/data/mockData';
import { Button } from '@/components/ui/button';
import { Loader } from 'lucide-react';

interface InfiniteRestaurantGridProps {
  restaurants: Restaurant[];
  pageSize?: number;
}

const InfiniteRestaurantGrid: React.FC<InfiniteRestaurantGridProps> = ({ 
  restaurants,
  pageSize = 6 
}) => {
  const navigate = useNavigate();
  const [visibleRestaurants, setVisibleRestaurants] = useState<Restaurant[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    // Initialize with first page
    loadMore(1, true);
  }, [restaurants]);

  const loadMore = (page: number, reset: boolean = false) => {
    setLoading(true);
    
    // Simulate API fetch delay
    setTimeout(() => {
      const startIndex = reset ? 0 : (page - 1) * pageSize;
      const endIndex = page * pageSize;
      const newRestaurants = restaurants.slice(startIndex, endIndex);
      
      setVisibleRestaurants(prev => 
        reset ? newRestaurants : [...prev, ...newRestaurants]
      );
      
      setCurrentPage(page);
      setHasMore(endIndex < restaurants.length);
      setLoading(false);
    }, 800);
  };

  const handleLoadMore = () => {
    if (!loading && hasMore) {
      loadMore(currentPage + 1);
    }
  };

  const handleRestaurantClick = (id: string) => {
    navigate(`/restaurants/${id}`);
  };

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {visibleRestaurants.map(restaurant => (
          <RestaurantCard
            key={restaurant.id}
            restaurant={restaurant}
            onClick={() => handleRestaurantClick(restaurant.id)}
          />
        ))}
      </div>
      
      {loading && (
        <div className="flex justify-center py-8">
          <div className="flex items-center gap-2">
            <Loader className="h-5 w-5 animate-spin" />
            <span>Loading restaurants...</span>
          </div>
        </div>
      )}
      
      {hasMore && !loading && (
        <div className="flex justify-center py-4">
          <Button onClick={handleLoadMore} variant="outline" className="min-w-[200px]">
            Load More
          </Button>
        </div>
      )}
      
      {!hasMore && visibleRestaurants.length > 0 && (
        <div className="text-center text-muted-foreground py-4">
          You've reached the end of the list
        </div>
      )}
    </div>
  );
};

export default InfiniteRestaurantGrid;
