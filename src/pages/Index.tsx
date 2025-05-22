
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Search, Package, QrCode, Truck, FileText } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { initializePackages } from "@/lib/tracking";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

// Define the advertisement type
interface Advertisement {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
}

const Index = () => {
  const navigate = useNavigate();
  const [advertisements, setAdvertisements] = useState<Advertisement[]>([]);
  
  // Initialize sample package data when app launches
  useEffect(() => {
    initializePackages();
  }, []);

  // Load advertisements from localStorage or use default ones
  useEffect(() => {
    const storedAds = localStorage.getItem("adImages");
    if (storedAds) {
      try {
        const parsedAds = JSON.parse(storedAds);
        if (Array.isArray(parsedAds) && parsedAds.length > 0) {
          setAdvertisements(parsedAds);
          return;
        }
      } catch (error) {
        console.error("Failed to parse stored ads:", error);
      }
    }
    
    // Default advertisement data if none found in storage
    const defaultAds = [
      {
        id: "1",
        title: "Flash Express Service 1",
        description: "Fast and reliable delivery solutions for all your shipping needs",
        imageUrl: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=800&h=500&fit=crop"
      },
      {
        id: "2",
        title: "Flash Express Service 2",
        description: "Nationwide coverage with competitive rates",
        imageUrl: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&h=500&fit=crop"
      },
      {
        id: "3",
        title: "Flash Express Service 3",
        description: "Secure packaging and handling for delicate items",
        imageUrl: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=800&h=500&fit=crop"
      },
      {
        id: "4",
        title: "Flash Express Service 4",
        description: "Track your packages in real-time with our mobile app",
        imageUrl: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&h=500&fit=crop"
      },
      {
        id: "5",
        title: "Flash Express Service 5",
        description: "Business solutions for e-commerce and retail partners",
        imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=500&fit=crop"
      }
    ];
    setAdvertisements(defaultAds);
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-flash-primary to-flash-dark text-white py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-3xl md:text-5xl font-bold mb-4">Fast & Reliable Delivery Across Thailand</h1>
              <p className="text-lg mb-8 text-white/80">Track your packages, manage deliveries, and experience the best logistics service in Thailand.</p>
              
              <div className="bg-white rounded-lg p-4 shadow-lg">
                <form 
                  className="flex flex-col md:flex-row gap-3"
                  onSubmit={(e) => {
                    e.preventDefault();
                    const form = e.target as HTMLFormElement;
                    const input = form.elements.namedItem('trackingNumber') as HTMLInputElement;
                    if (input.value.trim()) {
                      navigate(`/track?number=${encodeURIComponent(input.value.trim())}`);
                    }
                  }}
                >
                  <Input 
                    name="trackingNumber"
                    placeholder="Enter tracking number..." 
                    className="flex-grow text-gray-800" 
                  />
                  <Button 
                    type="submit" 
                    className="bg-flash-secondary hover:bg-flash-secondary/90"
                  >
                    <Search size={18} className="mr-2" />
                    Track Package
                  </Button>
                </form>
              </div>
              
              <div className="mt-6 flex flex-wrap gap-3 justify-center">
                <Button 
                  className="bg-flash-primary hover:bg-flash-primary/90"
                  onClick={() => navigate("/ship")}
                >
                  <Truck size={18} className="mr-2" />
                  Ship a Package
                </Button>
                <Button 
                  className="bg-flash-secondary hover:bg-flash-secondary/90"
                  onClick={() => navigate("/receive")}
                >
                  <Package size={18} className="mr-2" />
                  Receive a Package
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Advertisement Carousel Section */}
        <section className="py-12 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">Flash Express Services</h2>
            
            <div className="max-w-4xl mx-auto">
              <Card className="shadow-lg overflow-hidden">
                <CardContent className="p-0">
                  <Carousel className="w-full">
                    <CarouselContent>
                      {advertisements.map((ad) => (
                        <CarouselItem key={ad.id}>
                          <div className="p-1 relative">
                            <img 
                              src={ad.imageUrl} 
                              alt={ad.title}
                              className="w-full aspect-video object-cover rounded-md"
                            />
                            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4 text-white rounded-b-md">
                              <h3 className="font-bold">{ad.title}</h3>
                              <p className="text-sm">{ad.description}</p>
                            </div>
                          </div>
                        </CarouselItem>
                      ))}
                    </CarouselContent>
                    <CarouselPrevious className="left-2" />
                    <CarouselNext className="right-2" />
                  </Carousel>
                </CardContent>
              </Card>
            </div>

            {/* Service Announcements */}
            <div className="mt-8 max-w-4xl mx-auto">
              <Card className="shadow-lg">
                <CardContent className="space-y-3 p-6">
                  <h3 className="text-lg font-bold flex items-center mb-3">
                    <FileText className="h-5 w-5 mr-2" />
                    Flash Express Announcements
                  </h3>
                  <p className="text-sm">
                    <span className="font-semibold">New Feature:</span> Enhanced package tracking system with real-time updates now available
                  </p>
                  <p className="text-sm">
                    <span className="font-semibold">Special Promotion:</span> 20% discount on all international shipments until end of month
                  </p>
                  <p className="text-sm">
                    <span className="font-semibold">Service Update:</span> Now covering all provinces in Thailand with next-day delivery options
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">Our Services</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <Card className="hover:shadow-lg transition-all">
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center text-center">
                    <div className="w-16 h-16 bg-flash-light rounded-full flex items-center justify-center mb-4">
                      <Package size={32} className="text-flash-primary" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">Package Tracking</h3>
                    <p className="text-gray-600 mb-4">Track your packages in real-time with our advanced tracking system.</p>
                    <Button 
                      variant="outline" 
                      className="mt-2"
                      onClick={() => navigate("/track")}
                    >
                      Track Now
                    </Button>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="hover:shadow-lg transition-all">
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center text-center">
                    <div className="w-16 h-16 bg-flash-light rounded-full flex items-center justify-center mb-4">
                      <Truck size={32} className="text-flash-primary" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">Ship Packages</h3>
                    <p className="text-gray-600 mb-4">Create new shipments and send packages across Thailand.</p>
                    <Button 
                      variant="outline" 
                      className="mt-2"
                      onClick={() => navigate("/ship")}
                    >
                      Ship Now
                    </Button>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="hover:shadow-lg transition-all">
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center text-center">
                    <div className="w-16 h-16 bg-flash-light rounded-full flex items-center justify-center mb-4">
                      <Package size={32} className="text-flash-primary" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">Receive Packages</h3>
                    <p className="text-gray-600 mb-4">Schedule incoming packages and prepare for their arrival.</p>
                    <Button 
                      variant="outline" 
                      className="mt-2"
                      onClick={() => navigate("/receive")}
                    >
                      Receive Now
                    </Button>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="hover:shadow-lg transition-all">
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center text-center">
                    <div className="w-16 h-16 bg-flash-light rounded-full flex items-center justify-center mb-4">
                      <QrCode size={32} className="text-flash-primary" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">QR Code Scanning</h3>
                    <p className="text-gray-600 mb-4">Quickly track packages by scanning QR codes on your delivery slip.</p>
                    <Button 
                      variant="outline" 
                      className="mt-2"
                      onClick={() => navigate("/scan")}
                    >
                      Scan QR
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="bg-gray-100 py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">Create an Account Today</h2>
              <p className="text-gray-600 mb-8">Sign up for an account to manage your deliveries, save your tracking numbers, and enjoy a personalized experience.</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  className="bg-flash-primary hover:bg-flash-primary/90"
                  onClick={() => navigate("/login")}
                >
                  Login
                </Button>
                <Button 
                  className="bg-flash-secondary hover:bg-flash-secondary/90"
                  onClick={() => navigate("/register")}
                >
                  Sign Up
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
