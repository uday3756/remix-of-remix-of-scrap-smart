import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Plus, 
  Package, 
  Clock, 
  CheckCircle2, 
  Truck,
  ChevronRight,
  Leaf,
  IndianRupee
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { MobileLayout, MobileHeader } from '@/components/ui/MobileLayout';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { StatusBadge } from '@/components/ui/StatusBadge';
import kabadiLogo from '@/assets/kabadi-logo.png';

interface Order {
  id: string;
  scrap_type: string;
  status: string;
  pickup_date: string;
  pickup_time: string;
  address: string;
  created_at: string;
}

interface UserDashboardProps {
  onCreatePickup: () => void;
  onViewOrder: (orderId: string) => void;
  onViewAllOrders: () => void;
}

export const UserDashboard: React.FC<UserDashboardProps> = ({
  onCreatePickup,
  onViewOrder,
  onViewAllOrders,
}) => {
  const { user } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    pending: 0,
    completed: 0,
    totalEarnings: 0,
  });

  useEffect(() => {
    fetchOrders();
    
    // Subscribe to realtime updates
    const channel = supabase
      .channel('orders-realtime')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'orders',
          filter: `user_id=eq.${user?.id}`,
        },
        () => {
          fetchOrders();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [user?.id]);

  const fetchOrders = async () => {
    if (!user?.id) return;
    
    try {
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(5);

      if (error) throw error;

      setOrders(data || []);

      // Calculate stats
      const allOrders = data || [];
      const pending = allOrders.filter(o => o.status === 'pending' || o.status === 'accepted' || o.status === 'on_the_way').length;
      const completed = allOrders.filter(o => o.status === 'completed').length;
      const totalEarnings = allOrders
        .filter(o => o.status === 'completed')
        .reduce((sum, o) => sum + (parseFloat(String(o.final_amount || '0'))), 0);

      setStats({ pending, completed, totalEarnings });
    } catch (error) {
      console.error('Error fetching orders:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <Clock className="w-4 h-4" />;
      case 'accepted':
        return <Package className="w-4 h-4" />;
      case 'on_the_way':
        return <Truck className="w-4 h-4" />;
      case 'completed':
        return <CheckCircle2 className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  const userName = user?.user_metadata?.name || 'User';

  return (
    <MobileLayout>
      <MobileHeader
        centerContent={
          <img src={kabadiLogo} alt="Logo" className="h-8 w-auto" />
        }
      />

      <div className="pb-8 space-y-6">
        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-1"
        >
          <h1 className="text-2xl font-bold text-foreground">
            Welcome back! 👋
          </h1>
          <p className="text-muted-foreground">
            Ready to recycle and earn today?
          </p>
        </motion.div>

        {/* Create Pickup Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Button
            onClick={onCreatePickup}
            className="w-full h-14 text-lg font-semibold rounded-2xl shadow-card gradient-primary"
          >
            <Plus className="w-5 h-5 mr-2" />
            Create Scrap Pickup Request
          </Button>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-3 gap-3"
        >
          <Card className="p-4 text-center rounded-2xl border-none shadow-card">
            <div className="w-10 h-10 rounded-xl bg-warning/10 flex items-center justify-center mx-auto mb-2">
              <Clock className="w-5 h-5 text-warning" />
            </div>
            <p className="text-2xl font-bold text-foreground">{stats.pending}</p>
            <p className="text-xs text-muted-foreground">Pending</p>
          </Card>

          <Card className="p-4 text-center rounded-2xl border-none shadow-card">
            <div className="w-10 h-10 rounded-xl bg-success/10 flex items-center justify-center mx-auto mb-2">
              <CheckCircle2 className="w-5 h-5 text-success" />
            </div>
            <p className="text-2xl font-bold text-foreground">{stats.completed}</p>
            <p className="text-xs text-muted-foreground">Completed</p>
          </Card>

          <Card className="p-4 text-center rounded-2xl border-none shadow-card">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-2">
              <IndianRupee className="w-5 h-5 text-primary" />
            </div>
            <p className="text-2xl font-bold text-foreground">₹{stats.totalEarnings}</p>
            <p className="text-xs text-muted-foreground">Earned</p>
          </Card>
        </motion.div>

        {/* Recent Orders */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="space-y-4"
        >
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-foreground">Recent Requests</h2>
            {orders.length > 0 && (
              <button
                onClick={onViewAllOrders}
                className="text-sm text-primary font-medium flex items-center"
              >
                View All
                <ChevronRight className="w-4 h-4 ml-1" />
              </button>
            )}
          </div>

          {loading ? (
            <div className="space-y-3">
              {[1, 2, 3].map((i) => (
                <Card key={i} className="p-4 rounded-2xl border-none animate-pulse">
                  <div className="h-4 bg-muted rounded w-1/2 mb-2" />
                  <div className="h-3 bg-muted rounded w-3/4" />
                </Card>
              ))}
            </div>
          ) : orders.length === 0 ? (
            <Card className="p-8 rounded-2xl border-none text-center">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <Leaf className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">No pickups yet</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Create your first scrap pickup request to start earning!
              </p>
              <Button onClick={onCreatePickup} variant="outline" className="rounded-xl">
                Create Pickup
              </Button>
            </Card>
          ) : (
            <div className="space-y-3">
              {orders.map((order, index) => (
                <motion.div
                  key={order.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card
                    className="p-4 rounded-2xl border-none shadow-sm cursor-pointer hover:shadow-md transition-shadow"
                    onClick={() => onViewOrder(order.id)}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-medium text-foreground capitalize">
                            {order.scrap_type.replace('_', ' ')}
                          </span>
                          <StatusBadge status={order.status as any} />
                        </div>
                        <p className="text-sm text-muted-foreground truncate">
                          {order.address}
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {new Date(order.pickup_date).toLocaleDateString()} • {order.pickup_time}
                        </p>
                      </div>
                      <ChevronRight className="w-5 h-5 text-muted-foreground mt-1" />
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>

        {/* Eco Tips */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="p-4 rounded-2xl border-none bg-primary/5">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                <Leaf className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="font-medium text-foreground mb-1">Eco Tip</h3>
                <p className="text-sm text-muted-foreground">
                  Separate your scrap by type (paper, metal, plastic) to get better rates and help in efficient recycling!
                </p>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </MobileLayout>
  );
};
