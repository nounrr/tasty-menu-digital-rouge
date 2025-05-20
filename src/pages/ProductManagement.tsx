import { useState, useEffect } from 'react';
import { useToast } from "@/hooks/use-toast";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Image } from 'lucide-react';
import Navbar from '../components/Navbar';
import { menuItems as initialMenuItems, categories, restaurants, MenuItem, getCategoriesByRestaurant } from '../data/menuData';

const ProductManagement = () => {
  const [menuItems, setMenuItems] = useState<MenuItem[]>(initialMenuItems);
  const [editProductId, setEditProductId] = useState<number | null>(null);
  const [selectedRestaurantId, setSelectedRestaurantId] = useState(restaurants[0]?.id || 0);
  const [restaurantCategories, setRestaurantCategories] = useState(getCategoriesByRestaurant(selectedRestaurantId));
  
  // New product form
  const [newTitle, setNewTitle] = useState("");
  const [newPrice, setNewPrice] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [newCategoryId, setNewCategoryId] = useState("");
  const [newImage, setNewImage] = useState("");
  
  // Edit product form
  const [editTitle, setEditTitle] = useState("");
  const [editPrice, setEditPrice] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [editCategoryId, setEditCategoryId] = useState("");
  const [editImage, setEditImage] = useState("");
  
  const { toast } = useToast();

  useEffect(() => {
    setRestaurantCategories(getCategoriesByRestaurant(selectedRestaurantId));
    setNewCategoryId("");
  }, [selectedRestaurantId]);

  const filteredMenuItems = menuItems.filter(item => {
    const itemCategory = categories.find(cat => cat.id === item.categoryId);
    return itemCategory && itemCategory.restaurantId === selectedRestaurantId;
  });

  const handleChangeRestaurant = (value: string) => {
    setSelectedRestaurantId(parseInt(value));
  };

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
        categoryId: Number(newCategoryId),
        restaurantId: selectedRestaurantId,
        image: newImage || undefined
      }
    ]);

    // Reset form
    setNewTitle("");
    setNewPrice("");
    setNewDescription("");
    setNewCategoryId("");
    setNewImage("");
    
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
    setEditImage(product.image || "placeholder.svg");
  };

  const cancelEdit = () => {
    setEditProductId(null);
    setEditTitle("");
    setEditPrice("");
    setEditDescription("");
    setEditCategoryId("");
    setEditImage("");
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
              categoryId: Number(editCategoryId),
              image: editImage || undefined
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
                  {restaurantCategories.map((category) => (
                    <SelectItem key={category.id} value={category.id.toString()}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Image (lien URL)</label>
              <div className="flex gap-2 items-center">
                <Input
                  placeholder="URL de l'image"
                  value={newImage}
                  onChange={(e) => setNewImage(e.target.value)}
                />
              </div>
              {newImage && (
                <div className="mt-2 w-16 h-16 rounded overflow-hidden border bg-gray-100">
                  <img 
                    src={newImage} 
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
          
          {filteredMenuItems.length === 0 ? (
            <p className="text-gray-500 text-center py-4">Aucun produit disponible pour ce restaurant</p>
          ) : (
            <div className="space-y-4">
              {filteredMenuItems.map((product) => (
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
                            {restaurantCategories.map((category) => (
                              <SelectItem key={category.id} value={category.id.toString()}>
                                {category.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
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
                        <div className="flex gap-4">
                          {product.image && (
                            <div className="w-16 h-16 rounded overflow-hidden border flex-shrink-0">
                              <img 
                                src={product.image} 
                                alt={product.title}
                                className="w-full h-full object-cover"
                              />
                            </div>
                          )}
                          <div>
                            <h3 className="font-medium text-lg">{product.title}</h3>
                            <p className="text-sm text-gray-500">
                              Catégorie: {categories.find(c => c.id === product.categoryId)?.name}
                            </p>
                          </div>
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
