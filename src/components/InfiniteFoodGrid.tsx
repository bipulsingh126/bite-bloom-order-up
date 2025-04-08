
import React, { useState, useEffect, useRef, useCallback } from 'react';
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
  const observerTarget = useRef<HTMLDivElement>(null);

  const loadMore = useCallback((page: number, reset: boolean = false) => {
    if (loading || (!hasMore && !reset)) return;
    
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
  }, [foodItems, loading, hasMore, pageSize]);

  // Initial load
  useEffect(() => {
    // Initialize with first page
    loadMore(1, true);
  }, [foodItems, loadMore]);

  // Set up intersection observer for infinite scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !loading) {
          loadMore(currentPage + 1);
        }
      },
      { threshold: 0.1 }
    );

    const currentTarget = observerTarget.current;
    if (currentTarget) {
      observer.observe(currentTarget);
    }

    return () => {
      if (currentTarget) {
        observer.unobserve(currentTarget);
      }
    };
  }, [loadMore, currentPage, hasMore, loading]);

  // Manual load more button handler (as backup)
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
      
      {/* Observer target for infinite scroll */}
      <div ref={observerTarget} className="h-10 w-full" />
      
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
