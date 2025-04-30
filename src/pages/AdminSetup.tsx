
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const AdminSetup = () => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const { toast } = useToast();

  const createAdminAccount = async () => {
    setLoading(true);
    try {
      // Register the admin user
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: "development@automationaid.eu",
        password: "Savata619",
      });
      
      if (authError) throw authError;
      
      const userId = authData.user?.id;
      
      if (!userId) {
        throw new Error("User ID not found after registration");
      }
      
      // Update the user role to admin
      // Using 'any' type to bypass type checking since database schema types don't include the profiles table yet
      const { error: profileError } = await (supabase
        .from('profiles') as any)
        .update({ role: 'admin' })
        .eq('id', userId);
      
      if (profileError) throw profileError;
      
      toast({
        title: "Admin account created",
        description: "Email: development@automationaid.eu, Password: Savata619",
      });
      
      setSuccess(true);
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Failed to create admin account",
        description: error.message || "Something went wrong",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto py-10 px-4">
      <h1 className="text-2xl font-serif mb-6">Admin Account Setup</h1>
      
      {!success ? (
        <div>
          <p className="mb-4">
            This will create an admin account with the following credentials:
          </p>
          <p className="mb-2"><strong>Email:</strong> development@automationaid.eu</p>
          <p className="mb-4"><strong>Password:</strong> Savata619</p>
          
          <Button 
            onClick={createAdminAccount} 
            disabled={loading}
            className="mt-2"
          >
            {loading ? "Creating..." : "Create Admin Account"}
          </Button>
        </div>
      ) : (
        <div className="bg-green-50 border border-green-200 rounded-md p-4">
          <p className="text-green-800">
            Admin account has been successfully created! You can now log in with these credentials:
          </p>
          <p className="mt-2"><strong>Email:</strong> development@automationaid.eu</p>
          <p><strong>Password:</strong> Savata619</p>
        </div>
      )}
    </div>
  );
};

export default AdminSetup;
