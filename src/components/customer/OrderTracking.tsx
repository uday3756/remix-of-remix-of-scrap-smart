import React from 'react';
import { ArrowLeft, Phone, MessageCircle, Star, Navigation } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { MobileLayout, MobileHeader } from '@/components/ui/MobileLayout';
import { OrderTrackingSteps } from '@/components/ui/ProgressSteps';

interface OrderTrackingProps {
  orderId: string;
  onBack: () => void;
  onComplete: () => void;
}

const trackingSteps = [
  { id: 'assigned', label: 'Partner Assigned', description: 'Rajesh Kumar will pick up your scrap', time: '10:30 AM' },
  { id: 'on_the_way', label: 'On the Way', description: 'Partner is heading to your location', time: '10:45 AM' },
  { id: 'at_location', label: 'At Location', description: 'Partner has arrived at your address', time: '' },
  { id: 'picked_up', label: 'Picked Up', description: 'Scrap collection completed', time: '' },
];

export const OrderTracking: React.FC<OrderTrackingProps> = ({
  orderId,
  onBack,
  onComplete,
}) => {
  const currentStep = 2; // Mock: Partner is on the way

  return (
    <MobileLayout>
      <MobileHeader 
        leftAction={
          <button onClick={onBack}>
            <ArrowLeft className="w-6 h-6 text-foreground" />
          </button>
        }
        title="Track Order"
        subtitle={`#${orderId}`}
      />
      
      <div className="py-4 space-y-6 animate-fade-in">
        {/* Map Placeholder */}
        <div className="h-48 bg-muted rounded-2xl relative overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <Navigation className="w-12 h-12 text-primary mx-auto mb-2" />
              <p className="text-sm text-muted-foreground">Live tracking coming soon</p>
            </div>
          </div>
          {/* Mock route line */}
          <div className="absolute top-1/2 left-1/4 right-1/4 h-1 bg-primary/30 rounded-full" />
          <div className="absolute top-1/2 left-1/4 w-3 h-3 bg-primary rounded-full -translate-y-1/2 animate-pulse-soft" />
          <div className="absolute top-1/2 right-1/4 w-3 h-3 bg-accent rounded-full -translate-y-1/2" />
        </div>

        {/* Partner Info */}
        <div className="bg-card rounded-2xl border border-border p-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center">
              <span className="text-xl font-bold text-primary">RK</span>
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-foreground">Rajesh Kumar</h3>
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 text-warning fill-warning" />
                <span className="text-sm text-muted-foreground">4.8 • 156 pickups</span>
              </div>
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

        {/* ETA */}
        <div className="bg-primary/5 rounded-2xl p-4 border border-primary/20">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Estimated Arrival</p>
              <p className="text-2xl font-bold text-primary">15 mins</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-muted-foreground">Distance</p>
              <p className="font-semibold text-foreground">2.5 km</p>
            </div>
          </div>
        </div>

        {/* Tracking Steps */}
        <div className="bg-card rounded-2xl border border-border p-4">
          <h3 className="font-semibold text-foreground mb-4">Order Status</h3>
          <OrderTrackingSteps steps={trackingSteps} currentStep={currentStep} />
        </div>

        {/* Order Summary */}
        <div className="bg-card rounded-2xl border border-border p-4">
          <h3 className="font-semibold text-foreground mb-3">Order Summary</h3>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">E-Waste</span>
              <span className="text-foreground">~4 kg</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Plastic</span>
              <span className="text-foreground">~2 kg</span>
            </div>
            <div className="border-t border-border my-2" />
            <div className="flex justify-between">
              <span className="font-medium text-foreground">Estimated Amount</span>
              <span className="font-bold text-primary">₹160</span>
            </div>
          </div>
        </div>
      </div>

      {/* Debug: Complete Order Button (for demo) */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-background border-t border-border safe-area-bottom">
        <div className="max-w-md mx-auto">
          <Button 
            onClick={onComplete}
            variant="outline"
            className="w-full h-12 rounded-2xl text-muted-foreground"
          >
            [Demo] Complete Order
          </Button>
        </div>
      </div>
    </MobileLayout>
  );
};
