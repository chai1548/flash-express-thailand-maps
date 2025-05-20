
// Dummy tracking utilities
export type Package = {
  id: string;
  trackingNumber: string;
  status: 'pending' | 'in-transit' | 'delivered' | 'failed';
  origin: string;
  destination: string;
  sender: string;
  recipient: string;
  estimatedDelivery: string;
  lastUpdated: string;
  history: {
    status: string;
    location: string;
    timestamp: string;
  }[];
};

const PACKAGES_KEY = 'flash_express_packages';

// Sample package data
const samplePackages: Package[] = [
  {
    id: '1',
    trackingNumber: 'FE123456789TH',
    status: 'in-transit',
    origin: 'Bangkok',
    destination: 'Chiang Mai',
    sender: 'John Doe',
    recipient: 'Jane Smith',
    estimatedDelivery: '2025-05-22',
    lastUpdated: '2025-05-20T10:30:00',
    history: [
      {
        status: 'Package received',
        location: 'Bangkok Sorting Center',
        timestamp: '2025-05-19T14:30:00'
      },
      {
        status: 'In transit',
        location: 'Bangkok Dispatch',
        timestamp: '2025-05-20T06:15:00'
      },
      {
        status: 'Out for delivery',
        location: 'Chiang Mai Local Branch',
        timestamp: '2025-05-20T10:30:00'
      }
    ]
  },
  {
    id: '2',
    trackingNumber: 'FE987654321TH',
    status: 'delivered',
    origin: 'Phuket',
    destination: 'Hat Yai',
    sender: 'Sarah Johnson',
    recipient: 'Mike Wilson',
    estimatedDelivery: '2025-05-18',
    lastUpdated: '2025-05-18T15:45:00',
    history: [
      {
        status: 'Package received',
        location: 'Phuket Sorting Center',
        timestamp: '2025-05-16T11:20:00'
      },
      {
        status: 'In transit',
        location: 'Phuket Dispatch',
        timestamp: '2025-05-17T08:30:00'
      },
      {
        status: 'Out for delivery',
        location: 'Hat Yai Local Branch',
        timestamp: '2025-05-18T09:15:00'
      },
      {
        status: 'Delivered',
        location: 'Hat Yai',
        timestamp: '2025-05-18T15:45:00'
      }
    ]
  },
  {
    id: '3',
    trackingNumber: 'FE456789123TH',
    status: 'pending',
    origin: 'Pattaya',
    destination: 'Khon Kaen',
    sender: 'David Lee',
    recipient: 'Lisa Wang',
    estimatedDelivery: '2025-05-24',
    lastUpdated: '2025-05-20T08:10:00',
    history: [
      {
        status: 'Order created',
        location: 'Online System',
        timestamp: '2025-05-20T08:10:00'
      }
    ]
  }
];

// Initialize sample data
export const initializePackages = (): void => {
  if (!localStorage.getItem(PACKAGES_KEY)) {
    localStorage.setItem(PACKAGES_KEY, JSON.stringify(samplePackages));
  }
};

export const getPackages = (): Package[] => {
  const packages = localStorage.getItem(PACKAGES_KEY);
  return packages ? JSON.parse(packages) : [];
};

export const getPackageByTrackingNumber = (trackingNumber: string): Package | undefined => {
  const packages = getPackages();
  return packages.find(p => p.trackingNumber.toLowerCase() === trackingNumber.toLowerCase());
};

export const getUserPackages = (userId: string): Package[] => {
  // In a real application, this would filter packages by user
  // For demo purposes, we'll just return all packages
  return getPackages();
};

export const addPackage = (newPackage: Package): void => {
  const packages = getPackages();
  packages.push(newPackage);
  localStorage.setItem(PACKAGES_KEY, JSON.stringify(packages));
};

export const updatePackageStatus = (trackingNumber: string, status: Package['status'], location: string): void => {
  const packages = getPackages();
  const packageIndex = packages.findIndex(p => p.trackingNumber === trackingNumber);
  
  if (packageIndex >= 0) {
    const timestamp = new Date().toISOString();
    packages[packageIndex].status = status;
    packages[packageIndex].lastUpdated = timestamp;
    packages[packageIndex].history.push({
      status: status.charAt(0).toUpperCase() + status.slice(1).replace('-', ' '),
      location,
      timestamp
    });
    
    localStorage.setItem(PACKAGES_KEY, JSON.stringify(packages));
  }
};

// Function to generate a valid tracking number
export const generateTrackingNumber = (): string => {
  const prefix = 'FE';
  const suffix = 'TH';
  const digits = Math.floor(Math.random() * 1000000000).toString().padStart(9, '0');
  return `${prefix}${digits}${suffix}`;
};
