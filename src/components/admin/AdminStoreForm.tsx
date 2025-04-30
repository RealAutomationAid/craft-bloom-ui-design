
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";

const storeSchema = z.object({
  name: z.string().min(1, "Името е задължително"),
  address: z.string().min(1, "Адресът е задължителен"),
  city: z.string().min(1, "Градът е задължителен"),
  phone: z.string().min(1, "Телефонът е задължителен"),
  hours: z.string().min(1, "Работното време е задължително"),
});

type StoreFormValues = z.infer<typeof storeSchema>;

const AdminStoreForm = () => {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  
  const form = useForm<StoreFormValues>({
    resolver: zodResolver(storeSchema),
    defaultValues: {
      name: "",
      address: "",
      city: "",
      phone: "",
      hours: "",
    },
  });

  const onSubmit = async (values: StoreFormValues) => {
    try {
      setLoading(true);
      
      const { error } = await supabase
        .from("stores")
        .insert([values]);
      
      if (error) throw error;
      
      toast({
        title: "Магазинът е създаден успешно",
        description: `${values.name} е добавен в списъка с магазини.`,
      });
      
      form.reset();
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Грешка при създаване на магазина",
        description: error.message || "Възникна проблем при създаване на магазина.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Име на магазина</FormLabel>
              <FormControl>
                <Input placeholder="КрафтБлум - София Център" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="city"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Град</FormLabel>
              <FormControl>
                <Input placeholder="София" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Адрес</FormLabel>
              <FormControl>
                <Textarea placeholder="ул. Иван Вазов 12, София 1000" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Телефон</FormLabel>
              <FormControl>
                <Input placeholder="088 812 3456" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="hours"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Работно време</FormLabel>
              <FormControl>
                <Input placeholder="Пон-Пет: 9:00-18:00, Съб: 10:00-16:00" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <Button type="submit" disabled={loading} className="w-full">
          {loading ? "Създаване..." : "Създай магазин"}
        </Button>
      </form>
    </Form>
  );
};

export default AdminStoreForm;
