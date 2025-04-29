
import { useState } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { X, ChevronRight, ArrowRight, Truck, CreditCard, Package } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

// Примерни данни за кошницата
const initialCartItems = [
  {
    id: "cart-1",
    productId: "101",
    title: "Мъниста акрилни пастелни, 100 бр.",
    price: 7.99,
    quantity: 2,
    image: "/placeholder.svg",
    color: "Пастелен микс",
    size: "6mm"
  },
  {
    id: "cart-2",
    productId: "104",
    title: "Мъниста дървени естествени, 30 бр.",
    price: 6.50,
    quantity: 1,
    image: "/placeholder.svg",
    color: "Натурален",
    size: "8mm"
  }
];

const Cart = () => {
  const [cartItems, setCartItems] = useState(initialCartItems);
  const [promoCode, setPromoCode] = useState("");
  const [promoApplied, setPromoApplied] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  
  const subtotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  const shipping = subtotal >= 100 ? 0 : 5.99;
  const discount = promoApplied ? subtotal * 0.1 : 0; // 10% discount for demo
  const total = subtotal + shipping - discount;
  
  const handleQuantityChange = (id: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    
    setCartItems(cartItems.map(item => 
      item.id === id ? { ...item, quantity: newQuantity } : item
    ));
  };
  
  const handleRemoveItem = (id: string) => {
    setCartItems(cartItems.filter(item => item.id !== id));
    toast.success("Продуктът е премахнат от кошницата");
  };
  
  const handleApplyPromoCode = () => {
    if (promoCode.toLowerCase() === "promo10") {
      setPromoApplied(true);
      toast.success("Промо кодът е приложен успешно!");
    } else {
      toast.error("Невалиден промо код");
    }
  };
  
  const handleProceedToShipping = () => {
    setCurrentStep(2);
    window.scrollTo(0, 0);
  };
  
  const handleProceedToPayment = () => {
    setCurrentStep(3);
    window.scrollTo(0, 0);
  };
  
  const handlePlaceOrder = () => {
    toast.success("Поръчката е направена успешно!");
    // Here you would redirect to a confirmation page in a real app
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow py-6 bg-gray-50">
        <div className="container mx-auto px-4">
          {/* Breadcrumbs */}
          <div className="flex items-center text-sm mb-6 text-gray-500">
            <Link to="/" className="hover:text-primary">Начало</Link>
            <ChevronRight className="h-4 w-4 mx-1" />
            <span className="text-primary">Кошница</span>
          </div>
          
          {/* Progress indicator */}
          <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${currentStep >= 1 ? 'bg-primary text-white' : 'bg-gray-200'}`}>1</div>
                <span className={`ml-2 ${currentStep === 1 ? 'font-medium' : ''}`}>Кошница</span>
              </div>
              <div className="h-1 flex-1 bg-gray-200 mx-4 hidden sm:block"></div>
              <div className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${currentStep >= 2 ? 'bg-primary text-white' : 'bg-gray-200'}`}>2</div>
                <span className={`ml-2 ${currentStep === 2 ? 'font-medium' : ''}`}>Доставка</span>
              </div>
              <div className="h-1 flex-1 bg-gray-200 mx-4 hidden sm:block"></div>
              <div className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${currentStep >= 3 ? 'bg-primary text-white' : 'bg-gray-200'}`}>3</div>
                <span className={`ml-2 ${currentStep === 3 ? 'font-medium' : ''}`}>Плащане</span>
              </div>
            </div>
          </div>
          
          {/* Cart Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main content - changes based on step */}
            <div className="lg:col-span-2">
              {currentStep === 1 && (
                <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                  <div className="p-6 border-b border-gray-100">
                    <h1 className="font-serif text-2xl font-bold">Вашата кошница</h1>
                    <p className="text-gray-500 mt-1">
                      {cartItems.length} {cartItems.length === 1 ? 'продукт' : 'продукта'} в кошницата
                    </p>
                  </div>
                  
                  {cartItems.length === 0 ? (
                    <div className="p-6 text-center">
                      <p className="text-gray-500 mb-4">Вашата кошница е празна</p>
                      <Button asChild>
                        <Link to="/categories">Продължете пазаруването</Link>
                      </Button>
                    </div>
                  ) : (
                    <div>
                      {/* Cart items */}
                      {cartItems.map((item) => (
                        <div key={item.id} className="p-6 border-b border-gray-100 last:border-0">
                          <div className="flex flex-col sm:flex-row">
                            <div className="sm:w-24 sm:h-24 mb-4 sm:mb-0">
                              <img 
                                src={item.image} 
                                alt={item.title} 
                                className="w-full h-full object-contain"
                              />
                            </div>
                            <div className="sm:ml-6 flex-grow">
                              <div className="flex justify-between mb-2">
                                <Link to={`/products/${item.productId}`} className="font-medium hover:text-primary">
                                  {item.title}
                                </Link>
                                <button 
                                  className="text-gray-400 hover:text-red-500"
                                  onClick={() => handleRemoveItem(item.id)}
                                  aria-label="Премахване"
                                >
                                  <X className="h-5 w-5" />
                                </button>
                              </div>
                              <div className="text-sm text-gray-500 mb-2">
                                <span>Цвят: {item.color}</span>
                                <span className="mx-2">|</span>
                                <span>Размер: {item.size}</span>
                              </div>
                              <div className="flex flex-col sm:flex-row sm:items-center justify-between mt-4">
                                <div className="flex items-center mb-4 sm:mb-0">
                                  <button 
                                    className="w-8 h-8 border rounded-l flex items-center justify-center hover:bg-gray-100"
                                    onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                                  >
                                    -
                                  </button>
                                  <input
                                    type="text"
                                    value={item.quantity}
                                    onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value) || 1)}
                                    className="w-12 h-8 border-t border-b text-center"
                                  />
                                  <button 
                                    className="w-8 h-8 border rounded-r flex items-center justify-center hover:bg-gray-100"
                                    onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                                  >
                                    +
                                  </button>
                                </div>
                                <div className="font-medium">
                                  {(item.price * item.quantity).toFixed(2)} лв.
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                      
                      {/* Continue shopping */}
                      <div className="p-6 flex justify-between">
                        <Link to="/categories" className="text-primary hover:underline flex items-center">
                          <span>Продължете пазаруването</span>
                        </Link>
                        <Button onClick={handleProceedToShipping}>
                          <span>Продължи към доставка</span>
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              )}
              
              {currentStep === 2 && (
                <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                  <div className="p-6 border-b border-gray-100">
                    <h1 className="font-serif text-2xl font-bold">Информация за доставка</h1>
                  </div>
                  
                  <div className="p-6">
                    <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="col-span-1">
                        <label className="block text-sm font-medium mb-1">Име*</label>
                        <input
                          type="text"
                          className="w-full border rounded px-3 py-2"
                          placeholder="Вашето име"
                          required
                        />
                      </div>
                      
                      <div className="col-span-1">
                        <label className="block text-sm font-medium mb-1">Фамилия*</label>
                        <input
                          type="text"
                          className="w-full border rounded px-3 py-2"
                          placeholder="Вашата фамилия"
                          required
                        />
                      </div>
                      
                      <div className="col-span-1">
                        <label className="block text-sm font-medium mb-1">Телефон*</label>
                        <input
                          type="tel"
                          className="w-full border rounded px-3 py-2"
                          placeholder="Вашият телефон"
                          required
                        />
                      </div>
                      
                      <div className="col-span-1">
                        <label className="block text-sm font-medium mb-1">Имейл*</label>
                        <input
                          type="email"
                          className="w-full border rounded px-3 py-2"
                          placeholder="Вашият имейл"
                          required
                        />
                      </div>
                      
                      <div className="col-span-full">
                        <label className="block text-sm font-medium mb-1">Адрес*</label>
                        <input
                          type="text"
                          className="w-full border rounded px-3 py-2"
                          placeholder="Вашият адрес"
                          required
                        />
                      </div>
                      
                      <div className="col-span-1">
                        <label className="block text-sm font-medium mb-1">Град*</label>
                        <input
                          type="text"
                          className="w-full border rounded px-3 py-2"
                          placeholder="Вашият град"
                          required
                        />
                      </div>
                      
                      <div className="col-span-1">
                        <label className="block text-sm font-medium mb-1">Пощенски код*</label>
                        <input
                          type="text"
                          className="w-full border rounded px-3 py-2"
                          placeholder="Вашият пощенски код"
                          required
                        />
                      </div>
                      
                      <div className="col-span-full">
                        <label className="block text-sm font-medium mb-1">Бележки към поръчката</label>
                        <textarea
                          className="w-full border rounded px-3 py-2"
                          rows={3}
                          placeholder="Бележки към поръчката или изисквания за доставка"
                        ></textarea>
                      </div>
                    </form>
                    
                    <div className="mt-6">
                      <h3 className="font-medium mb-3">Изберете начин на доставка</h3>
                      <div className="space-y-3">
                        <label className="flex items-center p-3 border rounded cursor-pointer">
                          <input type="radio" name="shipping" className="mr-3" defaultChecked />
                          <Truck className="h-5 w-5 mr-2 text-primary" />
                          <span>Стандартна доставка (2-3 работни дни)</span>
                        </label>
                        <label className="flex items-center p-3 border rounded cursor-pointer">
                          <input type="radio" name="shipping" className="mr-3" />
                          <Package className="h-5 w-5 mr-2 text-primary" />
                          <span>Експресна доставка (до 24 часа)</span>
                          <span className="ml-2 text-sm text-gray-500">+2.99 лв.</span>
                        </label>
                      </div>
                    </div>
                    
                    <div className="mt-6 flex justify-between">
                      <Button variant="outline" onClick={() => setCurrentStep(1)}>
                        Назад към кошницата
                      </Button>
                      <Button onClick={handleProceedToPayment}>
                        <span>Продължи към плащане</span>
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              )}
              
              {currentStep === 3 && (
                <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                  <div className="p-6 border-b border-gray-100">
                    <h1 className="font-serif text-2xl font-bold">Плащане</h1>
                  </div>
                  
                  <div className="p-6">
                    <h3 className="font-medium mb-3">Изберете начин на плащане</h3>
                    <div className="space-y-3">
                      <label className="flex items-center p-3 border rounded cursor-pointer">
                        <input type="radio" name="payment" className="mr-3" defaultChecked />
                        <CreditCard className="h-5 w-5 mr-2 text-primary" />
                        <span>Карта (Visa, MasterCard)</span>
                      </label>
                      <label className="flex items-center p-3 border rounded cursor-pointer">
                        <input type="radio" name="payment" className="mr-3" />
                        <Package className="h-5 w-5 mr-2 text-primary" />
                        <span>Наложен платеж</span>
                      </label>
                    </div>
                    
                    {/* Credit card form would go here in a real application */}
                    <div className="mt-6 border-t border-gray-100 pt-6">
                      <h3 className="font-medium mb-4">Резюме на поръчката</h3>
                      <div className="space-y-2">
                        {cartItems.map((item) => (
                          <div key={item.id} className="flex justify-between">
                            <span>
                              {item.title} x {item.quantity}
                            </span>
                            <span className="font-medium">
                              {(item.price * item.quantity).toFixed(2)} лв.
                            </span>
                          </div>
                        ))}
                        
                        <div className="flex justify-between pt-2 border-t border-gray-100">
                          <span>Междинна сума:</span>
                          <span>{subtotal.toFixed(2)} лв.</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Доставка:</span>
                          <span>
                            {shipping === 0 ? 'Безплатна' : `${shipping.toFixed(2)} лв.`}
                          </span>
                        </div>
                        {promoApplied && (
                          <div className="flex justify-between text-primary">
                            <span>Отстъпка (PROMO10):</span>
                            <span>-{discount.toFixed(2)} лв.</span>
                          </div>
                        )}
                        <div className="flex justify-between pt-2 border-t border-gray-100 text-lg font-bold">
                          <span>Общо:</span>
                          <span>{total.toFixed(2)} лв.</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-6 flex justify-between">
                      <Button variant="outline" onClick={() => setCurrentStep(2)}>
                        Назад към доставка
                      </Button>
                      <Button onClick={handlePlaceOrder}>
                        Завърши поръчката
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </div>
            
            {/* Order summary sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="font-serif text-xl font-bold mb-4">Резюме на поръчката</h2>
                
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between">
                    <span>Междинна сума:</span>
                    <span>{subtotal.toFixed(2)} лв.</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Доставка:</span>
                    <span>
                      {shipping === 0 ? 'Безплатна' : `${shipping.toFixed(2)} лв.`}
                    </span>
                  </div>
                  {promoApplied && (
                    <div className="flex justify-between text-primary">
                      <span>Отстъпка (PROMO10):</span>
                      <span>-{discount.toFixed(2)} лв.</span>
                    </div>
                  )}
                  <div className="flex justify-between pt-3 border-t border-gray-100 text-lg font-bold">
                    <span>Общо:</span>
                    <span>{total.toFixed(2)} лв.</span>
                  </div>
                </div>
                
                {/* Promo code */}
                <div className="mb-6">
                  <label className="block text-sm font-medium mb-2">Промо код</label>
                  <div className="flex">
                    <input
                      type="text"
                      className="flex-grow border rounded-l px-3 py-2"
                      placeholder="Промо код"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      disabled={promoApplied}
                    />
                    <Button
                      variant="outline"
                      className="rounded-l-none"
                      onClick={handleApplyPromoCode}
                      disabled={promoApplied || !promoCode}
                    >
                      Приложи
                    </Button>
                  </div>
                  {promoApplied && (
                    <p className="text-sm text-primary mt-1">
                      Промо кодът е приложен успешно!
                    </p>
                  )}
                </div>
                
                {/* Free shipping notice */}
                <div className="bg-gray-50 p-4 rounded-md text-center text-sm">
                  {subtotal >= 100 ? (
                    <p className="text-green-600">
                      Поздравления! Вашата поръчка отговаря на условието за безплатна доставка.
                    </p>
                  ) : (
                    <p>
                      Добавете още {(100 - subtotal).toFixed(2)} лв. за безплатна доставка.
                    </p>
                  )}
                </div>
              </div>
              
              {/* Secure payment notice */}
              <div className="bg-white rounded-lg shadow-sm p-6 mt-6">
                <div className="text-center">
                  <CreditCard className="h-6 w-6 mx-auto mb-2 text-primary" />
                  <h3 className="font-medium mb-1">Сигурно плащане</h3>
                  <p className="text-sm text-gray-500">
                    Всички плащания са криптирани и напълно сигурни
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Cart;
