
import { FC } from 'react';
import { Category } from '../data/menuData';
import MenuCategory from './MenuCategory';

interface CategoryListProps {
  categories: Category[];
  selectedCategoryId: number;
  onSelectCategory: (categoryId: number) => void;
}

const CategoryList: FC<CategoryListProps> = ({ 
  categories, 
  selectedCategoryId, 
  onSelectCategory 
}) => {
  return (
    <div className="flex flex-wrap sm:flex-nowrap gap-2 justify-center mb-8">
      {categories.map((category) => (
        <MenuCategory
          key={category.id}
          category={category}
          isActive={category.id === selectedCategoryId}
          onClick={() => onSelectCategory(category.id)}
        />
      ))}
    </div>
  );
};

export default CategoryList;
