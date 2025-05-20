
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, MapPin } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import LocationMap from "@/components/LocationMap";

const Locations = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-2xl md:text-3xl font-bold mb-6">Find Drop-off Locations</h1>
          
          <Card className="mb-8">
            <CardContent className="pt-6">
              <form className="flex flex-col md:flex-row gap-3">
                <Input
                  placeholder="Enter your location or address..."
                  className="flex-grow"
                />
                <Button 
                  className="bg-flash-primary hover:bg-flash-primary/90"
                >
                  <Search size={18} className="mr-2" />
                  Find Locations
                </Button>
              </form>
            </CardContent>
          </Card>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Location Map</CardTitle>
                </CardHeader>
                <CardContent>
                  <LocationMap height="500px" />
                </CardContent>
              </Card>
            </div>
            
            <div>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Nearby Locations</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      {
                        name: "Bangkok Central Office",
                        address: "123 Sukhumvit Rd, Bangkok",
                        hours: "8 AM - 8 PM",
                        distance: "0.5 km"
                      },
                      {
                        name: "Siam Collection Point",
                        address: "Siam Square, Bangkok",
                        hours: "10 AM - 9 PM",
                        distance: "1.2 km"
                      },
                      {
                        name: "Asok Branch",
                        address: "Asok Junction, Bangkok",
                        hours: "9 AM - 7 PM",
                        distance: "2.1 km"
                      },
                      {
                        name: "Victory Monument",
                        address: "Victory Monument, Bangkok",
                        hours: "8 AM - 6 PM",
                        distance: "3.5 km"
                      },
                      {
                        name: "Chatuchak Branch",
                        address: "Chatuchak Park, Bangkok",
                        hours: "9 AM - 6 PM",
                        distance: "4.8 km"
                      }
                    ].map((location, index) => (
                      <div key={index} className="flex gap-3 p-3 hover:bg-gray-50 rounded-lg transition-colors">
                        <div className="mt-1">
                          <div className="w-8 h-8 rounded-full bg-flash-light flex items-center justify-center">
                            <MapPin size={16} className="text-flash-primary" />
                          </div>
                        </div>
                        <div>
                          <h3 className="font-medium text-base mb-1">{location.name}</h3>
                          <p className="text-sm text-gray-600 mb-1">{location.address}</p>
                          <div className="flex justify-between text-xs text-gray-500">
                            <span>Open: {location.hours}</span>
                            <span>{location.distance}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
              
              <Card className="mt-6">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Location Services</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center gap-2">
                      <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center">
                        <span className="w-2 h-2 rounded-full bg-green-500"></span>
                      </div>
                      Package Drop-off
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center">
                        <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                      </div>
                      Package Pick-up
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-5 h-5 rounded-full bg-purple-100 flex items-center justify-center">
                        <span className="w-2 h-2 rounded-full bg-purple-500"></span>
                      </div>
                      International Shipping
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-5 h-5 rounded-full bg-orange-100 flex items-center justify-center">
                        <span className="w-2 h-2 rounded-full bg-orange-500"></span>
                      </div>
                      Customer Support
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Locations;
