
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";
import { Search, Package as PackageIcon } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import TrackingTimeline from "@/components/TrackingTimeline";
import LocationMap from "@/components/LocationMap";
import { getPackageByTrackingNumber, Package } from "@/lib/tracking";

const TrackPackage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [trackingNumber, setTrackingNumber] = useState("");
  const [packageData, setPackageData] = useState<Package | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  
  // Parse tracking number from query params
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const number = queryParams.get("number");
    
    if (number) {
      setTrackingNumber(number);
      handleTrack(number);
    }
  }, [location.search]);
  
  const handleTrack = async (number: string) => {
    if (!number.trim()) {
      toast.error("Please enter a tracking number");
      return;
    }
    
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const packageInfo = getPackageByTrackingNumber(number.trim());
      
      if (packageInfo) {
        setPackageData(packageInfo);
      } else {
        toast.error("Package not found");
        setPackageData(null);
      }
    } catch (error) {
      toast.error("An error occurred while tracking the package");
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleTrack(trackingNumber);
  };

  const getLastLocation = () => {
    if (!packageData || packageData.history.length === 0) return null;
    
    return packageData.history[0].location;
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-2xl md:text-3xl font-bold mb-6">Track Your Package</h1>
          
          <Card className="mb-8">
            <CardContent className="pt-6">
              <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-3">
                <Input
                  placeholder="Enter tracking number..."
                  value={trackingNumber}
                  onChange={(e) => setTrackingNumber(e.target.value)}
                  className="flex-grow"
                />
                <Button 
                  type="submit" 
                  className="bg-flash-primary hover:bg-flash-primary/90"
                  disabled={isLoading}
                >
                  <Search size={18} className="mr-2" />
                  {isLoading ? "Tracking..." : "Track Package"}
                </Button>
              </form>
            </CardContent>
          </Card>
          
          {packageData ? (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h2 className="text-xl font-semibold mb-1">
                          Tracking Number: {packageData.trackingNumber}
                        </h2>
                        <p className="text-sm text-gray-500">
                          Status: <span className="font-medium text-flash-primary">{packageData.status.replace('-', ' ')}</span>
                        </p>
                      </div>
                      <div className="bg-flash-light p-2 rounded-full">
                        <PackageIcon size={24} className="text-flash-primary" />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                      <div>
                        <h3 className="text-sm text-gray-500">From</h3>
                        <p className="font-medium">{packageData.origin}</p>
                      </div>
                      <div>
                        <h3 className="text-sm text-gray-500">To</h3>
                        <p className="font-medium">{packageData.destination}</p>
                      </div>
                      <div>
                        <h3 className="text-sm text-gray-500">Sender</h3>
                        <p className="font-medium">{packageData.sender}</p>
                      </div>
                      <div>
                        <h3 className="text-sm text-gray-500">Recipient</h3>
                        <p className="font-medium">{packageData.recipient}</p>
                      </div>
                      <div>
                        <h3 className="text-sm text-gray-500">Estimated Delivery</h3>
                        <p className="font-medium">
                          {new Date(packageData.estimatedDelivery).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}
                        </p>
                      </div>
                      <div>
                        <h3 className="text-sm text-gray-500">Last Updated</h3>
                        <p className="font-medium">
                          {new Date(packageData.lastUpdated).toLocaleString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </p>
                      </div>
                    </div>
                    
                    <TrackingTimeline packageData={packageData} />
                  </CardContent>
                </Card>
              </div>
              
              <div>
                <Card>
                  <CardContent className="pt-6">
                    <h3 className="text-lg font-semibold mb-4">Current Location</h3>
                    <LocationMap location={getLastLocation() || packageData.origin} />
                    
                    <div className="mt-6">
                      <h3 className="text-lg font-semibold mb-2">Need Help?</h3>
                      <p className="text-sm text-gray-600 mb-4">
                        Contact our customer service for assistance with your package.
                      </p>
                      <Button className="w-full bg-flash-secondary hover:bg-flash-secondary/90">
                        Contact Support
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-4">
                <PackageIcon size={64} className="mx-auto" />
              </div>
              <h2 className="text-xl font-semibold mb-2">No Package Information</h2>
              <p className="text-gray-500 mb-4">
                Enter a tracking number to see delivery status and details.
              </p>
              <p className="text-sm text-gray-400">
                Try sample tracking number: FE123456789TH
              </p>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default TrackPackage;
