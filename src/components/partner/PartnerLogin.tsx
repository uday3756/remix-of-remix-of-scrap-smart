import React, { useState } from 'react';
import { Phone, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { MobileLayout } from '@/components/ui/MobileLayout';
import { OTPInput } from '@/components/ui/OTPInput';
import { cn } from '@/lib/utils';

interface PartnerLoginProps {
  onLogin: () => void;
}

export const PartnerLogin: React.FC<PartnerLoginProps> = ({ onLogin }) => {
  const [step, setStep] = useState<'phone' | 'otp'>('phone');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSendOTP = async () => {
    if (phoneNumber.length !== 10) {
      setError('Please enter a valid 10-digit phone number');
      return;
    }
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setLoading(false);
    setStep('otp');
  };

  const handleVerifyOTP = async () => {
    if (otp.length !== 6) {
      setError('Please enter the complete OTP');
      return;
    }
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setLoading(false);
    onLogin();
  };

  return (
    <MobileLayout className="flex flex-col justify-center py-8">
      <div className="text-center mb-8 animate-fade-in">
        <div className="w-20 h-20 rounded-2xl gradient-primary flex items-center justify-center mx-auto mb-4">
          <span className="text-3xl">🚛</span>
        </div>
        <h1 className="text-2xl font-bold text-foreground">Partner Login</h1>
        <p className="text-muted-foreground">ScrapEase Collection Partner</p>
      </div>

      <div className="animate-slide-up">
        {step === 'phone' ? (
          <div className="space-y-4">
            <div className="relative">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center gap-2 text-muted-foreground">
                <span className="text-lg">🇮🇳</span>
                <span className="font-medium">+91</span>
                <div className="w-px h-6 bg-border" />
              </div>
              <Input
                type="tel"
                placeholder="Enter phone number"
                value={phoneNumber}
                onChange={(e) => {
                  const value = e.target.value.replace(/\D/g, '').slice(0, 10);
                  setPhoneNumber(value);
                  setError('');
                }}
                className={cn(
                  "h-14 pl-28 text-lg rounded-2xl border-2",
                  error ? "border-destructive" : "border-border"
                )}
              />
            </div>
            
            {error && <p className="text-sm text-destructive text-center">{error}</p>}

            <Button 
              onClick={handleSendOTP}
              disabled={loading || phoneNumber.length !== 10}
              className="w-full h-14 text-lg font-semibold rounded-2xl"
            >
              {loading ? <RefreshCw className="w-5 h-5 animate-spin" /> : 'Send OTP'}
            </Button>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="text-center">
              <p className="text-muted-foreground">Enter OTP sent to</p>
              <p className="font-medium text-foreground">+91 {phoneNumber}</p>
            </div>

            <OTPInput 
              value={otp} 
              onChange={(value) => { setOtp(value); setError(''); }}
              error={!!error}
            />
            
            {error && <p className="text-sm text-destructive text-center">{error}</p>}

            <Button 
              onClick={handleVerifyOTP}
              disabled={loading || otp.length !== 6}
              className="w-full h-14 text-lg font-semibold rounded-2xl"
            >
              {loading ? <RefreshCw className="w-5 h-5 animate-spin" /> : 'Verify & Login'}
            </Button>

            <button
              onClick={() => setStep('phone')}
              className="w-full text-center text-sm text-primary"
            >
              Change phone number
            </button>
          </div>
        )}
      </div>
    </MobileLayout>
  );
};
