import React from 'react';
import { ArrowLeft, Phone, MessageCircle, MapPin, Navigation, Package, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { MobileLayout, MobileHeader } from '@/components/ui/MobileLayout';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { mockPartnerData } from '@/data/mockData';

interface PickupDetailsProps {
  pickupId: string;
  onBack: () => void;
  onStartPickup: () => void;
}

export const PickupDetails: React.FC<PickupDetailsProps> = ({
  pickupId,
  onBack,
  onStartPickup,
}) => {
  const pickup = mockPartnerData.assignedPickups.find(p => p.id === pickupId) || mockPartnerData.assignedPickups[0];

  return (
    <MobileLayout>
      <MobileHeader 
        leftAction={
          <button onClick={onBack}>
            <ArrowLeft className="w-6 h-6 text-foreground" />
          </button>
        }
        title="Pickup Details"
        subtitle={`#${pickup.id}`}
      />
      
      <div className="py-4 space-y-4 animate-fade-in">
        {/* Status */}
        <div className="flex items-center justify-between">
          <StatusBadge status={pickup.status as any} />
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Clock className="w-4 h-4" />
            <span>{pickup.time}</span>
          </div>
        </div>

        {/* Customer Info */}
        <div className="bg-card rounded-2xl border border-border p-4">
          <h3 className="font-semibold text-foreground mb-3">Customer Info</h3>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
              <span className="font-bold text-primary">{pickup.customerName.charAt(0)}</span>
            </div>
            <div className="flex-1">
              <p className="font-medium text-foreground">{pickup.customerName}</p>
              <p className="text-sm text-muted-foreground">{pickup.phone}</p>
            </div>
          </div>
          <div className="flex gap-3 mt-4">
            <Button variant="outline" className="flex-1 rounded-xl">
              <Phone className="w-4 h-4 mr-2" />
              Call
            </Button>
            <Button variant="outline" className="flex-1 rounded-xl">
              <MessageCircle className="w-4 h-4 mr-2" />
              Message
            </Button>
          </div>
        </div>

        {/* Location */}
        <div className="bg-card rounded-2xl border border-border p-4">
          <h3 className="font-semibold text-foreground mb-3">Pickup Location</h3>
          <div className="flex items-start gap-3 mb-4">
            <MapPin className="w-5 h-5 text-primary shrink-0 mt-0.5" />
            <p className="text-foreground">{pickup.address}</p>
          </div>
          
          {/* Map Placeholder */}
          <div className="h-40 bg-muted rounded-xl relative overflow-hidden mb-3">
            <div className="absolute inset-0 flex items-center justify-center">
              <Navigation className="w-10 h-10 text-primary" />
            </div>
          </div>
          
          <Button variant="outline" className="w-full rounded-xl">
            <Navigation className="w-4 h-4 mr-2" />
            Open in Maps
          </Button>
        </div>

        {/* Scrap Details */}
        <div className="bg-card rounded-2xl border border-border p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold text-foreground">Scrap Details</h3>
            <span className="text-sm text-muted-foreground">{pickup.items.length} items</span>
          </div>
          <div className="space-y-2">
            {pickup.items.map((item, index) => (
              <div key={index} className="flex items-center gap-3 p-3 bg-muted rounded-xl">
                <Package className="w-5 h-5 text-muted-foreground" />
                <span className="text-foreground">{item}</span>
              </div>
            ))}
          </div>
          <div className="mt-4 pt-4 border-t border-border flex items-center justify-between">
            <span className="text-muted-foreground">Estimated Amount</span>
            <span className="text-xl font-bold text-primary">₹{pickup.estimatedAmount}</span>
          </div>
        </div>
      </div>

      {/* Bottom Action */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-background border-t border-border safe-area-bottom">
        <div className="max-w-md mx-auto">
          <Button 
            onClick={onStartPickup}
            className="w-full h-14 text-lg font-semibold rounded-2xl"
          >
            Start Pickup
          </Button>
        </div>
      </div>
    </MobileLayout>
  );
};
