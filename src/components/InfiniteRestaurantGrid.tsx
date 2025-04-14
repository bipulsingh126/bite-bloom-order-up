import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import RestaurantCard from '@/components/RestaurantCard';
import { Restaurant } from '@/data/mockData';
import { Button as ShadcnButton } from '@/components/ui/button';
import { Loader } from 'lucide-react';
import { Button, Pagination } from '@nextui-org/react';

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
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Initialize with first page
    loadMore(1, true);
  }, [restaurants]);

  const loadMore = (page: number, reset: boolean = false) => {
    setLoading(true);
    
    // Simulate API fetch delay
    setTimeout(() => {
      const startIndex = (page - 1) * pageSize;
      const endIndex = page * pageSize;
      const newRestaurants = restaurants.slice(startIndex, endIndex);
      
      setVisibleRestaurants(prev => 
        reset ? newRestaurants : [...prev, ...newRestaurants]
      );
      
      setCurrentPage(page);
      setHasMore(endIndex < restaurants.length);
      setLoading(false);
    }, 500);
  };

  const handleLoadMore = () => {
    if (!loading && hasMore) {
      loadMore(currentPage + 1);
    }
  };

  // Handle next page navigation
  const handleNextPage = () => {
    if (hasMore && !loading) {
      const nextPage = currentPage + 1;
      setCurrentPage(nextPage);
      loadMore(nextPage, true);
      scrollToTop();
    }
  };

  // Handle previous page navigation
  const handlePrevPage = () => {
    if (currentPage > 1 && !loading) {
      const prevPage = currentPage - 1;
      setCurrentPage(prevPage);
      loadMore(prevPage, true);
      scrollToTop();
    }
  };

  // Handle direct page change from pagination component
  const handlePageChange = (page: number) => {
    if (page !== currentPage && !loading) {
      setCurrentPage(page);
      loadMore(page, true);
      scrollToTop();
    }
  };

  // Scroll to top of grid when changing pages
  const scrollToTop = () => {
    if (gridRef.current) {
      gridRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleRestaurantClick = (id: string) => {
    navigate(`/restaurants/${id}`);
  };

  // Calculate total pages
  const totalPages = Math.ceil(restaurants.length / pageSize);

  return (
    <div className="space-y-8">
      <div 
        ref={gridRef}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
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

      {/* Next/Previous Pagination Controls */}
      {restaurants.length > pageSize && (
        <div className="flex flex-col items-center justify-center mt-8 mb-6 gap-2">
          <Pagination
            total={totalPages}
            page={currentPage}
            onChange={handlePageChange}
            color="primary"
            radius="full"
            variant="bordered"
            showControls
            classNames={{
              item: "bg-gradient-to-b from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700",
              cursor: "bg-gradient-to-r from-teal-500 to-blue-500 text-white shadow-md font-bold",
            }}
            size="lg"
          />
          <div className="text-sm text-gray-500 dark:text-gray-400 mt-2">
            Showing {(currentPage - 1) * pageSize + 1} - {Math.min(currentPage * pageSize, restaurants.length)} of {restaurants.length} restaurants
          </div>
        </div>
      )}
      
      {/* Simple pagination for mobile */}
      {restaurants.length > pageSize && (
        <div className="md:hidden flex items-center justify-between mt-6 px-2">
          <Button
            onPress={handlePrevPage}
            isDisabled={currentPage <= 1 || loading}
            variant="flat"
            color="primary"
            size="sm"
            startContent={<span>←</span>}
          >
            Prev
          </Button>
          
          <span className="text-sm">
            {currentPage} / {totalPages}
          </span>
          
          <Button
            onPress={handleNextPage}
            isDisabled={!hasMore || loading}
            variant="flat"
            color="primary"
            size="sm"
            endContent={<span>→</span>}
          >
            Next
          </Button>
        </div>
      )}
      
      {/* Legacy Load More button */}
      {hasMore && !loading && (
        <div className="flex justify-center py-4">
          <ShadcnButton onClick={handleLoadMore} variant="outline" className="min-w-[200px]">
            Load More
          </ShadcnButton>
        </div>
      )}
      
      {!hasMore && visibleRestaurants.length > 0 && currentPage === totalPages && (
        <div className="text-center text-muted-foreground py-4">
          <div className="mb-2">✨</div>
          You've reached the end of the list
        </div>
      )}
    </div>
  );
};

export default InfiniteRestaurantGrid;
