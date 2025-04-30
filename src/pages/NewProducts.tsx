
import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductGrid from "@/components/ProductGrid";
import { supabase } from "@/integrations/supabase/client";

const NewProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchNewProducts();
  }, []);

  const fetchNewProducts = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('is_new', true)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      
      if (data) {
        setProducts(data);
      }
    } catch (error) {
      console.error("Error fetching new products:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-serif font-bold mb-8 text-center">Нови Стоки</h1>
        
        <ProductGrid 
          products={products} 
          isLoading={loading} 
          title=""
        />
      </main>
      <Footer />
    </>
  );
};

export default NewProducts;
