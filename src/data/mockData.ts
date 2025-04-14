
export interface FoodItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  restaurantId: string;
  popular?: boolean;
  rating?: number;
  prepTime?: string;
  customizable?: boolean;
  options?: {
    name: string;
    choices: { id: string; name: string; price: number }[];
    multiple?: boolean;
  }[];
}

export interface Restaurant {
  id: string;
  name: string;
  image: string;
  description: string;
  rating: number;
  cuisineType: string;
  deliveryFee: number;
  minDeliveryTime: number;
  maxDeliveryTime: number;
  address: string;
  location: {
    lat: number;
    lng: number;
  };
  popular?: boolean;
  featured?: boolean;
  distance?: number; // distance from user in km
}

export const mockFoodItems: FoodItem[] = [
  {
    id: "food1",
    name: "Classic Cheeseburger",
    description: "Juicy beef patty with melted cheese, lettuce, tomato, and special sauce on a toasted bun.",
    price: 12.99,
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YnVyZ2VyfGVufDB8fDB8fHww",
    category: "Burgers",
    restaurantId: "rest1",
    popular: true,
    rating: 4.7,
    prepTime: "15-20 min",
    customizable: true,
    options: [
      {
        name: "Extras",
        choices: [
          { id: "extra1", name: "Bacon", price: 1.99 },
          { id: "extra2", name: "Extra Cheese", price: 0.99 },
          { id: "extra3", name: "Avocado", price: 1.49 }
        ],
        multiple: true
      },
      {
        name: "Sides",
        choices: [
          { id: "side1", name: "French Fries", price: 2.99 },
          { id: "side2", name: "Onion Rings", price: 3.49 },
          { id: "side3", name: "Coleslaw", price: 1.99 }
        ]
      }
    ]
  },
  {
    id: "food2",
    name: "Margherita Pizza",
    description: "Traditional pizza with tomato sauce, fresh mozzarella, basil, and olive oil.",
    price: 14.99,
    image: "https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8cGl6emF8ZW58MHx8MHx8fDA%3D",
    category: "Pizza",
    restaurantId: "rest2",
    popular: true,
    rating: 4.8,
    prepTime: "20-30 min",
    customizable: true,
    options: [
      {
        name: "Size",
        choices: [
          { id: "size1", name: "Medium (12\")", price: 0 },
          { id: "size2", name: "Large (14\")", price: 4 },
          { id: "size3", name: "X-Large (16\")", price: 6 }
        ]
      },
      {
        name: "Crust",
        choices: [
          { id: "crust1", name: "Traditional", price: 0 },
          { id: "crust2", name: "Thin Crust", price: 0 },
          { id: "crust3", name: "Stuffed Crust", price: 2.99 }
        ]
      }
    ]
  },
  {
    id: "food3",
    name: "Chicken Teriyaki Bowl",
    description: "Grilled chicken glazed with teriyaki sauce, served on a bed of steamed rice with vegetables.",
    price: 13.49,
    image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Zm9vZHxlbnwwfHwwfHx8MA%3D%3D",
    category: "Asian",
    restaurantId: "rest3",
    rating: 4.5,
    prepTime: "15-25 min"
  },
  {
    id: "food4",
    name: "Veggie Wrap",
    description: "Fresh vegetables, hummus, and feta cheese wrapped in a spinach tortilla.",
    price: 9.99,
    image: "https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8d3JhcHxlbnwwfHwwfHx8MA%3D%3D",
    category: "Vegetarian",
    restaurantId: "rest4",
    rating: 4.3,
    prepTime: "10-15 min"
  },
  {
    id: "food5",
    name: "Chocolate Lava Cake",
    description: "Warm chocolate cake with a molten chocolate center, served with vanilla ice cream.",
    price: 7.99,
    image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y2hvY29sYXRlJTIwY2FrZXxlbnwwfHwwfHx8MA%3D%3D",
    category: "Dessert",
    restaurantId: "rest5",
    popular: true,
    rating: 4.9,
    prepTime: "15-20 min"
  },
  {
    id: "food6",
    name: "Caesar Salad",
    description: "Crisp romaine lettuce, parmesan cheese, croutons, and Caesar dressing.",
    price: 8.99,
    image: "https://images.unsplash.com/photo-1599021419847-d8a7a6aba5b3?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y2Flc2FyJTIwc2FsYWR8ZW58MHx8MHx8fDA%3D",
    category: "Salads",
    restaurantId: "rest4",
    rating: 4.2,
    prepTime: "5-10 min"
  },
  // Adding 10 new food items below
  {
    id: "food7",
    name: "Butter Chicken",
    description: "Tender chicken cooked in a rich and creamy tomato-based butter sauce with Indian spices.",
    price: 15.99,
    image: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8YnV0dGVyJTIwY2hpY2tlbnxlbnwwfHwwfHx8MA%3D%3D",
    category: "Indian",
    restaurantId: "rest6",
    popular: true,
    rating: 4.8,
    prepTime: "25-35 min"
  },
  {
    id: "food8",
    name: "Beef Pad Thai",
    description: "Stir-fried rice noodles with beef, eggs, bean sprouts, peanuts, and tamarind sauce.",
    price: 14.49,
    image: "https://images.unsplash.com/photo-1559314809-0d155014e29e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGFkJTIwdGhhaXxlbnwwfHwwfHx8MA%3D%3D",
    category: "Thai",
    restaurantId: "rest7",
    rating: 4.6,
    prepTime: "15-25 min"
  },
  {
    id: "food9",
    name: "Vegetable Biryani",
    description: "Fragrant basmati rice cooked with mixed vegetables, herbs, and aromatic spices.",
    price: 12.99,
    image: "https://images.unsplash.com/photo-1599043513900-ed6fe01d3833?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8YmlyeWFuaXxlbnwwfHwwfHx8MA%3D%3D",
    category: "Indian",
    restaurantId: "rest6",
    rating: 4.5,
    prepTime: "30-40 min",
    customizable: true,
    options: [
      {
        name: "Spice Level",
        choices: [
          { id: "spice1", name: "Mild", price: 0 },
          { id: "spice2", name: "Medium", price: 0 },
          { id: "spice3", name: "Spicy", price: 0 }
        ]
      }
    ]
  },
  {
    id: "food10",
    name: "Fresh Sushi Platter",
    description: "Assortment of fresh nigiri and maki rolls with wasabi, ginger, and soy sauce.",
    price: 24.99,
    image: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8c3VzaGl8ZW58MHx8MHx8fDA%3D",
    category: "Japanese",
    restaurantId: "rest8",
    popular: true,
    rating: 4.9,
    prepTime: "20-30 min",
    customizable: true,
    options: [
      {
        name: "Size",
        choices: [
          { id: "sushi1", name: "Small (12 pieces)", price: 0 },
          { id: "sushi2", name: "Medium (18 pieces)", price: 10 },
          { id: "sushi3", name: "Large (24 pieces)", price: 18 }
        ]
      }
    ]
  },
  {
    id: "food11",
    name: "Falafel Plate",
    description: "Crispy falafel balls served with hummus, tahini, pita bread, and fresh Mediterranean salad.",
    price: 11.99,
    image: "https://images.unsplash.com/photo-1593001872095-7d5b3868dd28?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8ZmFsYWZlbHxlbnwwfHwwfHx8MA%3D%3D",
    category: "Mediterranean",
    restaurantId: "rest9",
    rating: 4.4,
    prepTime: "15-20 min"
  },
  {
    id: "food12",
    name: "Beef Tacos",
    description: "Three soft corn tortillas filled with seasoned beef, onions, cilantro, and fresh lime.",
    price: 10.49,
    image: "https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dGFjb3N8ZW58MHx8MHx8fDA%3D",
    category: "Mexican",
    restaurantId: "rest10",
    popular: true,
    rating: 4.7,
    prepTime: "10-20 min",
    customizable: true,
    options: [
      {
        name: "Extras",
        choices: [
          { id: "mextra1", name: "Guacamole", price: 1.99 },
          { id: "mextra2", name: "Sour Cream", price: 0.99 },
          { id: "mextra3", name: "Extra Salsa", price: 0.79 }
        ],
        multiple: true
      }
    ]
  },
  {
    id: "food13",
    name: "Tiramisu",
    description: "Classic Italian dessert with layers of coffee-soaked ladyfingers and mascarpone cream.",
    price: 8.99,
    image: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8dGlyYW1pc3V8ZW58MHx8MHx8fDA%3D",
    category: "Dessert",
    restaurantId: "rest2",
    rating: 4.8,
    prepTime: "5-10 min"
  },
  {
    id: "food14",
    name: "Chicken Shawarma Wrap",
    description: "Marinated chicken wrapped in warm pita with garlic sauce, pickles, and fries.",
    price: 9.99,
    image: "https://images.unsplash.com/photo-1632240207109-4ba60c5c70cc?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8c2hhd2FybWF8ZW58MHx8MHx8fDA%3D",
    category: "Mediterranean",
    restaurantId: "rest9",
    popular: true,
    rating: 4.6,
    prepTime: "15-25 min"
  },
  {
    id: "food15",
    name: "Vegetable Stir Fry",
    description: "Fresh seasonal vegetables stir-fried in a savory sauce, served with steamed rice.",
    price: 11.49,
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8dmVnZXRhYmxlJTIwc3RpciUyMGZyeXxlbnwwfHwwfHx8MA%3D%3D",
    category: "Vegetarian",
    restaurantId: "rest4",
    rating: 4.3,
    prepTime: "15-20 min"
  },
  {
    id: "food16",
    name: "Breakfast Platter",
    description: "Complete breakfast with eggs, bacon, pancakes, hash browns, and toast.",
    price: 13.99,
    image: "https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8YnJlYWtmYXN0JTIwcGxhdHRlcnxlbnwwfHwwfHx8MA%3D%3D",
    category: "Breakfast",
    restaurantId: "rest1",
    popular: true,
    rating: 4.7,
    prepTime: "15-25 min"
  }
];

