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
  },
  
  // Adding new Indian dishes
  {
    id: "food17",
    name: "Butter Chicken Curry",
    description: "Rich and creamy tomato-based curry with tender chicken pieces, flavored with authentic Indian spices",
    price: 15.99,
    image: "https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8YnV0dGVyJTIwY2hpY2tlbnxlbnwwfHwwfHx8MA%3D%3D",
    category: "Indian",
    restaurantId: "rest6",
    popular: true,
    rating: 4.9,
    prepTime: "25-35 min",
    customizable: true,
    options: [
      {
        name: "Spice Level",
        choices: [
          { id: "mild17", name: "Mild", price: 0 },
          { id: "medium17", name: "Medium", price: 0 },
          { id: "spicy17", name: "Spicy", price: 0 }
        ]
      },
      {
        name: "Add-ons",
        choices: [
          { id: "naan17", name: "Garlic Naan", price: 2.99 },
          { id: "rice17", name: "Jeera Rice", price: 3.49 }
        ],
        multiple: true
      }
    ]
  },
  {
    id: "food18",
    name: "Paneer Tikka Masala",
    description: "Cottage cheese cubes marinated in spices and grilled, then simmered in a creamy tomato sauce",
    price: 14.49,
    image: "https://images.unsplash.com/photo-1596797038530-2c107aa4a186?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGFuZWVyfGVufDB8fDB8fHww",
    category: "Indian",
    restaurantId: "rest6",
    rating: 4.7,
    prepTime: "20-30 min",
    customizable: true,
    options: [
      {
        name: "Spice Level",
        choices: [
          { id: "mild18", name: "Mild", price: 0 },
          { id: "medium18", name: "Medium", price: 0 },
          { id: "spicy18", name: "Spicy", price: 0 }
        ]
      }
    ]
  },
  {
    id: "food19",
    name: "Lamb Rogan Josh",
    description: "Tender lamb cooked with aromatic spices in a rich and flavorful gravy, a classic from Kashmir",
    price: 16.99,
    image: "https://images.unsplash.com/photo-1617692855027-33b14f061079?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bGFtYiUyMGN1cnJ5fGVufDB8fDB8fHww",
    category: "Indian",
    restaurantId: "rest6",
    rating: 4.8,
    prepTime: "30-40 min"
  },
  
  // Adding new Asian dishes
  {
    id: "food20",
    name: "Kung Pao Chicken",
    description: "Spicy stir-fried chicken with peanuts, vegetables, and chili peppers in a savory sauce",
    price: 13.99,
    image: "https://images.unsplash.com/photo-1525755662778-989d0524087e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y2hpbmVzZSUyMGZvb2R8ZW58MHx8MHx8fDA%3D",
    category: "Asian",
    restaurantId: "rest3",
    popular: true,
    rating: 4.6,
    prepTime: "15-25 min",
    customizable: true,
    options: [
      {
        name: "Spice Level",
        choices: [
          { id: "mild20", name: "Mild", price: 0 },
          { id: "spicy20", name: "Spicy", price: 0 },
          { id: "extra20", name: "Extra Spicy", price: 0 }
        ]
      },
      {
        name: "Side",
        choices: [
          { id: "rice20", name: "Steamed Rice", price: 1.99 },
          { id: "noodle20", name: "Fried Noodles", price: 2.99 }
        ]
      }
    ]
  },
  {
    id: "food21",
    name: "Beef Pho",
    description: "Vietnamese noodle soup with thinly sliced beef, rice noodles, and aromatic herbs in a flavorful broth",
    price: 14.49,
    image: "https://images.unsplash.com/photo-1576577445504-6af96477db52?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cGhvfGVufDB8fDB8fHww",
    category: "Asian",
    restaurantId: "rest3",
    rating: 4.7,
    prepTime: "20-30 min"
  },
  {
    id: "food22",
    name: "Korean Bibimbap",
    description: "Mixed rice bowl with vegetables, beef, a fried egg, and spicy gochujang sauce",
    price: 13.99,
    image: "https://images.unsplash.com/photo-1590301157890-4810ed352733?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YmliaW1iYXB8ZW58MHx8MHx8fDA%3D",
    category: "Asian",
    restaurantId: "rest3",
    popular: true,
    rating: 4.8,
    prepTime: "15-25 min"
  },
  
  // Adding new American dishes
  {
    id: "food23",
    name: "BBQ Ribs Platter",
    description: "Slow-cooked pork ribs glazed with smoky barbecue sauce, served with coleslaw and fries",
    price: 19.99,
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YmJxJTIwcmlic3xlbnwwfHwwfHx8MA%3D%3D",
    category: "American",
    restaurantId: "rest1",
    popular: true,
    rating: 4.9,
    prepTime: "25-35 min",
    customizable: true,
    options: [
      {
        name: "Sauce",
        choices: [
          { id: "classic23", name: "Classic BBQ", price: 0 },
          { id: "honey23", name: "Honey BBQ", price: 0 },
          { id: "spicy23", name: "Spicy BBQ", price: 0 }
        ]
      },
      {
        name: "Sides",
        choices: [
          { id: "fries23", name: "Extra Fries", price: 2.99 },
          { id: "onion23", name: "Onion Rings", price: 3.49 },
          { id: "mac23", name: "Mac & Cheese", price: 3.99 }
        ],
        multiple: true
      }
    ]
  },
  {
    id: "food24",
    name: "Double Bacon Cheeseburger",
    description: "Two beef patties topped with crispy bacon, melted cheese, lettuce, tomato, and special sauce",
    price: 14.99,
    image: "https://images.unsplash.com/photo-1553979459-d2229ba7433b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YmFjb24lMjBjaGVlc2VidXJnZXJ8ZW58MHx8MHx8fDA%3D",
    category: "American",
    restaurantId: "rest1",
    popular: true,
    rating: 4.7,
    prepTime: "15-20 min"
  },
  {
    id: "food25",
    name: "Buffalo Chicken Wings",
    description: "Crispy fried chicken wings tossed in spicy buffalo sauce, served with celery and blue cheese dip",
    price: 12.99,
    image: "https://images.unsplash.com/photo-1608039755401-742074f0548d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y2hpY2tlbiUyMHdpbmdzfGVufDB8fDB8fHww",
    category: "American",
    restaurantId: "rest1",
    rating: 4.6,
    prepTime: "15-25 min",
    customizable: true,
    options: [
      {
        name: "Sauce",
        choices: [
          { id: "mild25", name: "Mild", price: 0 },
          { id: "medium25", name: "Medium", price: 0 },
          { id: "hot25", name: "Hot", price: 0 }
        ]
      },
      {
        name: "Quantity",
        choices: [
          { id: "small25", name: "Small (8 pcs)", price: 0 },
          { id: "large25", name: "Large (12 pcs)", price: 4.99 },
          { id: "jumbo25", name: "Jumbo (16 pcs)", price: 8.99 }
        ]
      }
    ]
  },
  
  // Adding new Mediterranean dishes
  {
    id: "food26",
    name: "Mixed Meze Platter",
    description: "Assortment of Mediterranean appetizers including hummus, baba ganoush, tzatziki, and fresh pita",
    price: 16.99,
    image: "https://images.unsplash.com/photo-1655312214869-97559c8e8b16?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8bWV6ZSUyMHBsYXR0ZXJ8ZW58MHx8MHx8fDA%3D",
    category: "Mediterranean",
    restaurantId: "rest9",
    popular: true,
    rating: 4.8,
    prepTime: "15-20 min"
  },
  
  // Adding new Mexican dishes
  {
    id: "food27",
    name: "Enchiladas Suizas",
    description: "Corn tortillas filled with chicken, topped with green tomatillo sauce, melted cheese, and sour cream",
    price: 13.99,
    image: "https://images.unsplash.com/photo-1534352956036-cd81e27dd615?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8ZW5jaGlsYWRhc3xlbnwwfHwwfHx8MA%3D%3D",
    category: "Mexican",
    restaurantId: "rest10",
    rating: 4.6,
    prepTime: "20-30 min"
  },
  
  // Adding new Japanese dishes
  {
    id: "food28",
    name: "Ramen Bowl",
    description: "Traditional Japanese noodle soup with rich broth, chashu pork, soft-boiled egg, and vegetables",
    price: 14.99,
    image: "https://images.unsplash.com/photo-1557872943-16a5ac26437e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cmFtZW58ZW58MHx8MHx8fDA%3D",
    category: "Japanese",
    restaurantId: "rest8",
    popular: true,
    rating: 4.9,
    prepTime: "15-25 min",
    customizable: true,
    options: [
      {
        name: "Broth",
        choices: [
          { id: "tonkotsu28", name: "Tonkotsu", price: 0 },
          { id: "miso28", name: "Miso", price: 0 },
          { id: "shoyu28", name: "Shoyu", price: 0 }
        ]
      },
      {
        name: "Add-ons",
        choices: [
          { id: "egg28", name: "Extra Egg", price: 1.99 },
          { id: "chashu28", name: "Extra Chashu", price: 2.99 },
        ]
      }
    ]
  },
]

