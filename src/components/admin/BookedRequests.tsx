import React, { useState } from 'react';
import { Search, Filter, ChevronDown, MapPin, Phone, User, UserPlus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { mockAdminOrders, mockPartners } from '@/data/mockData';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { cn } from '@/lib/utils';

interface BookedRequestsProps {
  onAssignPartner: (orderId: string, partnerId: string) => void;
}

export const BookedRequests: React.FC<BookedRequestsProps> = ({
  onAssignPartner,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedOrder, setSelectedOrder] = useState<string | null>(null);

  const filteredOrders = mockAdminOrders.filter(order => {
    const matchesSearch = order.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleAssign = (orderId: string, partnerId: string) => {
    onAssignPartner(orderId, partnerId);
    setSelectedOrder(null);
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Booked Requests</h1>
          <p className="text-muted-foreground">Manage and assign pickup requests</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input
            placeholder="Search by name or order ID..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 h-11 rounded-xl"
          />
        </div>
        <div className="flex gap-2">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="h-11 px-4 rounded-xl border border-border bg-card text-foreground"
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="assigned">Assigned</option>
            <option value="on_the_way">On the Way</option>
            <option value="completed">Completed</option>
          </select>
        </div>
      </div>

      {/* Orders Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {filteredOrders.map((order) => (
          <div 
            key={order.id}
            className="bg-card rounded-2xl border border-border p-5 hover:shadow-card transition-shadow"
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <p className="font-semibold text-foreground">{order.id}</p>
                <p className="text-sm text-muted-foreground">{order.date} • {order.time}</p>
              </div>
              <StatusBadge status={order.status as any} />
            </div>

            <div className="space-y-3 mb-4">
              <div className="flex items-center gap-3">
                <User className="w-4 h-4 text-muted-foreground" />
                <span className="text-foreground">{order.customerName}</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-muted-foreground" />
                <span className="text-muted-foreground">{order.customerPhone}</span>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-muted-foreground shrink-0 mt-0.5" />
                <span className="text-muted-foreground text-sm">{order.address}</span>
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-border">
              <div>
                <p className="text-sm text-muted-foreground">Items: {order.items.length}</p>
                <p className="font-bold text-primary">₹{order.estimatedAmount}</p>
              </div>
              
              {order.status === 'pending' ? (
                <div className="relative">
                  <Button 
                    size="sm"
                    onClick={() => setSelectedOrder(selectedOrder === order.id ? null : order.id)}
                    className="rounded-xl"
                  >
                    <UserPlus className="w-4 h-4 mr-2" />
                    Assign Partner
                    <ChevronDown className="w-4 h-4 ml-2" />
                  </Button>
                  
                  {selectedOrder === order.id && (
                    <div className="absolute right-0 top-full mt-2 w-64 bg-card border border-border rounded-xl shadow-lg z-10 p-2">
                      {mockPartners.filter(p => p.status === 'active').map((partner) => (
                        <button
                          key={partner.id}
                          onClick={() => handleAssign(order.id, partner.id)}
                          className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-muted text-left"
                        >
                          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                            <span className="text-sm font-medium text-primary">
                              {partner.name.charAt(0)}
                            </span>
                          </div>
                          <div className="flex-1">
                            <p className="text-sm font-medium text-foreground">{partner.name}</p>
                            <p className="text-xs text-muted-foreground">⭐ {partner.rating}</p>
                          </div>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-right">
                  <p className="text-sm text-muted-foreground">Assigned to</p>
                  <p className="font-medium text-foreground">{order.partner?.name}</p>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {filteredOrders.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No orders found matching your criteria</p>
        </div>
      )}
    </div>
  );
};
