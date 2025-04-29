
import { Truck } from "lucide-react";

const FreeShippingBanner = () => {
  return (
    <div className="w-full bg-primary text-white py-2 text-center text-sm flex items-center justify-center">
      <Truck className="inline-block mr-2 h-4 w-4" />
      <span>Безплатна доставка за поръчки над 100лв</span>
    </div>
  );
};

export default FreeShippingBanner;
