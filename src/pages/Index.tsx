
import { useState, useEffect } from 'react';
import { categories, getMenuItemsByCategory } from '../data/menuData';
import CategoryList from '../components/CategoryList';
import MenuItemList from '../components/MenuItemList';
import Navbar from '../components/Navbar';
import Logo from '../components/Logo';

const Index = () => {
  const [selectedCategoryId, setSelectedCategoryId] = useState(categories[0]?.id || 0);
  const [menuItems, setMenuItems] = useState(getMenuItemsByCategory(selectedCategoryId));

  useEffect(() => {
    setMenuItems(getMenuItemsByCategory(selectedCategoryId));
  }, [selectedCategoryId]);

  const handleSelectCategory = (categoryId: number) => {
    setSelectedCategoryId(categoryId);
  };

  return (
    <div className="min-h-screen flex flex-col bg-restaurant-light">
      <Navbar />
      
      <div className="flex-grow container mx-auto px-4 py-8">
        <div className="text-center mb-10">
          <div className="flex justify-center mb-4">
            <Logo size="lg" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-restaurant-dark">
            Notre Menu
          </h1>
          <p className="text-gray-600 mt-2">
            Découvrez notre sélection de plats préparés avec passion
          </p>
        </div>

        <CategoryList 
          categories={categories} 
          selectedCategoryId={selectedCategoryId} 
          onSelectCategory={handleSelectCategory} 
        />

        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-bold text-restaurant-dark mb-6 border-b border-gray-200 pb-2">
            {categories.find(cat => cat.id === selectedCategoryId)?.name}
          </h2>
          <MenuItemList items={menuItems} categoryId={selectedCategoryId} />
        </div>
      </div>

      <footer className="bg-restaurant-dark text-white py-6">
        <div className="container mx-auto px-4 text-center">
          <Logo size="sm" />
          <p className="mt-4">© 2025 Le Rouge Restaurant. Tous droits réservés.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
