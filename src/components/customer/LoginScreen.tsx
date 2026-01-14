import React, { useState } from 'react';
import { ArrowLeft, Phone, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { MobileLayout, MobileHeader } from '@/components/ui/MobileLayout';
import { OTPInput } from '@/components/ui/OTPInput';
import { cn } from '@/lib/utils';

interface LoginScreenProps {
  onLogin: () => void;
  onBack: () => void;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({ onLogin, onBack }) => {
  const [step, setStep] = useState<'phone' | 'otp'>('phone');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [resendTimer, setResendTimer] = useState(0);

  const handleSendOTP = async () => {
    if (phoneNumber.length !== 10) {
      setError('Please enter a valid 10-digit phone number');
      return;
    }
    
    setLoading(true);
    setError('');
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setLoading(false);
    setStep('otp');
    startResendTimer();
  };

  const handleVerifyOTP = async () => {
    if (otp.length !== 6) {
      setError('Please enter the complete OTP');
      return;
    }
    
    setLoading(true);
    setError('');
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // For demo, accept any 6-digit OTP
    setLoading(false);
    onLogin();
  };

  const startResendTimer = () => {
    setResendTimer(30);
    const interval = setInterval(() => {
      setResendTimer(prev => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const handleResendOTP = () => {
    if (resendTimer > 0) return;
    startResendTimer();
    // Simulate resend
  };

  return (
    <MobileLayout>
      <MobileHeader 
        leftAction={
          <button onClick={step === 'otp' ? () => setStep('phone') : onBack}>
            <ArrowLeft className="w-6 h-6 text-foreground" />
          </button>
        }
      />
      
      <div className="py-8 animate-fade-in">
        {step === 'phone' ? (
          <>
            <div className="text-center mb-8">
              <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <Phone className="w-8 h-8 text-primary" />
              </div>
              <h1 className="text-2xl font-bold text-foreground mb-2">Enter Phone Number</h1>
              <p className="text-muted-foreground">
                We'll send you a verification code
              </p>
            </div>

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
                    error ? "border-destructive" : "border-border focus:border-primary"
                  )}
                />
              </div>
              
              {error && (
                <p className="text-sm text-destructive text-center">{error}</p>
              )}

              <Button 
                onClick={handleSendOTP}
                disabled={loading || phoneNumber.length !== 10}
                className="w-full h-14 text-lg font-semibold rounded-2xl"
              >
                {loading ? (
                  <RefreshCw className="w-5 h-5 animate-spin" />
                ) : (
                  'Send OTP'
                )}
              </Button>
            </div>

            <p className="text-center text-sm text-muted-foreground mt-8">
              By continuing, you agree to our{' '}
              <span className="text-primary">Terms of Service</span> and{' '}
              <span className="text-primary">Privacy Policy</span>
            </p>
          </>
        ) : (
          <>
            <div className="text-center mb-8">
              <h1 className="text-2xl font-bold text-foreground mb-2">Verify OTP</h1>
              <p className="text-muted-foreground">
                Enter the 6-digit code sent to
              </p>
              <p className="font-medium text-foreground">+91 {phoneNumber}</p>
            </div>

            <div className="space-y-6">
              <OTPInput 
                value={otp} 
                onChange={(value) => {
                  setOtp(value);
                  setError('');
                }}
                error={!!error}
              />
              
              {error && (
                <p className="text-sm text-destructive text-center">{error}</p>
              )}

              <Button 
                onClick={handleVerifyOTP}
                disabled={loading || otp.length !== 6}
                className="w-full h-14 text-lg font-semibold rounded-2xl"
              >
                {loading ? (
                  <RefreshCw className="w-5 h-5 animate-spin" />
                ) : (
                  'Verify & Continue'
                )}
              </Button>

              <div className="text-center">
                <button
                  onClick={handleResendOTP}
                  disabled={resendTimer > 0}
                  className={cn(
                    "text-sm",
                    resendTimer > 0 ? "text-muted-foreground" : "text-primary font-medium"
                  )}
                >
                  {resendTimer > 0 ? (
                    `Resend OTP in ${resendTimer}s`
                  ) : (
                    'Resend OTP'
                  )}
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </MobileLayout>
  );
};
