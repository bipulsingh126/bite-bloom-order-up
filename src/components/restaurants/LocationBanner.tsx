
import React from 'react';
import { MapPin } from 'lucide-react';

const LocationBanner: React.FC = () => {
  return (
    <div className="bg-card mb-8 p-4 rounded-lg border flex items-center gap-3">
      <div className="bg-primary/10 p-2 rounded-full">
        <MapPin className="h-5 w-5 text-primary" />
      </div>
      <div>
        <h3 className="font-medium">Delivering to: Foodville, CA</h3>
        <p className="text-sm text-muted-foreground">Change location to see restaurants in other areas</p>
      </div>
      <button className="ml-auto text-sm font-medium text-primary hover:underline">
        Change
      </button>
    </div>
  );
};

export default LocationBanner;
