import React, { useState } from 'react';
import { Check, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { MobileLayout, MobileHeader } from '@/components/ui/MobileLayout';
import { languages } from '@/data/mockData';
import { cn } from '@/lib/utils';

interface LanguageSelectionProps {
  onContinue: (language: string) => void;
  onBack: () => void;
}

export const LanguageSelection: React.FC<LanguageSelectionProps> = ({ 
  onContinue,
  onBack 
}) => {
  const [selectedLanguage, setSelectedLanguage] = useState<string>('en');

  return (
    <MobileLayout>
      <MobileHeader 
        title="Select Language" 
        subtitle="Choose your preferred language"
      />
      
      <div className="py-6 animate-fade-in">
        <div className="space-y-3">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => setSelectedLanguage(lang.code)}
              className={cn(
                "w-full flex items-center justify-between p-4 rounded-2xl border-2 transition-all",
                selectedLanguage === lang.code
                  ? "border-primary bg-primary/5"
                  : "border-border bg-card hover:border-primary/50"
              )}
            >
              <div className="flex items-center gap-4">
                <span className="text-2xl">{getLanguageFlag(lang.code)}</span>
                <div className="text-left">
                  <p className="font-medium text-foreground">{lang.name}</p>
                  <p className="text-sm text-muted-foreground">{lang.nativeName}</p>
                </div>
              </div>
              {selectedLanguage === lang.code && (
                <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                  <Check className="w-4 h-4 text-primary-foreground" />
                </div>
              )}
            </button>
          ))}
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 p-4 bg-background border-t border-border safe-area-bottom">
        <div className="max-w-md mx-auto">
          <Button 
            onClick={() => onContinue(selectedLanguage)}
            className="w-full h-14 text-lg font-semibold rounded-2xl"
          >
            Continue
            <ChevronRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </div>
    </MobileLayout>
  );
};

// Helper function to get flag emoji based on language code
function getLanguageFlag(code: string): string {
  const flags: Record<string, string> = {
    en: '🇬🇧',
    hi: '🇮🇳',
    mr: '🇮🇳',
    gu: '🇮🇳',
    ta: '🇮🇳',
    te: '🇮🇳',
    kn: '🇮🇳',
    bn: '🇮🇳',
  };
  return flags[code] || '🌐';
}
