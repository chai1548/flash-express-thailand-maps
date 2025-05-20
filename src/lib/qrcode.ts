
// QR Code utilities
export const parseQRCode = (data: string): string | null => {
  // In a real app, you would validate and parse QR code data
  // For this demo, we'll assume valid QR codes contain tracking numbers
  if (data && data.startsWith('FE') && data.endsWith('TH') && data.length === 13) {
    return data;
  }
  return null;
};
