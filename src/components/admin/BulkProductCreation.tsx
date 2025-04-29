
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Laptop } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

// Dummy categories for dropdown
const dummyCategories = [
  { id: "1", name: "Мъниста", slug: "munista" },
  { id: "2", name: "Скрапбукинг", slug: "skrapbuking" },
  { id: "3", name: "Арт материали", slug: "art-materiali" },
  { id: "4", name: "Хоби и крафт", slug: "hobi-i-kraft" },
  { id: "5", name: "Естествени камъни", slug: "estestveni-kamani" },
];

// Initial empty product row structure
const emptyProduct = {
  id: Date.now().toString(),
  title: "",
  price: "",
  oldPrice: "",
  category: "",
  quantity: "",
  isSale: false,
  isNew: true,
};

const BulkProductCreation = () => {
  const { toast } = useToast();
  const isMobile = useIsMobile();
  const [products, setProducts] = useState([{ ...emptyProduct }]);
  
  const addRow = () => {
    setProducts([...products, { ...emptyProduct, id: Date.now().toString() }]);
  };
  
  const removeRow = (id: string) => {
    if (products.length === 1) {
      toast({
        title: "Не може да се премахне",
        description: "Трябва да има поне един продукт в списъка.",
        variant: "destructive",
      });
      return;
    }
    setProducts(products.filter(product => product.id !== id));
  };
  
  const updateProduct = (id: string, field: string, value: any) => {
    setProducts(products.map(product => 
      product.id === id ? { ...product, [field]: value } : product
    ));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate products
    const hasEmptyFields = products.some(p => !p.title || !p.price || !p.category || !p.quantity);
    
    if (hasEmptyFields) {
      toast({
        title: "Непълни данни",
        description: "Моля, попълнете всички задължителни полета за всеки продукт.",
        variant: "destructive",
      });
      return;
    }
    
    // Format product data for API submission
    const formattedProducts = products.map(p => ({
      title: p.title,
      price: parseFloat(p.price),
      oldPrice: p.oldPrice ? parseFloat(p.oldPrice) : null,
      categoryId: p.category,
      quantity: parseInt(p.quantity),
      isSale: Boolean(p.oldPrice && parseFloat(p.oldPrice) > 0),
      isNew: p.isNew,
    }));
    
    console.log("Bulk products data:", formattedProducts);
    
    toast({
      title: "Продуктите са създадени",
      description: `${formattedProducts.length} продукта бяха успешно добавени.`,
    });
    
    // Reset form
    setProducts([{ ...emptyProduct, id: Date.now().toString() }]);
  };
  
  // Display mobile warning
  useEffect(() => {
    if (isMobile) {
      toast({
        title: "Препоръчваме десктоп изглед",
        description: "Тази функция е оптимизирана за десктоп или лаптоп. На мобилни устройства изгледът може да бъде ограничен.",
        duration: 5000,
      });
    }
  }, [isMobile, toast]);
  
  return (
    <div className="space-y-4">
      {isMobile && (
        <div className="bg-amber-50 border border-amber-200 p-3 rounded-md flex items-center gap-2 mb-4">
          <Laptop className="text-amber-500" />
          <p className="text-amber-800 text-sm">
            Тази функция е оптимизирана за десктоп или лаптоп. На мобилни устройства изгледът може да бъде ограничен.
          </p>
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        <div className="border rounded-md overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[280px]">Продукт</TableHead>
                <TableHead>Категория</TableHead>
                <TableHead className="w-[100px]">Цена</TableHead>
                <TableHead className="w-[100px]">Стара цена</TableHead>
                <TableHead className="w-[100px]">Количество</TableHead>
                <TableHead className="w-[100px]">Действия</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products.map((product) => (
                <TableRow key={product.id}>
                  <TableCell>
                    <Input
                      value={product.title}
                      onChange={(e) => updateProduct(product.id, "title", e.target.value)}
                      placeholder="Име на продукт"
                      required
                    />
                  </TableCell>
                  <TableCell>
                    <Select
                      value={product.category}
                      onValueChange={(value) => updateProduct(product.id, "category", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Избери категория" />
                      </SelectTrigger>
                      <SelectContent>
                        {dummyCategories.map((category) => (
                          <SelectItem key={category.id} value={category.id}>{category.name}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </TableCell>
                  <TableCell>
                    <div className="relative">
                      <Input
                        type="number"
                        min="0"
                        step="0.01"
                        value={product.price}
                        onChange={(e) => updateProduct(product.id, "price", e.target.value)}
                        placeholder="0.00"
                        required
                        className="pl-6"
                      />
                      <span className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400">лв</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="relative">
                      <Input
                        type="number"
                        min="0"
                        step="0.01"
                        value={product.oldPrice}
                        onChange={(e) => updateProduct(product.id, "oldPrice", e.target.value)}
                        placeholder="0.00"
                        className="pl-6"
                      />
                      <span className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400">лв</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Input
                      type="number"
                      min="0"
                      step="1"
                      value={product.quantity}
                      onChange={(e) => updateProduct(product.id, "quantity", e.target.value)}
                      placeholder="0"
                      required
                    />
                  </TableCell>
                  <TableCell>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => removeRow(product.id)}
                    >
                      Изтрий
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        
        <div className="flex justify-between mt-4">
          <Button type="button" variant="outline" onClick={addRow}>
            + Добави още един ред
          </Button>
          <Button type="submit">
            Създай всички продукти
          </Button>
        </div>
      </form>
    </div>
  );
};

export default BulkProductCreation;
