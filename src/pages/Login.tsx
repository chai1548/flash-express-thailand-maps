
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { login } from "@/lib/auth";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Image, Text, FileText, FileImage, LayoutTemplate } from "lucide-react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("user");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast.error("Please enter both email and password");
      return;
    }
    
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const user = login(email, password);
      
      if (user) {
        toast.success("Login successful");
        navigate(user.role === "admin" ? "/admin" : "/dashboard");
      } else {
        toast.error("Invalid email or password");
      }
    } catch (error) {
      toast.error("An error occurred during login");
    } finally {
      setIsLoading(false);
    }
  };

  // Advertisement data for admin section
  const adImages = [
    "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=800&h=500&fit=crop",
    "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&h=500&fit=crop",
    "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=800&h=500&fit=crop",
    "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&h=500&fit=crop",
    "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=500&fit=crop"
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow flex items-center justify-center bg-gray-50 py-12">
        <div className="w-full max-w-4xl px-4">
          <Tabs 
            defaultValue="user" 
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="user">User Login</TabsTrigger>
              <TabsTrigger value="admin">Admin Login</TabsTrigger>
            </TabsList>
            
            {/* User Login Content */}
            <TabsContent value="user">
              <Card className="shadow-lg">
                <CardHeader className="space-y-1">
                  <CardTitle className="text-2xl font-bold text-center">User Login</CardTitle>
                  <CardDescription className="text-center">
                    Enter your email and password to access your account
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleLogin}>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="m@example.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <Label htmlFor="password">Password</Label>
                          <Button 
                            variant="link" 
                            className="text-sm px-0 h-auto text-flash-primary"
                            type="button"
                          >
                            Forgot Password?
                          </Button>
                        </div>
                        <Input
                          id="password"
                          type="password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          required
                        />
                      </div>
                      <Button 
                        type="submit" 
                        className="w-full bg-flash-primary hover:bg-flash-primary/90"
                        disabled={isLoading}
                      >
                        {isLoading ? "Logging in..." : "Login"}
                      </Button>
                      
                      {/* Demo account info */}
                      <div className="text-center text-sm text-gray-500 mt-2">
                        <p>Demo account:</p>
                        <p className="font-medium">Regular user: demo@example.com (any password)</p>
                      </div>
                    </div>
                  </form>
                </CardContent>
                <CardFooter className="flex flex-col">
                  <div className="text-center text-sm text-gray-500 mt-2">
                    Don't have an account?{" "}
                    <Button 
                      variant="link" 
                      className="text-flash-primary p-0 h-auto"
                      onClick={() => navigate("/register")}
                    >
                      Sign up
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            </TabsContent>
            
            {/* Admin Login Content */}
            <TabsContent value="admin">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="shadow-lg">
                  <CardHeader className="space-y-1">
                    <CardTitle className="text-2xl font-bold text-center">Admin Login</CardTitle>
                    <CardDescription className="text-center">
                      Enter your admin credentials to access the management dashboard
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleLogin}>
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="admin-email">Email</Label>
                          <Input
                            id="admin-email"
                            type="email"
                            placeholder="admin@flashexpress.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <Label htmlFor="admin-password">Password</Label>
                            <Button 
                              variant="link" 
                              className="text-sm px-0 h-auto text-flash-primary"
                              type="button"
                            >
                              Forgot Password?
                            </Button>
                          </div>
                          <Input
                            id="admin-password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                          />
                        </div>
                        <Button 
                          type="submit" 
                          className="w-full bg-flash-primary hover:bg-flash-primary/90"
                          disabled={isLoading}
                        >
                          {isLoading ? "Logging in..." : "Login"}
                        </Button>
                        
                        {/* Admin demo account info */}
                        <div className="text-center text-sm text-gray-500 mt-2">
                          <p>Demo admin account:</p>
                          <p className="font-medium">Admin: admin@flashexpress.com (any password)</p>
                        </div>
                      </div>
                    </form>
                  </CardContent>
                </Card>

                {/* Admin Advertisements Section */}
                <div className="space-y-6">
                  <Card className="shadow-lg overflow-hidden">
                    <CardHeader className="space-y-1 pb-2">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg font-bold flex items-center">
                          <LayoutTemplate className="h-5 w-5 mr-2" />
                          Admin Dashboard Features
                        </CardTitle>
                        <Button variant="ghost" size="sm" className="text-flash-primary">
                          <Text className="h-4 w-4 mr-2" />
                          Learn More
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent className="p-0">
                      <Carousel className="w-full">
                        <CarouselContent>
                          {adImages.map((src, index) => (
                            <CarouselItem key={index}>
                              <div className="p-1 relative">
                                <img 
                                  src={src} 
                                  alt={`Admin feature ${index + 1}`}
                                  className="w-full aspect-video object-cover rounded-md"
                                />
                                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4 text-white rounded-b-md">
                                  <h3 className="font-bold">Flash Express Admin Tool {index + 1}</h3>
                                  <p className="text-sm">Powerful management features for package tracking and delivery optimization</p>
                                </div>
                              </div>
                            </CarouselItem>
                          ))}
                        </CarouselContent>
                        <CarouselPrevious />
                        <CarouselNext />
                      </Carousel>
                    </CardContent>
                  </Card>

                  <Card className="shadow-lg">
                    <CardHeader className="space-y-1 pb-3">
                      <CardTitle className="text-lg font-bold flex items-center">
                        <FileText className="h-5 w-5 mr-2" />
                        Admin Announcements
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <p className="text-sm">
                        <span className="font-semibold">New Feature:</span> Enhanced package tracking system with real-time updates now available
                      </p>
                      <p className="text-sm">
                        <span className="font-semibold">Maintenance:</span> System update scheduled for May 25th, 22:00-23:00 ICT
                      </p>
                      <p className="text-sm">
                        <span className="font-semibold">Statistics:</span> 98.7% on-time delivery rate achieved this month
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Login;
