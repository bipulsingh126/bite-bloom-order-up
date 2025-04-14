import React, { useState, useEffect, useRef, useCallback } from 'react';
import FoodCard from '@/components/FoodCard';
import { FoodItem } from '@/data/mockData';
import { Button as ShadcnButton } from '@/components/ui/button';
import { Loader, Grid, List, SlidersHorizontal } from 'lucide-react';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuCheckboxItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { cn } from '@/lib/utils';
import { Button, Pagination } from '@nextui-org/react';

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
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchTerm, setSearchTerm] = useState('');
  const [priceFilter, setPriceFilter] = useState<number | null>(null);
  const [filteredItems, setFilteredItems] = useState<FoodItem[]>([]);
  const observerTarget = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  // Apply filters when foodItems or filters change
  useEffect(() => {
    if (!foodItems || foodItems.length === 0) {
      setFilteredItems([]);
      setVisibleItems([]);
      setHasMore(false);
      return;
    }
    
    const filtered = foodItems.filter(item => {
      const matchesSearch = !searchTerm || 
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesPrice = priceFilter === null || item.price <= priceFilter;
      
      return matchesSearch && matchesPrice;
    });
    
    setFilteredItems(filtered);
    // Reset pagination when filters change
    setCurrentPage(1);
    loadMore(1, true, filtered);
    
    // Show feedback about filter results
    if (filtered.length === 0 && (searchTerm || priceFilter !== null)) {
      toast({
        title: "No results found",
        description: "Try adjusting your filters to see more items",
        variant: "destructive",
      });
    }
  }, [foodItems, searchTerm, priceFilter]);

  const loadMore = useCallback((page: number, reset: boolean = false, items = filteredItems) => {
    if (loading || (!hasMore && !reset)) return;
    
    if (!items || items.length === 0) {
      setVisibleItems([]);
      setHasMore(false);
      setLoading(false);
      return;
    }
    
    setLoading(true);
    
    // Simulate API fetch delay
    setTimeout(() => {
      const startIndex = (page - 1) * pageSize;
      const endIndex = page * pageSize;
      const newItems = items.slice(startIndex, endIndex);
      
      setVisibleItems(prev => 
        reset ? newItems : [...prev, ...newItems]
      );
      
      setCurrentPage(page);
      setHasMore(endIndex < items.length);
      setLoading(false);
    }, 500); // Reduced delay for better UX
  }, [filteredItems, loading, hasMore, pageSize]);

  // Initial load
  useEffect(() => {
    // Only initialize once foodItems are available
    if (foodItems && foodItems.length > 0) {
      // Initialize filtered items with all food items
      const initialFiltered = [...foodItems];
      setFilteredItems(initialFiltered);
      loadMore(1, true, initialFiltered);
    }
  }, [foodItems]);

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

  // Navigate to previous page
  const handlePrevPage = () => {
    if (currentPage > 1) {
      const newPage = currentPage - 1;
      setCurrentPage(newPage);
      loadMore(newPage, true);
    }
  };

  // Navigate to next page
  const handleNextPage = () => {
    if (hasMore) {
      const newPage = currentPage + 1;
      setCurrentPage(newPage);
      loadMore(newPage, true);
    }
  };

  // Clear all filters
  const clearFilters = () => {
    setSearchTerm('');
    setPriceFilter(null);
    toast({
      title: "Filters cleared",
      description: "Showing all available items"
    });
  };

  // Toggle view mode with animation feedback
  const toggleViewMode = () => {
    const newMode = viewMode === 'grid' ? 'list' : 'grid';
    setViewMode(newMode);
    toast({
      title: `${newMode.charAt(0).toUpperCase() + newMode.slice(1)} view activated`,
      description: `Switched to ${newMode} view mode`
    });
  };

  // Handle pagination change
  const handlePageChange = (page: number) => {
    if (page !== currentPage) {
      setCurrentPage(page);
      loadMore(page, true);
      
      // Scroll to top of the grid when page changes
      window.scrollTo({
        top: document.getElementById('food-grid-container')?.offsetTop || 0,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="space-y-8">
      {/* Filters and controls */}
      <div className="flex flex-col sm:flex-row items-center gap-3 mb-6 transition-all">
        <div className="relative w-full sm:max-w-xs">
          <Input
            placeholder="Search items..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-4 pr-10"
          />
          {searchTerm && (
            <ShadcnButton
              variant="ghost"
              size="icon"
              className="absolute right-0 top-0 h-full"
              onClick={() => setSearchTerm('')}
            >
              ✕
            </ShadcnButton>
          )}
        </div>
        
        <div className="flex gap-2 ml-auto">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <ShadcnButton variant="outline" size="icon" className="h-10 w-10">
                <SlidersHorizontal className="h-4 w-4" />
              </ShadcnButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>Price Range</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuCheckboxItem
                checked={priceFilter === 10}
                onCheckedChange={() => setPriceFilter(10)}
              >
                Under ₹750
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem 
                checked={priceFilter === 20}
                onCheckedChange={() => setPriceFilter(20)}
              >
                Under ₹1500
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={priceFilter === 30}
                onCheckedChange={() => setPriceFilter(30)}
              >
                Under ₹2250
              </DropdownMenuCheckboxItem>
              <DropdownMenuSeparator />
              <ShadcnButton 
                variant="ghost" 
                className="w-full justify-start"
                onClick={clearFilters}
              >
                Clear Filters
              </ShadcnButton>
            </DropdownMenuContent>
          </DropdownMenu>
          
          <ShadcnButton 
            variant="outline" 
            size="icon"
            className="h-10 w-10"
            onClick={toggleViewMode}
          >
            {viewMode === 'grid' ? (
              <List className="h-4 w-4" />
            ) : (
              <Grid className="h-4 w-4" />
            )}
          </ShadcnButton>
        </div>
      </div>
      
      {/* Active filters display */}
      {(searchTerm || priceFilter !== null) && (
        <div className="flex flex-wrap gap-2 mb-4">
          {searchTerm && (
            <Badge variant="secondary" className="flex items-center gap-1">
              Search: {searchTerm}
              <ShadcnButton 
                variant="ghost" 
                size="icon" 
                className="h-4 w-4 ml-1" 
                onClick={() => setSearchTerm('')}
              >
                ✕
              </ShadcnButton>
            </Badge>
          )}
          
          {priceFilter !== null && (
            <Badge variant="secondary" className="flex items-center gap-1">
              Price: Under ₹{priceFilter * 75}
              <ShadcnButton 
                variant="ghost" 
                size="icon" 
                className="h-4 w-4 ml-1" 
                onClick={() => setPriceFilter(null)}
              >
                ✕
              </ShadcnButton>
            </Badge>
          )}
          
          <ShadcnButton 
            variant="ghost" 
            size="sm" 
            className="text-xs" 
            onClick={clearFilters}
          >
            Clear All
          </ShadcnButton>
        </div>
      )}

      {/* Item count indicator */}
      <div className="text-sm text-muted-foreground">
        Showing {visibleItems.length} of {filteredItems.length} items
      </div>

      {/* Food items grid/list view */}
      <div 
        id="food-grid-container"
        className={cn(
          viewMode === 'grid' 
            ? "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6" 
            : "flex flex-col gap-4"
        )}
      >
        {visibleItems.length > 0 ? (
          visibleItems.map(food => (
            <FoodCard
              key={food.id}
              food={food}
              onClick={() => onFoodClick(food)}
              className={viewMode === 'list' ? "flex-row h-32 !overflow-visible" : ""}
            />
          ))
        ) : !loading ? (
          <div className="col-span-full py-12 text-center">
            <p className="text-lg text-muted-foreground">No items found</p>
            <ShadcnButton variant="link" onClick={clearFilters}>Clear filters</ShadcnButton>
          </div>
        ) : null}
      </div>
      
      {/* Loading indicator */}
      {loading && (
        <div className="flex justify-center py-8">
          <div className="flex items-center gap-2 animate-pulse">
            <Loader className="h-5 w-5 animate-spin" />
            <span>Loading delicious items...</span>
          </div>
        </div>
      )}
      
      {/* Observer target for infinite scroll */}
      <div ref={observerTarget} className="h-10 w-full" />
      
      {/* Load more button (displayed when there are more items to load) */}
      {hasMore && !loading && visibleItems.length > 0 && (
        <div className="flex justify-center py-4">
          <ShadcnButton 
            onClick={handleLoadMore} 
            variant="outline" 
            className="min-w-[200px] group transition-all hover:bg-primary hover:text-primary-foreground"
          >
            <span className="mr-2 group-hover:translate-y-[-1px] transition-transform">Load More</span>
            <span className="group-hover:translate-y-[1px] transition-transform">↓</span>
          </ShadcnButton>
        </div>
      )}
      
      {/* NextUI Pagination */}
      {visibleItems.length > 0 && filteredItems.length > pageSize && (
        <div className="flex flex-col items-center justify-center mt-8 mb-6 gap-2">
          <Pagination
            total={Math.ceil(filteredItems.length / pageSize)}
            initialPage={1}
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
            Showing {(currentPage - 1) * pageSize + 1} - {Math.min(currentPage * pageSize, filteredItems.length)} of {filteredItems.length} items
          </div>
        </div>
      )}
      
      {/* Simple pagination for mobile */}
      {visibleItems.length > 0 && filteredItems.length > pageSize && (
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
            {currentPage} / {Math.ceil(filteredItems.length / pageSize)}
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
      
      {/* End of list indicator */}
      {!hasMore && visibleItems.length > 0 && currentPage === Math.ceil(filteredItems.length / pageSize) && (
        <div className="text-center text-muted-foreground py-4">
          <div className="mb-2">✨</div>
          You've reached the end of the list
        </div>
      )}
    </div>
  );
};

export default InfiniteFoodGrid;
