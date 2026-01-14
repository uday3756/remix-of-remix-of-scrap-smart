import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  Package, 
  Users, 
  DollarSign, 
  MessageSquare, 
  Settings,
  LogOut,
  Menu,
  X,
  Recycle
} from 'lucide-react';
import { AdminDashboard } from './AdminDashboard';
import { BookedRequests } from './BookedRequests';
import { PricingManagement } from './PricingManagement';
import { FeedbackRatings } from './FeedbackRatings';
import { cn } from '@/lib/utils';

interface AdminLayoutProps {
  onLogout: () => void;
}

const navItems = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'orders', label: 'Booked Requests', icon: Package },
  { id: 'partners', label: 'Partners', icon: Users },
  { id: 'pricing', label: 'Pricing', icon: DollarSign },
  { id: 'feedback', label: 'Feedback', icon: MessageSquare },
];

export const AdminLayout: React.FC<AdminLayoutProps> = ({ onLogout }) => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <AdminDashboard 
            onViewOrders={() => setActiveTab('orders')}
            onViewPartners={() => setActiveTab('partners')}
          />
        );
      case 'orders':
        return <BookedRequests onAssignPartner={(o, p) => console.log('Assigned', o, p)} />;
      case 'pricing':
        return <PricingManagement />;
      case 'feedback':
        return <FeedbackRatings />;
      case 'partners':
        return (
          <div className="p-6">
            <h1 className="text-2xl font-bold text-foreground">Partner Management</h1>
            <p className="text-muted-foreground">Coming soon...</p>
          </div>
        );
      default:
        return <AdminDashboard onViewOrders={() => setActiveTab('orders')} onViewPartners={() => setActiveTab('partners')} />;
    }
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <aside className={cn(
        "fixed inset-y-0 left-0 z-50 w-64 bg-card border-r border-border transform transition-transform duration-200 lg:translate-x-0 lg:static",
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="p-6 border-b border-border">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center">
                <Recycle className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="font-bold text-foreground">ScrapEase</h1>
                <p className="text-xs text-muted-foreground">Admin Panel</p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  setSidebarOpen(false);
                }}
                className={cn(
                  "w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all",
                  activeTab === item.id
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                )}
              >
                <item.icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
              </button>
            ))}
          </nav>

          {/* Bottom Section */}
          <div className="p-4 border-t border-border space-y-1">
            <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-muted-foreground hover:bg-muted hover:text-foreground transition-all">
              <Settings className="w-5 h-5" />
              <span className="font-medium">Settings</span>
            </button>
            <button 
              onClick={onLogout}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-destructive hover:bg-destructive/10 transition-all"
            >
              <LogOut className="w-5 h-5" />
              <span className="font-medium">Logout</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Top Bar */}
        <header className="sticky top-0 z-30 bg-background border-b border-border px-4 py-3 flex items-center justify-between lg:px-6">
          <button 
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden p-2 rounded-lg hover:bg-muted"
          >
            <Menu className="w-6 h-6 text-foreground" />
          </button>
          <div className="flex-1" />
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
              <span className="text-sm font-medium text-primary">A</span>
            </div>
            <span className="text-sm font-medium text-foreground hidden sm:block">Admin</span>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-auto">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};
