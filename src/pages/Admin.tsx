
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import AdminProductForm from "@/components/admin/AdminProductForm";
import AdminCategoryForm from "@/components/admin/AdminCategoryForm";
import AdminProductList from "@/components/admin/AdminProductList";
import AdminCategoryList from "@/components/admin/AdminCategoryList";
import BulkProductCreation from "@/components/admin/BulkProductCreation";
import AdminStoreForm from "@/components/admin/AdminStoreForm";
import AdminStoreList from "@/components/admin/AdminStoreList";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AdminNewProductsSelector from "@/components/admin/AdminNewProductsSelector";

const Admin = () => {
  const [activeTab, setActiveTab] = useState("products");
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-serif font-bold mb-6">Администраторски панел</h1>
        
        <Tabs defaultValue="products" onValueChange={(value) => setActiveTab(value)}>
          <TabsList className="mb-6">
            <TabsTrigger value="products">Продукти</TabsTrigger>
            <TabsTrigger value="categories">Категории</TabsTrigger>
            <TabsTrigger value="stores">Магазини</TabsTrigger>
            <TabsTrigger value="new_products">Нови Стоки</TabsTrigger>
            <TabsTrigger value="bulk">Масово добавяне</TabsTrigger>
          </TabsList>
          
          <TabsContent value="products">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-1">
                <Card>
                  <CardHeader>
                    <CardTitle>Създай нов продукт</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <AdminProductForm />
                  </CardContent>
                </Card>
              </div>
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Всички продукти</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <AdminProductList />
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="categories">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-1">
                <Card>
                  <CardHeader>
                    <CardTitle>Създай нова категория</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <AdminCategoryForm />
                  </CardContent>
                </Card>
              </div>
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Всички категории</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <AdminCategoryList />
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="stores">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-1">
                <Card>
                  <CardHeader>
                    <CardTitle>Добави нов магазин</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <AdminStoreForm />
                  </CardContent>
                </Card>
              </div>
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Всички магазини</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <AdminStoreList />
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="new_products">
            <Card>
              <CardHeader>
                <CardTitle>Управление на нови стоки</CardTitle>
              </CardHeader>
              <CardContent>
                <AdminNewProductsSelector />
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="bulk">
            <Card>
              <CardHeader>
                <CardTitle>Масово добавяне на продукти</CardTitle>
              </CardHeader>
              <CardContent>
                <BulkProductCreation />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
      <Footer />
    </div>
  );
};

export default Admin;
