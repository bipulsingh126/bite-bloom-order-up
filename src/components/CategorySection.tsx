import React from 'react';
import { 
  Card, 
  CardBody, 
  CardFooter, 
  Button,
  Image
} from '@nextui-org/react';
import { Link } from 'react-router-dom';

const categories = [
  {
    name: "Burgers",
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YnVyZ2VyfGVufDB8fDB8fHww",
    count: 24,
    color: "from-orange-500 to-red-500",
    path: "/restaurants?category=Burgers"
  },
  {
    name: "Pizza",
    image: "https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8cGl6emF8ZW58MHx8MHx8fDA%3D",
    count: 18,
    color: "from-red-500 to-pink-500",
    path: "/restaurants?category=Pizza"
  },
  {
    name: "Asian",
    image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Zm9vZHxlbnwwfHwwfHx8MA%3D%3D",
    count: 32,
    color: "from-teal-500 to-cyan-500",
    path: "/restaurants?category=Asian"
  },
  {
    name: "Dessert",
    image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y2hvY29sYXRlJTIwY2FrZXxlbnwwfHwwfHx8MA%3D%3D",
    count: 15,
    color: "from-purple-500 to-indigo-500",
    path: "/restaurants?category=Dessert"
  }
];

export default function CategorySection() {
  return (
    <section className="py-20 bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-950">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-teal-500 to-blue-500 inline-block">
            Popular Categories
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mt-4 max-w-2xl mx-auto">
            Explore our most popular food categories and discover new flavors from restaurants around you.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">
          {categories.map((category, index) => (
            <Card 
              key={index}
              isHoverable
              className="border-none overflow-hidden shadow-lg cursor-pointer"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-30 z-0`} />
              
              <CardBody className="p-0 overflow-hidden">
                <div className="relative overflow-hidden aspect-square">
                  <Image
                    removeWrapper
                    alt={category.name}
                    className="object-cover w-full h-full z-0 transform hover:scale-110 transition-transform duration-700"
                    src={category.image}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                </div>
              </CardBody>
              
              <CardFooter className="absolute bottom-0 z-10 flex-col items-start p-4 w-full">
                <h3 className="text-white font-bold text-2xl mb-1">{category.name}</h3>
                <p className="text-white/80 text-sm mb-3">{category.count} Restaurants</p>
                <Link to={category.path}>
                  <Button 
                    radius="full" 
                    size="sm" 
                    className="bg-white/20 backdrop-blur-md text-white border-white/30 border"
                    variant="bordered"
                  >
                    Explore
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
} 