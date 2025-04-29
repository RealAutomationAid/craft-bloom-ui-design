
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { ImageUpload } from "@/components/admin/ImageUpload";

// Dummy categories for parent selection
const dummyCategories = [
  { id: "1", name: "Мъниста", slug: "munista" },
  { id: "2", name: "Скрапбукинг", slug: "skrapbuking" },
  { id: "3", name: "Арт материали", slug: "art-materiali" },
  { id: "4", name: "Хоби и крафт", slug: "hobi-i-kraft" },
  { id: "5", name: "Естествени камъни", slug: "estestveni-kamani" },
];

const AdminCategoryForm = () => {
  const { toast } = useToast();
  const [image, setImage] = useState<string>("");
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    
    // This would normally be sent to an API
    const categoryData = {
      name: formData.get("name"),
      description: formData.get("description"),
      parentId: formData.get("parentId") || null,
      image: image || null,
    };
    
    console.log("Category data:", categoryData);
    
    toast({
      title: "Категорията е създадена",
      description: "Категорията беше успешно добавена.",
    });
    
    // Reset form
    (e.target as HTMLFormElement).reset();
    setImage("");
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">Име на категорията</Label>
        <Input id="name" name="name" required />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="description">Описание</Label>
        <Textarea id="description" name="description" rows={4} />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="parentId">Родителска категория (незадължително)</Label>
        <Select name="parentId">
          <SelectTrigger>
            <SelectValue placeholder="Избери родителска категория" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="none">-- Няма родителска категория --</SelectItem>
            {dummyCategories.map((category) => (
              <SelectItem key={category.id} value={category.id}>{category.name}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      <div className="space-y-2">
        <Label>Изображение на категорията</Label>
        <ImageUpload 
          images={image ? [image] : []} 
          onChange={(images) => setImage(images[0] || "")}
          maxImages={1}
        />
      </div>
      
      <Button type="submit" className="w-full">Създай категория</Button>
    </form>
  );
};

export default AdminCategoryForm;
