
import React from 'react';
import { Restaurant } from '@/data/mockData';
import InfiniteRestaurantGrid from '@/components/InfiniteRestaurantGrid';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

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
  );
};

export default RestaurantListSection;
