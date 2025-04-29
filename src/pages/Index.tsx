
import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HeroCarousel from "@/components/HeroCarousel";
import ProductGrid from "@/components/ProductGrid";

// Примерни данни за продукти
const featuredProducts = [
  {
    id: "1",
    title: "Комплект акрилни мъниста, пастелни цветове",
    price: 15.99,
    oldPrice: 19.99,
    image: "/placeholder.svg",
    isNew: true,
    category: "Мъниста",
    slug: "komplekt-akrilni-munista-pastelni",
  },
  {
    id: "2",
    title: "Картон за скрапбукинг, двустранен, 30.5x30.5 см",
    price: 2.50,
    image: "/placeholder.svg",
    category: "Скрапбукинг",
    slug: "karton-skrapbuking-dvustranen",
  },
  {
    id: "3",
    title: "Акрилни бои за декорация, комплект от 12 цвята",
    price: 24.99,
    oldPrice: 29.99,
    image: "/placeholder.svg",
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
    image: "/placeholder.svg",
    isNew: true,
    category: "Хоби и крафт",
    slug: "komplekt-dizainerski-hartii",
  },
  {
    id: "7",
    title: "Декоративни ножици с фигурен кант",
    price: 12.50,
    image: "/placeholder.svg",
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
    <div className="min-h-screen flex flex-col">
      <Header />
      
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
                <img src="/placeholder.svg" alt="Мъниста" className="w-full h-48 object-cover" />
                <div className="p-6 text-center">
                  <h3 className="font-serif text-xl font-bold mb-2">Мъниста и бижутери</h3>
                  <p className="text-gray-600 mb-4">Открийте нашата колекция от качествени мъниста за всички ваши бижутерски проекти.</p>
                  <a href="/categories/munista" className="text-primary font-medium hover:underline">Разгледай</a>
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <img src="/placeholder.svg" alt="Скрапбукинг" className="w-full h-48 object-cover" />
                <div className="p-6 text-center">
                  <h3 className="font-serif text-xl font-bold mb-2">Скрапбукинг</h3>
                  <p className="text-gray-600 mb-4">Всички необходими материали за вашите скрапбукинг проекти на едно място.</p>
                  <a href="/categories/skrapbuking" className="text-primary font-medium hover:underline">Разгледай</a>
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <img src="/placeholder.svg" alt="Арт материали" className="w-full h-48 object-cover" />
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

      <Footer />
    </div>
  );
};

export default Index;
