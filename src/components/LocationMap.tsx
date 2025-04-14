
import React, { useEffect, useRef, useState } from 'react';
import { MapPin, Navigation, ZoomIn, ZoomOut, Locate } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';
import { Restaurant } from '@/data/mockData';
import { Button } from './ui/button';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

interface LocationMapProps {
  restaurant: Restaurant;
  className?: string;
}

const LocationMap: React.FC<LocationMapProps> = ({ restaurant, className }) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();
  const [zoom, setZoom] = useState(1);
  const [isMapLoaded, setIsMapLoaded] = useState(false);
  const [userLocation, setUserLocation] = useState<{lat: number, lng: number} | null>(null);
  const { toast } = useToast();
  
  // Calculate distance between two points
  const calculateDistance = (lat1: number, lng1: number, lat2: number, lng2: number): number => {
    const R = 6371; // Radius of earth in km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lng2 - lng1) * Math.PI / 180;
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
      Math.sin(dLon/2) * Math.sin(dLon/2); 
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    return R * c;
  };

  const getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation({ lat: latitude, lng: longitude });
          
          // Calculate distance between user and restaurant
          if (restaurant.location) {
            const distance = calculateDistance(
              latitude, 
              longitude, 
              restaurant.location.lat, 
              restaurant.location.lng
            );
            
            toast({
              title: "Location found",
              description: `You are approximately ${distance.toFixed(1)}km away from ${restaurant.name}`,
            });
          }
          
          renderMap();
        },
        (error) => {
          toast({
            variant: "destructive",
            title: "Location error",
            description: `Could not get your location: ${error.message}`,
          });
        }
      );
    } else {
      toast({
        variant: "destructive",
        title: "Geolocation not supported",
        description: "Your browser does not support geolocation",
      });
    }
  };
  
  const renderMap = () => {
    if (!mapRef.current || !restaurant.location) return;
    
    // Apply style based on theme
    const backgroundColor = theme === 'dark' ? '#202020' : '#e8e8e8';
    const textColor = theme === 'dark' ? '#ffffff' : '#000000';
    const pinColor = theme === 'dark' ? '#9b87f5' : '#7E69AB';
    const userPinColor = theme === 'dark' ? '#33C3F0' : '#0EA5E9';
    const gridColor = theme === 'dark' ? '#303030' : '#d0d0d0';
    const mapElement = mapRef.current;
    
    mapElement.style.backgroundColor = backgroundColor;
    mapElement.style.color = textColor;
    
    // Create a grid pattern for the map background
    const gridSize = 20 * zoom;
    const gridHTML = `
      <div class="absolute inset-0" style="
        background-image: linear-gradient(to right, ${gridColor} 1px, transparent 1px),
        linear-gradient(to bottom, ${gridColor} 1px, transparent 1px);
        background-size: ${gridSize}px ${gridSize}px;
      "></div>
    `;

    const lat = restaurant.location.lat;
    const lng = restaurant.location.lng;

    let userLocationHTML = '';
    if (userLocation) {
      // Calculate position on map for user
      const userLeft = 50 + (userLocation.lng * 2 * zoom);
      const userTop = 50 - (userLocation.lat * 2 * zoom);
      
      userLocationHTML = `
        <div class="absolute transform -translate-x-1/2 -translate-y-1/2" 
            style="left: ${userLeft}%; top: ${userTop}%;">
          <div class="flex flex-col items-center">
            <div class="text-[${userPinColor}] animate-pulse">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="1"/></svg>
            </div>
            <div class="absolute top-6 bg-card/80 p-1 rounded-lg shadow-lg whitespace-nowrap text-xs">
              Your location
            </div>
          </div>
        </div>
      `;
      
      // Draw line between user and restaurant
      const lineSVG = `
        <svg class="absolute inset-0 z-0 w-full h-full">
          <line 
            x1="${userLeft}%" y1="${userTop}%" 
            x2="${50 + (lng * 2 * zoom)}%" y2="${50 - (lat * 2 * zoom)}%" 
            stroke="${theme === 'dark' ? '#6E59A5' : '#D6BCFA'}" 
            stroke-width="2" 
            stroke-dasharray="5,5" />
        </svg>
      `;
      
      userLocationHTML += lineSVG;
    }

    mapElement.innerHTML = `
      ${gridHTML}
      <div class="flex items-center justify-center h-full relative">
        ${userLocationHTML}
        <div class="absolute transform -translate-x-1/2 -translate-y-1/2" style="left: ${50 + (lng * 2 * zoom)}%; top: ${50 - (lat * 2 * zoom)}%;">
          <div class="flex flex-col items-center">
            <div class="text-[${pinColor}] animate-bounce">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path><circle cx="12" cy="10" r="3"></circle></svg>
            </div>
            <div class="absolute top-12 bg-card p-2 rounded-lg shadow-lg whitespace-nowrap text-xs">
              <div class="font-medium">${restaurant.name}</div>
              <div class="opacity-80">${restaurant.address}</div>
            </div>
          </div>
        </div>
        <div class="absolute bottom-2 right-2 text-xs opacity-60 bg-card/50 px-2 py-1 rounded-md">
          Lat: ${lat.toFixed(4)}, Lng: ${lng.toFixed(4)}
        </div>
      </div>
    `;
    
    setIsMapLoaded(true);
  };

  useEffect(() => {
    renderMap();
  }, [restaurant, theme, zoom, userLocation]);

  const handleZoomIn = () => {
    setZoom(prev => Math.min(prev + 0.5, 4));
  };

  const handleZoomOut = () => {
    setZoom(prev => Math.max(prev - 0.5, 0.5));
  };

  return (
    <div className={cn(`border rounded-lg overflow-hidden shadow-sm transition-colors`, className)}>
      <div className="bg-card p-3 border-b flex items-center justify-between">
        <div className="flex items-center gap-2">
          <MapPin className="h-4 w-4 text-muted-foreground" />
          <h3 className="text-sm font-medium">Restaurant Location</h3>
        </div>
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={getUserLocation}
          className="flex items-center gap-1 h-8 px-2"
        >
          <Locate className="h-4 w-4" />
          <span className="text-xs">Find me</span>
        </Button>
      </div>
      <div className="relative">
        <div 
          ref={mapRef} 
          className="h-48 w-full bg-muted transition-colors relative"
        />
        
        {/* Map Controls */}
        <div className="absolute top-3 right-3 flex flex-col space-y-2 opacity-80">
          <Button variant="secondary" size="icon" onClick={handleZoomIn} className="h-8 w-8 rounded-md bg-card shadow-md">
            <ZoomIn className="h-4 w-4" />
          </Button>
          <Button variant="secondary" size="icon" onClick={handleZoomOut} className="h-8 w-8 rounded-md bg-card shadow-md">
            <ZoomOut className="h-4 w-4" />
          </Button>
        </div>
        
        {!isMapLoaded && (
          <div className="absolute inset-0 flex items-center justify-center bg-muted/50">
            <div className="animate-spin h-6 w-6 border-2 border-primary border-t-transparent rounded-full"></div>
          </div>
        )}
      </div>
      <div className="p-3 flex items-center justify-between bg-card">
        <span className="text-sm text-muted-foreground truncate">{restaurant.address}</span>
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => {
            // Google Maps URL for directions
            const mapUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(restaurant.address)}`;
            window.open(mapUrl, '_blank');
          }}
          className="text-primary hover:bg-primary/10 px-2 py-1 h-auto flex items-center gap-1"
        >
          <Navigation className="h-3 w-3" />
          <span className="text-sm">Get Directions</span>
        </Button>
      </div>
    </div>
  );
};

export default LocationMap;
