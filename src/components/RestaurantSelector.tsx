
import { FC } from 'react';
import { Restaurant } from '../data/menuData';
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface RestaurantSelectorProps {
  restaurants: Restaurant[];
  selectedRestaurantId: number;
  onSelectRestaurant: (restaurantId: number) => void;
}

const RestaurantSelector: FC<RestaurantSelectorProps> = ({ 
  restaurants, 
  selectedRestaurantId, 
  onSelectRestaurant 
}) => {
  return (
    <div className="w-full flex justify-center mb-8">
      <Tabs 
        defaultValue={selectedRestaurantId.toString()} 
        onValueChange={(value) => onSelectRestaurant(parseInt(value))}
        className="w-full max-w-md"
      >
        <TabsList className="grid grid-cols-2 w-full">
          {restaurants.map((restaurant) => (
            <TabsTrigger 
              key={restaurant.id} 
              value={restaurant.id.toString()}
              className="flex items-center gap-2 py-2"
            >
              {restaurant.image && (
                <div className="w-6 h-6 rounded-full overflow-hidden">
                  <img 
                    src={restaurant.image} 
                    alt={restaurant.name} 
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              <span>{restaurant.name}</span>
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>
    </div>
  );
};

export default RestaurantSelector;
