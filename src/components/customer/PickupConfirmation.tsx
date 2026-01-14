import React from 'react';
import { CheckCircle, Calendar, Clock, MapPin, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { MobileLayout } from '@/components/ui/MobileLayout';

interface PickupConfirmationProps {
  pickupId: string;
  date: Date;
  timeSlot: string;
  onTrackOrder: () => void;
  onGoHome: () => void;
}

export const PickupConfirmation: React.FC<PickupConfirmationProps> = ({
  pickupId,
  date,
  timeSlot,
  onTrackOrder,
  onGoHome,
}) => {
  return (
    <MobileLayout className="flex flex-col items-center justify-center py-8">
      <div className="text-center animate-scale-in">
        {/* Success Icon */}
        <div className="w-24 h-24 rounded-full bg-success/10 flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="w-14 h-14 text-success" />
        </div>

        <h1 className="text-2xl font-bold text-foreground mb-2">
          Pickup Scheduled!
        </h1>
        <p className="text-muted-foreground mb-8">
          Your pickup request has been confirmed
        </p>

        {/* Order Details Card */}
        <div className="bg-card rounded-3xl border border-border p-6 text-left mb-8 shadow-card">
          <div className="text-center mb-6">
            <p className="text-sm text-muted-foreground">Pickup ID</p>
            <p className="text-2xl font-bold text-primary">{pickupId}</p>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <Calendar className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Date</p>
                <p className="font-medium text-foreground">
                  {date.toLocaleDateString('en-US', { 
                    weekday: 'long', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <Clock className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Time Slot</p>
                <p className="font-medium text-foreground">{timeSlot}</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <MapPin className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Pickup Location</p>
                <p className="font-medium text-foreground">
                  42, Green Valley Apartments, Andheri West
                </p>
              </div>
            </div>
          </div>

          {/* Status */}
          <div className="mt-6 p-4 bg-warning/10 rounded-xl border border-warning/20">
            <p className="text-sm text-warning font-medium text-center">
              ⏳ Waiting for partner assignment
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="space-y-3 w-full">
          <Button 
            onClick={onTrackOrder}
            className="w-full h-14 text-lg font-semibold rounded-2xl"
          >
            Track Order
            <ChevronRight className="w-5 h-5 ml-2" />
          </Button>
          
          <Button 
            onClick={onGoHome}
            variant="outline"
            className="w-full h-14 text-lg font-semibold rounded-2xl"
          >
            Go to Home
          </Button>
        </div>

        <p className="text-sm text-muted-foreground mt-6">
          You'll receive a notification when a partner is assigned
        </p>
      </div>
    </MobileLayout>
  );
};
