
import { useState } from 'react';
import { useToast } from "@/hooks/use-toast";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card } from '@/components/ui/card';
import Navbar from '../components/Navbar';
import { menuItems as initialMenuItems, categories, MenuItem } from '../data/menuData';

const ProductManagement = () => {
  const [menuItems, setMenuItems] = useState<MenuItem[]>(initialMenuItems);
  const [editProductId, setEditProductId] = useState<number | null>(null);
  
  // New product form
  const [newTitle, setNewTitle] = useState("");
  const [newPrice, setNewPrice] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [newCategoryId, setNewCategoryId] = useState("");
  
  // Edit product form
  const [editTitle, setEditTitle] = useState("");
  const [editPrice, setEditPrice] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [editCategoryId, setEditCategoryId] = useState("");
  
  const { toast } = useToast();

  const handleAddProduct = () => {
    // Validation
    if (newTitle.trim() === "") {
      toast({
        title: "Erreur",
        description: "Le titre du produit ne peut pas être vide",
        variant: "destructive"
      });
      return;
    }

    if (isNaN(Number(newPrice)) || Number(newPrice) <= 0) {
      toast({
        title: "Erreur",
        description: "Le prix doit être un nombre positif",
        variant: "destructive"
      });
      return;
    }

    if (!newCategoryId) {
      toast({
        title: "Erreur",
        description: "Veuillez sélectionner une catégorie",
        variant: "destructive"
      });
      return;
    }

    // Add new product
    const newId = Math.max(...menuItems.map(item => item.id)) + 1;
    
    setMenuItems([
      ...menuItems,
      {
        id: newId,
        title: newTitle.trim(),
        price: Number(newPrice),
        description: newDescription.trim() || undefined,
        categoryId: Number(newCategoryId)
      }
    ]);

    // Reset form
    setNewTitle("");
    setNewPrice("");
    setNewDescription("");
    setNewCategoryId("");
    
    toast({
      title: "Produit ajouté",
      description: `"${newTitle}" a été ajouté avec succès.`
    });
  };

  const startEdit = (product: MenuItem) => {
    setEditProductId(product.id);
    setEditTitle(product.title);
    setEditPrice(product.price.toString());
    setEditDescription(product.description || "");
    setEditCategoryId(product.categoryId.toString());
  };

  const cancelEdit = () => {
    setEditProductId(null);
    setEditTitle("");
    setEditPrice("");
    setEditDescription("");
    setEditCategoryId("");
  };

  const saveEdit = () => {
    // Validation
    if (editTitle.trim() === "") {
      toast({
        title: "Erreur",
        description: "Le titre du produit ne peut pas être vide",
        variant: "destructive"
      });
      return;
    }

    if (isNaN(Number(editPrice)) || Number(editPrice) <= 0) {
      toast({
        title: "Erreur",
        description: "Le prix doit être un nombre positif",
        variant: "destructive"
      });
      return;
    }

    setMenuItems(
      menuItems.map(item =>
        item.id === editProductId 
          ? { 
              ...item, 
              title: editTitle.trim(),
              price: Number(editPrice),
              description: editDescription.trim() || undefined,
              categoryId: Number(editCategoryId)
            } 
          : item
      )
    );

    toast({
      title: "Produit modifié",
      description: `"${editTitle}" a été modifié avec succès.`
    });
    
    cancelEdit();
  };

  const deleteProduct = (id: number) => {
    setMenuItems(menuItems.filter(item => item.id !== id));
    
    toast({
      title: "Produit supprimé",
      description: `Le produit a été supprimé avec succès.`
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      
      <div className="flex-grow container mx-auto px-4 py-8">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-restaurant-dark">
              Gestion des Produits
            </h1>
            <p className="text-gray-600">
              Ajoutez, modifiez ou supprimez des produits du menu
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
          <h2 className="text-xl font-bold text-restaurant-dark mb-4">Ajouter un produit</h2>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Titre</label>
                <Input
                  placeholder="Titre du produit"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Prix (€)</label>
                <Input
                  type="number"
                  step="0.01"
                  placeholder="0.00"
                  value={newPrice}
                  onChange={(e) => setNewPrice(e.target.value)}
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Catégorie</label>
              <Select value={newCategoryId} onValueChange={setNewCategoryId}>
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionner une catégorie" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category.id} value={category.id.toString()}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Description (optionnelle)</label>
              <Textarea
                placeholder="Description du produit"
                value={newDescription}
                onChange={(e) => setNewDescription(e.target.value)}
              />
            </div>
            
            <Button 
              onClick={handleAddProduct}
              className="bg-restaurant-red hover:bg-restaurant-red/90 text-white"
            >
              Ajouter le produit
            </Button>
          </div>
        </Card>
        
        <Card className="p-6 shadow-md">
          <h2 className="text-xl font-bold text-restaurant-dark mb-4">Produits existants</h2>
          
          {menuItems.length === 0 ? (
            <p className="text-gray-500 text-center py-4">Aucun produit disponible</p>
          ) : (
            <div className="space-y-4">
              {menuItems.map((product) => (
                <div 
                  key={product.id} 
                  className="border rounded-lg p-4 bg-white"
                >
                  {editProductId === product.id ? (
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Titre</label>
                          <Input
                            value={editTitle}
                            onChange={(e) => setEditTitle(e.target.value)}
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Prix (€)</label>
                          <Input
                            type="number"
                            step="0.01"
                            value={editPrice}
                            onChange={(e) => setEditPrice(e.target.value)}
                          />
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Catégorie</label>
                        <Select value={editCategoryId} onValueChange={setEditCategoryId}>
                          <SelectTrigger>
                            <SelectValue placeholder="Sélectionner une catégorie" />
                          </SelectTrigger>
                          <SelectContent>
                            {categories.map((category) => (
                              <SelectItem key={category.id} value={category.id.toString()}>
                                {category.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                        <Textarea
                          value={editDescription}
                          onChange={(e) => setEditDescription(e.target.value)}
                        />
                      </div>
                      
                      <div className="flex gap-2">
                        <Button 
                          onClick={saveEdit}
                          variant="default"
                        >
                          Sauvegarder
                        </Button>
                        <Button 
                          onClick={cancelEdit}
                          variant="outline"
                        >
                          Annuler
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="font-medium text-lg">{product.title}</h3>
                          <p className="text-sm text-gray-500">
                            Catégorie: {categories.find(c => c.id === product.categoryId)?.name}
                          </p>
                        </div>
                        <div className="text-restaurant-red font-bold">
                          {product.price.toFixed(2)} €
                        </div>
                      </div>
                      
                      {product.description && (
                        <p className="text-gray-700 mb-4 text-sm">{product.description}</p>
                      )}
                      
                      <div className="flex gap-2 mt-2">
                        <Button 
                          onClick={() => startEdit(product)}
                          variant="outline"
                          size="sm"
                        >
                          Modifier
                        </Button>
                        <Button 
                          onClick={() => deleteProduct(product.id)}
                          variant="destructive"
                          size="sm"
                        >
                          Supprimer
                        </Button>
                      </div>
                    </div>
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

export default ProductManagement;
