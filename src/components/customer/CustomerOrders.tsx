import React, { useState } from 'react';
import { ArrowLeft, Package, ChevronRight, Star, Calendar, MapPin } from 'lucide-react';
import { MobileLayout, MobileHeader, BottomNav, BottomNavItem } from '@/components/ui/MobileLayout';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { mockOrders } from '@/data/mockData';
import { cn } from '@/lib/utils';

interface CustomerOrdersProps {
  onBack: () => void;
  onViewOrder: (orderId: string) => void;
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export const CustomerOrders: React.FC<CustomerOrdersProps> = ({
  onBack,
  onViewOrder,
  activeTab,
  onTabChange,
}) => {
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');

  const filteredOrders = mockOrders.filter((order) => {
    if (filter === 'active') return order.status !== 'completed';
    if (filter === 'completed') return order.status === 'completed';
    return true;
  });

  return (
    <MobileLayout className="pb-24" noPadding>
      <div className="px-4">
        <MobileHeader
          leftAction={
            <button onClick={onBack}>
              <ArrowLeft className="w-6 h-6 text-foreground" />
            </button>
          }
          title="My Orders"
        />
      </div>

      <div className="px-4 py-4 space-y-4 animate-fade-in">
        {/* Filter Tabs */}
        <div className="flex gap-2 p-1 bg-muted rounded-xl">
          {[
            { key: 'all', label: 'All' },
            { key: 'active', label: 'Active' },
            { key: 'completed', label: 'Completed' },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setFilter(tab.key as any)}
              className={cn(
                "flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all",
                filter === tab.key
                  ? "bg-card shadow-sm text-foreground"
                  : "text-muted-foreground"
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Orders List */}
        <div className="space-y-3">
          {filteredOrders.map((order) => (
            <button
              key={order.id}
              onClick={() => onViewOrder(order.id)}
              className="w-full p-4 bg-card rounded-2xl border border-border text-left hover:shadow-card transition-all"
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <p className="font-semibold text-foreground">#{order.id}</p>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                    <Calendar className="w-4 h-4" />
                    <span>{order.date}</span>
                    <span>•</span>
                    <span>{order.time}</span>
                  </div>
                </div>
                <StatusBadge status={order.status as any} />
              </div>

              {order.address && (
                <div className="flex items-start gap-2 text-sm text-muted-foreground mb-3">
                  <MapPin className="w-4 h-4 shrink-0 mt-0.5" />
                  <span className="line-clamp-1">{order.address}</span>
                </div>
              )}

              <div className="flex flex-wrap gap-2 mb-3">
                {order.items.slice(0, 3).map((item, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-muted rounded-lg text-xs text-muted-foreground"
                  >
                    {item}
                  </span>
                ))}
                {order.items.length > 3 && (
                  <span className="px-2 py-1 bg-muted rounded-lg text-xs text-muted-foreground">
                    +{order.items.length - 3} more
                  </span>
                )}
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-border">
                {order.partner && (
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                      <span className="text-sm font-medium text-primary">
                        {order.partner.name.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">{order.partner.name}</p>
                      <div className="flex items-center gap-1">
                        <Star className="w-3 h-3 text-warning fill-warning" />
                        <span className="text-xs text-muted-foreground">{order.partner.rating}</span>
                      </div>
                    </div>
                  </div>
                )}
                <div className="flex items-center gap-2">
                  <p className="font-bold text-primary">
                    ₹{order.totalAmount || order.estimatedAmount}
                  </p>
                  <ChevronRight className="w-5 h-5 text-muted-foreground" />
                </div>
              </div>
            </button>
          ))}
        </div>

        {filteredOrders.length === 0 && (
          <div className="text-center py-12">
            <Package className="w-16 h-16 text-muted-foreground/50 mx-auto mb-4" />
            <p className="text-muted-foreground">No orders found</p>
            <p className="text-sm text-muted-foreground">
              {filter === 'active' ? 'No active orders right now' : 'Create your first pickup!'}
            </p>
          </div>
        )}
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
