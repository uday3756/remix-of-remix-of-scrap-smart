import React, { useState } from 'react';
import { ArrowLeft, CheckCircle, XCircle, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { MobileLayout, MobileHeader } from '@/components/ui/MobileLayout';
import { OTPInput } from '@/components/ui/OTPInput';
import { cn } from '@/lib/utils';

interface PickupCodeVerificationProps {
  pickupId: string;
  onBack: () => void;
  onSuccess: () => void;
}

export const PickupCodeVerification: React.FC<PickupCodeVerificationProps> = ({
  pickupId,
  onBack,
  onSuccess,
}) => {
  const [code, setCode] = useState('');
  const [status, setStatus] = useState<'input' | 'verifying' | 'success' | 'error'>('input');
  const [error, setError] = useState('');

  const handleVerify = async () => {
    if (code.length !== 4) {
      setError('Please enter the 4-digit code');
      return;
    }

    setStatus('verifying');
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Mock verification - accept "1234" as valid code
    if (code === '1234') {
      setStatus('success');
      setTimeout(() => {
        onSuccess();
      }, 1500);
    } else {
      setStatus('error');
      setError('Invalid code. Please try again.');
    }
  };

  const handleRetry = () => {
    setCode('');
    setError('');
    setStatus('input');
  };

  return (
    <MobileLayout className="flex flex-col justify-center">
      <MobileHeader 
        leftAction={
          status === 'input' && (
            <button onClick={onBack}>
              <ArrowLeft className="w-6 h-6 text-foreground" />
            </button>
          )
        }
      />
      
      <div className="py-8 text-center animate-fade-in">
        {status === 'success' ? (
          <div className="animate-scale-in">
            <div className="w-24 h-24 rounded-full bg-success/10 flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-14 h-14 text-success" />
            </div>
            <h1 className="text-2xl font-bold text-foreground mb-2">Verified!</h1>
            <p className="text-muted-foreground">Proceeding to pickup completion</p>
          </div>
        ) : status === 'error' ? (
          <div className="animate-scale-in">
            <div className="w-24 h-24 rounded-full bg-destructive/10 flex items-center justify-center mx-auto mb-6">
              <XCircle className="w-14 h-14 text-destructive" />
            </div>
            <h1 className="text-2xl font-bold text-foreground mb-2">Invalid Code</h1>
            <p className="text-muted-foreground mb-6">{error}</p>
            <Button onClick={handleRetry} className="rounded-2xl">
              Try Again
            </Button>
          </div>
        ) : (
          <>
            <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl">🔐</span>
            </div>
            <h1 className="text-2xl font-bold text-foreground mb-2">Enter Pickup Code</h1>
            <p className="text-muted-foreground mb-8">
              Ask the customer for their 4-digit code
            </p>

            <div className="space-y-6">
              <OTPInput 
                length={4}
                value={code} 
                onChange={(value) => {
                  setCode(value);
                  setError('');
                }}
                error={!!error}
              />
              
              {error && status === 'input' && (
                <p className="text-sm text-destructive">{error}</p>
              )}

              <Button 
                onClick={handleVerify}
                disabled={status === 'verifying' || code.length !== 4}
                className="w-full h-14 text-lg font-semibold rounded-2xl"
              >
                {status === 'verifying' ? (
                  <RefreshCw className="w-5 h-5 animate-spin" />
                ) : (
                  'Verify Code'
                )}
              </Button>
            </div>

            <p className="text-sm text-muted-foreground mt-8">
              Demo: Use code <span className="font-mono font-bold text-primary">1234</span>
            </p>
          </>
        )}
      </div>
    </MobileLayout>
  );
};
