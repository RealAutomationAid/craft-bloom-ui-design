
import { Link } from "react-router-dom";

const Logo = () => {
  return (
    <Link to="/" className="flex items-center">
      <img 
        src="/lovable-uploads/c8cafdf0-3b3f-4acd-a81b-a64597507bad.png" 
        alt="Крафт Блум Лого" 
        className="h-10 mr-2"
      />
      <span className="font-serif text-lg font-bold text-primary">КрафтБлум</span>
    </Link>
  );
};

export default Logo;
