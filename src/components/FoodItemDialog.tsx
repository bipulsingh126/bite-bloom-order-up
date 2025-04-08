
import React, { useState } from 'react';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription,
  DialogFooter
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Clock, Minus, Plus, Star } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { FoodItem } from '@/data/mockData';
import { useCart } from '@/context/CartContext';

interface FoodItemDialogProps {
  food: FoodItem | null;
  isOpen: boolean;
  onClose: () => void;
}

const FoodItemDialog: React.FC<FoodItemDialogProps> = ({ food, isOpen, onClose }) => {
  const [quantity, setQuantity] = useState(1);
  const [selectedOptions, setSelectedOptions] = useState<{[key: string]: {id: string, name: string, price: number}[]}>(
    {}
  );
  const { addToCart } = useCart();

  if (!food) return null;

  const handleQuantityChange = (increment: number) => {
    const newQuantity = quantity + increment;
    if (newQuantity >= 1) {
      setQuantity(newQuantity);
    }
  };

  const handleSingleOptionChange = (categoryName: string, option: { id: string; name: string, price: number }) => {
    setSelectedOptions(prev => ({
      ...prev,
      [categoryName]: [option]
    }));
  };

  const handleMultipleOptionChange = (categoryName: string, option: { id: string; name: string, price: number }, isChecked: boolean) => {
    setSelectedOptions(prev => {
      const currentOptions = prev[categoryName] || [];
      
      if (isChecked) {
        // Add option if it doesn't exist
        return {
          ...prev,
          [categoryName]: [...currentOptions, option]
        };
      } else {
        // Remove option if it exists
        return {
          ...prev,
          [categoryName]: currentOptions.filter(opt => opt.id !== option.id)
        };
      }
    });
  };

  const calculateTotalPrice = () => {
    let optionsPrice = 0;
    
    Object.values(selectedOptions).forEach(options => {
      options.forEach(option => {
        optionsPrice += option.price;
      });
    });
    
    return ((food.price + optionsPrice) * quantity).toFixed(2);
  };

  const isOptionSelected = (categoryName: string, optionId: string) => {
    return selectedOptions[categoryName]?.some(option => option.id === optionId) || false;
  };

  const handleAddToCart = () => {
    addToCart(food, quantity, selectedOptions);
    setQuantity(1);
    setSelectedOptions({});
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px] max-h-[85vh] overflow-y-auto">
        <div className="relative w-full h-64 -mx-6 -mt-6 overflow-hidden">
          <img 
            src={food.image} 
            alt={food.name} 
            className="w-full h-full object-cover"
          />
          {food.popular && (
            <div className="absolute top-4 right-4 bg-secondary text-white text-xs font-medium px-2 py-1 rounded-full">
              Popular
            </div>
          )}
        </div>

        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">{food.name}</DialogTitle>
          <DialogDescription className="text-base">{food.description}</DialogDescription>
        </DialogHeader>

        <div className="flex justify-between items-center mt-2">
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
              <span className="text-sm">{food.prepTime}</span>
            </div>
          )}
        </div>

        <Separator className="my-4" />
        
        {/* Customization options */}
        {food.customizable && food.options && food.options.length > 0 && (
          <div className="space-y-6">
            {food.options.map((optionCategory, index) => (
              <div key={index}>
                <h4 className="font-medium mb-2">{optionCategory.name}</h4>
                {optionCategory.multiple ? (
                  <div className="space-y-2">
                    {optionCategory.choices.map((choice) => (
                      <div key={choice.id} className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Checkbox 
                            id={choice.id}
                            checked={isOptionSelected(optionCategory.name, choice.id)}
                            onCheckedChange={(checked) => 
                              handleMultipleOptionChange(
                                optionCategory.name, 
                                { id: choice.id, name: choice.name, price: choice.price },
                                checked as boolean
                              )
                            }
                          />
                          <Label htmlFor={choice.id} className="text-sm">
                            {choice.name}
                          </Label>
                        </div>
                        {choice.price > 0 && (
                          <span className="text-sm">+${choice.price.toFixed(2)}</span>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <RadioGroup 
                    defaultValue={selectedOptions[optionCategory.name]?.[0]?.id}
                    onValueChange={(value) => {
                      const selectedChoice = optionCategory.choices.find(c => c.id === value);
                      if (selectedChoice) {
                        handleSingleOptionChange(
                          optionCategory.name, 
                          { id: selectedChoice.id, name: selectedChoice.name, price: selectedChoice.price }
                        );
                      }
                    }}
                  >
                    {optionCategory.choices.map((choice) => (
                      <div key={choice.id} className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value={choice.id} id={choice.id} />
                          <Label htmlFor={choice.id} className="text-sm">
                            {choice.name}
                          </Label>
                        </div>
                        {choice.price > 0 && (
                          <span className="text-sm">+${choice.price.toFixed(2)}</span>
                        )}
                      </div>
                    ))}
                  </RadioGroup>
                )}
              </div>
            ))}
            <Separator />
          </div>
        )}

        <div className="mt-4 flex items-center justify-between">
          <div className="font-medium">Quantity</div>
          <div className="flex items-center">
            <Button 
              variant="outline" 
              size="icon" 
              className="h-8 w-8"
              onClick={() => handleQuantityChange(-1)}
            >
              <Minus size={16} />
            </Button>
            <span className="mx-4 w-6 text-center">{quantity}</span>
            <Button 
              variant="outline" 
              size="icon" 
              className="h-8 w-8"
              onClick={() => handleQuantityChange(1)}
            >
              <Plus size={16} />
            </Button>
          </div>
        </div>

        <DialogFooter className="mt-6">
          <Button onClick={handleAddToCart} className="w-full bg-primary hover:bg-primary/90">
            Add to Cart - ${calculateTotalPrice()}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default FoodItemDialog;
