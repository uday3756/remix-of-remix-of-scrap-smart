import React from 'react';
import { cn } from '@/lib/utils';

export type StatusType = 'pending' | 'accepted' | 'assigned' | 'on_the_way' | 'at_location' | 'picked_up' | 'completed' | 'cancelled';

interface StatusBadgeProps {
  status: StatusType;
  className?: string;
}

const statusConfig: Record<StatusType, { label: string; className: string }> = {
  pending: {
    label: 'Pending',
    className: 'bg-warning/10 text-warning border-warning/20',
  },
  accepted: {
    label: 'Accepted',
    className: 'bg-accent/10 text-accent border-accent/20',
  },
  assigned: {
    label: 'Assigned',
    className: 'bg-accent/10 text-accent border-accent/20',
  },
  on_the_way: {
    label: 'On the Way',
    className: 'bg-primary/10 text-primary border-primary/20',
  },
  at_location: {
    label: 'At Location',
    className: 'bg-primary/10 text-primary border-primary/20',
  },
  picked_up: {
    label: 'Picked Up',
    className: 'bg-success/10 text-success border-success/20',
  },
  completed: {
    label: 'Completed',
    className: 'bg-success/10 text-success border-success/20',
  },
  cancelled: {
    label: 'Cancelled',
    className: 'bg-destructive/10 text-destructive border-destructive/20',
  },
};

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, className }) => {
  const config = statusConfig[status] || statusConfig.pending;
  
  return (
    <span className={cn(
      "inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border",
      config.className,
      className
    )}>
      {config.label}
    </span>
  );
};
