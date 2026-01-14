import React, { useState } from 'react';
import { ArrowLeft, Calendar as CalendarIcon, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { MobileLayout, MobileHeader } from '@/components/ui/MobileLayout';
import { timeSlots } from '@/data/mockData';
import { cn } from '@/lib/utils';

interface CreatePickupDateTimeProps {
  onContinue: (date: Date, timeSlot: string) => void;
  onBack: () => void;
}

export const CreatePickupDateTime: React.FC<CreatePickupDateTimeProps> = ({
  onContinue,
  onBack,
}) => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>('');
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDay = firstDay.getDay();
    
    const days: (Date | null)[] = [];
    
    // Add empty slots for days before the first day of the month
    for (let i = 0; i < startingDay; i++) {
      days.push(null);
    }
    
    // Add all days of the month
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(new Date(year, month, i));
    }
    
    return days;
  };

  const formatMonth = (date: Date) => {
    return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  };

  const isDateDisabled = (date: Date | null) => {
    if (!date) return true;
    const compareDate = new Date(date);
    compareDate.setHours(0, 0, 0, 0);
    return compareDate < today;
  };

  const isDateSelected = (date: Date | null) => {
    if (!date || !selectedDate) return false;
    return date.toDateString() === selectedDate.toDateString();
  };

  const prevMonth = () => {
    setCurrentMonth(prev => new Date(prev.getFullYear(), prev.getMonth() - 1, 1));
  };

  const nextMonth = () => {
    setCurrentMonth(prev => new Date(prev.getFullYear(), prev.getMonth() + 1, 1));
  };

  const days = getDaysInMonth(currentMonth);
  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <MobileLayout>
      <MobileHeader 
        leftAction={
          <button onClick={onBack}>
            <ArrowLeft className="w-6 h-6 text-foreground" />
          </button>
        }
        title="Schedule Pickup"
        subtitle="Step 1 of 2"
      />
      
      <div className="py-4 animate-fade-in">
        {/* Calendar Header */}
        <div className="flex items-center justify-between mb-4">
          <button 
            onClick={prevMonth}
            className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center"
          >
            <ChevronLeft className="w-5 h-5 text-foreground" />
          </button>
          <h3 className="font-semibold text-foreground">{formatMonth(currentMonth)}</h3>
          <button 
            onClick={nextMonth}
            className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center"
          >
            <ChevronRight className="w-5 h-5 text-foreground" />
          </button>
        </div>

        {/* Week Days */}
        <div className="grid grid-cols-7 gap-1 mb-2">
          {weekDays.map(day => (
            <div key={day} className="text-center text-xs font-medium text-muted-foreground py-2">
              {day}
            </div>
          ))}
        </div>

        {/* Calendar Grid */}
        <div className="grid grid-cols-7 gap-1 mb-6">
          {days.map((date, index) => (
            <button
              key={index}
              disabled={isDateDisabled(date)}
              onClick={() => date && setSelectedDate(date)}
              className={cn(
                "aspect-square rounded-xl flex items-center justify-center text-sm transition-all",
                !date && "invisible",
                isDateDisabled(date) && "text-muted-foreground/50 cursor-not-allowed",
                !isDateDisabled(date) && !isDateSelected(date) && "text-foreground hover:bg-muted",
                isDateSelected(date) && "bg-primary text-primary-foreground font-semibold"
              )}
            >
              {date?.getDate()}
            </button>
          ))}
        </div>

        {/* Time Slots */}
        <div>
          <h3 className="font-semibold text-foreground mb-3">Select Time Slot</h3>
          <div className="space-y-2">
            {timeSlots.map((slot) => (
              <button
                key={slot.id}
                disabled={!slot.available}
                onClick={() => setSelectedTimeSlot(slot.time)}
                className={cn(
                  "w-full p-4 rounded-2xl border-2 text-left transition-all",
                  !slot.available && "opacity-50 cursor-not-allowed bg-muted border-border",
                  slot.available && selectedTimeSlot !== slot.time && "border-border bg-card hover:border-primary/50",
                  selectedTimeSlot === slot.time && "border-primary bg-primary/5"
                )}
              >
                <div className="flex items-center justify-between">
                  <span className={cn(
                    "font-medium",
                    selectedTimeSlot === slot.time ? "text-primary" : "text-foreground"
                  )}>
                    {slot.time}
                  </span>
                  {!slot.available && (
                    <span className="text-xs text-muted-foreground">Not available</span>
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 p-4 bg-background border-t border-border safe-area-bottom">
        <div className="max-w-md mx-auto">
          <Button 
            onClick={() => onContinue(selectedDate, selectedTimeSlot)}
            disabled={!selectedDate || !selectedTimeSlot}
            className="w-full h-14 text-lg font-semibold rounded-2xl"
          >
            Continue to Scrap Details
          </Button>
        </div>
      </div>
    </MobileLayout>
  );
};
