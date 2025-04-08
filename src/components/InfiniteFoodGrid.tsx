
import React, { useState, useEffect } from 'react';
import FoodCard from '@/components/FoodCard';
import { FoodItem } from '@/data/mockData';
import { Button } from '@/components/ui/button';
import { Loader } from 'lucide-react';

interface InfiniteFoodGridProps {
  foodItems: FoodItem[];
  onFoodClick: (food: FoodItem) => void;
  pageSize?: number;
}

const InfiniteFoodGrid: React.FC<InfiniteFoodGridProps> = ({ 
  foodItems,
  onFoodClick,
  pageSize = 8
}) => {
  const [visibleItems, setVisibleItems] = useState<FoodItem[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    // Initialize with first page
    loadMore(1, true);
  }, [foodItems]);

  const loadMore = (page: number, reset: boolean = false) => {
    setLoading(true);
    
    // Simulate API fetch delay
    setTimeout(() => {
      const startIndex = reset ? 0 : (page - 1) * pageSize;
      const endIndex = page * pageSize;
      const newItems = foodItems.slice(startIndex, endIndex);
      
      setVisibleItems(prev => 
        reset ? newItems : [...prev, ...newItems]
      );
      
      setCurrentPage(page);
      setHasMore(endIndex < foodItems.length);
      setLoading(false);
    }, 800);
  };

  const handleLoadMore = () => {
    if (!loading && hasMore) {
      loadMore(currentPage + 1);
    }
  };

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {visibleItems.map(food => (
          <FoodCard
            key={food.id}
            food={food}
            onClick={() => onFoodClick(food)}
          />
        ))}
      </div>
      
      {loading && (
        <div className="flex justify-center py-8">
          <div className="flex items-center gap-2">
            <Loader className="h-5 w-5 animate-spin" />
            <span>Loading items...</span>
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
      
      {!hasMore && visibleItems.length > 0 && (
        <div className="text-center text-muted-foreground py-4">
          You've reached the end of the list
        </div>
      )}
    </div>
  );
};

export default InfiniteFoodGrid;
