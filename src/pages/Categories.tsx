
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CategorySidebar from "@/components/CategorySidebar";
import ProductGrid from "@/components/ProductGrid";
import { ChevronRight, SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";

const sampleCategories = [
  {
    id: "1",
    name: "Мартеници и Материали",
    count: 325,
    slug: "martenici-i-materiali",
    subCategories: [
      {
        id: "1-1",
        name: "Мартеници",
        count: 153,
        slug: "martenici"
      },
      {
        id: "1-2",
        name: "Опаковки за мартеници",
        count: 47,
        slug: "opakovki-za-martenici"
      },
      {
        id: "1-3",
        name: "Материали за мартеници",
        count: 125,
        slug: "materiali-za-martenici"
      }
    ]
  },
  {
    id: "2",
    name: "Мъниста",
    count: 254,
    slug: "munista",
    subCategories: [
      {
        id: "2-1",
        name: "Пластмасови акрилни",
        count: 86,
        slug: "plastmasovi-akrilni"
      },
      {
        id: "2-2",
        name: "Метални мъниста",
        count: 52,
        slug: "metalni-munista"
      },
      {
        id: "2-3",
        name: "Стъклени мъниста",
        count: 89,
        slug: "stakleni-munista"
      },
      {
        id: "2-4",
        name: "Други мъниста",
        count: 27,
        slug: "drugi-munista"
      }
    ]
  },
  {
    id: "3",
    name: "Естествени Камъни",
    count: 187,
    slug: "estestveni-kamani",
    subCategories: [
      {
        id: "3-1",
        name: "Естествени камъни и минерали",
        count: 123,
        slug: "estestveni-kamani-i-minerali"
      },
      {
        id: "3-2",
        name: "Естествени перли и седеф",
        count: 42,
        slug: "estestveni-perli-i-sedef"
      },
      {
        id: "3-3",
        name: "Висулки от естествени камъни",
        count: 22,
        slug: "visulki-ot-estestveni-kamani"
      }
    ]
  },
  {
    id: "4",
    name: "Хоби и Крафт",
    count: 321,
    slug: "hobi-i-kraft",
    subCategories: [
      {
        id: "4-1",
        name: "Дърво и Бирен картон",
        count: 87,
        slug: "darvo-i-biren-karton"
      },
      {
        id: "4-2",
        name: "Скрапбукинг и Крафт материали",
        count: 95,
        slug: "skrapbuking-i-kraft-materiali"
      },
      {
        id: "4-3",
        name: "Картон и Хартия",
        count: 67,
        slug: "karton-i-hartia"
      },
      {
        id: "4-4",
        name: "Диамантени гоблени",
        count: 32,
        slug: "diamanteni-gobleni"
      }
    ]
  },
  {
    id: "5",
    name: "Арт материали",
    count: 143,
    slug: "art-materiali"
  }
];

// Примерни данни за продукти по категории
const sampleProducts = [
  {
    id: "101",
    title: "Мъниста акрилни пастелни, 100 бр.",
    price: 7.99,
    image: "/placeholder.svg",
    category: "Мъниста",
    slug: "munista-akrilni-pastelni"
  },
  {
    id: "102",
    title: "Мъниста стъклени многоцветни, микс",
    price: 9.50,
    oldPrice: 12.99,
    image: "/placeholder.svg",
    isSale: true,
    category: "Мъниста",
    slug: "munista-stakleni-mnogocvetni"
  },
  {
    id: "103",
    title: "Мъниста метални златисти, 50 бр.",
    price: 8.99,
    image: "/placeholder.svg",
    category: "Мъниста",
    slug: "munista-metalni-zlatisti"
  },
  {
    id: "104",
    title: "Мъниста дървени естествени, 30 бр.",
    price: 6.50,
    image: "/placeholder.svg",
    category: "Мъниста",
    slug: "munista-darveni-estestveni"
  },
  {
    id: "105",
    title: "Мъниста кристални прозрачни, 40 бр.",
    price: 14.99,
    oldPrice: 19.99,
    image: "/placeholder.svg",
    isSale: true,
    category: "Мъниста",
    slug: "munista-kristalni-prozrachni"
  },
  {
    id: "106",
    title: "Мъниста керамични цветни, ръчна изработка",
    price: 21.99,
    image: "/placeholder.svg",
    isNew: true,
    category: "Мъниста",
    slug: "munista-keramichni-cvetni"
  },
  {
    id: "107",
    title: "Мъниста седефени перлени, AAA клас",
    price: 32.50,
    image: "/placeholder.svg",
    category: "Мъниста",
    slug: "munista-sedefeni-perleni"
  },
  {
    id: "108",
    title: "Мъниста от естествен хематит, черни",
    price: 18.99,
    image: "/placeholder.svg",
    category: "Мъниста",
    slug: "munista-estestveni-hematit"
  }
];

const Categories = () => {
  const { slug } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [products, setProducts] = useState(sampleProducts);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  useEffect(() => {
    // Симулираме зареждане на продуктите по категория
    setIsLoading(true);
    
    setTimeout(() => {
      if (slug) {
        // Тук би трябвало да заредим продуктите по дадената категория от API
        // За момента просто проверяваме дали slug-а съвпада с категорията "munista"
        const category = sampleCategories.find(c => c.slug === slug);
        setActiveCategory(category ? category.name : null);
      } else {
        setActiveCategory(null);
      }
      setIsLoading(false);
    }, 800);
  }, [slug]);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow py-6">
        <div className="container mx-auto px-4">
          {/* Breadcrumbs */}
          <div className="flex items-center text-sm mb-6 text-gray-500">
            <a href="/" className="hover:text-primary">Начало</a>
            <ChevronRight className="h-4 w-4 mx-1" />
            <a href="/categories" className="hover:text-primary">Категории</a>
            {activeCategory && (
              <>
                <ChevronRight className="h-4 w-4 mx-1" />
                <span className="text-primary">{activeCategory}</span>
              </>
            )}
          </div>
          
          <div className="lg:grid lg:grid-cols-4 gap-6">
            {/* Mobile filter button */}
            <div className="lg:hidden flex justify-between items-center mb-4">
              <h1 className="text-2xl font-serif font-bold">
                {activeCategory || "Всички категории"}
              </h1>
              
              <Button 
                variant="outline"
                className="flex items-center gap-2"
                onClick={() => setIsMobileFilterOpen(!isMobileFilterOpen)}
              >
                <SlidersHorizontal className="h-4 w-4" />
                Филтър
              </Button>
            </div>
          
            {/* Sidebar - hidden on mobile unless toggled */}
            <div className={`lg:block ${isMobileFilterOpen ? 'block' : 'hidden'} lg:col-span-1 mb-6`}>
              <CategorySidebar categories={sampleCategories} />
            </div>
            
            {/* Main content */}
            <div className="lg:col-span-3">
              {/* Category title - visible only on desktop */}
              <div className="hidden lg:block mb-6">
                <h1 className="text-3xl font-serif font-bold">
                  {activeCategory || "Всички категории"}
                </h1>
              </div>
              
              {/* Product filters */}
              <div className="bg-white rounded-lg shadow-sm p-4 mb-6 flex flex-wrap justify-between items-center">
                <div className="flex items-center mb-4 sm:mb-0">
                  <span className="text-sm text-gray-500 mr-2">Сортирай по:</span>
                  <select className="border rounded-md px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-primary">
                    <option>Най-нови</option>
                    <option>Цена: Ниска към висока</option>
                    <option>Цена: Висока към ниска</option>
                    <option>Име: А-Я</option>
                    <option>Име: Я-А</option>
                  </select>
                </div>
                
                <div className="flex items-center">
                  <span className="text-sm text-gray-500 mr-2">Покажи:</span>
                  <select className="border rounded-md px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-primary">
                    <option>12</option>
                    <option>24</option>
                    <option>48</option>
                    <option>Всички</option>
                  </select>
                </div>
              </div>
              
              {/* Products grid */}
              <ProductGrid products={products} isLoading={isLoading} />
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Categories;
