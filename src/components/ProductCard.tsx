
import { useState } from "react";
import { Link } from "react-router-dom";
import { ShoppingCart, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface ProductCardProps {
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

const ProductCard = ({
  id,
  title,
  price,
  oldPrice,
  image,
  isNew = false,
  isSale = false,
  category,
  slug,
}: ProductCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toast.success("Продуктът е добавен в кошницата");
  };

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsFavorite(!isFavorite);
    toast.success(
      isFavorite ? "Продуктът е премахнат от любими" : "Продуктът е добавен в любими"
    );
  };

  return (
    <div
      className="product-card group h-full flex flex-col"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link to={`/products/${slug}`} className="flex flex-col h-full">
        <div className="relative overflow-hidden pt-[100%]">
          {/* Image container with aspect ratio */}
          <div className="absolute inset-0 w-full h-full p-4">
            <img
              src={image}
              alt={title}
              className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-105"
            />
          </div>
          
          {/* Badges */}
          <div className="absolute top-2 left-2 flex flex-col space-y-2">
            {isNew && <span className="badge badge-new">Ново</span>}
            {isSale && <span className="badge badge-sale">Промо</span>}
          </div>
          
          {/* Quick actions */}
          <div
            className={`absolute top-2 right-2 transition-opacity duration-300 ${
              isHovered ? "opacity-100" : "opacity-0"
            }`}
          >
            <Button
              variant="outline"
              size="icon"
              className="bg-white rounded-full hover:bg-primary hover:text-white"
              onClick={handleToggleFavorite}
            >
              <Heart
                className={`h-4 w-4 ${isFavorite ? "fill-red-500 text-red-500" : ""}`}
              />
            </Button>
          </div>
        </div>

        <div className="p-4 flex-1 flex flex-col">
          <div className="text-xs text-muted-foreground mb-1">{category}</div>
          <h3 className="font-medium text-sm mb-2 line-clamp-2 flex-1">{title}</h3>
          
          <div className="flex items-center justify-between mt-auto">
            <div className="flex items-center">
              <span className="text-base font-semibold">{price.toFixed(2)} лв.</span>
              {oldPrice && (
                <span className="text-sm text-muted-foreground line-through ml-2">
                  {oldPrice.toFixed(2)} лв.
                </span>
              )}
            </div>
            
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full hover:bg-primary hover:text-white"
              onClick={handleAddToCart}
            >
              <ShoppingCart className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
