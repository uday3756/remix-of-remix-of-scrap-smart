import React, { useState } from 'react';
import { ArrowLeft, Tag, Copy, Check, Clock, Percent, Gift } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { MobileLayout, MobileHeader } from '@/components/ui/MobileLayout';
import { mockCoupons } from '@/data/mockData';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

interface CustomerCouponsProps {
  onBack: () => void;
}

export const CustomerCoupons: React.FC<CustomerCouponsProps> = ({ onBack }) => {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    toast.success('Coupon code copied!');
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const activeCoupons = mockCoupons.filter(c => !c.used);
  const usedCoupons = mockCoupons.filter(c => c.used);

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'new_user': return <Gift className="w-5 h-5" />;
      case 'category_bonus': return <Percent className="w-5 h-5" />;
      default: return <Tag className="w-5 h-5" />;
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
        title="My Coupons"
      />

      <div className="py-4 space-y-6 animate-fade-in">
        {/* Active Coupons */}
        <div>
          <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
            <Tag className="w-5 h-5 text-primary" />
            Active Coupons ({activeCoupons.length})
          </h3>
          <div className="space-y-3">
            {activeCoupons.map((coupon) => (
              <div
                key={coupon.id}
                className="p-4 bg-card rounded-2xl border-2 border-dashed border-primary/50 relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-16 h-16 gradient-primary opacity-10 rounded-bl-full" />
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                      {getCategoryIcon(coupon.category)}
                    </div>
                    <div>
                      <p className="font-bold text-primary text-lg">
                        {coupon.discountType === 'flat' ? `₹${coupon.discount}` : `${coupon.discount}%`} OFF
                      </p>
                      <p className="text-xs text-muted-foreground">Min. ₹{coupon.minAmount}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => handleCopy(coupon.code)}
                    className="flex items-center gap-1 px-3 py-1.5 bg-primary/10 rounded-lg text-primary text-sm font-medium"
                  >
                    {copiedCode === coupon.code ? (
                      <Check className="w-4 h-4" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                    {coupon.code}
                  </button>
                </div>
                <p className="text-foreground mb-2">{coupon.description}</p>
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <Clock className="w-4 h-4" />
                  Valid till {coupon.validTill}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Used Coupons */}
        {usedCoupons.length > 0 && (
          <div>
            <h3 className="font-semibold text-muted-foreground mb-4">Used Coupons</h3>
            <div className="space-y-3">
              {usedCoupons.map((coupon) => (
                <div
                  key={coupon.id}
                  className="p-4 bg-muted rounded-2xl border border-border opacity-60"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-muted-foreground line-through">{coupon.code}</p>
                      <p className="text-sm text-muted-foreground">{coupon.description}</p>
                    </div>
                    <span className="text-xs px-2 py-1 bg-muted-foreground/20 rounded-full text-muted-foreground">
                      Used
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Empty State */}
        {activeCoupons.length === 0 && usedCoupons.length === 0 && (
          <div className="text-center py-12">
            <Tag className="w-16 h-16 text-muted-foreground/50 mx-auto mb-4" />
            <p className="text-muted-foreground">No coupons available</p>
            <p className="text-sm text-muted-foreground">Check back later for exciting offers!</p>
          </div>
        )}
      </div>
    </MobileLayout>
  );
};
