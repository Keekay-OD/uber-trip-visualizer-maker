
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
    
    // Draw map background
    ctx.fillStyle = '#1a1d24';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Draw some roads
    ctx.strokeStyle = '#333';
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
    
    // Draw route
    const startX = canvas.width * 0.2;
    const startY = canvas.height * 0.6;
    const endX = canvas.width * 0.8;
    const endY = canvas.height * 0.3;
    
    // Control points for bezier curve
    const cpX1 = startX + (endX - startX) * 0.3;
    const cpY1 = startY - 50;
    const cpX2 = endX - (endX - startX) * 0.3;
    const cpY2 = endY + 50;
    
    // Draw the route line
    ctx.strokeStyle = isAccepted ? '#2563eb' : '#4b5563';
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(startX, startY);
    ctx.bezierCurveTo(cpX1, cpY1, cpX2, cpY2, endX, endY);
    ctx.stroke();
    
    // Draw pickup point
    ctx.fillStyle = '#3b82f6';
    ctx.beginPath();
    ctx.arc(startX, startY, 8, 0, Math.PI * 2);
    ctx.fill();
    
    // Draw destination point
    ctx.fillStyle = '#2563eb';
    ctx.beginPath();
    ctx.arc(endX, endY, 8, 0, Math.PI * 2);
    ctx.fill();
    
    // Car icon for accepted trips
    if (isAccepted) {
      // Animate car along path
      let progress = 0;
      let lastTimestamp: number | null = null;
      
      const animateCar = (timestamp: number) => {
        if (!lastTimestamp) lastTimestamp = timestamp;
        const elapsed = timestamp - lastTimestamp;
        
        // Update progress
        progress += elapsed / 15000; // Complete in 15 seconds
        
        if (progress <= 1) {
          // Redraw background portion where car was
          const prevT = Math.max(0, progress - elapsed / 15000);
          const prevX = bezierPoint(startX, cpX1, cpX2, endX, prevT);
          const prevY = bezierPoint(startY, cpY1, cpY2, endY, prevT);
          
          // Clean old car position
          ctx.fillStyle = '#1a1d24';
          ctx.beginPath();
          ctx.arc(prevX, prevY, 12, 0, Math.PI * 2);
          ctx.fill();
          
          // Redraw road section
          ctx.strokeStyle = '#2563eb';
          ctx.lineWidth = 4;
          ctx.beginPath();
          const segmentStart = Math.max(0, prevT - 0.05);
          const segmentEnd = Math.min(1, prevT + 0.05);
          
          // Draw segment of bezier curve
          let x = bezierPoint(startX, cpX1, cpX2, endX, segmentStart);
          let y = bezierPoint(startY, cpY1, cpY2, endY, segmentStart);
          ctx.moveTo(x, y);
          
          for (let t = segmentStart + 0.01; t <= segmentEnd; t += 0.01) {
            x = bezierPoint(startX, cpX1, cpX2, endX, t);
            y = bezierPoint(startY, cpY1, cpY2, endY, t);
            ctx.lineTo(x, y);
          }
          ctx.stroke();
          
          // Calculate car position
          const carX = bezierPoint(startX, cpX1, cpX2, endX, progress);
          const carY = bezierPoint(startY, cpY1, cpY2, endY, progress);
          
          // Calculate tangent angle for car rotation
          const tangentX = bezierTangent(startX, cpX1, cpX2, endX, progress);
          const tangentY = bezierTangent(startY, cpY1, cpY2, endY, progress);
          const angle = Math.atan2(tangentY, tangentX);
          
          // Draw car
          ctx.save();
          ctx.translate(carX, carY);
          ctx.rotate(angle);
          
          // Car shape
          ctx.fillStyle = '#fbbf24';
          ctx.beginPath();
          ctx.rect(-8, -5, 16, 10);
          ctx.fill();
          
          ctx.restore();
          
          // Request next frame
          requestAnimationFrame(animateCar);
        }
        
        lastTimestamp = timestamp;
      };
      
      requestAnimationFrame(animateCar);
    }
  }, [pickupLocation, destination, isAccepted]);
  
  // Helper functions for bezier curves
  function bezierPoint(p0: number, p1: number, p2: number, p3: number, t: number): number {
    const oneMinusT = 1 - t;
    return Math.pow(oneMinusT, 3) * p0 +
           3 * Math.pow(oneMinusT, 2) * t * p1 +
           3 * oneMinusT * Math.pow(t, 2) * p2 +
           Math.pow(t, 3) * p3;
  }
  
  function bezierTangent(p0: number, p1: number, p2: number, p3: number, t: number): number {
    const oneMinusT = 1 - t;
    return 3 * oneMinusT * oneMinusT * (p1 - p0) +
           6 * oneMinusT * t * (p2 - p1) +
           3 * t * t * (p3 - p2);
  }

  return (
    <div 
      ref={mapRef} 
      className="absolute top-0 left-0 w-full h-full bg-[#1a1d24] z-0"
    ></div>
  );
};

export default MapView;
