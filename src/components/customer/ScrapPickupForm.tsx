import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, 
  Camera, 
  MapPin, 
  Calendar, 
  Clock, 
  FileText,
  Package,
  X,
  Upload,
  Navigation,
  Check
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { MobileLayout, MobileHeader } from '@/components/ui/MobileLayout';
import { ProgressSteps } from '@/components/ui/ProgressSteps';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { LoadingSpinner } from '@/components/LoadingSpinner';
import { toast } from 'sonner';

interface ScrapPickupFormProps {
  onBack: () => void;
  onSuccess: (orderId: string) => void;
}

const scrapTypes = [
  { id: 'paper', label: 'Paper', icon: '📄', rate: '₹12/kg' },
  { id: 'metal', label: 'Metal', icon: '🔩', rate: '₹35/kg' },
  { id: 'plastic', label: 'Plastic', icon: '♻️', rate: '₹8/kg' },
  { id: 'electronics', label: 'E-Waste', icon: '📱', rate: '₹50/kg' },
  { id: 'glass', label: 'Glass', icon: '🫙', rate: '₹3/kg' },
  { id: 'mixed', label: 'Mixed', icon: '📦', rate: 'Varies' },
];

const weightOptions = [
  { id: 'less_than_5kg', label: 'Less than 5 kg' },
  { id: '5_to_10kg', label: '5 - 10 kg' },
  { id: '10_to_25kg', label: '10 - 25 kg' },
  { id: '25_to_50kg', label: '25 - 50 kg' },
  { id: 'more_than_50kg', label: 'More than 50 kg' },
];

const timeSlots = [
  '9:00 AM - 11:00 AM',
  '11:00 AM - 1:00 PM',
  '2:00 PM - 4:00 PM',
  '4:00 PM - 6:00 PM',
];

