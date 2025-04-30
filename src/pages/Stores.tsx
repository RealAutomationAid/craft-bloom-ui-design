
import { useState, useEffect } from "react";
import { MapPin, Phone, Clock } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { supabase } from "@/integrations/supabase/client";

type Store = {
  id: string;
  name: string;
  address: string;
  phone: string;
  hours: string;
  city: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
};

const Stores = () => {
  const [stores, setStores] = useState<Store[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCity, setSelectedCity] = useState<string>("all");
  const [cities, setCities] = useState<string[]>([]);

  useEffect(() => {
    fetchStores();
  }, []);

  const fetchStores = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('stores')
        .select('*')
        .order('city', { ascending: true });
      
      if (error) throw error;
      
      if (data) {
        setStores(data);
        
        // Extract unique cities
        const uniqueCities = Array.from(new Set(data.map(store => store.city)));
        setCities(uniqueCities);
      }
    } catch (error) {
      console.error("Error fetching stores:", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredStores = selectedCity === "all" 
    ? stores 
    : stores.filter(store => store.city === selectedCity);

  return (
    <>
      <Header />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-serif font-bold mb-8 text-center">Нашите магазини</h1>
        
        {/* City Filter */}
        {cities.length > 1 && (
          <div className="flex justify-center mb-8">
            <div className="inline-flex rounded-md shadow-sm">
              <button
                className={`px-4 py-2 text-sm font-medium border ${
                  selectedCity === "all" 
                    ? "bg-primary text-white border-primary" 
                    : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
                } rounded-l-lg`}
                onClick={() => setSelectedCity("all")}
              >
                Всички
              </button>
              
              {cities.map((city) => (
                <button
                  key={city}
                  className={`px-4 py-2 text-sm font-medium border-t border-b border-r ${
                    selectedCity === city 
                      ? "bg-primary text-white border-primary" 
                      : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
                  } ${city === cities[cities.length - 1] ? "rounded-r-lg" : ""}`}
                  onClick={() => setSelectedCity(city)}
                >
                  {city}
                </button>
              ))}
            </div>
          </div>
        )}
        
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
          </div>
        ) : stores.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">Няма намерени магазини.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredStores.map((store) => (
              <div key={store.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                {/* Store could have an image here in the future */}
                <div className="p-6">
                  <h2 className="text-xl font-serif font-bold mb-3">{store.name}</h2>
                  
                  <div className="flex items-start space-x-2 mb-2">
                    <MapPin className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <p className="text-gray-600">{store.address}</p>
                  </div>
                  
                  <div className="flex items-center space-x-2 mb-2">
                    <Phone className="h-5 w-5 text-primary" />
                    <p className="text-gray-600">{store.phone}</p>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Clock className="h-5 w-5 text-primary" />
                    <p className="text-gray-600">{store.hours}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
      <Footer />
    </>
  );
};

export default Stores;
