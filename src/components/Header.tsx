
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Search, ShoppingCart, Menu, X, User, LogOut } from "lucide-react";
import Logo from "./Logo";
import FreeShippingBanner from "./FreeShippingBanner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/contexts/AuthContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const { user, isAdmin, signOut } = useAuth();
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  return (
    <header className="sticky top-0 z-50 w-full">
      <FreeShippingBanner />
      
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Mobile Menu Button */}
            <div className="block lg:hidden">
              <Button 
                variant="ghost" 
                size="icon"
                onClick={toggleMenu}
                aria-label={isMenuOpen ? "Затвори меню" : "Отвори меню"}
              >
                {isMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </Button>
            </div>

            {/* Logo */}
            <div className="flex-shrink-0">
              <Logo />
            </div>

            {/* Search */}
            <div className="hidden md:flex flex-1 mx-10">
              <div className="relative w-full max-w-lg">
                <Input 
                  type="text" 
                  placeholder="Търси от 30 000 стоки..." 
                  className="w-full pl-4 pr-10 font-bulgarian"
                />
                <button className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-primary">
                  <Search className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* User & Cart */}
            <div className="flex items-center space-x-4">
              {user ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <User className="h-6 w-6" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    {isAdmin && (
                      <>
                        <DropdownMenuItem onClick={() => navigate("/admin")}>
                          Admin Dashboard
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                      </>
                    )}
                    <DropdownMenuItem onClick={() => navigate("/profile")}>
                      Profile
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => navigate("/orders")}>
                      Orders
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleSignOut}>
                      <LogOut className="h-4 w-4 mr-2" />
                      Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Link to="/auth" className="text-gray-700 hover:text-primary">
                  <User className="h-6 w-6" />
                </Link>
              )}
              <Link to="/cart" className="text-gray-700 hover:text-primary relative">
                <ShoppingCart className="h-6 w-6" />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-primary text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </Link>
            </div>
          </div>
          
          {/* Mobile Search - shown below header on small screens */}
          <div className="mt-4 md:hidden">
            <div className="relative w-full">
              <Input 
                type="text" 
                placeholder="Търси от 30 000 стоки..." 
                className="w-full pl-4 pr-10 font-bulgarian"
              />
              <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-primary">
                <Search className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className="bg-white border-b shadow-sm">
        <div className="container mx-auto px-4">
          <div className="hidden lg:flex items-center justify-between">
            <ul className="flex space-x-8 font-bulgarian">
              <li>
                <Link to="/categories" className="block py-4 font-medium hover:text-primary">
                  КАТЕГОРИИ
                </Link>
              </li>
              <li>
                <Link to="/new" className="block py-4 font-medium hover:text-primary">
                  НОВИ СТОКИ
                </Link>
              </li>
              <li>
                <Link to="/top" className="block py-4 font-medium hover:text-primary">
                  ТОП ПРОДУКТИ
                </Link>
              </li>
              <li>
                <Link to="/sale" className="block py-4 font-medium hover:text-primary">
                  ОТСТЪПКИ
                </Link>
              </li>
              <li>
                <Link to="/stores" className="block py-4 font-medium hover:text-primary">
                  МАГАЗИНИ
                </Link>
              </li>
              <li>
                <Link to="/blog" className="block py-4 font-medium hover:text-primary">
                  БЛОГ
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden bg-white border-b shadow-sm animate-fade-in">
          <div className="container mx-auto px-4 py-4">
            <div className="flex justify-center mb-4">
              <Logo />
            </div>
            <ul className="py-2 font-bulgarian">
              <li>
                <Link 
                  to="/categories" 
                  className="block py-3 border-b border-gray-100 font-medium"
                  onClick={toggleMenu}
                >
                  КАТЕГОРИИ
                </Link>
              </li>
              <li>
                <Link 
                  to="/new" 
                  className="block py-3 border-b border-gray-100 font-medium"
                  onClick={toggleMenu}
                >
                  НОВИ СТОКИ
                </Link>
              </li>
              <li>
                <Link 
                  to="/top" 
                  className="block py-3 border-b border-gray-100 font-medium"
                  onClick={toggleMenu}
                >
                  ТОП ПРОДУКТИ
                </Link>
              </li>
              <li>
                <Link 
                  to="/sale" 
                  className="block py-3 border-b border-gray-100 font-medium"
                  onClick={toggleMenu}
                >
                  ОТСТЪПКИ
                </Link>
              </li>
              <li>
                <Link 
                  to="/stores" 
                  className="block py-3 border-b border-gray-100 font-medium"
                  onClick={toggleMenu}
                >
                  МАГАЗИНИ
                </Link>
              </li>
              <li>
                <Link 
                  to="/blog" 
                  className="block py-3 font-medium"
                  onClick={toggleMenu}
                >
                  БЛОГ
                </Link>
              </li>
              {user ? (
                <>
                  <li>
                    <Link 
                      to="/profile" 
                      className="block py-3 border-t border-b border-gray-100 font-medium"
                      onClick={toggleMenu}
                    >
                      My Account
                    </Link>
                  </li>
                  {isAdmin && (
                    <li>
                      <Link 
                        to="/admin" 
                        className="block py-3 border-b border-gray-100 font-medium"
                        onClick={toggleMenu}
                      >
                        Admin Dashboard
                      </Link>
                    </li>
                  )}
                  <li>
                    <button 
                      className="block py-3 border-b border-gray-100 font-medium w-full text-left"
                      onClick={() => {
                        handleSignOut();
                        toggleMenu();
                      }}
                    >
                      Logout
                    </button>
                  </li>
                </>
              ) : (
                <li>
                  <Link 
                    to="/auth" 
                    className="block py-3 border-t border-gray-100 font-medium"
                    onClick={toggleMenu}
                  >
                    Login / Register
                  </Link>
                </li>
              )}
            </ul>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
