import React, { useState } from 'react';
import { Star, MessageSquare, ThumbsUp, ThumbsDown, Calendar } from 'lucide-react';
import { cn } from '@/lib/utils';

const mockFeedback = [
  {
    id: 1,
    customerName: 'Priya Sharma',
    rating: 5,
    comment: 'Excellent service! The partner was very professional and on time.',
    date: '2024-01-20',
    orderId: 'ORD001',
    partnerName: 'Rajesh Kumar',
    sentiment: 'positive',
  },
  {
    id: 2,
    customerName: 'Vikram Patel',
    rating: 4,
    comment: 'Good experience overall. Pricing was fair.',
    date: '2024-01-19',
    orderId: 'ORD002',
    partnerName: 'Suresh Yadav',
    sentiment: 'positive',
  },
  {
    id: 3,
    customerName: 'Anita Reddy',
    rating: 3,
    comment: 'Partner was late by 30 minutes but service was okay.',
    date: '2024-01-18',
    orderId: 'ORD003',
    partnerName: 'Anil Sharma',
    sentiment: 'neutral',
  },
  {
    id: 4,
    customerName: 'Rahul Verma',
    rating: 5,
    comment: 'Best scrap pickup service! Will definitely use again.',
    date: '2024-01-17',
    orderId: 'ORD004',
    partnerName: 'Rajesh Kumar',
    sentiment: 'positive',
  },
];

export const FeedbackRatings: React.FC = () => {
  const [filter, setFilter] = useState<'all' | 'positive' | 'neutral' | 'negative'>('all');

  const avgRating = (mockFeedback.reduce((sum, f) => sum + f.rating, 0) / mockFeedback.length).toFixed(1);
  const totalReviews = mockFeedback.length;
  const positiveCount = mockFeedback.filter(f => f.rating >= 4).length;
  const positivePercent = ((positiveCount / totalReviews) * 100).toFixed(0);

  const filteredFeedback = mockFeedback.filter(f => {
    if (filter === 'all') return true;
    return f.sentiment === filter;
  });

  const ratingDistribution = [5, 4, 3, 2, 1].map(rating => ({
    rating,
    count: mockFeedback.filter(f => f.rating === rating).length,
    percent: (mockFeedback.filter(f => f.rating === rating).length / totalReviews) * 100,
  }));

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">Feedback & Ratings</h1>
        <p className="text-muted-foreground">Customer reviews and satisfaction metrics</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-card rounded-2xl border border-border p-6 text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Star className="w-8 h-8 text-warning fill-warning" />
            <span className="text-4xl font-bold text-foreground">{avgRating}</span>
          </div>
          <p className="text-muted-foreground">Average Rating</p>
        </div>

        <div className="bg-card rounded-2xl border border-border p-6 text-center">
          <MessageSquare className="w-8 h-8 text-primary mx-auto mb-2" />
          <span className="text-4xl font-bold text-foreground">{totalReviews}</span>
          <p className="text-muted-foreground">Total Reviews</p>
        </div>

        <div className="bg-card rounded-2xl border border-border p-6 text-center">
          <ThumbsUp className="w-8 h-8 text-success mx-auto mb-2" />
          <span className="text-4xl font-bold text-foreground">{positivePercent}%</span>
          <p className="text-muted-foreground">Positive Reviews</p>
        </div>
      </div>

      {/* Rating Distribution */}
      <div className="bg-card rounded-2xl border border-border p-6">
        <h2 className="font-semibold text-foreground mb-4">Rating Distribution</h2>
        <div className="space-y-3">
          {ratingDistribution.map(({ rating, count, percent }) => (
            <div key={rating} className="flex items-center gap-3">
              <div className="flex items-center gap-1 w-16">
                <span className="text-sm font-medium text-foreground">{rating}</span>
                <Star className="w-4 h-4 text-warning fill-warning" />
              </div>
              <div className="flex-1 h-3 bg-muted rounded-full overflow-hidden">
                <div 
                  className="h-full bg-warning rounded-full transition-all"
                  style={{ width: `${percent}%` }}
                />
              </div>
              <span className="text-sm text-muted-foreground w-12 text-right">{count}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2">
        {(['all', 'positive', 'neutral', 'negative'] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={cn(
              "px-4 py-2 rounded-xl text-sm font-medium transition-all capitalize",
              filter === f 
                ? "bg-primary text-primary-foreground" 
                : "bg-muted text-muted-foreground hover:text-foreground"
            )}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Reviews List */}
      <div className="space-y-4">
        {filteredFeedback.map((feedback) => (
          <div 
            key={feedback.id}
            className="bg-card rounded-2xl border border-border p-5"
          >
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className="font-semibold text-foreground">{feedback.customerName}</h3>
                <p className="text-sm text-muted-foreground">Order #{feedback.orderId}</p>
              </div>
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i}
                    className={cn(
                      "w-4 h-4",
                      i < feedback.rating 
                        ? "text-warning fill-warning" 
                        : "text-muted-foreground"
                    )}
                  />
                ))}
              </div>
            </div>

            <p className="text-foreground mb-3">{feedback.comment}</p>

            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-4">
                <span className="text-muted-foreground">
                  Partner: <span className="text-foreground">{feedback.partnerName}</span>
                </span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Calendar className="w-4 h-4" />
                {feedback.date}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
