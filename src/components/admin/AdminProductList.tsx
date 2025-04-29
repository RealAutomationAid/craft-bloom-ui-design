
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Edit, Trash2 } from "lucide-react";

// Dummy products for demo
const dummyProducts = [
  {
    id: "1",
    title: "Комплект акрилни мъниста, пастелни цветове",
    price: 15.99,
    oldPrice: 19.99,
    image: "https://images.unsplash.com/photo-1516116216624-53e697fedbea?auto=format&fit=crop&q=80&w=500",
    isNew: true,
    isSale: true,
    category: "Мъниста",
    slug: "komplekt-akrilni-munista-pastelni",
  },
  {
    id: "2",
    title: "Картон за скрапбукинг, двустранен, 30.5x30.5 см",
    price: 2.50,
    image: "https://images.unsplash.com/photo-1626633558329-8d5f709bb1bb?auto=format&fit=crop&q=80&w=500",
    category: "Скрапбукинг",
    slug: "karton-skrapbuking-dvustranen",
  },
  {
    id: "3",
    title: "Акрилни бои за декорация, комплект от 12 цвята",
    price: 24.99,
    oldPrice: 29.99,
    image: "https://images.unsplash.com/photo-1501556424050-d4816356b73e?auto=format&fit=crop&q=80&w=500",
    isSale: true,
    category: "Арт материали",
    slug: "akrilni-boi-dekoracia-komplekt",
  },
];

const AdminProductList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [products, setProducts] = useState(dummyProducts);
  
  const filteredProducts = products.filter(product => 
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const handleDelete = (id: string) => {
    if (window.confirm("Сигурни ли сте, че искате да изтриете този продукт?")) {
      setProducts(products.filter(product => product.id !== id));
    }
  };
  
  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <Input 
          placeholder="Търси продукти..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-1"
        />
      </div>
      
      <div className="border rounded-md overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Изображение</TableHead>
              <TableHead>Продукт</TableHead>
              <TableHead>Категория</TableHead>
              <TableHead>Цена</TableHead>
              <TableHead className="text-right">Действия</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredProducts.map((product) => (
              <TableRow key={product.id}>
                <TableCell>
                  <div className="w-16 h-16 relative">
                    <img 
                      src={product.image} 
                      alt={product.title}
                      className="w-full h-full object-cover rounded"
                    />
                  </div>
                </TableCell>
                <TableCell>
                  <div>
                    <div className="font-medium">{product.title}</div>
                    <div className="flex gap-2 mt-1">
                      {product.isNew && (
                        <span className="badge badge-new text-xs">Ново</span>
                      )}
                      {product.isSale && (
                        <span className="badge badge-sale text-xs">Промоция</span>
                      )}
                    </div>
                  </div>
                </TableCell>
                <TableCell>{product.category}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{product.price.toFixed(2)} лв</span>
                    {product.oldPrice && (
                      <span className="text-gray-400 line-through text-sm">
                        {product.oldPrice.toFixed(2)} лв
                      </span>
                    )}
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button variant="ghost" size="icon">
                      <Edit size={16} />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="icon"
                      onClick={() => handleDelete(product.id)}
                    >
                      <Trash2 size={16} />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
            
            {filteredProducts.length === 0 && (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-8 text-gray-500">
                  Няма намерени продукти
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default AdminProductList;