export const ScrapPickupForm: React.FC<ScrapPickupFormProps> = ({ onBack, onSuccess }) => {
  const { user } = useAuth();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [uploadingImages, setUploadingImages] = useState(false);
  const [gettingLocation, setGettingLocation] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Form data
  const [formData, setFormData] = useState({
    scrapType: '',
    weight: '',
    pickupDate: '',
    pickupTime: '',
    address: '',
    latitude: 0,
    longitude: 0,
    notes: '',
    images: [] as string[],
  });

  const [previewImages, setPreviewImages] = useState<string[]>([]);

  const steps = [
    { number: 1, label: 'Scrap Details' },
    { number: 2, label: 'Schedule' },
    { number: 3, label: 'Location' },
  ];

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || !user) return;

    setUploadingImages(true);
    const uploadedUrls: string[] = [];
    const previews: string[] = [];

    try {
      for (const file of Array.from(files)) {
        // Create preview
        const reader = new FileReader();
        reader.onloadend = () => {
          previews.push(reader.result as string);
          setPreviewImages([...previewImages, ...previews]);
        };
        reader.readAsDataURL(file);

        // Upload to Supabase Storage
        const fileName = `${user.id}/${Date.now()}-${file.name}`;
        const { data, error } = await supabase.storage
          .from('scrap-images')
          .upload(fileName, file);

        if (error) throw error;

        const { data: urlData } = supabase.storage
          .from('scrap-images')
          .getPublicUrl(data.path);

        uploadedUrls.push(urlData.publicUrl);
      }

      setFormData(prev => ({
        ...prev,
        images: [...prev.images, ...uploadedUrls],
      }));

      toast.success('Images uploaded successfully!');
    } catch (error) {
      console.error('Error uploading images:', error);
      toast.error('Failed to upload images');
    } finally {
      setUploadingImages(false);
    }
  };

  const removeImage = (index: number) => {
    setPreviewImages(prev => prev.filter((_, i) => i !== index));
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };

  const getCurrentLocation = () => {
    setGettingLocation(true);
    
    if (!navigator.geolocation) {
      toast.error('Geolocation is not supported by your browser');
      setGettingLocation(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        
        setFormData(prev => ({
          ...prev,
          latitude,
          longitude,
        }));

        // Try to get address from coordinates (reverse geocoding)
        try {
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
          );
          const data = await response.json();
          if (data.display_name) {
            setFormData(prev => ({
              ...prev,
              address: data.display_name,
            }));
          }
        } catch (error) {
          console.error('Error getting address:', error);
        }

        toast.success('Location detected!');
        setGettingLocation(false);
      },
      (error) => {
        console.error('Error getting location:', error);
        toast.error('Failed to get your location');
        setGettingLocation(false);
      },
      { enableHighAccuracy: true }
    );
  };

  const validateStep = () => {
    switch (step) {
      case 1:
        if (!formData.scrapType) {
          toast.error('Please select a scrap type');
          return false;
        }
        if (!formData.weight) {
          toast.error('Please select approximate weight');
          return false;
        }
        return true;
      case 2:
        if (!formData.pickupDate) {
          toast.error('Please select a pickup date');
          return false;
        }
        if (!formData.pickupTime) {
          toast.error('Please select a time slot');
          return false;
        }
        return true;
      case 3:
        if (!formData.address) {
          toast.error('Please enter your address');
          return false;
        }
        return true;
      default:
        return true;
    }
  };

  const handleNext = () => {
    if (validateStep()) {
      setStep(prev => prev + 1);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(prev => prev - 1);
    } else {
      onBack();
    }
  };

  const handleSubmit = async () => {
    if (!validateStep() || !user) return;

    setLoading(true);

    try {
      const { data, error } = await supabase
        .from('orders')
        .insert({
          user_id: user.id,
          scrap_type: formData.scrapType,
          weight: formData.weight,
          pickup_date: formData.pickupDate,
          pickup_time: formData.pickupTime,
          address: formData.address,
          latitude: formData.latitude,
          longitude: formData.longitude,
          notes: formData.notes,
          images: formData.images,
          status: 'pending',
        })
        .select()
        .single();

      if (error) throw error;

      toast.success('Pickup request created successfully!');
      onSuccess(data.id);
    } catch (error) {
      console.error('Error creating order:', error);
      toast.error('Failed to create pickup request');
    } finally {
      setLoading(false);
    }
  };

  // Get minimum date (tomorrow)
  const getMinDate = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  };

  return (
    <MobileLayout>
      <MobileHeader
        title="Create Pickup Request"
        leftAction={
          <button onClick={handleBack}>
            <ArrowLeft className="w-6 h-6 text-foreground" />
          </button>
        }
      />

      <div className="py-4 space-y-6">
        {/* Progress Steps */}
        <ProgressSteps steps={steps} currentStep={step} />

        <AnimatePresence mode="wait">
          {/* Step 1: Scrap Details */}
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              {/* Scrap Type */}
              <div className="space-y-3">
                <Label className="text-base font-medium">Select Scrap Type</Label>
                <div className="grid grid-cols-3 gap-3">
                  {scrapTypes.map((type) => (
                    <Card
                      key={type.id}
                      className={`p-4 text-center rounded-2xl cursor-pointer transition-all border-2 ${
                        formData.scrapType === type.id
                          ? 'border-primary bg-primary/5 shadow-card'
                          : 'border-transparent hover:border-primary/30'
                      }`}
                      onClick={() => setFormData(prev => ({ ...prev, scrapType: type.id }))}
                    >
                      <span className="text-2xl block mb-1">{type.icon}</span>
                      <p className="text-sm font-medium text-foreground">{type.label}</p>
                      <p className="text-xs text-primary mt-1">{type.rate}</p>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Weight */}
              <div className="space-y-3">
                <Label className="text-base font-medium">Approximate Weight</Label>
                <div className="space-y-2">
                  {weightOptions.map((option) => (
                    <Card
                      key={option.id}
                      className={`p-4 rounded-xl cursor-pointer transition-all border-2 flex items-center justify-between ${
                        formData.weight === option.id
                          ? 'border-primary bg-primary/5'
                          : 'border-transparent hover:border-primary/30'
                      }`}
                      onClick={() => setFormData(prev => ({ ...prev, weight: option.id }))}
                    >
                      <span className="text-sm text-foreground">{option.label}</span>
                      {formData.weight === option.id && (
                        <Check className="w-5 h-5 text-primary" />
                      )}
                    </Card>
                  ))}
                </div>
              </div>

              {/* Upload Images */}
              <div className="space-y-3">
                <Label className="text-base font-medium">Upload Scrap Images (Optional)</Label>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleImageUpload}
                  className="hidden"
                />
                
                <div className="flex flex-wrap gap-3">
                  {previewImages.map((preview, index) => (
                    <div key={index} className="relative w-20 h-20 rounded-xl overflow-hidden">
                      <img src={preview} alt={`Preview ${index + 1}`} className="w-full h-full object-cover" />
                      <button
                        onClick={() => removeImage(index)}
                        className="absolute top-1 right-1 w-5 h-5 bg-destructive text-destructive-foreground rounded-full flex items-center justify-center"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                  
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    disabled={uploadingImages}
                    className="w-20 h-20 rounded-xl border-2 border-dashed border-border flex flex-col items-center justify-center text-muted-foreground hover:border-primary hover:text-primary transition-colors"
                  >
                    {uploadingImages ? (
                      <LoadingSpinner size="sm" />
                    ) : (
                      <>
                        <Camera className="w-6 h-6" />
                        <span className="text-xs mt-1">Add</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {/* Step 2: Schedule */}
          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              {/* Date Picker */}
              <div className="space-y-3">
                <Label className="text-base font-medium">Select Pickup Date</Label>
                <div className="relative">
                  <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    type="date"
                    min={getMinDate()}
                    value={formData.pickupDate}
                    onChange={(e) => setFormData(prev => ({ ...prev, pickupDate: e.target.value }))}
                    className="h-14 pl-12 rounded-xl text-base"
                  />
                </div>
              </div>

              {/* Time Slots */}
              <div className="space-y-3">
                <Label className="text-base font-medium">Select Time Slot</Label>
                <div className="grid grid-cols-2 gap-3">
                  {timeSlots.map((slot) => (
                    <Card
                      key={slot}
                      className={`p-4 rounded-xl cursor-pointer transition-all border-2 flex items-center gap-2 ${
                        formData.pickupTime === slot
                          ? 'border-primary bg-primary/5'
                          : 'border-transparent hover:border-primary/30'
                      }`}
                      onClick={() => setFormData(prev => ({ ...prev, pickupTime: slot }))}
                    >
                      <Clock className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm text-foreground">{slot}</span>
                    </Card>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* Step 3: Location */}
          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              {/* Get Current Location */}
              <Button
                onClick={getCurrentLocation}
                disabled={gettingLocation}
                variant="outline"
                className="w-full h-14 rounded-xl border-2 border-dashed"
              >
                {gettingLocation ? (
                  <LoadingSpinner size="sm" />
                ) : (
                  <>
                    <Navigation className="w-5 h-5 mr-2" />
                    Use Current Location
                  </>
                )}
              </Button>

              {/* Address Input */}
              <div className="space-y-3">
                <Label className="text-base font-medium">Pickup Address</Label>
                <div className="relative">
                  <MapPin className="absolute left-4 top-4 w-5 h-5 text-muted-foreground" />
                  <Textarea
                    placeholder="Enter your complete pickup address..."
                    value={formData.address}
                    onChange={(e) => setFormData(prev => ({ ...prev, address: e.target.value }))}
                    className="min-h-[100px] pl-12 rounded-xl text-base resize-none"
                  />
                </div>
              </div>

              {/* Notes */}
              <div className="space-y-3">
                <Label className="text-base font-medium">Additional Notes (Optional)</Label>
                <div className="relative">
                  <FileText className="absolute left-4 top-4 w-5 h-5 text-muted-foreground" />
                  <Textarea
                    placeholder="Any special instructions..."
                    value={formData.notes}
                    onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
                    className="min-h-[80px] pl-12 rounded-xl text-base resize-none"
                  />
                </div>
              </div>

              {/* Summary */}
              <Card className="p-4 rounded-2xl bg-primary/5 border-none">
                <h3 className="font-medium text-foreground mb-3">Order Summary</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Scrap Type</span>
                    <span className="text-foreground capitalize">{formData.scrapType.replace('_', ' ')}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Weight</span>
                    <span className="text-foreground">{weightOptions.find(w => w.id === formData.weight)?.label}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Date</span>
                    <span className="text-foreground">{formData.pickupDate && new Date(formData.pickupDate).toLocaleDateString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Time</span>
                    <span className="text-foreground">{formData.pickupTime}</span>
                  </div>
                </div>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Navigation Buttons */}
        <div className="flex gap-3 pt-4">
          {step > 1 && (
            <Button
              onClick={handleBack}
              variant="outline"
              className="flex-1 h-14 rounded-xl"
            >
              Back
            </Button>
          )}
          <Button
            onClick={step === 3 ? handleSubmit : handleNext}
            disabled={loading}
            className="flex-1 h-14 rounded-xl gradient-primary"
          >
            {loading ? (
              <LoadingSpinner size="sm" />
            ) : step === 3 ? (
              'Submit Request'
            ) : (
              'Continue'
            )}
          </Button>
        </div>
      </div>
    </MobileLayout>
  );
};
