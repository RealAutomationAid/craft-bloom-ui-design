
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Label } from "@/components/ui/label";

type Product = {
  id: string;
  title: string;
  price: number;
  is_new: boolean;
  slug: string;
  image?: string;
  category?: string;
};

const AdminNewProductsSelector = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const { toast } = useToast();
  
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      
      if (data) {
        setProducts(data);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
      toast({
        variant: "destructive",
        title: "Грешка при зареждане на продуктите",
        description: "Възникна проблем при зареждането на продуктите.",
      });
    } finally {
      setLoading(false);
    }
  };

  const updateProductStatus = async (id: string, isNew: boolean) => {
    try {
      const { error } = await supabase
        .from('products')
        .update({ is_new: isNew })
        .eq('id', id);
      
      if (error) throw error;
      
      setProducts(products.map(product => 
        product.id === id ? { ...product, is_new: isNew } : product
      ));
    } catch (error) {
      console.error("Error updating product status:", error);
      toast({
        variant: "destructive",
        title: "Грешка при обновяване на продукта",
        description: "Възникна проблем при обновяването на статуса на продукта.",
      });
    }
  };

  const saveAllChanges = async () => {
    try {
      setSaving(true);
      
      const updates = products.map(product => ({
        id: product.id,
        is_new: product.is_new
      }));
      
      // For simplicity, we'll update them one by one
      for (const update of updates) {
        const { error } = await supabase
          .from('products')
          .update({ is_new: update.is_new })
          .eq('id', update.id);
          
        if (error) throw error;
      }
      
      toast({
        title: "Промените са запазени успешно",
        description: "Статусът на продуктите е обновен.",
      });
    } catch (error) {
      console.error("Error saving changes:", error);
      toast({
        variant: "destructive",
        title: "Грешка при запазване на промените",
        description: "Възникна проблем при запазването на промените.",
      });
    } finally {
      setSaving(false);
    }
  };

  const filteredProducts = searchTerm
    ? products.filter(product => 
        product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.category?.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : products;

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between mb-6">
        <div className="mb-4 sm:mb-0">
          <Input
            type="text"
            placeholder="Търси продукти..."
            className="w-full max-w-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <Button onClick={saveAllChanges} disabled={loading || saving}>
          {saving ? "Запазване..." : "Запази всички промени"}
        </Button>
      </div>
      
      {loading ? (
        <div className="flex justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
        </div>
      ) : filteredProducts.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-500">Няма намерени продукти</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="p-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Продукт</th>
                <th className="p-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Категория</th>
                <th className="p-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Цена</th>
                <th className="p-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Нов продукт</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredProducts.map((product) => (
                <tr key={product.id} className="hover:bg-gray-50">
                  <td className="p-3">
                    <div className="flex items-center">
                      {product.image && (
                        <img 
                          src={product.image} 
                          alt={product.title} 
                          className="h-10 w-10 object-cover rounded mr-3"
                        />
                      )}
                      <span>{product.title}</span>
                    </div>
                  </td>
                  <td className="p-3">{product.category || "-"}</td>
                  <td className="p-3">{product.price.toFixed(2)} лв.</td>
                  <td className="p-3">
                    <div className="flex items-center">
                      <Checkbox 
                        id={`is-new-${product.id}`}
                        checked={product.is_new}
                        onCheckedChange={(checked) => {
                          updateProductStatus(product.id, checked === true);
                        }}
                      />
                      <Label htmlFor={`is-new-${product.id}`} className="ml-2">
                        {product.is_new ? "Да" : "Не"}
                      </Label>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminNewProductsSelector;
