
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { ImageUpload } from "@/components/admin/ImageUpload";

// Dummy categories for demo
const dummyCategories = [
  { id: "1", name: "Мъниста", slug: "munista" },
  { id: "2", name: "Скрапбукинг", slug: "skrapbuking" },
  { id: "3", name: "Арт материали", slug: "art-materiali" },
  { id: "4", name: "Хоби и крафт", slug: "hobi-i-kraft" },
  { id: "5", name: "Естествени камъни", slug: "estestveni-kamani" },
];

const AdminProductForm = () => {
  const { toast } = useToast();
  const [images, setImages] = useState<string[]>([]);
  const [isNew, setIsNew] = useState(false);
  const [isSale, setIsSale] = useState(false);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    
    // This would normally be sent to an API
    const productData = {
      title: formData.get("title"),
      description: formData.get("description"),
      price: formData.get("price"),
      oldPrice: formData.get("oldPrice"),
      category: formData.get("category"),
      stock: formData.get("stock"),
      images,
      isNew,
      isSale,
    };
    
    console.log("Product data:", productData);
    
    toast({
      title: "Продуктът е създаден",
      description: "Продуктът беше успешно добавен.",
    });
    
    // Reset form
    (e.target as HTMLFormElement).reset();
    setImages([]);
    setIsNew(false);
    setIsSale(false);
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="title">Име на продукт</Label>
        <Input id="title" name="title" required />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="description">Описание</Label>
        <Textarea id="description" name="description" rows={4} />
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="price">Цена (лв)</Label>
          <Input id="price" name="price" type="number" step="0.01" min="0" required />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="oldPrice">Стара цена (лв)</Label>
          <Input id="oldPrice" name="oldPrice" type="number" step="0.01" min="0" />
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="category">Категория</Label>
          <Select name="category">
            <SelectTrigger>
              <SelectValue placeholder="Избери категория" />
            </SelectTrigger>
            <SelectContent>
              {dummyCategories.map((category) => (
                <SelectItem key={category.id} value={category.id}>{category.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="stock">Количество в наличност</Label>
          <Input id="stock" name="stock" type="number" min="0" required />
        </div>
      </div>
      
      <div className="space-y-2">
        <Label>Изображения</Label>
        <ImageUpload 
          images={images} 
          onChange={setImages}
          maxImages={5}
        />
      </div>
      
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2">
          <Switch 
            id="isNew" 
            checked={isNew} 
            onCheckedChange={setIsNew}
          />
          <Label htmlFor="isNew">Нов продукт</Label>
        </div>
        
        <div className="flex items-center space-x-2">
          <Switch 
            id="isSale" 
            checked={isSale} 
            onCheckedChange={setIsSale}
          />
          <Label htmlFor="isSale">Промоция</Label>
        </div>
      </div>
      
      <Button type="submit" className="w-full">Създай продукт</Button>
    </form>
  );
};

export default AdminProductForm;
