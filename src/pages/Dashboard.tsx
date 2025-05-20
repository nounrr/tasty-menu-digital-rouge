
import { Link } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Navbar from '../components/Navbar';
import { categories, menuItems } from '../data/menuData';

const Dashboard = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      
      <div className="flex-grow container mx-auto px-4 py-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-restaurant-dark">
            Dashboard d'Administration
          </h1>
          <p className="text-gray-600">
            Gérez les catégories et les produits de votre menu
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-6">
          <Card className="p-6 shadow-md">
            <h2 className="text-xl font-bold text-restaurant-dark mb-2">Catégories</h2>
            <p className="text-gray-600 mb-4">
              {categories.length} catégories disponibles
            </p>
            <div className="space-y-2">
              {categories.map((category) => (
                <div key={category.id} className="flex items-center justify-between py-2 border-b">
                  <span className="font-medium">{category.name}</span>
                  <span className="text-sm text-gray-500">
                    {menuItems.filter(item => item.categoryId === category.id).length} produits
                  </span>
                </div>
              ))}
            </div>
            <div className="mt-4">
              <Link to="/categories">
                <Button className="bg-restaurant-red hover:bg-restaurant-red/90 text-white">
                  Gérer les catégories
                </Button>
              </Link>
            </div>
          </Card>
          
          <Card className="p-6 shadow-md">
            <h2 className="text-xl font-bold text-restaurant-dark mb-2">Produits</h2>
            <p className="text-gray-600 mb-4">
              {menuItems.length} produits au menu
            </p>
            <div className="space-y-2">
              <div className="flex justify-between text-sm text-gray-500 border-b py-1">
                <span>Produit</span>
                <span>Prix</span>
              </div>
              {menuItems.slice(0, 5).map((item) => (
                <div key={item.id} className="flex items-center justify-between py-2 border-b">
                  <span className="font-medium">{item.title}</span>
                  <span>{item.price.toFixed(2)} €</span>
                </div>
              ))}
              {menuItems.length > 5 && (
                <div className="text-center text-sm text-gray-500 pt-2">
                  Et {menuItems.length - 5} autres produits...
                </div>
              )}
            </div>
            <div className="mt-4">
              <Link to="/products">
                <Button className="bg-restaurant-red hover:bg-restaurant-red/90 text-white">
                  Gérer les produits
                </Button>
              </Link>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
