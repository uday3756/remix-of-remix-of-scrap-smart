import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, 
  MapPin, 
  Calendar, 
  Clock, 
  Phone,
  User,
  Package,
  Truck,
  CheckCircle2,
  Navigation
} from 'lucide-react';
import { Card } from '@/components/ui/card';
import { MobileLayout, MobileHeader } from '@/components/ui/MobileLayout';
import { StatusBadge, StatusType } from '@/components/ui/StatusBadge';
import { supabase } from '@/integrations/supabase/client';

interface OrderTrackingProps {
  orderId: string;
  onBack: () => void;
}

interface Order {
  id: string;
  scrap_type: string;
  weight: string;
  status: string;
  pickup_date: string;
  pickup_time: string;
  address: string;
  latitude: number;
  longitude: number;
  notes: string;
  images: string[];
  estimated_amount: number | null;
  final_amount: number | null;
  created_at: string;
}

const statusSteps = [
  { status: 'pending', label: 'Request Placed', icon: Package },
  { status: 'accepted', label: 'Accepted', icon: CheckCircle2 },
  { status: 'on_the_way', label: 'On the Way', icon: Truck },
  { status: 'completed', label: 'Completed', icon: CheckCircle2 },
];

export const OrderTracking: React.FC<OrderTrackingProps> = ({ orderId, onBack }) => {
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrder();

    // Subscribe to realtime updates
    const channel = supabase
      .channel(`order-${orderId}`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'orders',
          filter: `id=eq.${orderId}`,
        },
        (payload) => {
          setOrder(payload.new as Order);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [orderId]);

  const fetchOrder = async () => {
    try {
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .eq('id', orderId)
        .single();

      if (error) throw error;
      setOrder(data);
    } catch (error) {
      console.error('Error fetching order:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStepStatus = (stepStatus: string) => {
    if (!order) return 'upcoming';
    
    const statusOrder = ['pending', 'accepted', 'on_the_way', 'completed'];
    const currentIndex = statusOrder.indexOf(order.status);
    const stepIndex = statusOrder.indexOf(stepStatus);

    if (stepIndex < currentIndex) return 'completed';
    if (stepIndex === currentIndex) return 'current';
    return 'upcoming';
  };

  if (loading) {
    return (
      <MobileLayout>
        <div className="flex items-center justify-center min-h-screen">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
        </div>
      </MobileLayout>
    );
  }

  if (!order) {
    return (
      <MobileLayout>
        <MobileHeader
          title="Order Not Found"
          leftAction={
            <button onClick={onBack}>
              <ArrowLeft className="w-6 h-6 text-foreground" />
            </button>
          }
        />
        <div className="py-8 text-center">
          <p className="text-muted-foreground">Order not found</p>
        </div>
      </MobileLayout>
    );
  }

  return (
    <MobileLayout>
      <MobileHeader
        title="Track Order"
        leftAction={
          <button onClick={onBack}>
            <ArrowLeft className="w-6 h-6 text-foreground" />
          </button>
        }
      />

      <div className="py-4 space-y-6">
        {/* Status Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between"
        >
          <div>
            <h2 className="text-xl font-bold text-foreground capitalize">
              {order.scrap_type.replace('_', ' ')} Pickup
            </h2>
            <p className="text-sm text-muted-foreground">
              Order #{order.id.slice(0, 8).toUpperCase()}
            </p>
          </div>
          <StatusBadge status={order.status as StatusType} />
        </motion.div>

        {/* Progress Tracker */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="p-5 rounded-2xl border-none shadow-card">
            <div className="space-y-0">
              {statusSteps.map((step, index) => {
                const stepState = getStepStatus(step.status);
                const Icon = step.icon;
                
                return (
                  <div key={step.status} className="flex items-start gap-4">
                    <div className="flex flex-col items-center">
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          stepState === 'completed'
                            ? 'bg-success text-success-foreground'
                            : stepState === 'current'
                            ? 'bg-primary text-primary-foreground'
                            : 'bg-muted text-muted-foreground'
                        }`}
                      >
                        <Icon className="w-5 h-5" />
                      </div>
                      {index < statusSteps.length - 1 && (
                        <div
                          className={`w-0.5 h-8 ${
                            stepState === 'completed' ? 'bg-success' : 'bg-border'
                          }`}
                        />
                      )}
                    </div>
                    <div className="pt-2">
                      <p
                        className={`font-medium ${
                          stepState === 'upcoming' ? 'text-muted-foreground' : 'text-foreground'
                        }`}
                      >
                        {step.label}
                      </p>
                      {stepState === 'current' && (
                        <p className="text-xs text-primary mt-0.5">In Progress</p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>
        </motion.div>

        {/* Order Details */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="p-5 rounded-2xl border-none shadow-sm">
            <h3 className="font-semibold text-foreground mb-4">Pickup Details</h3>
            
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                  <Calendar className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Date</p>
                  <p className="text-sm font-medium text-foreground">
                    {new Date(order.pickup_date).toLocaleDateString('en-IN', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                  <Clock className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Time Slot</p>
                  <p className="text-sm font-medium text-foreground">{order.pickup_time}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                  <MapPin className="w-4 h-4 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="text-xs text-muted-foreground">Address</p>
                  <p className="text-sm font-medium text-foreground">{order.address}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                  <Package className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Weight (Approx)</p>
                  <p className="text-sm font-medium text-foreground capitalize">
                    {order.weight.replace(/_/g, ' ')}
                  </p>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Images */}
        {order.images && order.images.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card className="p-5 rounded-2xl border-none shadow-sm">
              <h3 className="font-semibold text-foreground mb-3">Uploaded Images</h3>
              <div className="flex gap-2 overflow-x-auto pb-2">
                {order.images.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={`Scrap ${index + 1}`}
                    className="w-20 h-20 rounded-xl object-cover shrink-0"
                  />
                ))}
              </div>
            </Card>
          </motion.div>
        )}

        {/* Estimated Amount */}
        {order.estimated_amount && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card className="p-5 rounded-2xl border-none bg-primary/5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Estimated Amount</p>
                  <p className="text-2xl font-bold text-foreground">₹{order.estimated_amount}</p>
                </div>
                <div className="text-right text-xs text-muted-foreground">
                  Final amount may vary<br />based on actual weight
                </div>
              </div>
            </Card>
          </motion.div>
        )}

        {/* Notes */}
        {order.notes && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <Card className="p-5 rounded-2xl border-none shadow-sm">
              <h3 className="font-semibold text-foreground mb-2">Notes</h3>
              <p className="text-sm text-muted-foreground">{order.notes}</p>
            </Card>
          </motion.div>
        )}
      </div>
    </MobileLayout>
  );
};
