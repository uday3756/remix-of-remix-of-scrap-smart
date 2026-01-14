import React, { useState } from 'react';
import { CheckCircle, Camera, Plus, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { MobileLayout } from '@/components/ui/MobileLayout';
import { scrapRates } from '@/data/mockData';
import { cn } from '@/lib/utils';

interface PickupCompletionProps {
  pickupId: string;
  onComplete: () => void;
}

interface ScrapItem {
  id: number;
  name: string;
  rate: number;
  unit: string;
  quantity: number;
}

export const PickupCompletion: React.FC<PickupCompletionProps> = ({
  pickupId,
  onComplete,
}) => {
  const [items, setItems] = useState<ScrapItem[]>([
    { ...scrapRates[9], quantity: 4.2 }, // E-Waste
    { ...scrapRates[7], quantity: 2.1 }, // Plastic
  ]);
  const [paymentStatus, setPaymentStatus] = useState<'pending' | 'paid'>('pending');
  const [photos, setPhotos] = useState<string[]>([]);

  const updateQuantity = (id: number, quantity: number) => {
    setItems(prev => prev.map(item => 
      item.id === id ? { ...item, quantity } : item
    ));
  };

  const totalAmount = items.reduce((sum, item) => sum + (item.rate * item.quantity), 0);

  const handlePhotoUpload = () => {
    const mockPhoto = 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=200';
    if (photos.length < 3) {
      setPhotos(prev => [...prev, mockPhoto]);
    }
  };

  const handleComplete = () => {
    setPaymentStatus('paid');
    setTimeout(() => {
      onComplete();
    }, 1500);
  };

  if (paymentStatus === 'paid') {
    return (
      <MobileLayout className="flex flex-col items-center justify-center py-8">
        <div className="text-center animate-scale-in">
          <div className="w-24 h-24 rounded-full bg-success/10 flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-14 h-14 text-success" />
          </div>
          <h1 className="text-2xl font-bold text-foreground mb-2">Pickup Complete!</h1>
          <p className="text-muted-foreground mb-4">Payment of ₹{totalAmount.toFixed(0)} received</p>
          <div className="bg-success/10 rounded-xl p-4 inline-block">
            <p className="text-success font-semibold">+₹{totalAmount.toFixed(0)} added to earnings</p>
          </div>
        </div>
      </MobileLayout>
    );
  }

  return (
    <MobileLayout className="pb-40">
      <div className="py-4 animate-fade-in">
        <h1 className="text-xl font-bold text-foreground mb-2">Complete Pickup</h1>
        <p className="text-muted-foreground mb-6">#{pickupId}</p>

        {/* Scrap Items */}
        <div className="space-y-4 mb-6">
          <h3 className="font-semibold text-foreground">Weighed Items</h3>
          {items.map((item) => (
            <div key={item.id} className="bg-card rounded-2xl border border-border p-4">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <p className="font-medium text-foreground">{item.name}</p>
                  <p className="text-sm text-muted-foreground">₹{item.rate}/{item.unit}</p>
                </div>
                <p className="font-bold text-primary">₹{(item.rate * item.quantity).toFixed(0)}</p>
              </div>
              <div className="flex items-center gap-3">
                <Input
                  type="number"
                  step="0.1"
                  value={item.quantity}
                  onChange={(e) => updateQuantity(item.id, parseFloat(e.target.value) || 0)}
                  className="h-12 rounded-xl text-center font-medium"
                />
                <span className="text-muted-foreground">{item.unit}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Photos */}
        <div className="mb-6">
          <h3 className="font-semibold text-foreground mb-3">Pickup Photos</h3>
          <div className="flex gap-3 flex-wrap">
            {photos.map((photo, index) => (
              <div key={index} className="relative w-20 h-20">
                <img 
                  src={photo} 
                  alt={`Pickup ${index + 1}`} 
                  className="w-full h-full object-cover rounded-xl"
                />
                <button
                  onClick={() => setPhotos(prev => prev.filter((_, i) => i !== index))}
                  className="absolute -top-2 -right-2 w-6 h-6 bg-destructive text-white rounded-full flex items-center justify-center"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
            {photos.length < 3 && (
              <button
                onClick={handlePhotoUpload}
                className="w-20 h-20 border-2 border-dashed border-border rounded-xl flex flex-col items-center justify-center text-muted-foreground hover:border-primary hover:text-primary transition-all"
              >
                <Camera className="w-6 h-6" />
              </button>
            )}
          </div>
        </div>

        {/* Payment Mode */}
        <div className="mb-6">
          <h3 className="font-semibold text-foreground mb-3">Payment Mode</h3>
          <div className="flex gap-3">
            <button className="flex-1 p-4 bg-primary/10 border-2 border-primary rounded-xl">
              <span className="font-medium text-primary">Cash</span>
            </button>
            <button className="flex-1 p-4 bg-card border-2 border-border rounded-xl">
              <span className="font-medium text-foreground">UPI</span>
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Summary */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-background border-t border-border safe-area-bottom">
        <div className="max-w-md mx-auto">
          <div className="flex items-center justify-between mb-4 p-3 bg-muted rounded-xl">
            <span className="font-medium text-foreground">Total Amount</span>
            <span className="text-2xl font-bold text-primary">₹{totalAmount.toFixed(0)}</span>
          </div>
          <Button 
            onClick={handleComplete}
            className="w-full h-14 text-lg font-semibold rounded-2xl"
          >
            Confirm & Complete Pickup
          </Button>
        </div>
      </div>
    </MobileLayout>
  );
};
