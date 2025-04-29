
import ProductCard from "./ProductCard";
import { Skeleton } from "@/components/ui/skeleton";

interface Product {
  id: string;
  title: string;
  price: number;
  oldPrice?: number;
  image: string;
  isNew?: boolean;
  isSale?: boolean;
  category: string;
  slug: string;
}

interface ProductGridProps {
  products: Product[];
  isLoading?: boolean;
  title?: string;
}

const ProductGrid = ({ products, isLoading = false, title }: ProductGridProps) => {
  return (
    <div className="container mx-auto px-4 py-8">
      {title && <h2 className="text-2xl font-serif font-bold mb-6">{title}</h2>}
      
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
        {isLoading
          ? Array.from({ length: 10 }).map((_, index) => (
              <div key={index} className="product-card flex flex-col">
                <div className="relative pt-[100%]">
                  <Skeleton className="absolute inset-0 w-full h-full" />
                </div>
                <div className="p-4">
                  <Skeleton className="h-4 w-3/4 mb-2" />
                  <Skeleton className="h-5 w-1/2" />
                </div>
              </div>
            ))
          : products.map((product) => (
              <ProductCard key={product.id} {...product} />
            ))}
      </div>
    </div>
  );
};

export default ProductGrid;
