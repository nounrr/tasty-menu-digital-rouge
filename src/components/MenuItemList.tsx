
import { FC, useEffect, useState } from 'react';
import { MenuItem as MenuItemType } from '../data/menuData';
import MenuItem from './MenuItem';

interface MenuItemListProps {
  items: MenuItemType[];
  categoryId: number;
}

const MenuItemList: FC<MenuItemListProps> = ({ items, categoryId }) => {
  const [visibleItems, setVisibleItems] = useState<MenuItemType[]>([]);

  useEffect(() => {
    // Reset items when category changes for animation effect
    setVisibleItems([]);
    
    // Add a small delay before showing new items for animation effect
    const timer = setTimeout(() => {
      setVisibleItems(items);
    }, 200);
    
    return () => clearTimeout(timer);
  }, [items, categoryId]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {visibleItems.map((item) => (
        <MenuItem key={item.id} item={item} />
      ))}
    </div>
  );
};

export default MenuItemList;
