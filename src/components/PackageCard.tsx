
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin } from "lucide-react";
import { Package } from "@/lib/tracking";

type PackageCardProps = {
  packageData: Package;
  onClick?: () => void;
};

const PackageCard = ({ packageData, onClick }: PackageCardProps) => {
  // Helper function for status color
  const getStatusColor = (status: Package['status']) => {
    switch (status) {
      case 'delivered':
        return 'bg-green-500';
      case 'in-transit':
        return 'bg-blue-500';
      case 'pending':
        return 'bg-yellow-500';
      case 'failed':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <Card 
      className="hover:shadow-md transition-shadow cursor-pointer border-l-4 border-l-flash-primary"
      onClick={onClick}
    >
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-base font-medium">
            {packageData.trackingNumber}
          </CardTitle>
          <Badge className={`${getStatusColor(packageData.status)}`}>
            {packageData.status.replace('-', ' ')}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-sm space-y-2">
          <div className="flex items-start">
            <MapPin size={16} className="min-w-4 mr-1 text-flash-secondary mt-0.5" />
            <div>
              <p className="font-medium">From: {packageData.origin}</p>
              <p className="font-medium">To: {packageData.destination}</p>
            </div>
          </div>
          
          <div className="flex justify-between text-gray-500 text-xs pt-1">
            <span>Last update: {formatDate(packageData.lastUpdated)}</span>
            <span>ETA: {formatDate(packageData.estimatedDelivery)}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PackageCard;
