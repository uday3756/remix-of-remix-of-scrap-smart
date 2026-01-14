import React from 'react';
import { cn } from '@/lib/utils';

interface ScrapCardProps {
  name: string;
  rate: number;
  unit: string;
  icon: string;
  selected?: boolean;
  onClick?: () => void;
}

export const ScrapCard: React.FC<ScrapCardProps> = ({
  name,
  rate,
  unit,
  icon,
  selected = false,
  onClick,
}) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        "flex flex-col items-center p-4 rounded-2xl border-2 transition-all duration-200",
        "hover:shadow-card hover:border-primary/50",
        selected
          ? "border-primary bg-primary/5 shadow-card"
          : "border-border bg-card"
      )}
    >
      <span className="text-3xl mb-2">{icon}</span>
      <h3 className="font-medium text-sm text-foreground text-center">{name}</h3>
      <p className="text-xs text-muted-foreground mt-1">
        ₹{rate}/{unit}
      </p>
    </button>
  );
};

interface RateCardProps {
  name: string;
  rate: number;
  unit: string;
  icon: string;
  trend?: 'up' | 'down' | 'stable';
}

export const RateCard: React.FC<RateCardProps> = ({
  name,
  rate,
  unit,
  icon,
  trend = 'stable',
}) => {
  return (
    <div className="flex items-center gap-3 p-3 rounded-xl bg-card border border-border">
      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-2xl">
        {icon}
      </div>
      <div className="flex-1">
        <h3 className="font-medium text-sm text-foreground">{name}</h3>
        <p className="text-xs text-muted-foreground">per {unit}</p>
      </div>
      <div className="text-right">
        <p className="font-bold text-primary">₹{rate}</p>
        <span className={cn(
          "text-xs",
          trend === 'up' && "text-success",
          trend === 'down' && "text-destructive",
          trend === 'stable' && "text-muted-foreground"
        )}>
          {trend === 'up' && '↑'}
          {trend === 'down' && '↓'}
          {trend === 'stable' && '—'}
        </span>
      </div>
    </div>
  );
};
