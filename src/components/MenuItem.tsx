
import { FC } from 'react';
import { MenuItem as MenuItemType } from '../data/menuData';

interface MenuItemProps {
  item: MenuItemType;
}

const MenuItem: FC<MenuItemProps> = ({ item }) => {
  return (
    <div className="menu-item animate-slide-in">
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <h3 className="text-lg font-medium text-restaurant-dark">{item.title}</h3>
          {item.description && (
            <p className="text-sm text-gray-600 mt-1">{item.description}</p>
          )}
        </div>
        <div className="text-restaurant-red font-bold ml-4">
          {item.price.toFixed(2)} €
        </div>
      </div>
    </div>
  );
};

export default MenuItem;
