import React, { useState } from 'react';
import { ArrowLeft, User, MapPin, Mail, Calendar, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { MobileLayout, MobileHeader } from '@/components/ui/MobileLayout';
import { ProgressSteps } from '@/components/ui/ProgressSteps';

interface ProfileSetupProps {
  onComplete: () => void;
  onBack: () => void;
}

const steps = [
  { id: 'name', label: 'Name' },
  { id: 'address', label: 'Address' },
  { id: 'optional', label: 'Details' },
];

export const ProfileSetup: React.FC<ProfileSetupProps> = ({ onComplete, onBack }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    landmark: '',
    city: '',
    pincode: '',
    email: '',
    dob: '',
  });

  const updateField = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      onComplete();
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    } else {
      onBack();
    }
  };

  const canProceed = () => {
    switch (currentStep) {
      case 0:
        return formData.name.trim().length >= 2;
      case 1:
        return formData.address.trim().length >= 5 && formData.pincode.length === 6;
      case 2:
        return true; // Optional step
      default:
        return false;
    }
  };

  return (
    <MobileLayout>
      <MobileHeader 
        leftAction={
          <button onClick={handleBack}>
            <ArrowLeft className="w-6 h-6 text-foreground" />
          </button>
        }
        title="Complete Profile"
      />
      
      <div className="py-6">
        <ProgressSteps steps={steps} currentStep={currentStep} className="mb-8" />

        <div className="animate-fade-in">
          {currentStep === 0 && (
            <div className="space-y-6">
              <div className="text-center mb-6">
                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <User className="w-8 h-8 text-primary" />
                </div>
                <h2 className="text-xl font-bold text-foreground">What's your name?</h2>
                <p className="text-muted-foreground text-sm mt-1">
                  This helps our partners identify you
                </p>
              </div>

              <div>
                <label className="text-sm font-medium text-foreground">Full Name</label>
                <Input
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={(e) => updateField('name', e.target.value)}
                  className="h-14 mt-2 rounded-xl border-2"
                />
              </div>
            </div>
          )}

          {currentStep === 1 && (
            <div className="space-y-6">
              <div className="text-center mb-6">
                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <MapPin className="w-8 h-8 text-primary" />
                </div>
                <h2 className="text-xl font-bold text-foreground">Where should we pick up?</h2>
                <p className="text-muted-foreground text-sm mt-1">
                  Your default pickup address
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-foreground">Address</label>
                  <Input
                    placeholder="House/Flat No., Building, Street"
                    value={formData.address}
                    onChange={(e) => updateField('address', e.target.value)}
                    className="h-14 mt-2 rounded-xl border-2"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-foreground">Landmark (Optional)</label>
                  <Input
                    placeholder="Near, Opposite to..."
                    value={formData.landmark}
                    onChange={(e) => updateField('landmark', e.target.value)}
                    className="h-14 mt-2 rounded-xl border-2"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-foreground">City</label>
                    <Input
                      placeholder="City"
                      value={formData.city}
                      onChange={(e) => updateField('city', e.target.value)}
                      className="h-14 mt-2 rounded-xl border-2"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground">Pincode</label>
                    <Input
                      placeholder="6 digits"
                      value={formData.pincode}
                      onChange={(e) => {
                        const value = e.target.value.replace(/\D/g, '').slice(0, 6);
                        updateField('pincode', value);
                      }}
                      className="h-14 mt-2 rounded-xl border-2"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className="space-y-6">
              <div className="text-center mb-6">
                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <Mail className="w-8 h-8 text-primary" />
                </div>
                <h2 className="text-xl font-bold text-foreground">Additional Details</h2>
                <p className="text-muted-foreground text-sm mt-1">
                  Optional information for better experience
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-foreground">Email (Optional)</label>
                  <Input
                    type="email"
                    placeholder="your@email.com"
                    value={formData.email}
                    onChange={(e) => updateField('email', e.target.value)}
                    className="h-14 mt-2 rounded-xl border-2"
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    For invoice and updates
                  </p>
                </div>

                <div>
                  <label className="text-sm font-medium text-foreground">Date of Birth (Optional)</label>
                  <Input
                    type="date"
                    value={formData.dob}
                    onChange={(e) => updateField('dob', e.target.value)}
                    className="h-14 mt-2 rounded-xl border-2"
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    Get special offers on your birthday!
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 p-4 bg-background border-t border-border safe-area-bottom">
        <div className="max-w-md mx-auto">
          <Button 
            onClick={handleNext}
            disabled={!canProceed()}
            className="w-full h-14 text-lg font-semibold rounded-2xl"
          >
            {currentStep === steps.length - 1 ? 'Complete Setup' : 'Continue'}
            <ChevronRight className="w-5 h-5 ml-2" />
          </Button>
          
          {currentStep === 2 && (
            <button 
              onClick={onComplete}
              className="w-full text-center text-muted-foreground text-sm mt-3"
            >
              Skip for now
            </button>
          )}
        </div>
      </div>
    </MobileLayout>
  );
};
