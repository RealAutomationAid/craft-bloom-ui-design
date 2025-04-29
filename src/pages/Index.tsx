import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FreeShippingBanner from "@/components/FreeShippingBanner";
import HeroCarousel from "@/components/HeroCarousel";
import ProductGrid from "@/components/ProductGrid";
import CategorySidebar from "@/components/CategorySidebar";
import { SidebarProvider, Sidebar, SidebarContent, SidebarInset } from "@/components/ui/sidebar";

// Примерни данни за продукти
const featuredProducts = [
  {
    id: "1",
    title: "Комплект акрилни мъниста, пастелни цветове",
    price: 15.99,
    oldPrice: 19.99,
    image: "https://images.unsplash.com/photo-1516116216624-53e697fedbea?auto=format&fit=crop&q=80&w=500",
    isNew: true,
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
  {
    id: "4",
    title: "Мартенски конци, 100% памук, 50 м",
    price: 3.99,
    image: "/placeholder.svg",
    category: "Мартеници и материали",
    slug: "martenski-konci-pamuk",
  },
  {
    id: "5",
    title: "Гривна от естествени камъни, хематит",
    price: 18.50,
    image: "/placeholder.svg",
    category: "Естествени камъни",
    slug: "grivna-estestveni-kamani-hematit",
  }
];

const newProducts = [
  {
    id: "6",
    title: "Комплект дизайнерски хартии, цветни",
    price: 7.99,
    image: "https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?auto=format&fit=crop&q=80&w=500",
    isNew: true,
    category: "Хоби и крафт",
    slug: "komplekt-dizainerski-hartii",
  },
  {
    id: "7",
    title: "Декоративни ножици с фигурен кант",
    price: 12.50,
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&q=80&w=500",
    isNew: true,
    category: "Инструменти",
    slug: "dekorativni-nojici-figuren-kant",
  },
  {
    id: "8",
    title: "Кристални мъниста Сваровски, микс",
    price: 29.99,
    image: "/placeholder.svg",
    isNew: true,
    category: "Мъниста",
    slug: "kristalni-munista-swarovski-mix",
  },
  {
    id: "9",
    title: "Силиконови печати за скрапбукинг",
    price: 8.99,
    image: "/placeholder.svg",
    isNew: true,
    category: "Скрапбукинг",
    slug: "silikonovi-pechati-skrapbuking",
  },
  {
    id: "10",
    title: "Микс от дървени фигурки за декорация",
    price: 5.99,
    image: "/placeholder.svg",
    isNew: true,
    category: "Материали за декорация",
    slug: "mix-durveni-figurki-dekoracia",
  }
];

// Sample categories data
const categoriesData = [
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
      },
      {
        id: "1-3",
        name: "Кристални мъниста",
        count: 4,
        slug: "kristalni-munista",
      },
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
      },
      {
        id: "2-2",
        name: "Печати и щемпели",
        count: 8,
        slug: "pechati-i-shtempeli",
      },
    ]
  },
  {
    id: "3",
    name: "Арт материали",
    count: 32,
    slug: "art-materiali",
    subCategories: [
      {
        id: "3-1",
        name: "Акрилни бои",
        count: 15,
        slug: "akrilni-boi",
      },
      {
        id: "3-2",
        name: "Четки и инструменти",
        count: 10,
        slug: "chetki-i-instrumenti",
      },
      {
        id: "3-3",
        name: "Платна",
        count: 7,
        slug: "platna",
      },
    ]
  },
  {
    id: "4",
    name: "Материали за бижута",
    count: 45,
    slug: "materiali-za-bijuta",
    subCategories: [
      {
        id: "4-1",
        name: "Синджири и вериги",
        count: 20,
        slug: "sindjiri-i-verigi",
      },
      {
        id: "4-2",
        name: "Закопчалки и щифтове",
        count: 15,
        slug: "zakopchavki-i-shtiftove",
      },
      {
        id: "4-3",
        name: "Инструменти за бижута",
        count: 10,
        slug: "instrumenti-za-bijuta",
      },
    ]
  },
  {
    id: "5",
    name: "Декорация за дома",
    count: 28,
    slug: "dekoracia-za-doma",
  },
];

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Симулираме зареждане на данни
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <FreeShippingBanner />
      <Header />

      <SidebarProvider>
        <div className="flex min-h-screen w-full">
          <Sidebar variant="sidebar" collapsible="icon">
            <SidebarContent>
              <CategorySidebar categories={categoriesData} />
            </SidebarContent>
          </Sidebar>
          
          <SidebarInset>
            <main className="flex-grow">
              <HeroCarousel />
              
              <section className="py-10">
                <ProductGrid 
                  products={featuredProducts} 
                  isLoading={isLoading} 
                  title="Препоръчани продукти"
                />
              </section>
              
              <section className="bg-gray-50 py-10">
                <div className="container mx-auto px-4">
                  <div className="text-center mb-10">
                    <h2 className="font-serif text-3xl font-bold mb-4">Създайте по ваш вкус</h2>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                      Намерете всички необходими материали за вашите творчески проекти. От мъниста до скрапбукинг материали, ние имаме всичко, от което се нуждаете.
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                      <img src="https://images.unsplash.com/photo-1516116216624-53e697fedbea?auto=format&fit=crop&q=80&w=500" alt="Мъниста" className="w-full h-48 object-cover" />
                      <div className="p-6 text-center">
                        <h3 className="font-serif text-xl font-bold mb-2">Мъниста и бижутери</h3>
                        <p className="text-gray-600 mb-4">Открийте нашата колекция от качествени мъниста за всички ваши бижутерски проекти.</p>
                        <a href="/categories/munista" className="text-primary font-medium hover:underline">Разгледай</a>
                      </div>
                    </div>
                    
                    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                      <img src="https://images.unsplash.com/photo-1626633558329-8d5f709bb1bb?auto=format&fit=crop&q=80&w=500" alt="Скрапбукинг" className="w-full h-48 object-cover" />
                      <div className="p-6 text-center">
                        <h3 className="font-serif text-xl font-bold mb-2">Скрапбукинг</h3>
                        <p className="text-gray-600 mb-4">Всички необходими материали за вашите скрапбукинг проекти на едно място.</p>
                        <a href="/categories/skrapbuking" className="text-primary font-medium hover:underline">Разгледай</a>
                      </div>
                    </div>
                    
                    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                      <img src="https://images.unsplash.com/photo-1501556424050-d4816356b73e?auto=format&fit=crop&q=80&w=500" alt="Арт материали" className="w-full h-48 object-cover" />
                      <div className="p-6 text-center">
                        <h3 className="font-serif text-xl font-bold mb-2">Арт материали</h3>
                        <p className="text-gray-600 mb-4">Висококачествени арт материали за всички ваши креативни нужди.</p>
                        <a href="/categories/art-materiali" className="text-primary font-medium hover:underline">Разгледай</a>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
              
              <section className="py-10">
                <ProductGrid 
                  products={newProducts} 
                  isLoading={isLoading} 
                  title="Нови продукти"
                />
              </section>
              
              <section className="bg-primary text-white py-12">
                <div className="container mx-auto px-4 text-center">
                  <h2 className="font-serif text-3xl font-bold mb-6">Абонирайте се за нашия бюлетин</h2>
                  <p className="max-w-2xl mx-auto mb-8">
                    Бъдете първи, които ще научават за новите колекции, специални оферти и творчески съвети.
                  </p>
                  
                  <form className="flex flex-col md:flex-row justify-center max-w-lg mx-auto">
                    <input
                      type="email"
                      placeholder="Вашият имейл адрес"
                      className="px-4 py-3 rounded-l-md md:flex-grow focus:outline-none text-gray-900 md:rounded-r-none rounded-r-md mb-2 md:mb-0"
                    />
                    <button
                      type="submit"
                      className="bg-white text-primary font-medium px-4 py-3 md:rounded-l-none rounded-l-md rounded-r-md"
                    >
                      Абонирай се
                    </button>
                  </form>
                </div>
              </section>
            </main>
          </SidebarInset>
        </div>
      </SidebarProvider>

      <Footer />
    </>
  );
};

export default Index;
