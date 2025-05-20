
export interface MenuItem {
  id: number;
  title: string;
  price: number;
  description?: string;
  categoryId: number;
  image?: string;
}

export interface Category {
  id: number;
  name: string;
  image?: string;
}

// Sample data
export const categories: Category[] = [
  { id: 1, name: "Entrées", image: "placeholder.svg" },
  { id: 2, name: "Plats Principaux", image: "placeholder.svg" },
  { id: 3, name: "Desserts", image: "placeholder.svg" },
  { id: 4, name: "Boissons", image: "placeholder.svg" }
];

export const menuItems: MenuItem[] = [
  { 
    id: 1, 
    title: "Salade César", 
    price: 8.99, 
    description: "Laitue romaine, parmesan, croûtons et notre vinaigrette César maison.", 
    categoryId: 1 
  },
  { 
    id: 2, 
    title: "Soupe à l'Oignon", 
    price: 7.50, 
    description: "Soupe à l'oignon traditionnelle avec croûtons et fromage gratiné.", 
    categoryId: 1 
  },
  { 
    id: 3, 
    title: "Escargots de Bourgogne", 
    price: 12.99, 
    description: "Escargots préparés avec beurre à l'ail et aux fines herbes.", 
    categoryId: 1 
  },
  { 
    id: 4, 
    title: "Steak Frites", 
    price: 22.50, 
    description: "Steak de bœuf servi avec frites maison et sauce au poivre.", 
    categoryId: 2 
  },
  { 
    id: 5, 
    title: "Poulet Rôti", 
    price: 18.99, 
    description: "Demi-poulet rôti aux herbes de Provence, servi avec légumes de saison.", 
    categoryId: 2 
  },
  { 
    id: 6, 
    title: "Saumon Grillé", 
    price: 24.50, 
    description: "Filet de saumon grillé avec sauce au citron et riz basmati.", 
    categoryId: 2 
  },
  { 
    id: 7, 
    title: "Ratatouille", 
    price: 16.99, 
    description: "Ragoût traditionnel de légumes méditerranéens.", 
    categoryId: 2 
  },
  { 
    id: 8, 
    title: "Crème Brûlée", 
    price: 7.99, 
    description: "Crème à la vanille avec une couche de sucre caramélisé.", 
    categoryId: 3 
  },
  { 
    id: 9, 
    title: "Tarte Tatin", 
    price: 8.50, 
    description: "Tarte aux pommes caramélisées servie avec crème fraîche.", 
    categoryId: 3 
  },
  { 
    id: 10, 
    title: "Mousse au Chocolat", 
    price: 6.99, 
    description: "Mousse au chocolat légère et aérienne.", 
    categoryId: 3 
  },
  { 
    id: 11, 
    title: "Vin Rouge", 
    price: 7.50, 
    description: "Verre de vin rouge de la maison.", 
    categoryId: 4 
  },
  { 
    id: 12, 
    title: "Vin Blanc", 
    price: 7.50, 
    description: "Verre de vin blanc de la maison.", 
    categoryId: 4 
  },
  { 
    id: 13, 
    title: "Eau Minérale", 
    price: 3.50, 
    categoryId: 4 
  },
  { 
    id: 14, 
    title: "Café", 
    price: 2.99, 
    description: "Espresso, Americano ou Cappuccino.", 
    categoryId: 4 
  }
];

// Utility functions
export const getMenuItemsByCategory = (categoryId: number): MenuItem[] => {
  return menuItems.filter(item => item.categoryId === categoryId);
};

export const getCategoryById = (categoryId: number): Category | undefined => {
  return categories.find(category => category.id === categoryId);
};
