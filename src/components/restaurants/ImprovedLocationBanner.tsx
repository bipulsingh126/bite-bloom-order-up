import React, { useState, useEffect } from 'react';
import { MapPin, Search, X } from 'lucide-react';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription,
  Button,
  Input,
  Chip,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter
} from '@nextui-org/react';

// Indian cities data with areas
const indianCities = [
  {
    city: 'Mumbai',
    areas: ['Andheri', 'Bandra', 'Colaba', 'Juhu', 'Powai', 'Worli']
  },
  {
    city: 'Delhi',
    areas: ['Connaught Place', 'Hauz Khas', 'Lajpat Nagar', 'Saket', 'Vasant Kunj']
  },
  {
    city: 'Bangalore',
    areas: ['Indiranagar', 'Koramangala', 'HSR Layout', 'Whitefield', 'JP Nagar']
  },
  {
    city: 'Hyderabad',
    areas: ['Banjara Hills', 'Gachibowli', 'Jubilee Hills', 'Madhapur', 'Hitech City']
  },
  {
    city: 'Chennai',
    areas: ['T. Nagar', 'Adyar', 'Anna Nagar', 'Besant Nagar', 'Mylapore']
  },
  {
    city: 'Kolkata',
    areas: ['Park Street', 'Salt Lake', 'New Town', 'Ballygunge', 'Howrah']
  },
  {
    city: 'Pune',
    areas: ['Koregaon Park', 'Baner', 'Kothrud', 'Viman Nagar', 'Hinjewadi']
  }
];

const ImprovedLocationBanner: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCity, setSelectedCity] = useState('Mumbai');
  const [selectedArea, setSelectedArea] = useState('Andheri');
  const [filteredCities, setFilteredCities] = useState(indianCities);
  
  // Get stored location from localStorage on mount
  useEffect(() => {
    const storedCity = localStorage.getItem('selectedCity');
    const storedArea = localStorage.getItem('selectedArea');
    
    if (storedCity) setSelectedCity(storedCity);
    if (storedArea) setSelectedArea(storedArea);
  }, []);
  
  // Filter cities based on search term
  useEffect(() => {
    if (!searchTerm) {
      setFilteredCities(indianCities);
      return;
    }
    
    const lowercaseSearch = searchTerm.toLowerCase();
    
    const filtered = indianCities.filter(cityData => 
      cityData.city.toLowerCase().includes(lowercaseSearch) || 
      cityData.areas.some(area => area.toLowerCase().includes(lowercaseSearch))
    );
    
    setFilteredCities(filtered);
  }, [searchTerm]);
  
  // Save selected location and close modal
  const handleLocationSelect = (city: string, area: string) => {
    setSelectedCity(city);
    setSelectedArea(area);
    localStorage.setItem('selectedCity', city);
    localStorage.setItem('selectedArea', area);
    setIsOpen(false);
  };
  
  return (
    <>
      <div className="bg-white dark:bg-gray-800 mb-8 p-4 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm flex items-center gap-3">
        <div className="bg-gradient-to-r from-teal-500 to-blue-500 p-2 rounded-full">
          <MapPin className="h-5 w-5 text-white" />
        </div>
        <div className="flex-grow">
          <h3 className="font-medium">{selectedCity}, {selectedArea}</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Restaurants and delivery in your area
          </p>
        </div>
        <Button 
          color="primary" 
          variant="flat"
          size="sm"
          onClick={() => setIsOpen(true)}
          className="ml-auto"
        >
          Change Location
        </Button>
      </div>
      
      {/* Location Modal */}
      <Modal 
        isOpen={isOpen} 
        onOpenChange={setIsOpen}
        size="lg"
        scrollBehavior="inside"
      >
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1">
            <h2 className="text-xl font-bold">Select Your Location</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Choose your city and area to see restaurants near you
            </p>
          </ModalHeader>
          
          <ModalBody>
            {/* Search Input */}
            <div className="relative mb-4">
              <Input
                placeholder="Search for a city or area..."
                value={searchTerm}
                onValueChange={setSearchTerm}
                startContent={<Search className="h-4 w-4 text-gray-400" />}
                endContent={
                  searchTerm ? (
                    <Button 
                      isIconOnly 
                      size="sm" 
                      variant="light" 
                      onClick={() => setSearchTerm('')}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  ) : null
                }
                variant="bordered"
                className="w-full"
              />
            </div>
            
            {/* City and Area Selection */}
            <div className="space-y-6">
              {filteredCities.length > 0 ? (
                filteredCities.map((cityData) => (
                  <div key={cityData.city} className="space-y-2">
                    <h3 className="font-semibold text-lg">{cityData.city}</h3>
                    <div className="flex flex-wrap gap-2">
                      {cityData.areas.map((area) => (
                        <Chip
                          key={`${cityData.city}-${area}`}
                          variant={selectedCity === cityData.city && selectedArea === area ? "solid" : "bordered"}
                          color={selectedCity === cityData.city && selectedArea === area ? "primary" : "default"}
                          className="cursor-pointer"
                          onClick={() => handleLocationSelect(cityData.city, area)}
                        >
                          {area}
                        </Chip>
                      ))}
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-6">
                  <p className="text-gray-500 dark:text-gray-400">No locations found</p>
                </div>
              )}
            </div>
          </ModalBody>
          
          <ModalFooter>
            <Button variant="bordered" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ImprovedLocationBanner; 