import React, { useState } from 'react';
import { ArrowLeft, Search, TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { MobileLayout, MobileHeader, BottomNav, BottomNavItem } from '@/components/ui/MobileLayout';
import { scrapRates, scrapCategories } from '@/data/mockData';
import { cn } from '@/lib/utils';
import { Package } from 'lucide-react';

interface ScrapPricingProps {
  onBack: () => void;
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export const ScrapPricing: React.FC<ScrapPricingProps> = ({
  onBack,
  activeTab,
  onTabChange,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');

  const filteredRates = scrapRates.filter((rate) => {
    const matchesSearch = rate.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = !selectedCategory || rate.category.toLowerCase() === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Mock trend data
  const getTrend = (id: number) => {
    if (id % 3 === 0) return 'up';
    if (id % 3 === 1) return 'down';
    return 'stable';
  };

  return (
    <MobileLayout className="pb-24" noPadding>
      <div className="px-4">
        <MobileHeader
          leftAction={
            <button onClick={onBack}>
              <ArrowLeft className="w-6 h-6 text-foreground" />
            </button>
          }
          title="Scrap Rates"
          subtitle="Updated daily"
        />
      </div>

      <div className="px-4 py-4 space-y-4 animate-fade-in">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input
            placeholder="Search scrap items..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 h-12 rounded-xl"
          />
        </div>

        {/* Categories */}
        <div className="flex gap-2 overflow-x-auto pb-2 -mx-4 px-4">
          <button
            onClick={() => setSelectedCategory('')}
            className={cn(
              "px-4 py-2 rounded-full whitespace-nowrap transition-all border",
              !selectedCategory
                ? "bg-primary text-primary-foreground border-primary"
                : "bg-card border-border text-foreground"
            )}
          >
            All
          </button>
          {scrapCategories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={cn(
                "px-4 py-2 rounded-full whitespace-nowrap transition-all border flex items-center gap-2",
                selectedCategory === cat.id
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-card border-border text-foreground"
              )}
            >
              <span>{cat.icon}</span>
              {cat.name}
            </button>
          ))}
        </div>

        {/* Rates List */}
        <div className="space-y-2">
          {filteredRates.map((rate) => {
            const trend = getTrend(rate.id);
            return (
              <div
                key={rate.id}
                className="flex items-center justify-between p-4 bg-card rounded-2xl border border-border"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center text-2xl">
                    {rate.icon}
                  </div>
                  <div>
                    <p className="font-medium text-foreground">{rate.name}</p>
                    <p className="text-sm text-muted-foreground">{rate.category}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-2">
                    <p className="text-xl font-bold text-primary">₹{rate.rate}</p>
                    <span className="text-sm text-muted-foreground">/{rate.unit}</span>
                  </div>
                  <div className={cn(
                    "flex items-center gap-1 text-sm justify-end",
                    trend === 'up' && "text-success",
                    trend === 'down' && "text-destructive",
                    trend === 'stable' && "text-muted-foreground"
                  )}>
                    {trend === 'up' && <TrendingUp className="w-4 h-4" />}
                    {trend === 'down' && <TrendingDown className="w-4 h-4" />}
                    {trend === 'stable' && <Minus className="w-4 h-4" />}
                    <span>
                      {trend === 'up' && '+5%'}
                      {trend === 'down' && '-3%'}
                      {trend === 'stable' && 'Stable'}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {filteredRates.length === 0 && (
          <div className="text-center py-12">
            <Package className="w-16 h-16 text-muted-foreground/50 mx-auto mb-4" />
            <p className="text-muted-foreground">No items found</p>
          </div>
        )}

        {/* Info Note */}
        <div className="p-4 bg-primary/5 rounded-2xl border border-primary/20">
          <p className="text-sm text-muted-foreground">
            <strong className="text-foreground">Note:</strong> Rates are subject to change based on market conditions. 
            Final price will be determined after weighing at pickup.
          </p>
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
          icon={<Package className="w-5 h-5" />}
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
