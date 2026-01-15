import React from 'react';
import { cn } from '@/lib/utils';

interface MobileLayoutProps {
  children: React.ReactNode;
  className?: string;
  noPadding?: boolean;
}

export const MobileLayout: React.FC<MobileLayoutProps> = ({ 
  children, 
  className,
  noPadding = false 
}) => {
  return (
    <div className={cn(
      "min-h-screen max-w-md mx-auto bg-background relative",
      !noPadding && "px-4",
      className
    )}>
      {children}
    </div>
  );
};

interface MobileHeaderProps {
  title?: string;
  subtitle?: string;
  leftAction?: React.ReactNode;
  rightAction?: React.ReactNode;
  centerContent?: React.ReactNode;
  transparent?: boolean;
}

export const MobileHeader: React.FC<MobileHeaderProps> = ({
  title,
  subtitle,
  leftAction,
  rightAction,
  centerContent,
  transparent = false,
}) => {
  return (
    <header className={cn(
      "sticky top-0 z-50 flex items-center justify-between py-4 safe-area-top",
      !transparent && "bg-background/95 backdrop-blur-sm border-b border-border"
    )}>
      <div className="w-10 flex items-center justify-start">
        {leftAction}
      </div>
      <div className="flex-1 text-center flex items-center justify-center">
        {centerContent || (
          <>
            {title && <h1 className="font-semibold text-foreground">{title}</h1>}
            {subtitle && <p className="text-xs text-muted-foreground">{subtitle}</p>}
          </>
        )}
      </div>
      <div className="w-10 flex items-center justify-end">
        {rightAction}
      </div>
    </header>
  );
};

interface BottomNavProps {
  children: React.ReactNode;
}

export const BottomNav: React.FC<BottomNavProps> = ({ children }) => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-card border-t border-border safe-area-bottom z-50">
      <div className="max-w-md mx-auto flex items-center justify-around py-2">
        {children}
      </div>
    </nav>
  );
};

interface BottomNavItemProps {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  onClick?: () => void;
}

export const BottomNavItem: React.FC<BottomNavItemProps> = ({
  icon,
  label,
  active = false,
  onClick,
}) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        "flex flex-col items-center justify-center px-4 py-2 rounded-xl transition-all",
        active 
          ? "text-primary" 
          : "text-muted-foreground hover:text-foreground"
      )}
    >
      <div className={cn(
        "p-1.5 rounded-xl transition-all",
        active && "bg-primary/10"
      )}>
        {icon}
      </div>
      <span className="text-xs mt-1 font-medium">{label}</span>
    </button>
  );
};
