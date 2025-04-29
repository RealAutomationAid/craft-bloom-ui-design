
import { useState } from "react";
import { useParams } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ChevronRight, Minus, Plus, Star, ShoppingCart, Heart, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ProductGrid from "@/components/ProductGrid";
import { toast } from "sonner";

// Примерен продукт за демонстрация
const productData = {
  id: "001",
  title: "Комплект акрилни мъниста, пастелни цветове, 150 бр.",
  slug: "komplekt-akrilni-munista-pastelni-150",
  price: 15.99,
  oldPrice: 19.99,
  discount: 20,
  rating: 4.5,
  reviewCount: 12,
  images: [
    "/placeholder.svg",
    "/placeholder.svg",
    "/placeholder.svg",
    "/placeholder.svg"
  ],
  colors: [
    { name: "Пастелен микс", value: "pastel" },
    { name: "Ярък микс", value: "bright" },
    { name: "Земни тонове", value: "earth" }
  ],
  sizes: [
    { name: "6mm", value: "6mm" },
    { name: "8mm", value: "8mm" },
    { name: "10mm", value: "10mm" }
  ],
  description: "Красив комплект акрилни мъниста в пастелни цветове, идеални за направа на гривни, колиета и други бижута. Комплектът съдържа 150бр. мъниста с размер по избор. Перфектни за всички видове бижутерски проекти.",
  specifications: [
    { name: "Материал", value: "Акрил" },
    { name: "Брой", value: "150 бр." },
    { name: "Форма", value: "Кръгла" },
    { name: "Опаковка", value: "Пластмасова кутия" },
    { name: "Произход", value: "България" }
  ],
  category: "Мъниста",
  inStock: true,
  sku: "MB-AK-150"
};

// Примерни отзиви
const reviews = [
  {
    id: "1",
    author: "Мария И.",
    date: "10.03.2023",
    rating: 5,
    comment: "Прекрасни мъниста с чудесни цветове! Много съм доволна от покупката си."
  },
  {
    id: "2",
    author: "Иван П.",
    date: "28.02.2023",
    rating: 4,
    comment: "Добро качество, точно както е показано на снимката. Единственият минус е, че някои от мънистата имаха леки дефекти."
  },
  {
    id: "3",
    author: "Петя К.",
    date: "15.01.2023",
    rating: 5,
    comment: "Перфектни за моите проекти! Ще поръчам отново."
  }
];

// Примерни свързани продукти
const relatedProducts = [
  {
    id: "201",
    title: "Ластична корда за гривни, прозрачна",
    price: 3.99,
    image: "/placeholder.svg",
    category: "Аксесоари за бижута",
    slug: "lastichna-korda-grivni"
  },
  {
    id: "202",
    title: "Метални разделители за мъниста, 50 бр.",
    price: 6.50,
    image: "/placeholder.svg",
    category: "Аксесоари за бижута",
    slug: "metalni-razdeliteli-munista"
  },
  {
    id: "203",
    title: "Кламери за бижута, сребристи, 20 бр.",
    price: 5.99,
    oldPrice: 7.50,
    image: "/placeholder.svg",
    isSale: true,
    category: "Аксесоари за бижута",
    slug: "klameri-bijuta-srebristi"
  },
  {
    id: "204",
    title: "Инструменти за бижутерия, комплект",
    price: 24.99,
    image: "/placeholder.svg",
    category: "Инструменти",
    slug: "instrumenti-bijuteria-komplekt"
  }
];