export const mockRestaurants: Restaurant[] = [
  {
    id: "rest1",
    name: "Burger Joint",
    image: "https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHJlc3RhdXJhbnR8ZW58MHx8MHx8fDA%3D",
    description: "Classic American burgers and comfort food in a casual setting.",
    rating: 4.7,
    cuisineType: "American",
    deliveryFee: 2.99,
    minDeliveryTime: 20,
    maxDeliveryTime: 35,
    address: "123 Burger St, Foodville",
    location: {
      lat: 40.7128,
      lng: -74.006
    },
    popular: true,
    featured: true,
    distance: 1.2
  },
  {
    id: "rest2",
    name: "Pizza Palace",
    image: "https://images.unsplash.com/photo-1579751626657-72bc17010498?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8cmVzdGF1cmFudHxlbnwwfHwwfHx8MA%3D%3D",
    description: "Authentic Italian pizzas and pasta made with traditional recipes.",
    rating: 4.8,
    cuisineType: "Italian",
    deliveryFee: 3.49,
    minDeliveryTime: 25,
    maxDeliveryTime: 40,
    address: "456 Pizza Ave, Foodville",
    location: {
      lat: 40.7138,
      lng: -74.016
    },
    popular: true,
    featured: true,
    distance: 1.8
  },
  {
    id: "rest3",
    name: "Asian Fusion",
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cmVzdGF1cmFudHxlbnwwfHwwfHx8MA%3D%3D",
    description: "Innovative dishes combining flavors from across Asia.",
    rating: 4.5,
    cuisineType: "Asian",
    deliveryFee: 3.99,
    minDeliveryTime: 30,
    maxDeliveryTime: 45,
    address: "789 Fusion Blvd, Foodville",
    location: {
      lat: 40.7148,
      lng: -74.026
    },
    popular: false,
    featured: false,
    distance: 2.5
  },
  {
    id: "rest4",
    name: "Green Leaf Cafe",
    image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cmVzdGF1cmFudHxlbnwwfHwwfHx8MA%3D%3D",
    description: "Healthy, vegetarian-friendly options with fresh, local ingredients.",
    rating: 4.3,
    cuisineType: "Vegetarian",
    deliveryFee: 2.49,
    minDeliveryTime: 15,
    maxDeliveryTime: 30,
    address: "101 Green St, Foodville",
    location: {
      lat: 40.7158,
      lng: -74.036
    },
    popular: false,
    featured: true,
    distance: 1.0
  },
  {
    id: "rest5",
    name: "Sweet Delights",
    image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cmVzdGF1cmFudHxlbnwwfHwwfHx8MA%3D%3D",
    description: "Dessert cafe specializing in cakes, pastries, and sweet treats.",
    rating: 4.9,
    cuisineType: "Dessert",
    deliveryFee: 3.99,
    minDeliveryTime: 20,
    maxDeliveryTime: 35,
    address: "222 Sweet Ave, Foodville",
    location: {
      lat: 40.7168,
      lng: -74.046
    },
    popular: true,
    featured: false,
    distance: 2.2
  },
  {
    id: "rest6",
    name: "Spice Garden",
    image: "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGluZGlhbiUyMHJlc3RhdXJhbnR8ZW58MHx8MHx8fDA%3D",
    description: "Authentic Indian cuisine with a wide range of flavorful curries and tandoori dishes.",
    rating: 4.8,
    cuisineType: "Indian",
    deliveryFee: 3.49,
    minDeliveryTime: 30,
    maxDeliveryTime: 45,
    address: "333 Spice Rd, Foodville",
    location: {
      lat: 40.7178,
      lng: -74.056
    },
    popular: true,
    featured: true,
    distance: 2.7
  },
  {
    id: "rest7",
    name: "Bangkok Kitchen",
    image: "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8dGhhaSUyMHJlc3RhdXJhbnR8ZW58MHx8MHx8fDA%3D",
    description: "Authentic Thai cuisine with bold flavors and fresh ingredients.",
    rating: 4.6,
    cuisineType: "Thai",
    deliveryFee: 3.99,
    minDeliveryTime: 25,
    maxDeliveryTime: 40,
    address: "444 Bangkok Ave, Foodville",
    location: {
      lat: 40.7188,
      lng: -74.066
    },
    popular: false,
    featured: false,
    distance: 3.1
  },
  {
    id: "rest8",
    name: "Sushi Express",
    image: "https://images.unsplash.com/photo-1611143669185-af224c5e3252?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8c3VzaGklMjByZXN0YXVyYW50fGVufDB8fDB8fHww",
    description: "Fresh and high-quality sushi, sashimi, and Japanese specialties.",
    rating: 4.9,
    cuisineType: "Japanese",
    deliveryFee: 4.99,
    minDeliveryTime: 30,
    maxDeliveryTime: 45,
    address: "555 Sushi Lane, Foodville",
    location: {
      lat: 40.7198,
      lng: -74.076
    },
    popular: true,
    featured: true,
    distance: 3.5
  },
  {
    id: "rest9",
    name: "Mediterranean Delight",
    image: "https://images.unsplash.com/photo-1530990457142-bb18a441c52b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8bWVkaXRlcnJhbmVhbiUyMHJlc3RhdXJhbnR8ZW58MHx8MHx8fDA%3D",
    description: "Mediterranean cuisine featuring fresh hummus, falafel, and grilled specialties.",
    rating: 4.4,
    cuisineType: "Mediterranean",
    deliveryFee: 3.49,
    minDeliveryTime: 25,
    maxDeliveryTime: 40,
    address: "666 Olive Blvd, Foodville",
    location: {
      lat: 40.7208,
      lng: -74.086
    },
    popular: false,
    featured: false,
    distance: 2.9
  },
  {
    id: "rest10",
    name: "Taco Fiesta",
    image: "https://images.unsplash.com/photo-1653321816711-d2308f35310d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bWV4aWNhbiUyMHJlc3RhdXJhbnR8ZW58MHx8MHx8fDA%3D",
    description: "Vibrant Mexican restaurant serving tacos, burritos, and traditional favorites.",
    rating: 4.7,
    cuisineType: "Mexican",
    deliveryFee: 2.99,
    minDeliveryTime: 20,
    maxDeliveryTime: 35,
    address: "777 Fiesta St, Foodville",
    location: {
      lat: 40.7218,
      lng: -74.096
    },
    popular: true,
    featured: false,
    distance: 1.8
  }
];

// Extract unique categories from food items and add 'Popular' and 'All' options
export const categories = ["Popular", "All", ...Array.from(new Set(mockFoodItems.map(item => item.category)))];
