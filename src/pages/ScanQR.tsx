
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { toast } from "sonner";
import { QrCode, Search } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import QRScanner from "@/components/QRScanner";

const ScanQR = () => {
  const navigate = useNavigate();
  const [isScanning, setIsScanning] = useState(false);
  
  const handleScan = (trackingNumber: string) => {
    if (trackingNumber) {
      toast.success(`Tracking number found: ${trackingNumber}`);
      navigate(`/track?number=${encodeURIComponent(trackingNumber)}`);
    }
  };
  
  const startScanning = () => {
    setIsScanning(true);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-2xl md:text-3xl font-bold mb-6">Scan QR Code</h1>
          
          <Card className="mb-8 max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle className="text-xl">Package QR Scanner</CardTitle>
              <CardDescription>
                Scan the QR code on your delivery slip to track your package
              </CardDescription>
            </CardHeader>
            <CardContent>
              {isScanning ? (
                <QRScanner onScan={handleScan} />
              ) : (
                <div className="text-center py-12">
                  <div className="text-gray-400 mb-4">
                    <QrCode size={64} className="mx-auto" />
                  </div>
                  <h2 className="text-xl font-semibold mb-2">Start Scanning</h2>
                  <p className="text-gray-500 mb-6">
                    Use your camera to scan the QR code on your delivery slip.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button 
                      className="bg-flash-primary hover:bg-flash-primary/90"
                      onClick={startScanning}
                    >
                      <QrCode size={18} className="mr-2" />
                      Scan QR Code
                    </Button>
                    <Button 
                      variant="outline"
                      onClick={() => navigate("/track")}
                    >
                      <Search size={18} className="mr-2" />
                      Track Manually
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
          
          <div className="max-w-2xl mx-auto">
            <h2 className="text-xl font-semibold mb-4">How to Scan</h2>
            <ol className="list-decimal list-inside space-y-3 text-gray-700">
              <li>Click the "Scan QR Code" button above</li>
              <li>Allow camera access when prompted</li>
              <li>Position the QR code within the scanning frame</li>
              <li>Hold steady until the code is recognized</li>
              <li>You'll be automatically redirected to your package tracking information</li>
            </ol>
            
            <div className="mt-8 p-4 bg-flash-light rounded-lg">
              <h3 className="text-lg font-semibold mb-2 text-flash-primary">Looking for a Sample QR Code?</h3>
              <p className="text-gray-700">
                For demonstration purposes, after starting the scanner, the system will automatically detect a sample tracking number (FE123456789TH).
              </p>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ScanQR;
