
import React from 'react';
import { Clock, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { FoodItem } from '@/data/mockData';

interface FoodCardProps {
  food: FoodItem;
  onClick: () => void;
  className?: string;
}

const FoodCard: React.FC<FoodCardProps> = ({ food, onClick, className }) => {
  return (
    <Card 
      className={cn(
        "overflow-hidden transition-all duration-300 cursor-pointer food-card-shadow border-0",
        className
      )} 
      onClick={onClick}
    >
      <div className="aspect-w-16 aspect-h-12 overflow-hidden">
        <img
          src={food.image}
          alt={food.name}
          className="w-full h-48 object-cover transition-transform duration-500 hover:scale-110"
        />
        {food.popular && (
          <div className="absolute top-2 right-2 bg-secondary text-white text-xs font-medium px-2 py-1 rounded-full">
            Popular
          </div>
        )}
      </div>
      <CardContent className="p-4">
        <h3 className="font-semibold text-lg mb-1 text-foreground truncate">{food.name}</h3>
        <p className="text-muted-foreground text-sm line-clamp-2 h-10 mb-2">
          {food.description}
        </p>
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            {food.rating && (
              <div className="flex items-center">
                <Star className="h-4 w-4 text-yellow-400 fill-yellow-400 mr-1" />
                <span className="text-sm font-medium">{food.rating}</span>
              </div>
            )}
          </div>
          {food.prepTime && (
            <div className="flex items-center text-muted-foreground">
              <Clock className="h-4 w-4 mr-1" />
              <span className="text-xs">{food.prepTime}</span>
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter className="px-4 pt-0 pb-4 flex justify-between items-center">
        <span className="font-bold text-lg">${food.price.toFixed(2)}</span>
        <Button variant="outline" size="sm" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
};

export default FoodCard;
