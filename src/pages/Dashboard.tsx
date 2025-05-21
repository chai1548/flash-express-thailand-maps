
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";
import { Package, Truck, Search, User, QrCode } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getCurrentUser, isAdmin, logout } from "@/lib/auth";
import { getUserPackages, Package as PackageType } from "@/lib/tracking";
import PackageCard from "@/components/PackageCard";

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(getCurrentUser());
  const [packages, setPackages] = useState<PackageType[]>([]);
  const isUserAdmin = isAdmin();
  
  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }
    
    // Load user's packages
    setPackages(getUserPackages(user.id));
  }, [user, navigate]);
  
  const handleLogout = () => {
    logout();
    toast.success("You have been logged out");
    navigate("/");
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl md:text-3xl font-bold">Dashboard</h1>
            <div className="space-x-2">
              {isUserAdmin && (
                <Button 
                  variant="outline" 
                  className="border-flash-primary text-flash-primary"
                  onClick={() => navigate("/admin")}
                >
                  Admin Panel
                </Button>
              )}
              <Button 
                variant="outline" 
                onClick={handleLogout}
              >
                Log Out
              </Button>
            </div>
          </div>
          
          <Card className="mb-8">
            <CardContent className="pt-6">
              <div className="flex flex-col md:flex-row justify-between">
                <div className="mb-4 md:mb-0">
                  <h2 className="text-xl font-semibold mb-1">Welcome, {user?.name}</h2>
                  <p className="text-gray-600">{user?.email}</p>
                  <p className="text-sm text-gray-500 mt-1">Role: {user?.role}</p>
                </div>
                <Button 
                  className="bg-flash-primary hover:bg-flash-primary/90"
                  onClick={() => toast.info("Profile settings coming soon!")}
                >
                  <User size={18} className="mr-2" />
                  Manage Profile
                </Button>
              </div>
            </CardContent>
          </Card>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <Card className="hover:shadow-md transition-shadow cursor-pointer" onClick={() => navigate("/track")}>
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center">
                  <div className="w-12 h-12 bg-flash-light rounded-full flex items-center justify-center mb-3">
                    <Search size={24} className="text-flash-primary" />
                  </div>
                  <h3 className="font-semibold mb-2">Track Package</h3>
                  <p className="text-sm text-gray-500">Track your shipments</p>
                </div>
              </CardContent>
            </Card>
            
            <Card className="hover:shadow-md transition-shadow cursor-pointer" onClick={() => navigate("/ship")}>
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center">
                  <div className="w-12 h-12 bg-flash-light rounded-full flex items-center justify-center mb-3">
                    <Truck size={24} className="text-flash-primary" />
                  </div>
                  <h3 className="font-semibold mb-2">Ship Package</h3>
                  <p className="text-sm text-gray-500">Create a new shipment</p>
                </div>
              </CardContent>
            </Card>
            
            <Card className="hover:shadow-md transition-shadow cursor-pointer" onClick={() => navigate("/receive")}>
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center">
                  <div className="w-12 h-12 bg-flash-light rounded-full flex items-center justify-center mb-3">
                    <Package size={24} className="text-flash-primary" />
                  </div>
                  <h3 className="font-semibold mb-2">Receive Package</h3>
                  <p className="text-sm text-gray-500">Manage incoming packages</p>
                </div>
              </CardContent>
            </Card>
            
            <Card className="hover:shadow-md transition-shadow cursor-pointer" onClick={() => navigate("/scan")}>
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center">
                  <div className="w-12 h-12 bg-flash-light rounded-full flex items-center justify-center mb-3">
                    <QrCode size={24} className="text-flash-primary" />
                  </div>
                  <h3 className="font-semibold mb-2">Scan QR Code</h3>
                  <p className="text-sm text-gray-500">Scan package QR codes</p>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <h2 className="text-xl font-semibold mb-4">Your Recent Packages</h2>
          {packages.length > 0 ? (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {packages.map(pkg => (
                <PackageCard 
                  key={pkg.id}
                  packageData={pkg}
                  onClick={() => navigate(`/track?number=${pkg.trackingNumber}`)}
                />
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="py-12 text-center">
                <Package size={48} className="mx-auto text-gray-400 mb-3" />
                <p className="text-lg font-medium mb-2">No packages yet</p>
                <p className="text-gray-500 mb-4">You don't have any recent packages</p>
                <Button 
                  className="bg-flash-secondary hover:bg-flash-secondary/90"
                  onClick={() => navigate("/ship")}
                >
                  <Truck size={18} className="mr-2" />
                  Ship a Package
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Dashboard;
