import React from 'react';
import { MapPin, Plus, Clock, History, Bell, ChevronRight, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { MobileLayout, BottomNav, BottomNavItem } from '@/components/ui/MobileLayout';
import { RateCard } from '@/components/ui/ScrapCard';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { scrapRates, mockOrders } from '@/data/mockData';
import { cn } from '@/lib/utils';

interface HomeScreenProps {
  onCreatePickup: () => void;
  onViewOrder: (orderId: string) => void;
  onViewHistory: () => void;
  onViewRates: () => void;
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  onCreatePickup,
  onViewOrder,
  onViewHistory,
  onViewRates,
  activeTab,
  onTabChange,
}) => {
  const currentOrder = mockOrders.find(o => o.status !== 'completed');
  const topRates = scrapRates.slice(0, 4);

  return (
    <MobileLayout className="pb-24" noPadding>
      {/* Header */}
      <div className="px-4 pt-4 pb-2 safe-area-top">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full gradient-primary flex items-center justify-center">
              <span className="text-white font-bold">R</span>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Good morning</p>
              <p className="font-semibold text-foreground">Rahul!</p>
            </div>
          </div>
          <button className="w-10 h-10 rounded-full bg-muted flex items-center justify-center relative">
            <Bell className="w-5 h-5 text-foreground" />
            <span className="absolute top-2 right-2 w-2 h-2 bg-destructive rounded-full" />
          </button>
        </div>

        {/* Location */}
        <button className="flex items-center gap-2 mt-4 px-3 py-2 bg-muted rounded-xl">
          <MapPin className="w-4 h-4 text-primary" />
          <span className="text-sm text-foreground">Andheri West, Mumbai</span>
          <ChevronRight className="w-4 h-4 text-muted-foreground ml-auto" />
        </button>
      </div>

      {/* Main Content */}
      <div className="px-4 py-4 space-y-6 animate-fade-in">
        {/* Create Pickup CTA */}
        <div className="gradient-primary rounded-3xl p-6 text-white relative overflow-hidden">
          <div className="relative z-10">
            <h2 className="text-xl font-bold mb-2">Schedule a Pickup</h2>
            <p className="text-white/80 text-sm mb-4">
              Get best prices for your scrap
            </p>
            <Button 
              onClick={onCreatePickup}
              className="bg-white text-primary hover:bg-white/90 font-semibold rounded-xl"
            >
              <Plus className="w-4 h-4 mr-2" />
              Create Pickup
            </Button>
          </div>
          {/* Decorative circles */}
          <div className="absolute -right-8 -top-8 w-32 h-32 bg-white/10 rounded-full" />
          <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-white/10 rounded-full" />
        </div>

        {/* Current Order */}
        {currentOrder && (
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-foreground">Current Order</h3>
              <button 
                onClick={() => onViewOrder(currentOrder.id)}
                className="text-sm text-primary font-medium"
              >
                Track
              </button>
            </div>
            <button 
              onClick={() => onViewOrder(currentOrder.id)}
              className="w-full p-4 bg-card rounded-2xl border border-border shadow-card text-left"
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <p className="font-semibold text-foreground">#{currentOrder.id}</p>
                  <p className="text-sm text-muted-foreground">
                    {currentOrder.date} • {currentOrder.time}
                  </p>
                </div>
                <StatusBadge status={currentOrder.status as any} />
              </div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-sm">{currentOrder.partner?.name.charAt(0)}</span>
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-foreground">{currentOrder.partner?.name}</p>
                  <div className="flex items-center gap-1">
                    <Star className="w-3 h-3 text-warning fill-warning" />
                    <span className="text-xs text-muted-foreground">{currentOrder.partner?.rating}</span>
                  </div>
                </div>
                <p className="text-primary font-bold">₹{currentOrder.estimatedAmount}</p>
              </div>
            </button>
          </div>
        )}

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-3">
          <button 
            onClick={onViewHistory}
            className="p-4 bg-card rounded-2xl border border-border flex items-center gap-3"
          >
            <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
              <History className="w-5 h-5 text-accent" />
            </div>
            <span className="font-medium text-foreground">Order History</span>
          </button>
          <button 
            onClick={onViewRates}
            className="p-4 bg-card rounded-2xl border border-border flex items-center gap-3"
          >
            <div className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center">
              <Clock className="w-5 h-5 text-secondary-foreground" />
            </div>
            <span className="font-medium text-foreground">Scrap Rates</span>
          </button>
        </div>

        {/* Live Rates */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold text-foreground">Live Scrap Rates</h3>
            <button onClick={onViewRates} className="text-sm text-primary font-medium">
              View All
            </button>
          </div>
          <div className="space-y-2">
            {topRates.map((rate) => (
              <RateCard
                key={rate.id}
                name={rate.name}
                rate={rate.rate}
                unit={rate.unit}
                icon={rate.icon}
                trend="stable"
              />
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <BottomNav>
        <BottomNavItem
          icon={<svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>}
          label="Home"
          active={activeTab === 'home'}
          onClick={() => onTabChange('home')}
        />
        <BottomNavItem
          icon={<Clock className="w-5 h-5" />}
          label="Orders"
          active={activeTab === 'orders'}
          onClick={() => onTabChange('orders')}
        />
        <BottomNavItem
          icon={<svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>}
          label="Rates"
          active={activeTab === 'rates'}
          onClick={() => onTabChange('rates')}
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
