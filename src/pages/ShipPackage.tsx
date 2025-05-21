
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { Package, Truck } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { generateTrackingNumber, addPackage } from "@/lib/tracking";
import { isLoggedIn, getCurrentUser } from "@/lib/auth";

const ShipPackage = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    senderName: isLoggedIn() ? getCurrentUser()?.name || "" : "",
    senderAddress: "",
    senderPhone: "",
    recipientName: "",
    recipientAddress: "",
    recipientPhone: "",
    packageType: "document",
    packageWeight: "",
    packageDetails: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Form validation
    if (
      !formData.senderName ||
      !formData.senderAddress ||
      !formData.senderPhone ||
      !formData.recipientName ||
      !formData.recipientAddress ||
      !formData.recipientPhone
    ) {
      toast.error("Please fill in all required fields");
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Generate tracking number
      const trackingNumber = generateTrackingNumber();
      
      // Create package object
      const originCity = formData.senderAddress.split(",").pop()?.trim() || "Bangkok";
      const destinationCity = formData.recipientAddress.split(",").pop()?.trim() || "Unknown";
      
      const today = new Date();
      const estimatedDelivery = new Date(today);
      estimatedDelivery.setDate(today.getDate() + 3); // Delivery in 3 days
      
      // Add new package to the system
      addPackage({
        id: Math.random().toString(36).substring(2, 11),
        trackingNumber,
        status: "pending",
        origin: originCity,
        destination: destinationCity,
        sender: formData.senderName,
        recipient: formData.recipientName,
        estimatedDelivery: estimatedDelivery.toISOString().split('T')[0],
        lastUpdated: new Date().toISOString(),
        history: [
          {
            status: "Order created",
            location: "Online System",
            timestamp: new Date().toISOString()
          }
        ]
      });
      
      // Success message
      toast.success("Package created successfully", {
        description: `Tracking number: ${trackingNumber}`,
        duration: 5000,
      });
      
      // Redirect to tracking page
      navigate(`/track?number=${trackingNumber}`);
    } catch (error) {
      toast.error("Failed to create shipment");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          <div className="flex items-center mb-6">
            <Truck size={28} className="text-flash-primary mr-3" />
            <h1 className="text-2xl md:text-3xl font-bold">Ship a Package</h1>
          </div>
          
          <Card>
            <CardContent className="pt-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Sender Information */}
                <div>
                  <h2 className="text-xl font-semibold mb-4 text-flash-primary">Sender Information</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label htmlFor="senderName" className="text-sm font-medium">
                        Name *
                      </label>
                      <Input
                        id="senderName"
                        name="senderName"
                        placeholder="Sender's name"
                        value={formData.senderName}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="senderPhone" className="text-sm font-medium">
                        Phone Number *
                      </label>
                      <Input
                        id="senderPhone"
                        name="senderPhone"
                        placeholder="Sender's phone number"
                        value={formData.senderPhone}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <label htmlFor="senderAddress" className="text-sm font-medium">
                        Address *
                      </label>
                      <Textarea
                        id="senderAddress"
                        name="senderAddress"
                        placeholder="Sender's full address"
                        value={formData.senderAddress}
                        onChange={handleChange}
                        rows={3}
                      />
                    </div>
                  </div>
                </div>
                
                {/* Recipient Information */}
                <div>
                  <h2 className="text-xl font-semibold mb-4 text-flash-primary">Recipient Information</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label htmlFor="recipientName" className="text-sm font-medium">
                        Name *
                      </label>
                      <Input
                        id="recipientName"
                        name="recipientName"
                        placeholder="Recipient's name"
                        value={formData.recipientName}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="recipientPhone" className="text-sm font-medium">
                        Phone Number *
                      </label>
                      <Input
                        id="recipientPhone"
                        name="recipientPhone"
                        placeholder="Recipient's phone number"
                        value={formData.recipientPhone}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <label htmlFor="recipientAddress" className="text-sm font-medium">
                        Address *
                      </label>
                      <Textarea
                        id="recipientAddress"
                        name="recipientAddress"
                        placeholder="Recipient's full address"
                        value={formData.recipientAddress}
                        onChange={handleChange}
                        rows={3}
                      />
                    </div>
                  </div>
                </div>
                
                {/* Package Information */}
                <div>
                  <h2 className="text-xl font-semibold mb-4 text-flash-primary">Package Details</h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <label htmlFor="packageType" className="text-sm font-medium">
                        Package Type
                      </label>
                      <Select
                        value={formData.packageType}
                        onValueChange={(value) => handleSelectChange("packageType", value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="document">Document</SelectItem>
                          <SelectItem value="parcel">Parcel</SelectItem>
                          <SelectItem value="fragile">Fragile</SelectItem>
                          <SelectItem value="heavy">Heavy</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="packageWeight" className="text-sm font-medium">
                        Weight (kg)
                      </label>
                      <Input
                        id="packageWeight"
                        name="packageWeight"
                        type="number"
                        min="0.1"
                        step="0.1"
                        placeholder="Package weight"
                        value={formData.packageWeight}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="space-y-2 md:col-span-3">
                      <label htmlFor="packageDetails" className="text-sm font-medium">
                        Additional Details
                      </label>
                      <Textarea
                        id="packageDetails"
                        name="packageDetails"
                        placeholder="Any special instructions or package details"
                        value={formData.packageDetails}
                        onChange={handleChange}
                        rows={3}
                      />
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-end pt-4">
                  <Button
                    type="submit"
                    className="bg-flash-secondary hover:bg-flash-secondary/90"
                    size="lg"
                    disabled={isSubmitting}
                  >
                    <Package size={18} className="mr-2" />
                    {isSubmitting ? "Creating..." : "Create Shipment"}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ShipPackage;
