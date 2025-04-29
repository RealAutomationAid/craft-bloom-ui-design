
import { Link } from "react-router-dom";

const Logo = () => {
  return (
    <Link to="/" className="flex items-center">
      <img 
        src="/lovable-uploads/f965e4e3-0ee1-4f18-acd5-8c0397d7a158.png" 
        alt="LuxArt Logo" 
        className="h-12 mr-2"
      />
      <span className="font-serif text-lg font-bold text-primary sr-only">LuxArt</span>
    </Link>
  );
};

export default Logo;
