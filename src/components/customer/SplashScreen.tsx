import React from 'react';
import { Recycle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { MobileLayout } from '@/components/ui/MobileLayout';

interface SplashScreenProps {
  onGetStarted: () => void;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({ onGetStarted }) => {
  return (
    <MobileLayout className="gradient-hero flex flex-col items-center justify-between py-12" noPadding>
      <div className="flex-1 flex flex-col items-center justify-center px-8 text-center animate-fade-in">
        {/* Logo */}
        <div className="w-24 h-24 rounded-3xl bg-white/20 backdrop-blur-sm flex items-center justify-center mb-6">
          <Recycle className="w-14 h-14 text-white" />
        </div>
        
        {/* App Name */}
        <h1 className="text-4xl font-bold text-white mb-3">ScrapEase</h1>
        
        {/* Tagline */}
        <p className="text-white/90 text-lg max-w-xs">
          Turn your trash into cash. Schedule pickups with ease.
        </p>
        
        {/* Decorative Elements */}
        <div className="mt-12 flex gap-4">
          <div className="w-2 h-2 rounded-full bg-white/50 animate-pulse-soft" />
          <div className="w-2 h-2 rounded-full bg-white/70 animate-pulse-soft delay-100" />
          <div className="w-2 h-2 rounded-full bg-white/50 animate-pulse-soft delay-200" />
        </div>
      </div>

      {/* Bottom Section */}
      <div className="w-full px-6 pb-8 animate-slide-up">
        <Button 
          onClick={onGetStarted}
          className="w-full h-14 text-lg font-semibold bg-white text-primary hover:bg-white/90 rounded-2xl shadow-lg"
        >
          Get Started
        </Button>
        
        <p className="text-center text-white/70 text-sm mt-4">
          Join 10,000+ users recycling responsibly
        </p>
      </div>
    </MobileLayout>
  );
};
