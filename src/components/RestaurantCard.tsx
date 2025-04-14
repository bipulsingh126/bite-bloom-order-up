
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Star, Clock, MapPin } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Restaurant } from '@/data/mockData';
import { Badge } from '@/components/ui/badge';

interface RestaurantCardProps {
  restaurant: Restaurant;
  onClick: () => void;
  className?: string;
}

const RestaurantCard: React.FC<RestaurantCardProps> = ({ restaurant, onClick, className }) => {
  return (
    <Card 
      onClick={onClick}
      className={cn(
        "overflow-hidden cursor-pointer transition-all duration-300 food-card-shadow border-0 hover:shadow-lg",
        className
      )}
    >
      <div className="relative">
        <img
          src={restaurant.image}
          alt={restaurant.name}
          className="w-full h-48 object-cover transition-transform duration-500 hover:scale-110"
        />
        <div className="absolute top-2 left-2 flex flex-col gap-2">
          {restaurant.featured && (
            <Badge className="bg-bitebloom-500 text-white border-0">
              Featured
            </Badge>
          )}
        </div>
        {restaurant.popular && (
          <Badge className="absolute top-2 right-2 bg-secondary text-white border-0">
            Popular
          </Badge>
        )}
      </div>
      <CardContent className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-semibold text-lg text-foreground">{restaurant.name}</h3>
          <div className="flex items-center">
            <Star className="h-4 w-4 text-yellow-400 fill-yellow-400 mr-1" />
            <span className="text-sm font-medium">{restaurant.rating}</span>
          </div>
        </div>
        <p className="text-sm text-muted-foreground line-clamp-2 h-10 mb-3">
          {restaurant.description}
        </p>
        <div className="flex justify-between items-center text-sm mb-2">
          <span className="inline-block bg-muted px-2 py-1 rounded-full text-xs">
            {restaurant.cuisineType}
          </span>
          <div className="flex items-center text-muted-foreground">
            <Clock className="h-4 w-4 mr-1" />
            <span className="text-xs">{restaurant.minDeliveryTime}-{restaurant.maxDeliveryTime} min</span>
          </div>
        </div>
        <div className="mt-3 text-xs text-muted-foreground flex justify-between">
          <span>Delivery fee: ₹{(restaurant.deliveryFee * 75).toFixed(2)}</span>
          {restaurant.distance && (
            <span className="text-primary font-medium flex items-center">
              <MapPin className="h-3 w-3 mr-1" /> 
              {restaurant.distance.toFixed(1)} km away
            </span>
          )}
        </div>
        <div className="mt-3 flex items-center text-xs text-muted-foreground">
          <MapPin className="h-3 w-3 mr-1" />
          <span className="truncate">{restaurant.address}</span>
        </div>
      </CardContent>
    </Card>
  );
};

export default RestaurantCard;
