import React from 'react';
import { 
  TrendingUp, 
  TrendingDown, 
  Users, 
  Package, 
  DollarSign, 
  Truck,
  Clock,
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import { mockAdminStats, mockAdminOrders } from '@/data/mockData';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { cn } from '@/lib/utils';

interface AdminDashboardProps {
  onViewOrders: () => void;
  onViewPartners: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  onViewOrders,
  onViewPartners,
}) => {
  const stats = mockAdminStats;

  const statCards = [
    { 
      label: 'Total Pickups', 
      value: stats.totalPickups.toLocaleString(), 
      icon: Package, 
      trend: '+12%',
      trendUp: true,
      color: 'bg-primary/10 text-primary' 
    },
    { 
      label: 'Active Users', 
      value: stats.activeUsers.toLocaleString(), 
      icon: Users, 
      trend: '+8%',
      trendUp: true,
      color: 'bg-accent/10 text-accent' 
    },
    { 
      label: 'Active Partners', 
      value: stats.activePartners, 
      icon: Truck, 
      trend: '+3',
      trendUp: true,
      color: 'bg-warning/10 text-warning' 
    },
    { 
      label: 'Today Revenue', 
      value: `₹${stats.revenue.today.toLocaleString()}`, 
      icon: DollarSign, 
      trend: '+15%',
      trendUp: true,
      color: 'bg-success/10 text-success' 
    },
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground">Welcome back! Here's what's happening today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((stat, index) => (
          <div key={index} className="bg-card rounded-2xl border border-border p-5 hover:shadow-card transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center", stat.color)}>
                <stat.icon className="w-5 h-5" />
              </div>
              <div className={cn(
                "flex items-center gap-1 text-sm font-medium",
                stat.trendUp ? "text-success" : "text-destructive"
              )}>
                {stat.trendUp ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                {stat.trend}
              </div>
            </div>
            <p className="text-2xl font-bold text-foreground">{stat.value}</p>
            <p className="text-sm text-muted-foreground">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Quick Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-card rounded-2xl border border-border p-5">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-warning/10 flex items-center justify-center">
              <Clock className="w-5 h-5 text-warning" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{stats.pendingRequests}</p>
              <p className="text-sm text-muted-foreground">Pending Requests</p>
            </div>
          </div>
          <button 
            onClick={onViewOrders}
            className="text-sm text-primary font-medium hover:underline"
          >
            View all →
          </button>
        </div>

        <div className="bg-card rounded-2xl border border-border p-5">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-success/10 flex items-center justify-center">
              <CheckCircle className="w-5 h-5 text-success" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{stats.completedToday}</p>
              <p className="text-sm text-muted-foreground">Completed Today</p>
            </div>
          </div>
        </div>

        <div className="bg-card rounded-2xl border border-border p-5">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
              <DollarSign className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">₹{stats.revenue.month.toLocaleString()}</p>
              <p className="text-sm text-muted-foreground">Monthly Revenue</p>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Orders */}
      <div className="bg-card rounded-2xl border border-border p-5">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-foreground">Recent Orders</h2>
          <button 
            onClick={onViewOrders}
            className="text-sm text-primary font-medium hover:underline"
          >
            View all
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Order ID</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Customer</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Date</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Amount</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Status</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Partner</th>
              </tr>
            </thead>
            <tbody>
              {mockAdminOrders.map((order) => (
                <tr key={order.id} className="border-b border-border hover:bg-muted/50">
                  <td className="py-3 px-4 font-medium text-foreground">{order.id}</td>
                  <td className="py-3 px-4">
                    <div>
                      <p className="text-foreground">{order.customerName}</p>
                      <p className="text-sm text-muted-foreground">{order.customerPhone}</p>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-muted-foreground">{order.date}</td>
                  <td className="py-3 px-4 font-medium text-foreground">₹{order.estimatedAmount}</td>
                  <td className="py-3 px-4">
                    <StatusBadge status={order.status as any} />
                  </td>
                  <td className="py-3 px-4 text-muted-foreground">
                    {order.partner?.name || (
                      <span className="text-warning">Unassigned</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
