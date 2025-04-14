
import React, { useEffect, useRef } from 'react';
import { MapPin, Navigation } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';
import { Restaurant } from '@/data/mockData';

interface LocationMapProps {
  restaurant: Restaurant;
  className?: string;
}

const LocationMap: React.FC<LocationMapProps> = ({ restaurant, className }) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();
  
  useEffect(() => {
    if (!mapRef.current || !restaurant.location) return;
    
    // In a real app, this would be replaced with an actual map implementation
    // Using a placeholder static map for this example
    const mapElement = mapRef.current;
    
    // Apply style based on theme
    const backgroundColor = theme === 'dark' ? '#202020' : '#e8e8e8';
    const textColor = theme === 'dark' ? '#ffffff' : '#000000';
    const pinColor = theme === 'dark' ? '#8B5CF6' : '#6D28D9';
    
    mapElement.style.backgroundColor = backgroundColor;
    mapElement.style.color = textColor;
    
    mapElement.innerHTML = `
      <div class="flex items-center justify-center h-full">
        <div class="text-center">
          <div class="flex justify-center mb-2">
            <div class="text-[${pinColor}]">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="animate-bounce"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path><circle cx="12" cy="10" r="3"></circle></svg>
            </div>
          </div>
          <div class="font-medium">${restaurant.name}</div>
          <div class="text-sm opacity-80">${restaurant.address}</div>
          <div class="mt-2 text-xs opacity-60">Lat: ${restaurant.location.lat.toFixed(4)}, Lng: ${restaurant.location.lng.toFixed(4)}</div>
        </div>
      </div>
    `;
    
  }, [restaurant, theme]);

  return (
    <div className={`border rounded-lg overflow-hidden shadow-sm transition-colors ${className}`}>
      <div className="bg-card p-3 border-b flex items-center gap-2">
        <MapPin className="h-4 w-4 text-muted-foreground" />
        <h3 className="text-sm font-medium">Restaurant Location</h3>
      </div>
      <div 
        ref={mapRef} 
        className="h-48 w-full bg-muted transition-colors"
      />
      <div className="p-3 flex items-center justify-between bg-card">
        <span className="text-sm text-muted-foreground">{restaurant.address}</span>
        <button className="flex items-center gap-1 text-sm font-medium text-primary hover:underline">
          <Navigation className="h-3 w-3" />
          <span>Get Directions</span>
        </button>
      </div>
    </div>
  );
};

export default LocationMap;