const ProductDetail = () => {
  const { slug } = useParams();
  const [mainImage, setMainImage] = useState(productData.images[0]);
  const [selectedColor, setSelectedColor] = useState(productData.colors[0].value);
  const [selectedSize, setSelectedSize] = useState(productData.sizes[0].value);
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);

  const handleAddToCart = () => {
    toast.success("Продуктът е добавен в кошницата", {
      description: `${quantity} бр. ${productData.title}`
    });
  };

  const handleToggleFavorite = () => {
    setIsFavorite(!isFavorite);
    toast.success(
      isFavorite ? "Продуктът е премахнат от любими" : "Продуктът е добавен в любими"
    );
  };

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
            <ChevronRight className="h-4 w-4 mx-1" />
            <a href={`/categories/${productData.category.toLowerCase()}`} className="hover:text-primary">
              {productData.category}
            </a>
            <ChevronRight className="h-4 w-4 mx-1" />
            <span className="text-primary line-clamp-1">{productData.title}</span>
          </div>
          
          {/* Product details */}
          <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Product images */}
              <div>
                <div className="mb-4 border rounded-lg overflow-hidden">
                  <img 
                    src={mainImage} 
                    alt={productData.title} 
                    className="w-full h-auto object-contain aspect-square"
                  />
                </div>
                <div className="grid grid-cols-4 gap-2">
                  {productData.images.map((image, index) => (
                    <div 
                      key={index}
                      className={`border rounded-md overflow-hidden cursor-pointer ${mainImage === image ? 'border-primary' : 'border-gray-200'}`}
                      onClick={() => setMainImage(image)}
                    >
                      <img 
                        src={image} 
                        alt={`${productData.title} - изглед ${index + 1}`}
                        className="w-full h-auto object-contain aspect-square"
                      />
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Product info */}
              <div>
                <h1 className="font-serif text-2xl md:text-3xl font-bold mb-2">
                  {productData.title}
                </h1>
                
                {/* Rating */}
                <div className="flex items-center mb-4">
                  <div className="flex text-yellow-400">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star 
                        key={i}
                        className="h-4 w-4"
                        fill={i < Math.floor(productData.rating) ? "currentColor" : "none"}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-gray-500 ml-2">
                    {productData.rating} ({productData.reviewCount} отзива)
                  </span>
                </div>
                
                {/* Price */}
                <div className="mb-6">
                  {productData.oldPrice && (
                    <span className="text-gray-500 line-through mr-2">
                      {productData.oldPrice.toFixed(2)} лв.
                    </span>
                  )}
                  <span className="text-2xl font-bold text-primary">
                    {productData.price.toFixed(2)} лв.
                  </span>
                  {productData.discount && (
                    <span className="ml-2 badge badge-sale">
                      -{productData.discount}%
                    </span>
                  )}
                </div>
                
                {/* Short description */}
                <p className="text-gray-600 mb-6">
                  {productData.description.split('.')[0]}.
                </p>
                
                {/* Color selection */}
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-2">Цвят:</label>
                  <div className="flex flex-wrap gap-2">
                    {productData.colors.map((color) => (
                      <Button
                        key={color.value}
                        variant={selectedColor === color.value ? "default" : "outline"}
                        size="sm"
                        onClick={() => setSelectedColor(color.value)}
                        className={selectedColor === color.value ? "bg-primary" : ""}
                      >
                        {color.name}
                      </Button>
                    ))}
                  </div>
                </div>
                
                {/* Size selection */}
                <div className="mb-6">
                  <label className="block text-sm font-medium mb-2">Размер:</label>
                  <div className="flex flex-wrap gap-2">
                    {productData.sizes.map((size) => (
                      <Button
                        key={size.value}
                        variant={selectedSize === size.value ? "default" : "outline"}
                        size="sm"
                        onClick={() => setSelectedSize(size.value)}
                        className={selectedSize === size.value ? "bg-primary" : ""}
                      >
                        {size.name}
                      </Button>
                    ))}
                  </div>
                </div>
                
                {/* Quantity */}
                <div className="mb-6">
                  <label className="block text-sm font-medium mb-2">Количество:</label>
                  <div className="flex items-center w-32">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => quantity > 1 && setQuantity(quantity - 1)}
                      disabled={quantity <= 1}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <input
                      type="number"
                      value={quantity}
                      onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                      className="w-full text-center mx-2 border rounded-md py-2"
                      min="1"
                    />
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => setQuantity(quantity + 1)}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                
                {/* Stock status */}
                <div className="mb-6">
                  <span className={`text-sm ${productData.inStock ? 'text-green-600' : 'text-red-600'}`}>
                    {productData.inStock ? 'В наличност' : 'Изчерпан'}
                  </span>
                  <span className="text-sm text-gray-500 ml-4">SKU: {productData.sku}</span>
                </div>
                
                {/* Add to cart */}
                <div className="flex flex-wrap gap-2 mb-6">
                  <Button
                    size="lg"
                    className="flex items-center gap-2 bg-primary hover:bg-primary/90"
                    disabled={!productData.inStock}
                    onClick={handleAddToCart}
                  >
                    <ShoppingCart className="h-5 w-5" />
                    Добави в кошницата
                  </Button>
                  
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-11 w-11"
                    onClick={handleToggleFavorite}
                  >
                    <Heart className={`h-5 w-5 ${isFavorite ? "fill-red-500 text-red-500" : ""}`} />
                  </Button>
                  
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-11 w-11"
                  >
                    <Share2 className="h-5 w-5" />
                  </Button>
                </div>
                
                {/* Category tags */}
                <div>
                  <span className="text-sm text-gray-500">Категория: </span>
                  <a href={`/categories/${productData.category.toLowerCase()}`} className="text-sm text-primary">
                    {productData.category}
                  </a>
                </div>
              </div>
            </div>
          </div>
          
          {/* Tabs */}
          <Tabs defaultValue="description" className="mb-8">
            <TabsList className="bg-white border border-gray-200 rounded-lg mb-4 w-full grid grid-cols-3">
              <TabsTrigger value="description" className="data-[state=active]:bg-primary data-[state=active]:text-white">
                Описание
              </TabsTrigger>
              <TabsTrigger value="specifications" className="data-[state=active]:bg-primary data-[state=active]:text-white">
                Спецификации
              </TabsTrigger>
              <TabsTrigger value="reviews" className="data-[state=active]:bg-primary data-[state=active]:text-white">
                Отзиви ({reviews.length})
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="description" className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="font-serif text-xl font-bold mb-4">Детайлно описание</h2>
              <p className="text-gray-700">{productData.description}</p>
            </TabsContent>
            
            <TabsContent value="specifications" className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="font-serif text-xl font-bold mb-4">Спецификации</h2>
              <table className="w-full">
                <tbody>
                  {productData.specifications.map((spec, index) => (
                    <tr key={index} className={index % 2 === 0 ? "bg-gray-50" : ""}>
                      <td className="py-3 px-4 font-medium">{spec.name}</td>
                      <td className="py-3 px-4">{spec.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </TabsContent>
            
            <TabsContent value="reviews" className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="font-serif text-xl font-bold mb-4">
                Отзиви от клиенти ({reviews.length})
              </h2>
              
              {reviews.map((review) => (
                <div key={review.id} className="mb-6 pb-6 border-b border-gray-100 last:border-0">
                  <div className="flex items-center mb-2">
                    <div className="flex text-yellow-400 mr-2">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star 
                          key={i}
                          className="h-4 w-4"
                          fill={i < review.rating ? "currentColor" : "none"}
                        />
                      ))}
                    </div>
                    <span className="font-medium">{review.author}</span>
                    <span className="text-gray-400 text-sm ml-2">
                      {review.date}
                    </span>
                  </div>
                  <p className="text-gray-700">{review.comment}</p>
                </div>
              ))}
              
              <Button>Напишете отзив</Button>
            </TabsContent>
          </Tabs>
          
          {/* Related products */}
          <div className="mb-8">
            <h2 className="font-serif text-2xl font-bold mb-6">Свързани продукти</h2>
            <ProductGrid products={relatedProducts} />
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ProductDetail;
