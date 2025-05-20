
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { Package as PackageIcon, MapPin, Settings, LogOut, QrCode } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PackageCard from "@/components/PackageCard";
import LocationMap from "@/components/LocationMap";
import { getCurrentUser, isLoggedIn, logout } from "@/lib/auth";
import { getUserPackages, Package } from "@/lib/tracking";

const Dashboard = () => {
  const navigate = useNavigate();
  const [packages, setPackages] = useState<Package[]>([]);
  
  useEffect(() => {
    // Check if user is logged in
    if (!isLoggedIn()) {
      toast.error("Please login to access the dashboard");
      navigate("/login");
      return;
    }
    
    // Get user packages
    const currentUser = getCurrentUser();
    if (currentUser) {
      const userPackages = getUserPackages(currentUser.id);
      setPackages(userPackages);
    }
  }, [navigate]);
  
  const handleLogout = () => {
    logout();
    toast.success("Logged out successfully");
    navigate("/");
  };
  
  const handlePackageClick = (trackingNumber: string) => {
    navigate(`/track?number=${encodeURIComponent(trackingNumber)}`);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
            <h1 className="text-2xl md:text-3xl font-bold">Dashboard</h1>
            
            <div className="flex mt-4 md:mt-0 space-x-2">
              <Button 
                variant="outline"
                className="text-flash-primary border-flash-primary"
                onClick={() => navigate("/scan")}
              >
                <QrCode size={18} className="mr-2" />
                Scan QR
              </Button>
              <Button 
                variant="outline"
                className="text-red-500 border-red-500 hover:bg-red-50"
                onClick={handleLogout}
              >
                <LogOut size={18} className="mr-2" />
                Logout
              </Button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            <div className="lg:col-span-1">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Profile</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col items-center">
                    <div className="w-24 h-24 rounded-full bg-flash-primary text-white flex items-center justify-center text-2xl font-bold mb-4">
                      {getCurrentUser()?.name.charAt(0).toUpperCase() || "U"}
                    </div>
                    <h2 className="text-xl font-semibold">{getCurrentUser()?.name || "User"}</h2>
                    <p className="text-gray-500 mb-4">{getCurrentUser()?.email || "user@example.com"}</p>
                    
                    <Button 
                      variant="outline" 
                      className="w-full mt-2"
                      onClick={() => toast.info("Profile settings coming soon")}
                    >
                      <Settings size={16} className="mr-2" />
                      Account Settings
                    </Button>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="mt-6">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Quick Actions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <Button 
                      variant="outline" 
                      className="w-full justify-start"
                      onClick={() => navigate("/track")}
                    >
                      <PackageIcon size={16} className="mr-2" />
                      Track a Package
                    </Button>
                    <Button 
                      variant="outline" 
                      className="w-full justify-start"
                      onClick={() => navigate("/scan")}
                    >
                      <QrCode size={16} className="mr-2" />
                      Scan QR Code
                    </Button>
                    <Button 
                      variant="outline" 
                      className="w-full justify-start"
                      onClick={() => navigate("/locations")}
                    >
                      <MapPin size={16} className="mr-2" />
                      Find Drop-off Points
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div className="lg:col-span-3">
              <Tabs defaultValue="packages">
                <TabsList className="mb-4">
                  <TabsTrigger value="packages">My Packages</TabsTrigger>
                  <TabsTrigger value="map">Nearby Locations</TabsTrigger>
                </TabsList>
                
                <TabsContent value="packages">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">Your Packages</CardTitle>
                    </CardHeader>
                    <CardContent>
                      {packages.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {packages.map((pkg) => (
                            <PackageCard 
                              key={pkg.id} 
                              packageData={pkg} 
                              onClick={() => handlePackageClick(pkg.trackingNumber)}
                            />
                          ))}
                        </div>
                      ) : (
                        <div className="text-center py-8">
                          <PackageIcon size={48} className="mx-auto text-gray-300 mb-4" />
                          <h3 className="text-lg font-medium mb-2">No Packages Found</h3>
                          <p className="text-gray-500 mb-4">You don't have any packages to track yet.</p>
                          <Button 
                            onClick={() => navigate("/track")}
                            className="bg-flash-primary hover:bg-flash-primary/90"
                          >
                            Track a Package
                          </Button>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="map">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">Nearby Drop-off Points</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="rounded-lg overflow-hidden mb-4">
                        <LocationMap height="400px" />
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Card>
                          <CardContent className="p-4">
                            <h3 className="font-medium mb-1">Bangkok Central Office</h3>
                            <p className="text-sm text-gray-500 mb-2">123 Sukhumvit Rd, Bangkok</p>
                            <div className="text-xs text-gray-500">Open: 8 AM - 8 PM</div>
                          </CardContent>
                        </Card>
                        <Card>
                          <CardContent className="p-4">
                            <h3 className="font-medium mb-1">Siam Collection Point</h3>
                            <p className="text-sm text-gray-500 mb-2">Siam Square, Bangkok</p>
                            <div className="text-xs text-gray-500">Open: 10 AM - 9 PM</div>
                          </CardContent>
                        </Card>
                        <Card>
                          <CardContent className="p-4">
                            <h3 className="font-medium mb-1">Asok Branch</h3>
                            <p className="text-sm text-gray-500 mb-2">Asok Junction, Bangkok</p>
                            <div className="text-xs text-gray-500">Open: 9 AM - 7 PM</div>
                          </CardContent>
                        </Card>
                        <Card>
                          <CardContent className="p-4">
                            <h3 className="font-medium mb-1">Victory Monument</h3>
                            <p className="text-sm text-gray-500 mb-2">Victory Monument, Bangkok</p>
                            <div className="text-xs text-gray-500">Open: 8 AM - 6 PM</div>
                          </CardContent>
                        </Card>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Dashboard;
