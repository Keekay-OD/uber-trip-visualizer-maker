
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { formatCurrency, formatDistance, formatTime } from "@/utils/formatting";
import MapView from "@/components/MapView";
import { Clock, Utensils } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface TripDetailsProps {
  isAccepted: boolean;
  onAccept: () => void;
  onDecline: () => void;
  onReset: () => void;
}

const TripDetails = ({ isAccepted, onAccept, onDecline, onReset }: TripDetailsProps) => {
  // Editable trip details
  const [pickupLocation, setPickupLocation] = useState("George The Greek");
  const [destination, setDestination] = useState("Barclay Ave & The Queensway, Etobicoke");
  const [payout, setPayout] = useState("6.52");
  const [distance, setDistance] = useState("6.6");
  const [estimatedTime, setEstimatedTime] = useState("22");
  const [isEditing, setIsEditing] = useState(!isAccepted);
  const [includesTip, setIncludesTip] = useState(true);
  const [currencyPrefix, setCurrencyPrefix] = useState("CA$");
  
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
      
      <div className="absolute bottom-0 left-0 right-0 px-4 pb-4">
        <Card className="bg-white border border-gray-200 shadow-lg p-0 rounded-3xl text-black overflow-hidden">
          {isAccepted ? (
            <div className="space-y-4 p-5">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold">Trip in Progress</h2>
                <Button variant="outline" size="sm" onClick={onReset}>
                  New Trip
                </Button>
              </div>
              
              <div className="flex items-center gap-3 py-2">
                <div className="flex flex-col items-center">
                  <div className="w-3 h-3 bg-black rounded-full"></div>
                  <div className="w-0.5 h-10 bg-gray-300"></div>
                  <div className="w-3 h-3 bg-black rounded-full"></div>
                </div>
                <div className="flex-1 space-y-2">
                  <div>
                    <p className="font-medium">{pickupLocation}</p>
                  </div>
                  <div>
                    <p className="font-medium">{destination}</p>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-between text-sm">
                <div className="flex items-center gap-1">
                  <span>{currencyPrefix}{payout}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock size={16} className="text-black" />
                  <span>{estimatedTime} min ({formatDistance(parseFloat(distance))})</span>
                </div>
              </div>
            </div>
          ) : (
            <div>
              {isEditing ? (
                <div className="p-5 space-y-3">
                  <div className="flex justify-between items-center">
                    <h2 className="text-xl font-bold">Edit Trip Request</h2>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={toggleEditMode}
                      className="text-blue-600"
                    >
                      Done
                    </Button>
                  </div>
                
                  <div>
                    <label className="text-sm text-gray-600 mb-1 block">Currency Prefix</label>
                    <Input 
                      value={currencyPrefix}
                      onChange={(e) => setCurrencyPrefix(e.target.value)}
                      className="border-gray-300"
                    />
                  </div>
                
                  <div>
                    <label className="text-sm text-gray-600 mb-1 block">Pickup Location</label>
                    <Input 
                      value={pickupLocation}
                      onChange={(e) => setPickupLocation(e.target.value)}
                      className="border-gray-300"
                    />
                  </div>
                  <div>
                    <label className="text-sm text-gray-600 mb-1 block">Destination</label>
                    <Input 
                      value={destination}
                      onChange={(e) => setDestination(e.target.value)}
                      className="border-gray-300"
                    />
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    <div>
                      <label className="text-sm text-gray-600 mb-1 block">Payout</label>
                      <Input 
                        value={payout}
                        onChange={handlePayoutChange}
                        className="border-gray-300"
                      />
                    </div>
                    <div>
                      <label className="text-sm text-gray-600 mb-1 block">Distance (km)</label>
                      <Input 
                        value={distance}
                        onChange={handleDistanceChange}
                        className="border-gray-300"
                      />
                    </div>
                    <div>
                      <label className="text-sm text-gray-600 mb-1 block">Time (min)</label>
                      <Input 
                        value={estimatedTime}
                        onChange={handleTimeChange}
                        className="border-gray-300"
                      />
                    </div>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="includesTip"
                      checked={includesTip}
                      onChange={(e) => setIncludesTip(e.target.checked)}
                      className="mr-2"
                    />
                    <label htmlFor="includesTip" className="text-sm text-gray-600">
                      Show "including estimated tip"
                    </label>
                  </div>
                </div>
              ) : (
                <>
                  <div className="flex items-center px-4 pt-3 pb-2">
                    <Badge className="bg-green-600 hover:bg-green-700 text-white flex items-center gap-1 px-4 py-1.5 rounded-full text-sm">
                      <Utensils size={16} />
                      <span>Delivery</span>
                    </Badge>
                  </div>
                  
                  <div className="px-5">
                    <h2 className="text-5xl font-extrabold">{currencyPrefix}{payout}</h2>
                    {includesTip && <p className="text-gray-500 text-sm mt-1">including estimated tip</p>}
                  </div>
                  
                  <div className="px-5 py-3 border-b border-gray-200">
                    <div className="flex items-center gap-2 text-base">
                      <Clock size={20} className="text-black" />
                      <span className="font-semibold">{estimatedTime} min ({parseFloat(distance).toFixed(1)} km) total</span>
                    </div>
                  </div>
                  
                  <div className="px-5 py-3">
                    <div className="flex items-start gap-3">
                      <div className="flex flex-col items-center">
                        <div className="w-2.5 h-2.5 bg-black rounded-full mt-1.5"></div>
                        <div className="w-0.5 h-10 bg-gray-300"></div>
                        <div className="w-2.5 h-2.5 bg-black rounded-full"></div>
                      </div>
                      <div className="flex-1 space-y-4">
                        <div>
                          <p className="font-medium text-base">{pickupLocation}</p>
                        </div>
                        <div>
                          <p className="font-medium text-base">{destination}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-5 pt-3">
                    <Button 
                      className="w-full bg-black hover:bg-gray-800 text-white rounded-full font-medium py-6"
                      onClick={onAccept}
                    >
                      Accept
                    </Button>
                  </div>
                  
                  <div className="absolute top-4 right-4">
                    <Button 
                      variant="ghost" 
                      size="sm"
                      className="text-black hover:bg-transparent p-1"
                      onClick={toggleEditMode}
                    >
                      Edit
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
