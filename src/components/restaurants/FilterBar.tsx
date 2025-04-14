
import React from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface FilterBarProps {
  cuisineFilter: string;
  setCuisineFilter: (value: string) => void;
  locationFilter: string;
  setLocationFilter: (value: string) => void;
  sortBy: string;
  setSortBy: (value: string) => void;
  cuisineTypes: string[];
  locationAreas: string[];
}

const FilterBar: React.FC<FilterBarProps> = ({
  cuisineFilter,
  setCuisineFilter,
  locationFilter,
  setLocationFilter,
  sortBy,
  setSortBy,
  cuisineTypes,
  locationAreas,
}) => {
  return (
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
  );
};

export default FilterBar;
