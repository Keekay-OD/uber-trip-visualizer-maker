
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { formatCurrency, formatDistance, formatTime } from "@/utils/formatting";
import MapView from "@/components/MapView";
import { Navigation, DollarSign, Clock, Route } from "lucide-react";

interface TripDetailsProps {
  isAccepted: boolean;
  onAccept: () => void;
  onDecline: () => void;
  onReset: () => void;
}

const TripDetails = ({ isAccepted, onAccept, onDecline, onReset }: TripDetailsProps) => {
  // Editable trip details
  const [pickupLocation, setPickupLocation] = useState("123 Main St");
  const [destination, setDestination] = useState("456 Market St");
  const [payout, setPayout] = useState("15.75");
  const [distance, setDistance] = useState("3.2");
  const [estimatedTime, setEstimatedTime] = useState("12");
  const [isEditing, setIsEditing] = useState(!isAccepted);
  
  const handlePayoutChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Only allow numbers and one decimal point
    const value = e.target.value.replace(/[^\d.]/g, '');
    const decimalCount = (value.match(/\./g) || []).length;
    
    if (decimalCount <= 1) {
      const parts = value.split('.');
      if (parts[1]?.length > 2) {
        // Limit to 2 decimal places
        setPayout(parts[0] + '.' + parts[1].substring(0, 2));
      } else {
        setPayout(value);
      }
    }
  };

  const handleDistanceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Only allow numbers and one decimal point
    const value = e.target.value.replace(/[^\d.]/g, '');
    const decimalCount = (value.match(/\./g) || []).length;
    
    if (decimalCount <= 1) {
      setDistance(value);
    }
  };

  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Only allow numbers
    const value = e.target.value.replace(/[^\d]/g, '');
    setEstimatedTime(value);
  };

  const toggleEditMode = () => {
    setIsEditing(!isEditing);
  };
  
  return (
    <>
      <MapView 
        pickupLocation={pickupLocation}
        destination={destination}
        isAccepted={isAccepted}
      />
      
      <div className="absolute bottom-0 left-0 right-0 px-4 pb-4 pt-20 bg-gradient-to-t from-[#191919] to-transparent">
        <Card className="bg-[#222222] border-none shadow-lg p-5 rounded-xl text-white">
          {isAccepted ? (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold">Trip in Progress</h2>
                <Button variant="outline" size="sm" onClick={onReset}>
                  New Trip
                </Button>
              </div>
              
              <div className="flex items-center gap-3 py-2">
                <div className="flex flex-col items-center">
                  <div className="w-3 h-3 bg-blue-400 rounded-full"></div>
                  <div className="w-0.5 h-10 bg-gray-700"></div>
                  <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
                </div>
                <div className="flex-1 space-y-2">
                  <div>
                    <p className="text-sm text-gray-400">Pickup</p>
                    <p className="font-medium">{pickupLocation}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Destination</p>
                    <p className="font-medium">{destination}</p>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-between text-sm">
                <div className="flex items-center gap-1">
                  <DollarSign size={16} className="text-green-500" />
                  <span>{formatCurrency(parseFloat(payout))}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Route size={16} className="text-blue-400" />
                  <span>{formatDistance(parseFloat(distance))}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock size={16} className="text-yellow-400" />
                  <span>{formatTime(parseInt(estimatedTime))}</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold">New Trip Request</h2>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={toggleEditMode}
                  className="text-blue-400"
                >
                  {isEditing ? "Done" : "Edit"}
                </Button>
              </div>
              
              {isEditing ? (
                <div className="space-y-3">
                  <div>
                    <label className="text-sm text-gray-400 mb-1 block">Pickup Location</label>
                    <Input 
                      value={pickupLocation}
                      onChange={(e) => setPickupLocation(e.target.value)}
                      className="bg-[#2a2a2a] border-gray-700 text-white"
                    />
                  </div>
                  <div>
                    <label className="text-sm text-gray-400 mb-1 block">Destination</label>
                    <Input 
                      value={destination}
                      onChange={(e) => setDestination(e.target.value)}
                      className="bg-[#2a2a2a] border-gray-700 text-white"
                    />
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    <div>
                      <label className="text-sm text-gray-400 mb-1 block">Payout ($)</label>
                      <Input 
                        value={payout}
                        onChange={handlePayoutChange}
                        className="bg-[#2a2a2a] border-gray-700 text-white"
                      />
                    </div>
                    <div>
                      <label className="text-sm text-gray-400 mb-1 block">Distance (mi)</label>
                      <Input 
                        value={distance}
                        onChange={handleDistanceChange}
                        className="bg-[#2a2a2a] border-gray-700 text-white"
                      />
                    </div>
                    <div>
                      <label className="text-sm text-gray-400 mb-1 block">Time (min)</label>
                      <Input 
                        value={estimatedTime}
                        onChange={handleTimeChange}
                        className="bg-[#2a2a2a] border-gray-700 text-white"
                      />
                    </div>
                  </div>
                </div>
              ) : (
                <>
                  <div className="flex items-center gap-3 py-2">
                    <div className="flex flex-col items-center">
                      <div className="w-3 h-3 bg-blue-400 rounded-full"></div>
                      <div className="w-0.5 h-10 bg-gray-700"></div>
                      <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
                    </div>
                    <div className="flex-1 space-y-2">
                      <div>
                        <p className="text-sm text-gray-400">Pickup</p>
                        <p className="font-medium">{pickupLocation}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-400">Destination</p>
                        <p className="font-medium">{destination}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex justify-between text-sm">
                    <div className="flex items-center gap-1">
                      <DollarSign size={16} className="text-green-500" />
                      <span>{formatCurrency(parseFloat(payout))}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Route size={16} className="text-blue-400" />
                      <span>{formatDistance(parseFloat(distance))}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock size={16} className="text-yellow-400" />
                      <span>{formatTime(parseInt(estimatedTime))}</span>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3 pt-2">
                    <Button 
                      variant="outline" 
                      className="bg-transparent text-white border-gray-700 hover:bg-gray-800"
                      onClick={onDecline}
                    >
                      Decline
                    </Button>
                    <Button 
                      className="bg-blue-600 hover:bg-blue-700 text-white"
                      onClick={onAccept}
                    >
                      Accept
                    </Button>
                  </div>
                </>
              )}
            </div>
          )}
        </Card>
      </div>
    </>
  );
};

export default TripDetails;
