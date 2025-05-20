
import { FC } from 'react';
import { Category } from '../data/menuData';

interface MenuCategoryProps {
  category: Category;
  isActive: boolean;
  onClick: () => void;
}

const MenuCategory: FC<MenuCategoryProps> = ({ category, isActive, onClick }) => {
  return (
    <div 
      className={`
        cursor-pointer py-3 px-6 rounded-full transition-all duration-300 mb-2
        ${isActive 
          ? 'bg-restaurant-red text-white shadow-lg' 
          : 'bg-white text-restaurant-dark hover:bg-restaurant-light'
        }
      `}
      onClick={onClick}
    >
      <span className="font-medium">{category.name}</span>
    </div>
  );
};

export default MenuCategory;
