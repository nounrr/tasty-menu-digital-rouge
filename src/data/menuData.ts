
export interface MenuItem {
  id: number;
  title: string;
  price: number;
  description?: string;
  categoryId: number;
  restaurantId: number;
  image?: string;
}

export interface Category {
  id: number;
  name: string;
  restaurantId: number;
  image?: string;
}

export interface Restaurant {
  id: number;
  name: string;
  image?: string;
}

// Sample restaurants
export const restaurants: Restaurant[] = [
  { id: 1, name: "Le Rouge Restaurant", image: "placeholder.svg" },
  { id: 2, name: "Le Bleu Bistro", image: "placeholder.svg" }
];

// Sample data
export const categories: Category[] = [
  { id: 1, name: "Entrées", restaurantId: 1, image: "placeholder.svg" },
  { id: 2, name: "Plats Principaux", restaurantId: 1, image: "placeholder.svg" },
  { id: 3, name: "Desserts", restaurantId: 1, image: "placeholder.svg" },
  { id: 4, name: "Boissons", restaurantId: 1, image: "placeholder.svg" },
  { id: 5, name: "Appetizers", restaurantId: 2, image: "placeholder.svg" },
  { id: 6, name: "Main Courses", restaurantId: 2, image: "placeholder.svg" },
  { id: 7, name: "Desserts", restaurantId: 2, image: "placeholder.svg" },
  { id: 8, name: "Drinks", restaurantId: 2, image: "placeholder.svg" }
];

export const menuItems: MenuItem[] = [
  { 
    id: 1, 
    title: "Salade César", 
    price: 8.99, 
    description: "Laitue romaine, parmesan, croûtons et notre vinaigrette César maison.", 
    categoryId: 1,
    restaurantId: 1,
    image: "placeholder.svg"
  },
  { 
    id: 2, 
    title: "Soupe à l'Oignon", 
    price: 7.50, 
    description: "Soupe à l'oignon traditionnelle avec croûtons et fromage gratiné.", 
    categoryId: 1,
    restaurantId: 1,
    image: "placeholder.svg"
  },
  { 
    id: 3, 
    title: "Escargots de Bourgogne", 
    price: 12.99, 
    description: "Escargots préparés avec beurre à l'ail et aux fines herbes.", 
    categoryId: 1,
    restaurantId: 1,
    image: "placeholder.svg"
  },
  { 
    id: 4, 
    title: "Steak Frites", 
    price: 22.50, 
    description: "Steak de bœuf servi avec frites maison et sauce au poivre.", 
    categoryId: 2,
    restaurantId: 1,
    image: "placeholder.svg"
  },
  { 
    id: 5, 
    title: "Poulet Rôti", 
    price: 18.99, 
    description: "Demi-poulet rôti aux herbes de Provence, servi avec légumes de saison.", 
    categoryId: 2,
    restaurantId: 1,
    image: "placeholder.svg"
  },
  { 
    id: 6, 
    title: "Saumon Grillé", 
    price: 24.50, 
    description: "Filet de saumon grillé avec sauce au citron et riz basmati.", 
    categoryId: 2,
    restaurantId: 1,
    image: "placeholder.svg"
  },
  { 
    id: 7, 
    title: "Ratatouille", 
    price: 16.99, 
    description: "Ragoût traditionnel de légumes méditerranéens.", 
    categoryId: 2,
    restaurantId: 1,
    image: "placeholder.svg"
  },
  { 
    id: 8, 
    title: "Crème Brûlée", 
    price: 7.99, 
    description: "Crème à la vanille avec une couche de sucre caramélisé.", 
    categoryId: 3,
    restaurantId: 1,
    image: "placeholder.svg"
  },
  { 
    id: 9, 
    title: "Tarte Tatin", 
    price: 8.50, 
    description: "Tarte aux pommes caramélisées servie avec crème fraîche.", 
    categoryId: 3,
    restaurantId: 1,
    image: "placeholder.svg"
  },
  { 
    id: 10, 
    title: "Mousse au Chocolat", 
    price: 6.99, 
    description: "Mousse au chocolat légère et aérienne.", 
    categoryId: 3,
    restaurantId: 1,
    image: "placeholder.svg"
  },
  { 
    id: 11, 
    title: "Vin Rouge", 
    price: 7.50, 
    description: "Verre de vin rouge de la maison.", 
    categoryId: 4,
    restaurantId: 1,
    image: "placeholder.svg"
  },
  { 
    id: 12, 
    title: "Vin Blanc", 
    price: 7.50, 
    description: "Verre de vin blanc de la maison.", 
    categoryId: 4,
    restaurantId: 1,
    image: "placeholder.svg"
  },
  { 
    id: 13, 
    title: "Eau Minérale", 
    price: 3.50, 
    categoryId: 4,
    restaurantId: 1,
    image: "placeholder.svg"
  },
  { 
    id: 14, 
    title: "Café", 
    price: 2.99, 
    description: "Espresso, Americano ou Cappuccino.", 
    categoryId: 4,
    restaurantId: 1,
    image: "placeholder.svg"
  },
  { 
    id: 15, 
    title: "Bruschetta", 
    price: 7.99, 
    description: "Toasted bread topped with tomatoes, garlic, and fresh basil.", 
    categoryId: 5,
    restaurantId: 2,
    image: "placeholder.svg"
  },
  { 
    id: 16, 
    title: "Calamari", 
    price: 9.50, 
    description: "Fried squid served with lemon aioli.", 
    categoryId: 5,
    restaurantId: 2,
    image: "placeholder.svg"
  },
  { 
    id: 17, 
    title: "Caprese Salad", 
    price: 8.99, 
    description: "Fresh mozzarella, tomatoes, and basil with balsamic glaze.", 
    categoryId: 5,
    restaurantId: 2,
    image: "placeholder.svg"
  },
  { 
    id: 18, 
    title: "Seafood Pasta", 
    price: 21.50, 
    description: "Linguine with mixed seafood in a light tomato sauce.", 
    categoryId: 6,
    restaurantId: 2,
    image: "placeholder.svg"
  },
  { 
    id: 19, 
    title: "Risotto", 
    price: 18.99, 
    description: "Creamy mushroom risotto with parmesan.", 
    categoryId: 6,
    restaurantId: 2,
    image: "placeholder.svg"
  },
  { 
    id: 20, 
    title: "Tiramisu", 
    price: 7.99, 
    description: "Classic Italian dessert with coffee-soaked ladyfingers.", 
    categoryId: 7,
    restaurantId: 2,
    image: "placeholder.svg"
  },
  { 
    id: 21, 
    title: "Espresso", 
    price: 2.99, 
    categoryId: 8,
    restaurantId: 2,
    image: "placeholder.svg"
  },
  { 
    id: 22, 
    title: "Italian Soda", 
    price: 3.99, 
    description: "Sparkling water with your choice of flavored syrup.", 
    categoryId: 8,
    restaurantId: 2,
    image: "placeholder.svg"
  }
];

// Utility functions
export const getMenuItemsByCategory = (categoryId: number): MenuItem[] => {
  return menuItems.filter(item => item.categoryId === categoryId);
};

export const getCategoryById = (categoryId: number): Category | undefined => {
  return categories.find(category => category.id === categoryId);
};

export const getCategoriesByRestaurant = (restaurantId: number): Category[] => {
  return categories.filter(category => category.restaurantId === restaurantId);
};

export const getRestaurantById = (restaurantId: number): Restaurant | undefined => {
  return restaurants.find(restaurant => restaurant.id === restaurantId);
};
