import React, { useState, useEffect, useRef, useCallback } from 'react';
import FoodCard from '@/components/FoodCard';
import { FoodItem } from '@/data/mockData';
import { Button } from '@/components/ui/button';
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
      const startIndex = reset ? 0 : (page - 1) * pageSize;
      const endIndex = page * pageSize;
      const newItems = items.slice(startIndex, endIndex);
      
      setVisibleItems(prev => 
        reset ? newItems : [...prev, ...newItems]
      );
      
      setCurrentPage(page);
      setHasMore(endIndex < items.length);
      setLoading(false);
    }, 800);
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
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-0 top-0 h-full"
              onClick={() => setSearchTerm('')}
            >
              ✕
            </Button>
          )}
        </div>
        
        <div className="flex gap-2 ml-auto">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon" className="h-10 w-10">
                <SlidersHorizontal className="h-4 w-4" />
              </Button>
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
              <Button 
                variant="ghost" 
                className="w-full justify-start"
                onClick={clearFilters}
              >
                Clear Filters
              </Button>
            </DropdownMenuContent>
          </DropdownMenu>
          
          <Button 
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
          </Button>
        </div>
      </div>
      
      {/* Active filters display */}
      {(searchTerm || priceFilter !== null) && (
        <div className="flex flex-wrap gap-2 mb-4">
          {searchTerm && (
            <Badge variant="secondary" className="flex items-center gap-1">
              Search: {searchTerm}
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-4 w-4 ml-1" 
                onClick={() => setSearchTerm('')}
              >
                ✕
              </Button>
            </Badge>
          )}
          
          {priceFilter !== null && (
            <Badge variant="secondary" className="flex items-center gap-1">
              Price: Under ₹{priceFilter * 75}
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-4 w-4 ml-1" 
                onClick={() => setPriceFilter(null)}
              >
                ✕
              </Button>
            </Badge>
          )}
          
          <Button 
            variant="ghost" 
            size="sm" 
            className="text-xs" 
            onClick={clearFilters}
          >
            Clear All
          </Button>
        </div>
      )}

      {/* Item count indicator */}
      <div className="text-sm text-muted-foreground">
        Showing {visibleItems.length} of {filteredItems.length} items
      </div>

      {/* Food items grid/list view */}
      <div className={cn(
        viewMode === 'grid' 
          ? "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6" 
          : "flex flex-col gap-4"
      )}>
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
            <Button variant="link" onClick={clearFilters}>Clear filters</Button>
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
          <Button 
            onClick={handleLoadMore} 
            variant="outline" 
            className="min-w-[200px] group transition-all hover:bg-primary hover:text-primary-foreground"
          >
            <span className="mr-2 group-hover:translate-y-[-1px] transition-transform">Load More</span>
            <span className="group-hover:translate-y-[1px] transition-transform">↓</span>
          </Button>
        </div>
      )}
      
      {/* End of list indicator */}
      {!hasMore && visibleItems.length > 0 && (
        <div className="text-center text-muted-foreground py-4">
          <div className="mb-2">✨</div>
          You've reached the end of the list
        </div>
      )}
    </div>
  );
};

export default InfiniteFoodGrid;
