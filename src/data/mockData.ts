
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
  popular?: boolean;
  featured?: boolean;
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
    popular: true,
    featured: true
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
    popular: true,
    featured: true
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
    address: "789 Elm St, Foodville"
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
    featured: true
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
    popular: true
  }
];

export const categories = [
  "All",
  "Popular",
  "American",
  "Italian",
  "Asian",
  "Vegetarian",
  "Desserts"
];
