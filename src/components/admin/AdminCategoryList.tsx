
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
import { ChevronDown, ChevronRight, Edit, Folder, Trash2 } from "lucide-react";

interface Category {
  id: string;
  name: string;
  count: number;
  slug: string;
  subCategories?: Category[];
}

// Dummy categories for demo
const dummyCategories: Category[] = [
  {
    id: "1",
    name: "Мъниста",
    count: 24,
    slug: "munista",
    subCategories: [
      {
        id: "1-1",
        name: "Акрилни мъниста",
        count: 12,
        slug: "akrilni-munista",
      },
      {
        id: "1-2",
        name: "Стъклени мъниста",
        count: 8,
        slug: "stakleni-munista",
      }
    ]
  },
  {
    id: "2",
    name: "Скрапбукинг",
    count: 18,
    slug: "skrapbuking",
    subCategories: [
      {
        id: "2-1",
        name: "Хартии и картони",
        count: 10,
        slug: "hartii-i-kartoni",
      }
    ]
  },
  {
    id: "3",
    name: "Арт материали",
    count: 32,
    slug: "art-materiali",
  }
];

const CategoryRow = ({ 
  category, 
  level = 0, 
  onDelete 
}: { 
  category: Category; 
  level?: number;
  onDelete: (id: string) => void;
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const hasSubcategories = category.subCategories && category.subCategories.length > 0;
  
  return (
    <>
      <TableRow>
        <TableCell>
          <div className="flex items-center" style={{ paddingLeft: `${level * 24}px` }}>
            {hasSubcategories ? (
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-8 w-8 mr-2"
                onClick={() => setIsExpanded(!isExpanded)}
              >
                {isExpanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
              </Button>
            ) : (
              <div className="w-8 mr-2" />
            )}
            <Folder size={16} className="mr-2 text-gray-500" />
            <span>{category.name}</span>
          </div>
        </TableCell>
        <TableCell>{category.count}</TableCell>
        <TableCell className="text-right">
          <div className="flex justify-end gap-2">
            <Button variant="ghost" size="icon">
              <Edit size={16} />
            </Button>
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => onDelete(category.id)}
            >
              <Trash2 size={16} />
            </Button>
          </div>
        </TableCell>
      </TableRow>
      
      {isExpanded && hasSubcategories && category.subCategories?.map(subCategory => (
        <CategoryRow 
          key={subCategory.id} 
          category={subCategory} 
          level={level + 1} 
          onDelete={onDelete}
        />
      ))}
    </>
  );
};

const AdminCategoryList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [categories, setCategories] = useState(dummyCategories);
  
  // Recursive search function for categories and subcategories
  const searchCategories = (cats: Category[], term: string): Category[] => {
    return cats.filter(cat => {
      const matchesSearch = cat.name.toLowerCase().includes(term.toLowerCase());
      
      // Clone subcategories that match the search
      const matchingSubcategories = cat.subCategories 
        ? searchCategories(cat.subCategories, term) 
        : [];
      
      // If this category matches OR any subcategories match, include it
      if (matchesSearch || matchingSubcategories.length > 0) {
        // Create a new object with matching subcategories
        return {
          ...cat,
          subCategories: matchingSubcategories.length > 0 ? matchingSubcategories : cat.subCategories,
        };
      }
      
      return false;
    });
  };
  
  const filteredCategories = searchTerm
    ? searchCategories(categories, searchTerm)
    : categories;
  
  const handleDelete = (id: string) => {
    if (window.confirm("Сигурни ли сте, че искате да изтриете тази категория?")) {
      // Recursive function to remove category by ID
      const removeCategory = (cats: Category[]): Category[] => {
        return cats.filter(cat => {
          if (cat.id === id) return false;
          
          if (cat.subCategories) {
            cat.subCategories = removeCategory(cat.subCategories);
          }
          
          return true;
        });
      };
      
      setCategories(removeCategory(categories));
    }
  };
  
  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <Input 
          placeholder="Търси категории..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-1"
        />
      </div>
      
      <div className="border rounded-md overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Име на категорията</TableHead>
              <TableHead>Продукти</TableHead>
              <TableHead className="text-right">Действия</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredCategories.map((category) => (
              <CategoryRow 
                key={category.id} 
                category={category} 
                onDelete={handleDelete}
              />
            ))}
            
            {filteredCategories.length === 0 && (
              <TableRow>
                <TableCell colSpan={3} className="text-center py-8 text-gray-500">
                  Няма намерени категории
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default AdminCategoryList;
