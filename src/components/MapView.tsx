
import { useEffect, useRef } from "react";

interface MapViewProps {
  pickupLocation: string;
  destination: string;
  isAccepted: boolean;
}

const MapView = ({ pickupLocation, destination, isAccepted }: MapViewProps) => {
  const mapRef = useRef<HTMLDivElement>(null);

  // Draw a simple map with animated route
  useEffect(() => {
    if (!mapRef.current) return;
    
    const canvas = document.createElement('canvas');
    canvas.width = mapRef.current.clientWidth;
    canvas.height = mapRef.current.clientHeight;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Clear previous content
    while (mapRef.current.firstChild) {
      mapRef.current.removeChild(mapRef.current.firstChild);
    }
    mapRef.current.appendChild(canvas);
    
    // Draw map background - using a lighter blue color similar to the reference
    ctx.fillStyle = '#e9f0f9';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Draw some subtle roads - lighter gray
    ctx.strokeStyle = '#d0d8e0';
    ctx.lineWidth = 8;
    
    // Horizontal roads
    for (let y = 50; y < canvas.height; y += 100) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(canvas.width, y);
      ctx.stroke();
    }
    
    // Vertical roads
    for (let x = 50; x < canvas.width; x += 100) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, canvas.height);
      ctx.stroke();
    }
    
    // Add some green areas (parks)
    ctx.fillStyle = '#d5ebd5';
    // Left side park
    ctx.fillRect(0, canvas.height * 0.5, canvas.width * 0.3, canvas.height * 0.5);
    // Right side parks
    ctx.fillRect(canvas.width * 0.6, canvas.height * 0.4, canvas.width * 0.2, canvas.height * 0.15);
    ctx.fillRect(canvas.width * 0.7, canvas.height * 0.7, canvas.width * 0.3, canvas.height * 0.2);
    
    // Draw route - dark gray like in the reference
    const startX = canvas.width * 0.2;
    const startY = canvas.height * 0.3;
    const middleX = canvas.width * 0.5;
    const middleY = canvas.height * 0.4;
    const endX = canvas.width * 0.8;
    const endY = canvas.height * 0.6;
    
    // Draw the route line - dark gray
    ctx.strokeStyle = '#5a5a5a';
    ctx.lineWidth = 5;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    
    // First segment
    ctx.beginPath();
    ctx.moveTo(startX, startY);
    ctx.lineTo(middleX, middleY);
    ctx.stroke();
    
    // Second segment
    ctx.beginPath();
    ctx.moveTo(middleX, middleY);
    ctx.lineTo(endX, endY);
    ctx.stroke();
    
    // Add pickup location dot
    ctx.fillStyle = '#5a5a5a';
    ctx.beginPath();
    ctx.arc(startX, startY, 10, 0, Math.PI * 2);
    ctx.fill();
    
    // Add middle point dot
    ctx.beginPath();
    ctx.arc(middleX, middleY, 10, 0, Math.PI * 2);
    ctx.fill();
    
    // Add destination point with arrow/marker
    ctx.fillStyle = 'white';
    ctx.beginPath();
    ctx.arc(endX, endY, 18, 0, Math.PI * 2);
    ctx.fill();
    
    ctx.fillStyle = 'black';
    ctx.beginPath();
    ctx.moveTo(endX, endY - 10);
    ctx.lineTo(endX + 8, endY + 5);
    ctx.lineTo(endX - 8, endY + 5);
    ctx.fill();
    
    // Add restaurant icon for pickup
    ctx.fillStyle = 'white';
    ctx.beginPath();
    ctx.arc(startX, startY, 15, 0, Math.PI * 2);
    ctx.fill();
    
    ctx.fillStyle = '#5a5a5a';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.font = 'bold 14px Arial';
    ctx.fillText('R', startX, startY);
    
    if (isAccepted) {
      // Add car position when accepted
      const carX = middleX;
      const carY = middleY;
      
      ctx.fillStyle = 'white';
      ctx.beginPath();
      ctx.arc(carX, carY, 14, 0, Math.PI * 2);
      ctx.fill();
      
      ctx.fillStyle = 'black';
      ctx.beginPath();
      ctx.arc(carX, carY, 8, 0, Math.PI * 2);
      ctx.fill();
    }
    
  }, [pickupLocation, destination, isAccepted]);

  return (
    <div 
      ref={mapRef} 
      className="absolute top-0 left-0 w-full h-full bg-blue-50 z-0"
      style={{ height: '75vh' }}
    ></div>
  );
};

export default MapView;
