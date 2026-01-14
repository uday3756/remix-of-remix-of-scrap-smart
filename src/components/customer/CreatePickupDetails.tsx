import React, { useState } from 'react';
import { ArrowLeft, Camera, X, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { MobileLayout, MobileHeader } from '@/components/ui/MobileLayout';
import { ScrapCard } from '@/components/ui/ScrapCard';
import { scrapCategories, scrapRates } from '@/data/mockData';
import { cn } from '@/lib/utils';

interface CreatePickupDetailsProps {
  date: Date;
  timeSlot: string;
  onConfirm: (details: PickupDetails) => void;
  onBack: () => void;
}

export interface PickupDetails {
  selectedScrap: string[];
  photos: string[];
  description: string;
  estimatedPrice: number;
}

export const CreatePickupDetails: React.FC<CreatePickupDetailsProps> = ({
  date,
  timeSlot,
  onConfirm,
  onBack,
}) => {
  const [selectedScrap, setSelectedScrap] = useState<string[]>([]);
  const [photos, setPhotos] = useState<string[]>([]);
  const [description, setDescription] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');

  const toggleScrap = (scrapId: string) => {
    setSelectedScrap(prev => 
      prev.includes(scrapId) 
        ? prev.filter(id => id !== scrapId)
        : [...prev, scrapId]
    );
  };

  const filteredRates = selectedCategory 
    ? scrapRates.filter(r => r.category.toLowerCase() === selectedCategory)
    : scrapRates;

  // Calculate estimated price (mock calculation)
  const estimatedPrice = selectedScrap.length * 50 + 100;

  const handlePhotoUpload = () => {
    // Mock photo upload - in real app, use file picker
    const mockPhotos = [
      'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=200',
      'https://images.unsplash.com/photo-1604187351574-c75ca79f5807?w=200',
    ];
    if (photos.length < 4) {
      setPhotos(prev => [...prev, mockPhotos[prev.length % 2]]);
    }
  };

  const removePhoto = (index: number) => {
    setPhotos(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <MobileLayout className="pb-40">
      <MobileHeader 
        leftAction={
          <button onClick={onBack}>
            <ArrowLeft className="w-6 h-6 text-foreground" />
          </button>
        }
        title="Scrap Details"
        subtitle="Step 2 of 2"
      />
      
      <div className="py-4 space-y-6 animate-fade-in">
        {/* Scheduled Time Summary */}
        <div className="p-4 bg-primary/5 rounded-2xl border border-primary/20">
          <p className="text-sm text-muted-foreground">Scheduled for</p>
          <p className="font-semibold text-foreground">
            {date.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
          </p>
          <p className="text-sm text-primary">{timeSlot}</p>
        </div>

        {/* Categories */}
        <div>
          <h3 className="font-semibold text-foreground mb-3">Categories</h3>
          <div className="flex gap-2 overflow-x-auto pb-2 -mx-4 px-4">
            <button
              onClick={() => setSelectedCategory('')}
              className={cn(
                "px-4 py-2 rounded-full whitespace-nowrap transition-all border",
                !selectedCategory 
                  ? "bg-primary text-primary-foreground border-primary" 
                  : "bg-card border-border text-foreground"
              )}
            >
              All
            </button>
            {scrapCategories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={cn(
                  "px-4 py-2 rounded-full whitespace-nowrap transition-all border flex items-center gap-2",
                  selectedCategory === cat.id 
                    ? "bg-primary text-primary-foreground border-primary" 
                    : "bg-card border-border text-foreground"
                )}
              >
                <span>{cat.icon}</span>
                {cat.name}
              </button>
            ))}
          </div>
        </div>

        {/* Scrap Selection */}
        <div>
          <h3 className="font-semibold text-foreground mb-3">Select Scrap Types</h3>
          <div className="grid grid-cols-3 gap-3">
            {filteredRates.map((scrap) => (
              <ScrapCard
                key={scrap.id}
                name={scrap.name}
                rate={scrap.rate}
                unit={scrap.unit}
                icon={scrap.icon}
                selected={selectedScrap.includes(String(scrap.id))}
                onClick={() => toggleScrap(String(scrap.id))}
              />
            ))}
          </div>
        </div>

        {/* Photo Upload */}
        <div>
          <h3 className="font-semibold text-foreground mb-3">Upload Photos (Optional)</h3>
          <div className="flex gap-3 flex-wrap">
            {photos.map((photo, index) => (
              <div key={index} className="relative w-20 h-20">
                <img 
                  src={photo} 
                  alt={`Scrap ${index + 1}`} 
                  className="w-full h-full object-cover rounded-xl"
                />
                <button
                  onClick={() => removePhoto(index)}
                  className="absolute -top-2 -right-2 w-6 h-6 bg-destructive text-destructive-foreground rounded-full flex items-center justify-center"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
            {photos.length < 4 && (
              <button
                onClick={handlePhotoUpload}
                className="w-20 h-20 border-2 border-dashed border-border rounded-xl flex flex-col items-center justify-center text-muted-foreground hover:border-primary hover:text-primary transition-all"
              >
                <Camera className="w-6 h-6" />
                <span className="text-xs mt-1">Add</span>
              </button>
            )}
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            Add up to 4 photos to help estimate better
          </p>
        </div>

        {/* Description */}
        <div>
          <h3 className="font-semibold text-foreground mb-3">Description (Optional)</h3>
          <Textarea
            placeholder="Describe your scrap items, approximate quantities..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="rounded-xl border-2 min-h-[100px]"
          />
        </div>
      </div>

      {/* Bottom Summary & Confirm */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-background border-t border-border safe-area-bottom">
        <div className="max-w-md mx-auto">
          {selectedScrap.length > 0 && (
            <div className="flex items-center justify-between mb-3 p-3 bg-muted rounded-xl">
              <div>
                <p className="text-sm text-muted-foreground">Estimated Price</p>
                <p className="text-xs text-muted-foreground">Final price after weighing</p>
              </div>
              <p className="text-2xl font-bold text-primary">₹{estimatedPrice}+</p>
            </div>
          )}
          <Button 
            onClick={() => onConfirm({
              selectedScrap,
              photos,
              description,
              estimatedPrice,
            })}
            disabled={selectedScrap.length === 0}
            className="w-full h-14 text-lg font-semibold rounded-2xl"
          >
            Confirm Pickup
          </Button>
        </div>
      </div>
    </MobileLayout>
  );
};
