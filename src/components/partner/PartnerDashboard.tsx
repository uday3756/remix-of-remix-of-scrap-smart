import React from 'react';
import { Wallet, TrendingUp, MapPin, ChevronRight, Star, Clock, Package } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { MobileLayout, BottomNav, BottomNavItem } from '@/components/ui/MobileLayout';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { mockPartnerData } from '@/data/mockData';
import { cn } from '@/lib/utils';

interface PartnerDashboardProps {
  onViewPickup: (pickupId: string) => void;
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export const PartnerDashboard: React.FC<PartnerDashboardProps> = ({
  onViewPickup,
  activeTab,
  onTabChange,
}) => {
  const partner = mockPartnerData;

  return (
    <MobileLayout className="pb-24" noPadding>
      {/* Header */}
      <div className="gradient-hero px-4 pt-6 pb-8 safe-area-top">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
            <span className="text-white font-bold text-lg">{partner.name.charAt(0)}</span>
          </div>
          <div>
            <p className="text-white/80 text-sm">Welcome back</p>
            <h1 className="text-white font-bold text-lg">{partner.name}</h1>
          </div>
          <div className="ml-auto flex items-center gap-1 bg-white/20 px-3 py-1 rounded-full">
            <Star className="w-4 h-4 text-warning fill-warning" />
            <span className="text-white font-medium">{partner.rating}</span>
          </div>
        </div>

        {/* Earnings Card */}
        <div className="bg-white rounded-2xl p-4 shadow-lg">
          <div className="flex items-center gap-2 mb-4">
            <Wallet className="w-5 h-5 text-primary" />
            <span className="font-semibold text-foreground">Today's Earnings</span>
          </div>
          <div className="flex items-end justify-between">
            <div>
              <p className="text-3xl font-bold text-primary">₹{partner.earnings.today}</p>
              <p className="text-sm text-muted-foreground">{partner.totalPickups} total pickups</p>
            </div>
            <div className="text-right">
              <div className="flex items-center gap-1 text-success">
                <TrendingUp className="w-4 h-4" />
                <span className="text-sm font-medium">+12%</span>
              </div>
              <p className="text-xs text-muted-foreground">vs yesterday</p>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="px-4 -mt-4">
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-card rounded-xl p-4 border border-border">
            <p className="text-sm text-muted-foreground">This Week</p>
            <p className="text-xl font-bold text-foreground">₹{partner.earnings.week}</p>
          </div>
          <div className="bg-card rounded-xl p-4 border border-border">
            <p className="text-sm text-muted-foreground">This Month</p>
            <p className="text-xl font-bold text-foreground">₹{partner.earnings.month}</p>
          </div>
        </div>
      </div>

      {/* Assigned Pickups */}
      <div className="px-4 py-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-semibold text-foreground">Assigned Pickups</h2>
          <span className="text-sm text-muted-foreground">{partner.assignedPickups.length} pending</span>
        </div>

        <div className="space-y-3">
          {partner.assignedPickups.map((pickup) => (
            <button
              key={pickup.id}
              onClick={() => onViewPickup(pickup.id)}
              className="w-full bg-card rounded-2xl border border-border p-4 text-left shadow-sm hover:shadow-card transition-all"
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <p className="font-semibold text-foreground">{pickup.customerName}</p>
                  <p className="text-sm text-muted-foreground">#{pickup.id}</p>
                </div>
                <StatusBadge status={pickup.status as any} />
              </div>

              <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                <Clock className="w-4 h-4" />
                <span>{pickup.date} • {pickup.time}</span>
              </div>

              <div className="flex items-start gap-2 text-sm mb-3">
                <MapPin className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                <span className="text-foreground">{pickup.address}</span>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-border">
                <div className="flex items-center gap-2">
                  <Package className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">
                    {pickup.items.length} items
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-primary">₹{pickup.estimatedAmount}</span>
                  <ChevronRight className="w-4 h-4 text-muted-foreground" />
                </div>
              </div>
            </button>
          ))}
        </div>

        {partner.assignedPickups.length === 0 && (
          <div className="text-center py-12">
            <Package className="w-16 h-16 text-muted-foreground/50 mx-auto mb-4" />
            <p className="text-muted-foreground">No pickups assigned yet</p>
            <p className="text-sm text-muted-foreground">New pickups will appear here</p>
          </div>
        )}
      </div>

      {/* Bottom Navigation */}
      <BottomNav>
        <BottomNavItem
          icon={<svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>}
          label="Dashboard"
          active={activeTab === 'dashboard'}
          onClick={() => onTabChange('dashboard')}
        />
        <BottomNavItem
          icon={<Package className="w-5 h-5" />}
          label="Pickups"
          active={activeTab === 'pickups'}
          onClick={() => onTabChange('pickups')}
        />
        <BottomNavItem
          icon={<Wallet className="w-5 h-5" />}
          label="Earnings"
          active={activeTab === 'earnings'}
          onClick={() => onTabChange('earnings')}
        />
        <BottomNavItem
          icon={<svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>}
          label="Profile"
          active={activeTab === 'profile'}
          onClick={() => onTabChange('profile')}
        />
      </BottomNav>
    </MobileLayout>
  );
};
