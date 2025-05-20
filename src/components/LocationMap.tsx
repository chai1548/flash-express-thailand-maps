
import { useEffect, useRef } from 'react';

type LocationMapProps = {
  location?: string;
  height?: string;
};

const LocationMap = ({ location = "Bangkok, Thailand", height = "300px" }: LocationMapProps) => {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mapRef.current) return;

    // This is a placeholder for an actual map integration
    // In a real app, you would use Google Maps, MapBox, etc.
    // For this demo, we'll create a simple placeholder
    const mapContainer = mapRef.current;
    
    // Create a styled placeholder for the map
    mapContainer.innerHTML = '';
    mapContainer.style.position = 'relative';
    mapContainer.style.overflow = 'hidden';
    
    // Background grid
    const grid = document.createElement('div');
    grid.style.position = 'absolute';
    grid.style.inset = '0';
    grid.style.backgroundImage = 'linear-gradient(rgba(0,123,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,123,255,0.1) 1px, transparent 1px)';
    grid.style.backgroundSize = '20px 20px';
    grid.style.backgroundColor = '#f0f4f8';
    mapContainer.appendChild(grid);
    
    // Location pin
    const pin = document.createElement('div');
    pin.style.position = 'absolute';
    pin.style.left = '50%';
    pin.style.top = '50%';
    pin.style.transform = 'translate(-50%, -50%)';
    pin.style.width = '20px';
    pin.style.height = '20px';
    pin.style.borderRadius = '50% 50% 50% 0';
    pin.style.background = '#007bff';
    pin.style.transform = 'translate(-50%, -100%) rotate(-45deg)';
    pin.style.boxShadow = '0 2px 5px rgba(0,0,0,0.2)';
    mapContainer.appendChild(pin);
    
    // Pin inner circle
    const pinInner = document.createElement('div');
    pinInner.style.position = 'absolute';
    pinInner.style.left = '50%';
    pinInner.style.top = '50%';
    pinInner.style.transform = 'translate(-50%, -50%)';
    pinInner.style.width = '8px';
    pinInner.style.height = '8px';
    pinInner.style.borderRadius = '50%';
    pinInner.style.background = 'white';
    pin.appendChild(pinInner);
    
    // Location label
    const label = document.createElement('div');
    label.style.position = 'absolute';
    label.style.left = '50%';
    label.style.bottom = '20px';
    label.style.transform = 'translateX(-50%)';
    label.style.padding = '5px 10px';
    label.style.background = 'white';
    label.style.borderRadius = '4px';
    label.style.boxShadow = '0 2px 5px rgba(0,0,0,0.1)';
    label.style.fontSize = '12px';
    label.style.fontWeight = 'bold';
    label.style.color = '#333';
    label.textContent = location;
    mapContainer.appendChild(label);
    
    // "Map Data" footer to make it look realistic
    const mapFooter = document.createElement('div');
    mapFooter.style.position = 'absolute';
    mapFooter.style.bottom = '2px';
    mapFooter.style.right = '2px';
    mapFooter.style.fontSize = '9px';
    mapFooter.style.color = '#666';
    mapFooter.textContent = 'Map data ©2025';
    mapContainer.appendChild(mapFooter);
    
    // Controls
    const controls = document.createElement('div');
    controls.style.position = 'absolute';
    controls.style.top = '10px';
    controls.style.right = '10px';
    controls.style.display = 'flex';
    controls.style.flexDirection = 'column';
    controls.style.gap = '5px';
    mapContainer.appendChild(controls);
    
    // Zoom controls
    const zoomIn = document.createElement('div');
    zoomIn.style.width = '24px';
    zoomIn.style.height = '24px';
    zoomIn.style.background = 'white';
    zoomIn.style.borderRadius = '4px';
    zoomIn.style.boxShadow = '0 1px 3px rgba(0,0,0,0.2)';
    zoomIn.style.display = 'flex';
    zoomIn.style.alignItems = 'center';
    zoomIn.style.justifyContent = 'center';
    zoomIn.style.cursor = 'pointer';
    zoomIn.style.fontSize = '16px';
    zoomIn.textContent = '+';
    controls.appendChild(zoomIn);
    
    const zoomOut = document.createElement('div');
    zoomOut.style.width = '24px';
    zoomOut.style.height = '24px';
    zoomOut.style.background = 'white';
    zoomOut.style.borderRadius = '4px';
    zoomOut.style.boxShadow = '0 1px 3px rgba(0,0,0,0.2)';
    zoomOut.style.display = 'flex';
    zoomOut.style.alignItems = 'center';
    zoomOut.style.justifyContent = 'center';
    zoomOut.style.cursor = 'pointer';
    zoomOut.style.fontSize = '16px';
    zoomOut.textContent = '-';
    controls.appendChild(zoomOut);
    
    // Add ripple effect for the pin
    const ripple = document.createElement('div');
    ripple.style.position = 'absolute';
    ripple.style.left = '50%';
    ripple.style.top = '50%';
    ripple.style.transform = 'translate(-50%, -50%)';
    ripple.style.width = '30px';
    ripple.style.height = '30px';
    ripple.style.borderRadius = '50%';
    ripple.style.background = 'rgba(0,123,255,0.2)';
    ripple.style.animation = 'ripple 1.5s infinite';
    mapContainer.appendChild(ripple);
    
    // Add keyframes for ripple animation
    const style = document.createElement('style');
    style.textContent = `
      @keyframes ripple {
        0% {
          transform: translate(-50%, -50%) scale(0.5);
          opacity: 1;
        }
        100% {
          transform: translate(-50%, -50%) scale(2);
          opacity: 0;
        }
      }
    `;
    document.head.appendChild(style);
    
    // Cleanup
    return () => {
      document.head.removeChild(style);
    };
  }, [location]);

  return (
    <div ref={mapRef} style={{ width: '100%', height, borderRadius: '8px', overflow: 'hidden' }} />
  );
};

export default LocationMap;
