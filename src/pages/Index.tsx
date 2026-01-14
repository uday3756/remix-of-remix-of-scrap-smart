import React, { useState } from 'react';
import { SplashScreen } from '@/components/customer/SplashScreen';
import { LanguageSelection } from '@/components/customer/LanguageSelection';
import { LoginScreen } from '@/components/customer/LoginScreen';
import { ProfileSetup } from '@/components/customer/ProfileSetup';
import { HomeScreen } from '@/components/customer/HomeScreen';
import { CreatePickupDateTime } from '@/components/customer/CreatePickupDateTime';
import { CreatePickupDetails } from '@/components/customer/CreatePickupDetails';
import { PickupConfirmation } from '@/components/customer/PickupConfirmation';
import { OrderTracking } from '@/components/customer/OrderTracking';
import { OrderCompletion } from '@/components/customer/OrderCompletion';
import { PartnerLogin } from '@/components/partner/PartnerLogin';
import { PartnerDashboard } from '@/components/partner/PartnerDashboard';
import { PickupDetails as PartnerPickupDetails } from '@/components/partner/PickupDetails';
import { PickupCodeVerification } from '@/components/partner/PickupCodeVerification';
import { PickupCompletion } from '@/components/partner/PickupCompletion';
import { AdminLogin } from '@/components/admin/AdminLogin';
import { AdminLayout } from '@/components/admin/AdminLayout';

type AppRole = 'select' | 'customer' | 'partner' | 'admin';
type CustomerScreen = 'splash' | 'language' | 'login' | 'profile' | 'home' | 'createDateTime' | 'createDetails' | 'confirmation' | 'tracking' | 'completion';
type PartnerScreen = 'login' | 'dashboard' | 'details' | 'verify' | 'complete';

const Index = () => {
  const [role, setRole] = useState<AppRole>('select');
  const [customerScreen, setCustomerScreen] = useState<CustomerScreen>('splash');
  const [partnerScreen, setPartnerScreen] = useState<PartnerScreen>('login');
  const [adminLoggedIn, setAdminLoggedIn] = useState(false);
  const [activeTab, setActiveTab] = useState('home');
  const [pickupDate, setPickupDate] = useState<Date>(new Date());
  const [pickupTimeSlot, setPickupTimeSlot] = useState('');
  const [currentOrderId, setCurrentOrderId] = useState('ORD002');
  const [currentPickupId, setCurrentPickupId] = useState('ORD003');

  // Role Selection Screen
  if (role === 'select') {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="max-w-md w-full space-y-6 text-center animate-fade-in">
          <div className="w-20 h-20 rounded-2xl gradient-primary flex items-center justify-center mx-auto">
            <span className="text-4xl">♻️</span>
          </div>
          <h1 className="text-3xl font-bold text-foreground">ScrapEase</h1>
          <p className="text-muted-foreground">Select your role to continue</p>
          
          <div className="space-y-3 pt-4">
            <button onClick={() => setRole('customer')} className="w-full p-5 bg-card rounded-2xl border-2 border-border hover:border-primary hover:shadow-card transition-all text-left">
              <div className="flex items-center gap-4">
                <span className="text-3xl">📱</span>
                <div>
                  <h3 className="font-semibold text-foreground">Customer App</h3>
                  <p className="text-sm text-muted-foreground">Schedule scrap pickups</p>
                </div>
              </div>
            </button>
            <button onClick={() => setRole('partner')} className="w-full p-5 bg-card rounded-2xl border-2 border-border hover:border-primary hover:shadow-card transition-all text-left">
              <div className="flex items-center gap-4">
                <span className="text-3xl">🚛</span>
                <div>
                  <h3 className="font-semibold text-foreground">Partner App</h3>
                  <p className="text-sm text-muted-foreground">Collect scrap & earn</p>
                </div>
              </div>
            </button>
            <button onClick={() => setRole('admin')} className="w-full p-5 bg-card rounded-2xl border-2 border-border hover:border-primary hover:shadow-card transition-all text-left">
              <div className="flex items-center gap-4">
                <span className="text-3xl">💼</span>
                <div>
                  <h3 className="font-semibold text-foreground">Admin Dashboard</h3>
                  <p className="text-sm text-muted-foreground">Manage operations</p>
                </div>
              </div>
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Customer App Flow
  if (role === 'customer') {
    switch (customerScreen) {
      case 'splash': return <SplashScreen onGetStarted={() => setCustomerScreen('language')} />;
      case 'language': return <LanguageSelection onContinue={() => setCustomerScreen('login')} onBack={() => setCustomerScreen('splash')} />;
      case 'login': return <LoginScreen onLogin={() => setCustomerScreen('profile')} onBack={() => setCustomerScreen('language')} />;
      case 'profile': return <ProfileSetup onComplete={() => setCustomerScreen('home')} onBack={() => setCustomerScreen('login')} />;
      case 'home': return <HomeScreen onCreatePickup={() => setCustomerScreen('createDateTime')} onViewOrder={(id) => { setCurrentOrderId(id); setCustomerScreen('tracking'); }} onViewHistory={() => {}} onViewRates={() => {}} activeTab={activeTab} onTabChange={setActiveTab} />;
      case 'createDateTime': return <CreatePickupDateTime onContinue={(date, time) => { setPickupDate(date); setPickupTimeSlot(time); setCustomerScreen('createDetails'); }} onBack={() => setCustomerScreen('home')} />;
      case 'createDetails': return <CreatePickupDetails date={pickupDate} timeSlot={pickupTimeSlot} onConfirm={() => setCustomerScreen('confirmation')} onBack={() => setCustomerScreen('createDateTime')} />;
      case 'confirmation': return <PickupConfirmation pickupId="ORD005" date={pickupDate} timeSlot={pickupTimeSlot} onTrackOrder={() => setCustomerScreen('tracking')} onGoHome={() => setCustomerScreen('home')} />;
      case 'tracking': return <OrderTracking orderId={currentOrderId} onBack={() => setCustomerScreen('home')} onComplete={() => setCustomerScreen('completion')} />;
      case 'completion': return <OrderCompletion orderId={currentOrderId} onGoHome={() => setCustomerScreen('home')} />;
    }
  }

  // Partner App Flow
  if (role === 'partner') {
    switch (partnerScreen) {
      case 'login': return <PartnerLogin onLogin={() => setPartnerScreen('dashboard')} />;
      case 'dashboard': return <PartnerDashboard onViewPickup={(id) => { setCurrentPickupId(id); setPartnerScreen('details'); }} activeTab={activeTab} onTabChange={setActiveTab} />;
      case 'details': return <PartnerPickupDetails pickupId={currentPickupId} onBack={() => setPartnerScreen('dashboard')} onStartPickup={() => setPartnerScreen('verify')} />;
      case 'verify': return <PickupCodeVerification pickupId={currentPickupId} onBack={() => setPartnerScreen('details')} onSuccess={() => setPartnerScreen('complete')} />;
      case 'complete': return <PickupCompletion pickupId={currentPickupId} onComplete={() => setPartnerScreen('dashboard')} />;
    }
  }

  // Admin Dashboard Flow
  if (role === 'admin') {
    if (!adminLoggedIn) {
      return <AdminLogin onLogin={() => setAdminLoggedIn(true)} />;
    }
    return <AdminLayout onLogout={() => { setAdminLoggedIn(false); setRole('select'); }} />;
  }

  return null;
};

export default Index;
