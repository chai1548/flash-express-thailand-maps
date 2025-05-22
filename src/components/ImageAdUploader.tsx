
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Upload } from "lucide-react";

// This component would typically connect to a backend for actual file uploads
// Currently implementing with localStorage for demo purposes
const ImageAdUploader = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  
  // Handle file selection
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    // Check if the file is an image
    if (!file.type.startsWith('image/')) {
      toast.error("Please select an image file");
      return;
    }
    
    // Create preview URL
    const reader = new FileReader();
    reader.onload = () => {
      setImagePreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };
  
  // Handle form submission
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!title || !description || !imagePreview) {
      toast.error("Please fill in all fields and select an image");
      return;
    }
    
    setIsLoading(true);
    
    try {
      // In a real application, this would upload to a server
      // For demo purposes, we'll save to localStorage
      const existingAds = JSON.parse(localStorage.getItem("adImages") || "[]");
      const newAd = {
        id: Date.now().toString(),
        title,
        description,
        imageUrl: imagePreview
      };
      
      localStorage.setItem("adImages", JSON.stringify([...existingAds, newAd]));
      
      toast.success("Advertisement uploaded successfully!");
      
      // Reset form
      setTitle("");
      setDescription("");
      setImagePreview(null);
      
      // Refresh the page to show the new ad
      setTimeout(() => {
        window.location.reload();
      }, 1500);
      
    } catch (error) {
      toast.error("Failed to upload advertisement");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <Card className="shadow-md">
      <CardHeader>
        <CardTitle className="text-xl">Upload Advertisement Image</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="ad-title">Advertisement Title</Label>
            <Input
              id="ad-title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter title"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="ad-description">Description</Label>
            <Input
              id="ad-description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter description"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="ad-image">Advertisement Image</Label>
            <Input
              id="ad-image"
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              required={!imagePreview}
              className="cursor-pointer"
            />
          </div>
          
          {imagePreview && (
            <div className="mt-4 border rounded-md overflow-hidden">
              <img 
                src={imagePreview} 
                alt="Advertisement Preview" 
                className="w-full h-auto max-h-48 object-contain"
              />
            </div>
          )}
          
          <Button 
            type="submit" 
            className="w-full bg-flash-primary hover:bg-flash-primary/90"
            disabled={isLoading}
          >
            {isLoading ? (
              "Uploading..."
            ) : (
              <>
                <Upload className="mr-2 h-4 w-4" />
                Upload Advertisement
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default ImageAdUploader;
