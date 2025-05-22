
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getCurrentUser, logout } from "@/lib/auth";
import ImageAdUploader from "@/components/ImageAdUploader";

const AdminDashboard = () => {
  // Get current user information
  const user = getCurrentUser();
  
  useEffect(() => {
    if (user?.role !== "admin") {
      toast.error("Admin access required");
    }
    
    // Welcome message
    toast.success(`Welcome, ${user?.name || "Admin"}!`);
  }, []);
  
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow bg-gray-50 py-10 px-4">
        <div className="container mx-auto">
          <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
          <p className="text-gray-500 mb-6">Manage your Flash Express services</p>
          
          <Tabs defaultValue="overview" className="space-y-6">
            <TabsList className="grid grid-cols-4 md:grid-cols-6 w-full">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="packages">Packages</TabsTrigger>
              <TabsTrigger value="users">Users</TabsTrigger>
              <TabsTrigger value="advertising">Advertising</TabsTrigger>
              <TabsTrigger value="settings" className="hidden md:inline-flex">Settings</TabsTrigger>
              <TabsTrigger value="reports" className="hidden md:inline-flex">Reports</TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Admin Information</CardTitle>
                    <CardDescription>Your account details</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-500">Name:</span>
                        <span className="font-medium">{user?.name || "Admin User"}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Email:</span>
                        <span className="font-medium">{user?.email || "admin@flashexpress.com"}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Role:</span>
                        <span className="font-medium">Administrator</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Last Login:</span>
                        <span className="font-medium">Today</span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button 
                      variant="outline" 
                      className="w-full"
                      onClick={() => {
                        logout();
                        window.location.href = "/login";
                      }}
                    >
                      Log Out
                    </Button>
                  </CardFooter>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>System Status</CardTitle>
                    <CardDescription>Current system metrics</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-500">Active Users:</span>
                        <span className="font-medium">274</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Packages in Transit:</span>
                        <span className="font-medium">1,392</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Pending Deliveries:</span>
                        <span className="font-medium">438</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">System Status:</span>
                        <span className="font-medium text-green-500">Operational</span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full">View Detailed Stats</Button>
                  </CardFooter>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="advertising" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Advertisement Management</CardTitle>
                  <CardDescription>
                    Upload and manage advertisement images shown on the home page carousel
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ImageAdUploader />
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Current Advertisements</CardTitle>
                  <CardDescription>
                    View and manage existing advertisements
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {/* This would typically fetch from storage/backend */}
                    <p>
                      To view and manage your existing advertisements, go to the home page to see how they appear in the carousel.
                      Newly uploaded advertisements will appear in the carousel after refresh.
                    </p>
                    <Button 
                      variant="outline"
                      onClick={() => window.open("/", "_blank")}
                    >
                      View Home Page
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="packages">
              <Card>
                <CardHeader>
                  <CardTitle>Package Management</CardTitle>
                  <CardDescription>View and manage all packages in the system</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-500">
                    This section would display a table of packages with filtering and sorting options.
                    Package management functionality would be implemented in a real application.
                  </p>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="users">
              <Card>
                <CardHeader>
                  <CardTitle>User Management</CardTitle>
                  <CardDescription>Manage user accounts and permissions</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-500">
                    This section would display a table of users with options to edit permissions,
                    reset passwords, and manage user accounts.
                  </p>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="settings">
              <Card>
                <CardHeader>
                  <CardTitle>System Settings</CardTitle>
                  <CardDescription>Configure application settings</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-500">
                    This section would provide options to configure various system settings
                    such as email notifications, API integrations, and more.
                  </p>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="reports">
              <Card>
                <CardHeader>
                  <CardTitle>Reports & Analytics</CardTitle>
                  <CardDescription>View system reports and analytics</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-500">
                    This section would display various reports and analytics graphs
                    showing system performance, delivery metrics, and more.
                  </p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default AdminDashboard;
