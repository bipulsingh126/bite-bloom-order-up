import React from 'react';
import { Button, Card, CardBody, Chip, Image } from '@nextui-org/react';
import { ChevronDown } from 'lucide-react';

const Hero: React.FC = () => {
  const scrollToFeatured = () => {
    const featuredSection = document.getElementById('featured-section');
    if (featuredSection) {
      featuredSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative min-h-[90vh] w-full bg-gradient-to-r from-[#ecfdf5] to-[#e0f2fe] dark:from-[#071f2c] dark:to-[#0c1f2c] overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-20 left-[10%] w-32 h-32 rounded-full bg-teal-200/40 dark:bg-teal-900/30 blur-xl animate-float"></div>
        <div className="absolute bottom-40 right-[15%] w-64 h-64 rounded-full bg-blue-200/30 dark:bg-blue-900/20 blur-xl" style={{animationDelay: '1s'}}></div>
        <div className="absolute top-1/3 left-1/3 w-20 h-20 rounded-full bg-teal-300/20 dark:bg-teal-800/20 blur-lg" style={{animationDelay: '2s'}}></div>
      </div>

      <div className="container mx-auto px-4 py-12 h-full flex flex-col lg:flex-row items-center justify-center relative z-10">
        {/* Hero content */}
        <div className="lg:w-1/2 text-center lg:text-left pt-8 lg:pt-0 order-2 lg:order-1">
          <Chip color="success" variant="shadow" className="mb-4">
            New in your area
          </Chip>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-teal-500 to-blue-500 dark:from-teal-400 dark:to-blue-400">
            Delicious Food,
            <br />
            Delivered in Minutes
          </h1>
          
          <p className="text-lg md:text-xl mb-8 text-gray-600 dark:text-gray-300 max-w-lg mx-auto lg:mx-0">
            From local favorites to gourmet experiences, discover the best food your city has to offer, with lightning-fast delivery.
          </p>

          <div className="flex flex-wrap gap-4 justify-center lg:justify-start mb-8">
            <Button 
              size="lg" 
              color="primary"
              radius="full"
              className="font-medium text-white bg-gradient-to-r from-teal-500 to-teal-600 shadow-lg hover:shadow-teal-300/20"
            >
              Order Now
            </Button>
            <Button 
              variant="bordered" 
              size="lg"
              radius="full"
              className="font-medium border-teal-500 text-teal-500"
            >
              View Restaurants
            </Button>
          </div>

          <Card className="w-full max-w-md mx-auto lg:mx-0 bg-white/60 dark:bg-black/40 backdrop-blur-md border-none shadow-lg">
            <CardBody>
              <div className="flex items-center gap-4">
                <div className="flex -space-x-4">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="w-10 h-10 rounded-full bg-gray-200 border-2 border-white overflow-hidden">
                      <img 
                        src={`https://i.pravatar.cc/150?img=${i + 10}`} 
                        alt="User avatar" 
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-800 dark:text-gray-200">Join 10,000+ happy customers</p>
                  <div className="flex items-center mt-1">
                    {Array(5).fill(0).map((_, i) => (
                      <svg key={i} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                      </svg>
                    ))}
                    <span className="ml-2 text-xs text-gray-600 dark:text-gray-400">4.9/5</span>
                  </div>
                </div>
              </div>
            </CardBody>
          </Card>
        </div>

        {/* Food Image (replacing 3D model temporarily) */}
        <div className="lg:w-1/2 order-1 lg:order-2 flex justify-center p-6">
          <div className="relative">
            <Image
              isBlurred
              width={500}
              src="https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=500&auto=format&fit=crop&q=80&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Delicious burger with delivery"
              className="rounded-xl object-cover shadow-xl animate-float"
            />
            <div className="absolute -bottom-5 -right-5 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm rounded-xl shadow-lg py-3 px-4 animate-float" style={{animationDelay: '1s'}}>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20 6L9 17L4 12" stroke="#10B981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-medium">Order Delivered</p>
                  <p className="text-xs text-gray-500">20 mins ago</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll down indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <Button 
          isIconOnly
          variant="light" 
          className="rounded-full animate-bounce"
          aria-label="Scroll down"
          onClick={scrollToFeatured}
        >
          <ChevronDown />
        </Button>
      </div>
    </div>
  );
};

export default Hero;
