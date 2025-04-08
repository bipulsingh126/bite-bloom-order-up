
import React from 'react';
import { Button } from '@/components/ui/button';
import { ChevronDown } from 'lucide-react';

const Hero: React.FC = () => {
  const scrollToFeatured = () => {
    const featuredSection = document.getElementById('featured-section');
    if (featuredSection) {
      featuredSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative h-[90vh] w-full bg-gradient-to-r from-bitebloom-100 to-bitebloom-50 overflow-hidden">
      {/* Background pattern */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10">
        <div className="absolute top-20 left-20 w-40 h-40 rounded-full bg-bitebloom-300"></div>
        <div className="absolute bottom-40 right-40 w-64 h-64 rounded-full bg-secondary"></div>
        <div className="absolute top-1/2 left-1/3 w-24 h-24 rounded-full bg-bitebloom-400"></div>
      </div>

      <div className="container mx-auto px-4 h-full flex flex-col md:flex-row items-center justify-center relative z-10">
        {/* Hero content */}
        <div className="md:w-1/2 text-center md:text-left pt-16 md:pt-0">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-foreground">
            <span className="text-primary">Delicious Food</span><br />
            Delivered to Your Door
          </h1>
          <p className="text-lg md:text-xl mb-8 text-muted-foreground max-w-lg">
            Discover the best food from top local restaurants and enjoy 
            quick delivery with our premium food delivery service.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center md:justify-start">
            <Button 
              size="lg" 
              className="bg-primary hover:bg-primary/90"
            >
              Order Now
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
            >
              View Restaurants
            </Button>
          </div>
        </div>

        {/* Hero image */}
        <div className="md:w-1/2 mt-10 md:mt-0 flex justify-center items-center">
          <div className="relative">
            <img 
              src="https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGZvb2QlMjBkZWxpdmVyeXxlbnwwfHwwfHx8MA%3D%3D" 
              alt="Food delivery" 
              className="rounded-3xl shadow-xl max-w-sm w-full animate-float"
            />
            <div className="absolute -bottom-5 -right-5 bg-white rounded-2xl shadow-lg p-4 animate-float" style={{animationDelay: '1s'}}>
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                  <span className="text-green-600 text-xl">✓</span>
                </div>
                <div className="ml-3">
                  <p className="text-sm font-semibold">Order Delivered</p>
                  <p className="text-xs text-muted-foreground">20 mins ago</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll down indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <Button 
          variant="ghost" 
          size="icon" 
          className="rounded-full animate-bounce"
          onClick={scrollToFeatured}
        >
          <ChevronDown />
        </Button>
      </div>
    </div>
  );
};

export default Hero;
