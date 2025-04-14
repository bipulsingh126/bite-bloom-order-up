
import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { SlidersHorizontal } from 'lucide-react';

const MobileFilters: React.FC = () => {
  return (
    <Accordion type="single" collapsible className="md:hidden mb-6">
      <AccordionItem value="filters">
        <AccordionTrigger className="flex items-center gap-2">
          <SlidersHorizontal className="h-4 w-4" />
          <span>Additional Filters</span>
        </AccordionTrigger>
        <AccordionContent>
          <div className="space-y-4">
            <div>
              <h4 className="font-medium mb-2">Dietary</h4>
              <div className="flex flex-wrap gap-2">
                <div className="flex items-center gap-1.5">
                  <input type="checkbox" id="vegan" className="rounded" />
                  <label htmlFor="vegan">Vegan</label>
                </div>
                <div className="flex items-center gap-1.5">
                  <input type="checkbox" id="vegetarian" className="rounded" />
                  <label htmlFor="vegetarian">Vegetarian</label>
                </div>
                <div className="flex items-center gap-1.5">
                  <input type="checkbox" id="gluten" className="rounded" />
                  <label htmlFor="gluten">Gluten free</label>
                </div>
              </div>
            </div>
            <div>
              <h4 className="font-medium mb-2">Price Range</h4>
              <div className="flex flex-wrap gap-2">
                <div className="flex items-center gap-1.5">
                  <input type="checkbox" id="price1" className="rounded" />
                  <label htmlFor="price1">$</label>
                </div>
                <div className="flex items-center gap-1.5">
                  <input type="checkbox" id="price2" className="rounded" />
                  <label htmlFor="price2">$$</label>
                </div>
                <div className="flex items-center gap-1.5">
                  <input type="checkbox" id="price3" className="rounded" />
                  <label htmlFor="price3">$$$</label>
                </div>
              </div>
            </div>
            <div>
              <h4 className="font-medium mb-2">Distance</h4>
              <div className="flex flex-wrap gap-2">
                <div className="flex items-center gap-1.5">
                  <input type="checkbox" id="dist1" className="rounded" />
                  <label htmlFor="dist1">Under 1 km</label>
                </div>
                <div className="flex items-center gap-1.5">
                  <input type="checkbox" id="dist2" className="rounded" />
                  <label htmlFor="dist2">1-3 km</label>
                </div>
                <div className="flex items-center gap-1.5">
                  <input type="checkbox" id="dist3" className="rounded" />
                  <label htmlFor="dist3">3+ km</label>
                </div>
              </div>
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default MobileFilters;
