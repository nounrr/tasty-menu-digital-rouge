
import { useState } from 'react';
import { useToast } from "@/hooks/use-toast";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Image } from 'lucide-react';
import Navbar from '../components/Navbar';
import { categories as initialCategories, restaurants, Category } from '../data/menuData';

const CategoryManagement = () => {
  const [categories, setCategories] = useState<Category[]>(initialCategories);
  const [newCategory, setNewCategory] = useState("");
  const [newCategoryImage, setNewCategoryImage] = useState("");
  const [editCategoryId, setEditCategoryId] = useState<number | null>(null);
  const [editName, setEditName] = useState("");
  const [editImage, setEditImage] = useState("");
  const [selectedRestaurantId, setSelectedRestaurantId] = useState(restaurants[0]?.id || 0);
  const { toast } = useToast();

  const filteredCategories = categories.filter(
    category => category.restaurantId === selectedRestaurantId
  );

  const handleAddCategory = () => {
    if (newCategory.trim() === "") {
      toast({
        title: "Erreur",
        description: "Le nom de la catégorie ne peut pas être vide",
        variant: "destructive"
      });
      return;
    }

    const newId = Math.max(...categories.map(c => c.id)) + 1;
    setCategories([
      ...categories, 
      { 
        id: newId, 
        name: newCategory.trim(), 
        restaurantId: selectedRestaurantId,
        image: newCategoryImage || undefined
      }
    ]);
    setNewCategory("");
    setNewCategoryImage("");
    
    toast({
      title: "Catégorie ajoutée",
      description: `La catégorie "${newCategory}" a été ajoutée avec succès.`
    });
  };

  const startEdit = (category: Category) => {
    setEditCategoryId(category.id);
    setEditName(category.name);
    setEditImage(category.image || "placeholder.svg");
  };

  const cancelEdit = () => {
    setEditCategoryId(null);
    setEditName("");
    setEditImage("");
  };

  const saveEdit = () => {
    if (editName.trim() === "") {
      toast({
        title: "Erreur",
        description: "Le nom de la catégorie ne peut pas être vide",
        variant: "destructive"
      });
      return;
    }

    setCategories(
      categories.map(cat =>
        cat.id === editCategoryId ? { ...cat, name: editName, image: editImage || undefined } : cat
      )
    );

    toast({
      title: "Catégorie modifiée",
      description: `La catégorie a été modifiée avec succès.`
    });
    
    cancelEdit();
  };

  const deleteCategory = (id: number) => {
    setCategories(categories.filter(cat => cat.id !== id));
    
    toast({
      title: "Catégorie supprimée",
      description: `La catégorie a été supprimée avec succès.`
    });
  };

  const handleChangeRestaurant = (value: string) => {
    setSelectedRestaurantId(parseInt(value));
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      
      <div className="flex-grow container mx-auto px-4 py-8">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-restaurant-dark">
              Gestion des Catégories
            </h1>
            <p className="text-gray-600">
              Ajoutez, modifiez ou supprimez des catégories de menu
            </p>
          </div>
          <Button 
            onClick={() => window.history.back()}
            variant="outline"
          >
            Retour
          </Button>
        </div>
        
        <div className="mb-6">
          <h2 className="text-lg font-medium text-restaurant-dark mb-3">Sélectionner un restaurant</h2>
          <Tabs 
            defaultValue={selectedRestaurantId.toString()} 
            onValueChange={handleChangeRestaurant}
            className="w-full"
          >
            <TabsList className="mb-4">
              {restaurants.map(restaurant => (
                <TabsTrigger key={restaurant.id} value={restaurant.id.toString()}>
                  {restaurant.name}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>
        
        <Card className="p-6 shadow-md mb-6">
          <h2 className="text-xl font-bold text-restaurant-dark mb-4">Ajouter une catégorie</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Nom</label>
              <Input
                placeholder="Nom de la catégorie"
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
                className="flex-grow"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Image (lien URL)</label>
              <div className="flex gap-2 items-center">
                <Input
                  placeholder="URL de l'image"
                  value={newCategoryImage}
                  onChange={(e) => setNewCategoryImage(e.target.value)}
                />
              </div>
              {newCategoryImage && (
                <div className="mt-2 w-16 h-16 rounded overflow-hidden border bg-gray-100">
                  <img 
                    src={newCategoryImage} 
                    alt="Aperçu"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.src = 'placeholder.svg';
                      toast({
                        title: "Erreur d'image",
                        description: "L'URL de l'image n'est pas valide",
                        variant: "destructive"
                      });
                    }}
                  />
                </div>
              )}
            </div>
            
            <Button 
              onClick={handleAddCategory}
              className="bg-restaurant-red hover:bg-restaurant-red/90 text-white"
            >
              Ajouter
            </Button>
          </div>
        </Card>
        
        <Card className="p-6 shadow-md">
          <h2 className="text-xl font-bold text-restaurant-dark mb-4">Catégories existantes</h2>
          
          {filteredCategories.length === 0 ? (
            <p className="text-gray-500 text-center py-4">Aucune catégorie disponible pour ce restaurant</p>
          ) : (
            <div className="space-y-4">
              {filteredCategories.map((category) => (
                <div 
                  key={category.id} 
                  className="border rounded-lg p-4 flex items-center justify-between bg-white"
                >
                  {editCategoryId === category.id ? (
                    <div className="space-y-4 w-full">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Nom</label>
                        <Input
                          value={editName}
                          onChange={(e) => setEditName(e.target.value)}
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Image</label>
                        <div className="flex gap-2 items-center">
                          <Input
                            placeholder="URL de l'image"
                            value={editImage}
                            onChange={(e) => setEditImage(e.target.value)}
                          />
                          <Button variant="outline" size="icon">
                            <Image className="h-4 w-4" />
                          </Button>
                        </div>
                        {editImage && (
                          <div className="mt-2 w-16 h-16 rounded overflow-hidden border">
                            <img 
                              src={editImage} 
                              alt="Aperçu"
                              className="w-full h-full object-cover"
                            />
                          </div>
                        )}
                      </div>
                      
                      <div className="flex gap-2">
                        <Button 
                          onClick={saveEdit}
                          variant="default"
                          size="sm"
                        >
                          Sauvegarder
                        </Button>
                        <Button 
                          onClick={cancelEdit}
                          variant="outline"
                          size="sm"
                        >
                          Annuler
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className="flex items-center gap-3">
                        {category.image && (
                          <div className="w-10 h-10 rounded overflow-hidden border">
                            <img 
                              src={category.image} 
                              alt={category.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        )}
                        <span className="font-medium">{category.name}</span>
                      </div>
                      <div className="flex gap-2">
                        <Button 
                          onClick={() => startEdit(category)}
                          variant="outline"
                          size="sm"
                        >
                          Modifier
                        </Button>
                        <Button 
                          onClick={() => deleteCategory(category.id)}
                          variant="destructive"
                          size="sm"
                        >
                          Supprimer
                        </Button>
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};

export default CategoryManagement;
