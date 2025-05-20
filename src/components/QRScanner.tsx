
import { useState, useRef, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { parseQRCode } from '@/lib/qrcode';

type QRScannerProps = {
  onScan: (trackingNumber: string) => void;
};

const QRScanner = ({ onScan }: QRScannerProps) => {
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [scanAttempts, setScanAttempts] = useState(0);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'environment' } 
      });
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setIsCameraActive(true);
        setHasPermission(true);
      }
    } catch (error) {
      console.error('Camera access error:', error);
      setHasPermission(false);
      toast.error("Camera access denied or not available");
    }
  };

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      const tracks = stream.getTracks();
      tracks.forEach(track => track.stop());
      videoRef.current.srcObject = null;
      setIsCameraActive(false);
    }
  };

  const scanQRCode = () => {
    if (!videoRef.current || !canvasRef.current) return;
    
    const video = videoRef.current;
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    
    if (!context) return;
    
    if (video.readyState === video.HAVE_ENOUGH_DATA) {
      canvas.height = video.videoHeight;
      canvas.width = video.videoWidth;
      
      context.drawImage(video, 0, 0, canvas.width, canvas.height);
      
      // In a real app, you would use a QR code library like jsQR here
      // For demo purposes, we'll simulate a successful scan after a few attempts
      setScanAttempts(prev => prev + 1);
      
      if (scanAttempts > 5) {
        // Simulate finding a tracking number after a few attempts
        const trackingNumber = 'FE123456789TH';
        const parsedCode = parseQRCode(trackingNumber);
        
        if (parsedCode) {
          stopCamera();
          onScan(parsedCode);
          toast.success("QR code scanned successfully");
        }
      }
    }
  };

  useEffect(() => {
    if (isCameraActive) {
      const interval = setInterval(scanQRCode, 500);
      return () => clearInterval(interval);
    }
  }, [isCameraActive, scanAttempts]);

  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, []);

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-full max-w-md aspect-video bg-black rounded-lg overflow-hidden">
        <video
          ref={videoRef}
          className="w-full h-full object-cover"
          autoPlay
          playsInline
          muted
        />
        <canvas
          ref={canvasRef}
          className="hidden"
        />
        
        {!isCameraActive && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-900/70">
            <Button 
              onClick={startCamera}
              className="bg-flash-secondary hover:bg-flash-secondary/90"
            >
              Start Camera
            </Button>
          </div>
        )}
        
        {isCameraActive && (
          <div className="absolute inset-0 border-2 border-flash-secondary/60 m-12 rounded pointer-events-none"></div>
        )}
      </div>
      
      {hasPermission === false && (
        <div className="mt-4 text-center text-red-500">
          Camera access denied. Please check your camera permissions.
        </div>
      )}
      
      <div className="mt-4 text-center text-sm text-gray-500">
        Align the QR code within the frame to scan
      </div>
      
      {isCameraActive && (
        <Button 
          onClick={stopCamera}
          variant="outline"
          className="mt-4"
        >
          Cancel
        </Button>
      )}
    </div>
  );
};

export default QRScanner;
