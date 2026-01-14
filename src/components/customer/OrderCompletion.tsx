import React, { useState } from 'react';
import { CheckCircle, Star, ExternalLink, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { MobileLayout } from '@/components/ui/MobileLayout';
import { cn } from '@/lib/utils';

interface OrderCompletionProps {
  orderId: string;
  onGoHome: () => void;
}

export const OrderCompletion: React.FC<OrderCompletionProps> = ({
  orderId,
  onGoHome,
}) => {
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmitFeedback = () => {
    // Mock submit
    setSubmitted(true);
  };

  const invoiceItems = [
    { name: 'E-Waste', quantity: '4.2 kg', rate: '₹35/kg', amount: 147 },
    { name: 'Plastic (Mixed)', quantity: '2.1 kg', rate: '₹10/kg', amount: 21 },
  ];

  const totalAmount = invoiceItems.reduce((sum, item) => sum + item.amount, 0);

  return (
    <MobileLayout className="py-6">
      <div className="animate-fade-in">
        {/* Success Header */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 rounded-full bg-success/10 flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-12 h-12 text-success" />
          </div>
          <h1 className="text-2xl font-bold text-foreground mb-2">
            Pickup Complete!
          </h1>
          <p className="text-muted-foreground">
            Thank you for recycling with us
          </p>
        </div>

        {/* Invoice */}
        <div className="bg-card rounded-2xl border border-border p-5 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-foreground">Invoice</h3>
            <span className="text-sm text-muted-foreground">#{orderId}</span>
          </div>

          <div className="space-y-3">
            {invoiceItems.map((item, index) => (
              <div key={index} className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-foreground">{item.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {item.quantity} @ {item.rate}
                  </p>
                </div>
                <span className="font-medium text-foreground">₹{item.amount}</span>
              </div>
            ))}
          </div>

          <div className="border-t border-border mt-4 pt-4">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-foreground">Total Paid</span>
              <span className="text-2xl font-bold text-primary">₹{totalAmount}</span>
            </div>
            <p className="text-xs text-muted-foreground mt-1">Paid via Cash</p>
          </div>

          <Button variant="outline" className="w-full mt-4 rounded-xl">
            <Download className="w-4 h-4 mr-2" />
            Download Invoice
          </Button>
        </div>

        {/* Rating */}
        {!submitted ? (
          <div className="bg-card rounded-2xl border border-border p-5 mb-6">
            <h3 className="font-semibold text-foreground mb-4">Rate Your Experience</h3>
            
            <div className="flex justify-center gap-2 mb-4">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onClick={() => setRating(star)}
                  className="p-1 transition-transform hover:scale-110"
                >
                  <Star 
                    className={cn(
                      "w-10 h-10 transition-colors",
                      star <= rating 
                        ? "text-warning fill-warning" 
                        : "text-muted-foreground"
                    )} 
                  />
                </button>
              ))}
            </div>

            <Textarea
              placeholder="Share your feedback (optional)"
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              className="rounded-xl border-2 mb-4"
            />

            <Button 
              onClick={handleSubmitFeedback}
              disabled={rating === 0}
              className="w-full rounded-xl"
            >
              Submit Feedback
            </Button>
          </div>
        ) : (
          <div className="bg-success/10 rounded-2xl p-5 mb-6 text-center">
            <CheckCircle className="w-8 h-8 text-success mx-auto mb-2" />
            <p className="font-medium text-foreground">Thanks for your feedback!</p>
          </div>
        )}

        {/* Google Review CTA */}
        <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-2xl p-5 mb-6 border border-blue-200">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center shadow-sm">
              <span className="text-2xl">G</span>
            </div>
            <div className="flex-1">
              <p className="font-medium text-foreground">Love our service?</p>
              <p className="text-sm text-muted-foreground">Leave us a Google review</p>
            </div>
            <Button size="sm" className="rounded-xl">
              <ExternalLink className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Environmental Impact */}
        <div className="bg-primary/5 rounded-2xl p-5 mb-6 border border-primary/20">
          <h3 className="font-semibold text-foreground mb-3">🌍 Your Impact</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-primary">6.3 kg</p>
              <p className="text-sm text-muted-foreground">Waste Recycled</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-accent">2.1 kg</p>
              <p className="text-sm text-muted-foreground">CO₂ Saved</p>
            </div>
          </div>
        </div>

        {/* Go Home */}
        <Button 
          onClick={onGoHome}
          className="w-full h-14 text-lg font-semibold rounded-2xl"
        >
          Back to Home
        </Button>
      </div>
    </MobileLayout>
  );
};
