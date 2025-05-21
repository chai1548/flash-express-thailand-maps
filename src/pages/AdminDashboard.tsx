
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Package, getPackages, updatePackageStatus } from "@/lib/tracking";
import { User, getUsers, isAdmin } from "@/lib/auth";
import { Package as PackageIcon, Users, Settings } from "lucide-react";
import PackageCard from "@/components/PackageCard";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [packages, setPackages] = useState<Package[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [activeTab, setActiveTab] = useState<'packages' | 'users'>('packages');
  
  useEffect(() => {
    // Verify user is admin
    if (!isAdmin()) {
      toast.error("Unauthorized access");
      navigate("/dashboard");
      return;
    }
    
    // Load data
    setPackages(getPackages());
    setUsers(getUsers());
  }, [navigate]);

  const handleUpdateStatus = (trackingNumber: string, newStatus: Package['status']) => {
    updatePackageStatus(trackingNumber, newStatus, 'System');
    setPackages(getPackages());
    toast.success(`Package status updated to ${newStatus}`);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl md:text-3xl font-bold">Admin Dashboard</h1>
            <Button 
              variant="outline"
              onClick={() => navigate("/dashboard")}
            >
              Switch to User View
            </Button>
          </div>
          
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <Card className="w-full md:w-1/3">
              <CardContent className="pt-6">
                <div className="flex items-center gap-4">
                  <div className="bg-flash-light p-3 rounded-full">
                    <PackageIcon size={24} className="text-flash-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">Total Packages</h3>
                    <p className="text-3xl font-bold">{packages.length}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="w-full md:w-1/3">
              <CardContent className="pt-6">
                <div className="flex items-center gap-4">
                  <div className="bg-flash-light p-3 rounded-full">
                    <Users size={24} className="text-flash-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">Total Users</h3>
                    <p className="text-3xl font-bold">{users.length}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="w-full md:w-1/3">
              <CardContent className="pt-6">
                <div className="flex items-center gap-4">
                  <div className="bg-flash-light p-3 rounded-full">
                    <Settings size={24} className="text-flash-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">System Status</h3>
                    <p className="text-lg font-medium text-green-500">Online</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <Card>
            <CardHeader>
              <div className="flex space-x-4">
                <Button
                  variant={activeTab === 'packages' ? 'default' : 'outline'}
                  onClick={() => setActiveTab('packages')}
                  className={activeTab === 'packages' ? 'bg-flash-primary' : ''}
                >
                  <PackageIcon size={18} className="mr-2" />
                  Manage Packages
                </Button>
                <Button
                  variant={activeTab === 'users' ? 'default' : 'outline'}
                  onClick={() => setActiveTab('users')}
                  className={activeTab === 'users' ? 'bg-flash-primary' : ''}
                >
                  <Users size={18} className="mr-2" />
                  Manage Users
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {activeTab === 'packages' ? (
                <div>
                  <CardTitle className="mb-4">All Packages</CardTitle>
                  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {packages.map(pkg => (
                      <div key={pkg.id} className="relative">
                        <PackageCard 
                          packageData={pkg} 
                          onClick={() => navigate(`/track?number=${pkg.trackingNumber}`)}
                        />
                        <div className="mt-2 flex gap-2">
                          <Button 
                            size="sm" 
                            variant="outline" 
                            className="flex-1"
                            onClick={() => handleUpdateStatus(pkg.trackingNumber, 'pending')}
                          >
                            Mark Pending
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline" 
                            className="flex-1"
                            onClick={() => handleUpdateStatus(pkg.trackingNumber, 'in-transit')}
                          >
                            Mark In Transit
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline" 
                            className="flex-1"
                            onClick={() => handleUpdateStatus(pkg.trackingNumber, 'delivered')}
                          >
                            Mark Delivered
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div>
                  <CardTitle className="mb-4">All Users</CardTitle>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left">
                      <thead>
                        <tr className="border-b">
                          <th className="p-3">Name</th>
                          <th className="p-3">Email</th>
                          <th className="p-3">Role</th>
                        </tr>
                      </thead>
                      <tbody>
                        {users.map(user => (
                          <tr key={user.id} className="border-b hover:bg-gray-50">
                            <td className="p-3">{user.name}</td>
                            <td className="p-3">{user.email}</td>
                            <td className="p-3">
                              <span className={`px-2 py-1 rounded-full text-xs ${user.role === 'admin' ? 'bg-purple-100 text-purple-800' : 'bg-blue-100 text-blue-800'}`}>
                                {user.role}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default AdminDashboard;
