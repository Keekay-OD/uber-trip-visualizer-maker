
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
    <div className="min-h-screen bg-[#191919] text-white flex flex-col">
      <header className="p-4 bg-black flex justify-center">
        <h1 className="text-xl font-bold">Uber Trip Simulator</h1>
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
