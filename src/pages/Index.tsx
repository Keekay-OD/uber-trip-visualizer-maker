
import { useState } from "react";
import TripDetails from "@/components/TripDetails";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const Index = () => {
  const [isAccepted, setIsAccepted] = useState(false);
  
  const handleAccept = () => {
    setIsAccepted(true);
    toast.success("Trip accepted! Navigate to pickup.");
  };
  
  const handleDecline = () => {
    toast.info("Trip declined");
    // Reset after a short delay to simulate a new request
    setTimeout(() => {
      setIsAccepted(false);
    }, 1500);
  };

  const resetTrip = () => {
    setIsAccepted(false);
  };

  return (
    <div className="min-h-screen bg-[#e9f0f9] flex flex-col">
      <header className="p-3 bg-black flex justify-center z-10">
        <div className="flex items-center justify-between w-full max-w-sm">
          <div className="text-white text-lg font-medium">8:03</div>
          <div className="flex items-center gap-2">
            <div className="text-white">52%</div>
          </div>
        </div>
      </header>
      
      <main className="flex-1 relative">
        <TripDetails 
          isAccepted={isAccepted} 
          onAccept={handleAccept} 
          onDecline={handleDecline}
          onReset={resetTrip}
        />
      </main>
    </div>
  );
};

export default Index;
