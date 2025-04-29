
import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, Facebook, Instagram, Youtube } from "lucide-react";
import Logo from "./Logo";

const Footer = () => {
  return (
    <footer className="bg-white border-t">
      <div className="container mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <Logo />
            <p className="mt-4 text-gray-600">
              Вашият онлайн магазин за крафт и скрапбукинг материали. Разнообразие от висококачествени продукти за всички ваши творчески проекти.
            </p>
            <div className="flex space-x-4 mt-6">
              <a href="#" className="text-gray-400 hover:text-primary">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary">
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-serif text-lg font-bold mb-4">Категории</h3>
            <ul className="space-y-2">
              <li><Link to="/categories/marteniци-i-materiali" className="text-gray-600 hover:text-primary">Мартеници и Материали</Link></li>
              <li><Link to="/categories/munista" className="text-gray-600 hover:text-primary">Мъниста</Link></li>
              <li><Link to="/categories/estestveni-kamuni" className="text-gray-600 hover:text-primary">Естествени Камъни</Link></li>
              <li><Link to="/categories/hobi-i-kraft" className="text-gray-600 hover:text-primary">Хоби и Крафт</Link></li>
              <li><Link to="/categories/art-materiali" className="text-gray-600 hover:text-primary">Арт материали</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-serif text-lg font-bold mb-4">Информация</h3>
            <ul className="space-y-2">
              <li><Link to="/about" className="text-gray-600 hover:text-primary">За нас</Link></li>
              <li><Link to="/shipping" className="text-gray-600 hover:text-primary">Доставка</Link></li>
              <li><Link to="/terms" className="text-gray-600 hover:text-primary">Общи условия</Link></li>
              <li><Link to="/privacy" className="text-gray-600 hover:text-primary">Поверителност</Link></li>
              <li><Link to="/contact" className="text-gray-600 hover:text-primary">Контакти</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-serif text-lg font-bold mb-4">Контакт с нас</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 mr-2 text-primary" />
                <span className="text-gray-600">ул. "Иван Вазов" 12, гр. София, 1000</span>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 mr-2 text-primary" />
                <a href="tel:+359888123456" className="text-gray-600 hover:text-primary">088 812 3456</a>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 mr-2 text-primary" />
                <a href="mailto:info@craftbloom.bg" className="text-gray-600 hover:text-primary">info@craftbloom.bg</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 mt-10 pt-6 text-center text-gray-500 text-sm">
          <p>&copy; {new Date().getFullYear()} КрафтБлум. Всички права запазени.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
