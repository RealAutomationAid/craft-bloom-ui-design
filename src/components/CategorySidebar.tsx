
import { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Category {
  id: string;
  name: string;
  count: number;
  slug: string;
  subCategories?: Category[];
}

interface CategorySidebarProps {
  categories: Category[];
}

const CategoryItem = ({ category }: { category: Category }) => {
  const [isOpen, setIsOpen] = useState(false);
  const hasSubCategories = category.subCategories && category.subCategories.length > 0;

  return (
    <li key={category.id} className="border-b border-gray-100 last:border-0">
      <div className="flex items-center justify-between py-3">
        <Link 
          to={`/categories/${category.slug}`}
          className="flex-1 hover:text-primary"
        >
          {category.name} <span className="text-sm text-gray-400">({category.count})</span>
        </Link>
        
        {hasSubCategories && (
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </Button>
        )}
      </div>
      
      {hasSubCategories && isOpen && (
        <ul className="ml-4 mb-2 border-l border-gray-100 pl-4">
          {category.subCategories.map((subCategory) => (
            <CategoryItem key={subCategory.id} category={subCategory} />
          ))}
        </ul>
      )}
    </li>
  );
};

const CategorySidebar = ({ categories }: CategorySidebarProps) => {
  return (
    <aside className="bg-white rounded-lg shadow-sm border border-gray-100">
      <div className="bg-primary text-white p-4 rounded-t-lg">
        <h2 className="font-serif text-xl font-bold">Категории</h2>
      </div>
      
      <nav className="p-4">
        <ul>
          {categories.map((category) => (
            <CategoryItem key={category.id} category={category} />
          ))}
        </ul>
      </nav>
      
      <div className="p-4 bg-gray-50 rounded-b-lg">
        <h3 className="font-medium mb-3">Бързи връзки</h3>
        <ul className="space-y-2">
          <li>
            <Link to="/sale" className="text-sm hover:text-primary flex items-center">
              <span className="badge badge-sale mr-2">Sale</span>
              Промоции
            </Link>
          </li>
          <li>
            <Link to="/new" className="text-sm hover:text-primary flex items-center">
              <span className="badge badge-new mr-2">New</span>
              Нови продукти
            </Link>
          </li>
          <li>
            <Link to="/favorites" className="text-sm hover:text-primary">
              Любими продукти
            </Link>
          </li>
        </ul>
      </div>
    </aside>
  );
};

export default CategorySidebar;
