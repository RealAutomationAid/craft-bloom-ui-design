
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from "@/components/ui/dialog";
import { Pencil, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

type Store = {
  id: string;
  name: string;
  address: string;
  phone: string;
  hours: string;
  city: string;
};

const AdminStoreList = () => {
  const [stores, setStores] = useState<Store[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedStore, setSelectedStore] = useState<Store | null>(null);
  const { toast } = useToast();

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
      }
    } catch (error) {
      console.error("Error fetching stores:", error);
      toast({
        variant: "destructive",
        title: "Грешка при зареждане на магазините",
        description: "Възникна проблем при зареждането на списъка с магазини.",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const { error } = await supabase
        .from('stores')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
      
      setStores(stores.filter(store => store.id !== id));
      toast({
        title: "Магазинът е изтрит успешно",
      });
    } catch (error) {
      console.error("Error deleting store:", error);
      toast({
        variant: "destructive",
        title: "Грешка при изтриване на магазина",
        description: "Възникна проблем при изтриването на магазина.",
      });
    }
  };

  return (
    <div>
      {loading ? (
        <div className="flex justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
        </div>
      ) : stores.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-500">Няма създадени магазини</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="p-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Име</th>
                <th className="p-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Град</th>
                <th className="p-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Адрес</th>
                <th className="p-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Телефон</th>
                <th className="p-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Действия</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {stores.map((store) => (
                <tr key={store.id} className="hover:bg-gray-50">
                  <td className="p-3 whitespace-nowrap">{store.name}</td>
                  <td className="p-3 whitespace-nowrap">{store.city}</td>
                  <td className="p-3">{store.address}</td>
                  <td className="p-3 whitespace-nowrap">{store.phone}</td>
                  <td className="p-3 whitespace-nowrap">
                    <div className="flex space-x-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => setSelectedStore(store)}
                          >
                            <Pencil className="h-4 w-4 mr-1" /> 
                            Редактирай
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-md">
                          <DialogHeader>
                            <DialogTitle>Редактирай магазин</DialogTitle>
                          </DialogHeader>
                          {/* Here would be the edit form, for brevity we'll add this in a future implementation */}
                          <p className="py-4">Функционалността за редактиране ще бъде добавена скоро.</p>
                          <DialogClose asChild>
                            <Button variant="outline" className="w-full">Затвори</Button>
                          </DialogClose>
                        </DialogContent>
                      </Dialog>
                      
                      <Button 
                        variant="destructive" 
                        size="sm"
                        onClick={() => handleDelete(store.id)}
                      >
                        <Trash2 className="h-4 w-4 mr-1" /> 
                        Изтрий
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminStoreList;
