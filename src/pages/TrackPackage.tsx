
import React, { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Search } from "lucide-react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";

import TrackingTimeline from "@/components/TrackingTimeline";
import PackageCard from "@/components/PackageCard";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Chat from "@/components/Chat";

import { getPackageByTrackingNumber } from "@/lib/tracking";

const trackingSchema = z.object({
  trackingNumber: z.string().min(4, {
    message: "Tracking number must be at least 4 characters.",
  }),
});

const TrackPackage = () => {
  const [searchParams] = useSearchParams();
  const initialTrackingId = searchParams.get("id") || "";
  const navigate = useNavigate();
  const { toast } = useToast();
  const [packageData, setPackageData] = useState(
    initialTrackingId ? getPackageByTrackingNumber(initialTrackingId) : null
  );

  const form = useForm<z.infer<typeof trackingSchema>>({
    resolver: zodResolver(trackingSchema),
    defaultValues: {
      trackingNumber: initialTrackingId,
    },
  });

  const onSubmit = (data: z.infer<typeof trackingSchema>) => {
    const result = getPackageByTrackingNumber(data.trackingNumber);
    
    if (result) {
      setPackageData(result);
      navigate(`/track?id=${data.trackingNumber}`);
    } else {
      toast({
        title: "Package Not Found",
        description: "We couldn't find a package with that tracking number.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6 text-center">Track Your Package</h1>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="mb-8 max-w-md mx-auto">
            <div className="flex space-x-2">
              <FormField
                control={form.control}
                name="trackingNumber"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormControl>
                      <Input placeholder="Enter tracking number..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit">
                <Search className="mr-2 h-4 w-4" />
                Track
              </Button>
            </div>
          </form>
        </Form>

        {packageData ? (
          <div className="max-w-3xl mx-auto space-y-6">
            <PackageCard packageData={packageData} />
            <Card>
              <CardContent className="pt-6">
                <TrackingTimeline packageData={packageData} />
              </CardContent>
            </Card>
          </div>
        ) : (
          <div className="text-center mt-8">
            <p className="text-gray-500">
              Enter your tracking number above to see the status and details of your package.
            </p>
          </div>
        )}
      </main>
      <Footer />
      
      {/* Chat component */}
      <Chat packageId={packageData?.trackingNumber} />
    </div>
  );
};

export default TrackPackage;
