
import { useState } from 'react';
import { useToast } from "@/hooks/use-toast";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import Navbar from '../components/Navbar';
import { categories as initialCategories, Category } from '../data/menuData';

const CategoryManagement = () => {
  const [categories, setCategories] = useState<Category[]>(initialCategories);
  const [newCategory, setNewCategory] = useState("");
  const [editCategoryId, setEditCategoryId] = useState<number | null>(null);
  const [editName, setEditName] = useState("");
  const { toast } = useToast();

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
    setCategories([...categories, { id: newId, name: newCategory.trim() }]);
    setNewCategory("");
    
    toast({
      title: "Catégorie ajoutée",
      description: `La catégorie "${newCategory}" a été ajoutée avec succès.`
    });
  };

  const startEdit = (category: Category) => {
    setEditCategoryId(category.id);
    setEditName(category.name);
  };

  const cancelEdit = () => {
    setEditCategoryId(null);
    setEditName("");
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
        cat.id === editCategoryId ? { ...cat, name: editName } : cat
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
        
        <Card className="p-6 shadow-md mb-6">
          <h2 className="text-xl font-bold text-restaurant-dark mb-4">Ajouter une catégorie</h2>
          <div className="flex gap-2">
            <Input
              placeholder="Nom de la catégorie"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              className="flex-grow"
            />
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
          
          {categories.length === 0 ? (
            <p className="text-gray-500 text-center py-4">Aucune catégorie disponible</p>
          ) : (
            <div className="space-y-4">
              {categories.map((category) => (
                <div 
                  key={category.id} 
                  className="border rounded-lg p-4 flex items-center justify-between bg-white"
                >
                  {editCategoryId === category.id ? (
                    <div className="flex gap-2 items-center flex-grow">
                      <Input
                        value={editName}
                        onChange={(e) => setEditName(e.target.value)}
                        className="flex-grow"
                      />
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
                  ) : (
                    <>
                      <span className="font-medium">{category.name}</span>
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
