
import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const slides = [
  {
    id: 1,
    title: "Нова колекция скрапбукинг материали",
    description: "Вдъхновете се с нашите ексклузивни продукти за творчество",
    image: "/lovable-uploads/f965e4e3-0ee1-4f18-acd5-8c0397d7a158.png",
    bgColor: "bg-gradient-to-r from-rose-100 to-teal-100",
    link: "/categories/scrapbooking",
  },
  {
    id: 2,
    title: "Пролетна колекция мъниста",
    description: "Открийте красивите цветове за вашите пролетни бижута",
    image: "/placeholder.svg",
    bgColor: "bg-gradient-to-r from-purple-100 to-pink-100",
    link: "/categories/beads",
  },
  {
    id: 3,
    title: "Специални намаления до -50%",
    description: "На избрани продукти от категория Хоби и Крафт",
    image: "/placeholder.svg",
    bgColor: "bg-gradient-to-r from-amber-100 to-yellow-100",
    link: "/sale",
  },
];

const HeroCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(interval);
  }, [currentSlide]);

  return (
    <div className="relative overflow-hidden w-full">
      <div 
        className="flex transition-transform duration-500 ease-out h-[300px] md:h-[400px] lg:h-[500px]"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {slides.map((slide) => (
          <div 
            key={slide.id} 
            className={`min-w-full flex items-center justify-center ${slide.bgColor}`}
          >
            <div className="container px-4 grid md:grid-cols-2 gap-8 items-center">
              <div className="text-center md:text-left space-y-4 md:order-1 order-2">
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-serif font-bold font-bulgarian">{slide.title}</h2>
                <p className="text-lg opacity-75 font-bulgarian">{slide.description}</p>
                <Button asChild>
                  <a href={slide.link} className="mt-4 inline-block font-bulgarian">
                    Разгледай сега
                  </a>
                </Button>
              </div>
              <div className="flex justify-center md:order-2 order-1">
                <img 
                  src={slide.image}
                  alt={slide.title}
                  className={`${slide.id === 1 ? 'max-h-[200px]' : 'max-h-[250px]'} md:max-h-[300px] lg:max-h-[400px] object-contain`}
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation arrows */}
      <Button
        variant="ghost"
        size="icon"
        className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white rounded-full shadow-md z-10"
        onClick={prevSlide}
        aria-label="Предишен слайд"
      >
        <ChevronLeft className="h-6 w-6" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white rounded-full shadow-md z-10"
        onClick={nextSlide}
        aria-label="Следващ слайд"
      >
        <ChevronRight className="h-6 w-6" />
      </Button>

      {/* Indicators */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full ${
              currentSlide === index ? "bg-primary" : "bg-white/50"
            }`}
            onClick={() => setCurrentSlide(index)}
            aria-label={`Отиди на слайд ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroCarousel;
