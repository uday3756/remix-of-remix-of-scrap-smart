import React, { useState } from 'react';
import { ArrowLeft, Star, ThumbsUp, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { MobileLayout, MobileHeader } from '@/components/ui/MobileLayout';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

interface OrderRatingProps {
  orderId: string;
  partnerName: string;
  onBack: () => void;
  onSubmit: () => void;
}

const quickFeedback = [
  'Professional',
  'On Time',
  'Fair Pricing',
  'Friendly',
  'Clean Process',
  'Good Communication',
];

export const OrderRating: React.FC<OrderRatingProps> = ({
  orderId,
  partnerName,
  onBack,
  onSubmit,
}) => {
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [feedback, setFeedback] = useState('');

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const handleSubmit = () => {
    if (rating === 0) {
      toast.error('Please select a rating');
      return;
    }
    toast.success('Thank you for your feedback!');
    onSubmit();
  };

  const getRatingText = (r: number) => {
    switch (r) {
      case 1: return 'Poor';
      case 2: return 'Fair';
      case 3: return 'Good';
      case 4: return 'Very Good';
      case 5: return 'Excellent!';
      default: return 'Tap to rate';
    }
  };

  return (
    <MobileLayout>
      <MobileHeader
        leftAction={
          <button onClick={onBack}>
            <ArrowLeft className="w-6 h-6 text-foreground" />
          </button>
        }
        title="Rate Your Experience"
        subtitle={`Order #${orderId}`}
      />

      <div className="py-6 space-y-8 animate-fade-in">
        {/* Partner Info */}
        <div className="text-center">
          <div className="w-20 h-20 rounded-full gradient-primary mx-auto flex items-center justify-center mb-4">
            <span className="text-3xl font-bold text-white">
              {partnerName.charAt(0)}
            </span>
          </div>
          <p className="text-lg font-semibold text-foreground">{partnerName}</p>
          <p className="text-muted-foreground">Pickup Partner</p>
        </div>

        {/* Star Rating */}
        <div className="text-center">
          <p className="text-muted-foreground mb-4">How was your experience?</p>
          <div className="flex justify-center gap-2 mb-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                onMouseEnter={() => setHoveredRating(star)}
                onMouseLeave={() => setHoveredRating(0)}
                onClick={() => setRating(star)}
                className="p-1 transition-transform hover:scale-110"
              >
                <Star
                  className={cn(
                    "w-10 h-10 transition-colors",
                    (hoveredRating || rating) >= star
                      ? "text-warning fill-warning"
                      : "text-muted-foreground"
                  )}
                />
              </button>
            ))}
          </div>
          <p className={cn(
            "text-lg font-medium transition-colors",
            rating > 0 ? "text-primary" : "text-muted-foreground"
          )}>
            {getRatingText(hoveredRating || rating)}
          </p>
        </div>

        {/* Quick Feedback Tags */}
        {rating > 0 && (
          <div className="animate-fade-in">
            <p className="text-foreground font-medium mb-3 text-center">
              What did you like?
            </p>
            <div className="flex flex-wrap gap-2 justify-center">
              {quickFeedback.map((tag) => (
                <button
                  key={tag}
                  onClick={() => toggleTag(tag)}
                  className={cn(
                    "px-4 py-2 rounded-full text-sm font-medium transition-all border",
                    selectedTags.includes(tag)
                      ? "bg-primary text-primary-foreground border-primary"
                      : "bg-card border-border text-foreground hover:border-primary"
                  )}
                >
                  {selectedTags.includes(tag) && (
                    <ThumbsUp className="w-4 h-4 inline mr-2" />
                  )}
                  {tag}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Written Feedback */}
        {rating > 0 && (
          <div className="animate-fade-in">
            <p className="text-foreground font-medium mb-3">
              Additional comments (optional)
            </p>
            <Textarea
              placeholder="Share more about your experience..."
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              className="min-h-[100px] rounded-xl"
            />
          </div>
        )}

        {/* Submit Button */}
        <Button
          onClick={handleSubmit}
          disabled={rating === 0}
          className="w-full h-14 text-lg font-semibold rounded-2xl gradient-primary text-white border-0"
        >
          <Send className="w-5 h-5 mr-2" />
          Submit Rating
        </Button>

        {/* Skip Option */}
        <button
          onClick={onSubmit}
          className="w-full text-center text-muted-foreground hover:text-foreground transition-colors"
        >
          Skip for now
        </button>
      </div>
    </MobileLayout>
  );
};