export const mockRestaurants: Restaurant[] = [
  {
    id: "rest1",
    name: "Burger Palace",
    image: "https://images.unsplash.com/photo-1555992336-03a23c7b20ee?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8YnVyZ2VyJTIwcmVzdGF1cmFudHxlbnwwfHwwfHx8MA%3D%3D",
    description: "Gourmet burgers and sides made with premium ingredients",
    rating: 4.7,
    cuisineType: "American",
    deliveryFee: 2.99,
    minDeliveryTime: 20,
    maxDeliveryTime: 35,
    address: "123 Main St, Foodville",
    location: {
      lat: 37.7749,
      lng: -122.4194
    },
    popular: true,
    featured: true,
    distance: 2.3
  },
  {
    id: "rest2",
    name: "Pizza Paradise",
    image: "https://images.unsplash.com/photo-1566843972142-a7fcb70de55a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fHBpenphJTIwcmVzdGF1cmFudHxlbnwwfHwwfHx8MA%3D%3D",
    description: "Authentic Italian pizzas baked in a wood-fired oven",
    rating: 4.8,
    cuisineType: "Italian",
    deliveryFee: 1.99,
    minDeliveryTime: 25,
    maxDeliveryTime: 40,
    address: "456 Oak Ave, Foodville",
    location: {
      lat: 37.7833,
      lng: -122.4167
    },
    popular: true,
    featured: true,
    distance: 1.8
  },
  {
    id: "rest3",
    name: "Wok & Roll",
    image: "https://images.unsplash.com/photo-1526318896980-cf78c088247c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fGFzaWFuJTIwcmVzdGF1cmFudHxlbnwwfHwwfHx8MA%3D%3D",
    description: "Fast and fresh Asian cuisine with bold flavors",
    rating: 4.5,
    cuisineType: "Asian",
    deliveryFee: 3.49,
    minDeliveryTime: 15,
    maxDeliveryTime: 30,
    address: "789 Elm St, Foodville",
    location: {
      lat: 37.7900,
      lng: -122.4000
    },
    distance: 3.2
  },
  {
    id: "rest4",
    name: "Green Leaf",
    image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dmVnZXRhcmlhbiUyMHJlc3RhdXJhbnR8ZW58MHx8MHx8fDA%3D",
    description: "Vegetarian and vegan dishes that are both healthy and delicious",
    rating: 4.3,
    cuisineType: "Vegetarian",
    deliveryFee: 2.49,
    minDeliveryTime: 20,
    maxDeliveryTime: 35,
    address: "101 Veggie Dr, Foodville",
    location: {
      lat: 37.7700,
      lng: -122.4100
    },
    featured: true,
    distance: 1.5
  },
  {
    id: "rest5",
    name: "Sweet Treats",
    image: "https://images.unsplash.com/photo-1579306194872-64d3b7bac4c2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8ZGVzc2VydCUyMHNob3B8ZW58MHx8MHx8fDA%3D",
    description: "Indulgent desserts and pastries for every sweet tooth",
    rating: 4.9,
    cuisineType: "Desserts",
    deliveryFee: 3.99,
    minDeliveryTime: 15,
    maxDeliveryTime: 30,
    address: "222 Sugar St, Foodville",
    location: {
      lat: 37.7820,
      lng: -122.4250
    },
    popular: true,
    distance: 2.7
  },
  // Adding 5 new restaurants to match our new food items
  {
    id: "rest6",
    name: "Spice Route",
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW5kaWFuJTIwcmVzdGF1cmFudHxlbnwwfHwwfHx8MA%3D%3D",
    description: "Authentic Indian cuisine with traditional spices and flavors",
    rating: 4.6,
    cuisineType: "Indian",
    deliveryFee: 3.49,
    minDeliveryTime: 30,
    maxDeliveryTime: 45,
    address: "42 Spice Lane, Foodville",
    location: {
      lat: 37.7650,
      lng: -122.4320
    },
    popular: true,
    distance: 3.8
  },
  {
    id: "rest7",
    name: "Thai Garden",
    image: "https://images.unsplash.com/photo-1552566626-52f8b828add9?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8dGhhaSUyMHJlc3RhdXJhbnR8ZW58MHx8MHx8fDA%3D",
    description: "Fresh Thai dishes with authentic flavors from Southeast Asia",
    rating: 4.5,
    cuisineType: "Thai",
    deliveryFee: 2.99,
    minDeliveryTime: 25,
    maxDeliveryTime: 40,
    address: "567 Basil Street, Foodville",
    location: {
      lat: 37.7550,
      lng: -122.4270
    },
    distance: 4.1
  },
  {
    id: "rest8",
    name: "Sushi Kingdom",
    image: "https://images.unsplash.com/photo-1617196701537-7329482cc9fe?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8c3VzaGklMjByZXN0YXVyYW50fGVufDB8fDB8fHww",
    description: "Premium sushi and Japanese cuisine prepared by skilled chefs",
    rating: 4.8,
    cuisineType: "Japanese",
    deliveryFee: 4.99,
    minDeliveryTime: 30,
    maxDeliveryTime: 50,
    address: "888 Ocean Drive, Foodville",
    location: {
      lat: 37.7780,
      lng: -122.3950
    },
    featured: true,
    distance: 5.2
  },
  {
    id: "rest9",
    name: "Mediterranean Delights",
    image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8bWVkaXRlcnJhbmVhbiUyMHJlc3RhdXJhbnR8ZW58MHx8MHx8fDA%3D",
    description: "Fresh Mediterranean dishes with a focus on healthy ingredients",
    rating: 4.4,
    cuisineType: "Mediterranean",
    deliveryFee: 2.79,
    minDeliveryTime: 20,
    maxDeliveryTime: 35,
    address: "345 Olive Way, Foodville",
    location: {
      lat: 37.7600,
      lng: -122.4050
    },
    distance: 3.0
  },
  {
    id: "rest10",
    name: "Taco Fiesta",
    image: "https://images.unsplash.com/photo-1653313193408-8454ac168fde?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8bWV4aWNhbiUyMHJlc3RhdXJhbnR8ZW58MHx8MHx8fDA%3D",
    description: "Authentic Mexican street food and specialties",
    rating: 4.7,
    cuisineType: "Mexican",
    deliveryFee: 2.49,
    minDeliveryTime: 15,
    maxDeliveryTime: 30,
    address: "729 Salsa Street, Foodville",
    location: {
      lat: 37.7500,
      lng: -122.4150
    },
    popular: true,
    distance: 2.4
  }
];

export const categories = [
  "All",
  "Popular",
  "American",
  "Italian",
  "Asian",
  "Vegetarian",
  "Desserts",
  "Indian",
  "Thai",
  "Japanese",
  "Mediterranean",
  "Mexican",
  "Breakfast"
];
