import React, { useState } from 'react';
import { Search, Edit2, Save, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { scrapRates } from '@/data/mockData';
import { cn } from '@/lib/utils';

export const PricingManagement: React.FC = () => {
  const [rates, setRates] = useState(scrapRates);
  const [searchQuery, setSearchQuery] = useState('');
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editValue, setEditValue] = useState('');

  const filteredRates = rates.filter(rate => 
    rate.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    rate.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const categories = [...new Set(rates.map(r => r.category))];

  const handleEdit = (id: number, currentRate: number) => {
    setEditingId(id);
    setEditValue(currentRate.toString());
  };

  const handleSave = (id: number) => {
    const newRate = parseFloat(editValue);
    if (!isNaN(newRate) && newRate >= 0) {
      setRates(prev => prev.map(r => 
        r.id === id ? { ...r, rate: newRate } : r
      ));
    }
    setEditingId(null);
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditValue('');
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">Pricing Management</h1>
        <p className="text-muted-foreground">Update scrap rates and pricing</p>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
        <Input
          placeholder="Search by name or category..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10 h-11 rounded-xl"
        />
      </div>

      {/* Pricing Cards by Category */}
      {categories.map((category) => {
        const categoryRates = filteredRates.filter(r => r.category === category);
        if (categoryRates.length === 0) return null;

        return (
          <div key={category} className="space-y-4">
            <h2 className="text-lg font-semibold text-foreground">{category}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {categoryRates.map((rate) => (
                <div 
                  key={rate.id}
                  className="bg-card rounded-2xl border border-border p-5 hover:shadow-card transition-shadow"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-2xl">
                      {rate.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-foreground">{rate.name}</h3>
                      <p className="text-sm text-muted-foreground">per {rate.unit}</p>
                    </div>
                  </div>

                  <div className="mt-4 flex items-center justify-between">
                    {editingId === rate.id ? (
                      <div className="flex items-center gap-2">
                        <span className="text-lg text-muted-foreground">₹</span>
                        <Input
                          type="number"
                          value={editValue}
                          onChange={(e) => setEditValue(e.target.value)}
                          className="w-24 h-10 text-lg font-bold"
                          autoFocus
                        />
                      </div>
                    ) : (
                      <p className="text-2xl font-bold text-primary">₹{rate.rate}</p>
                    )}

                    {editingId === rate.id ? (
                      <div className="flex gap-2">
                        <Button 
                          size="sm" 
                          onClick={() => handleSave(rate.id)}
                          className="rounded-lg"
                        >
                          <Save className="w-4 h-4" />
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={handleCancel}
                          className="rounded-lg"
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                    ) : (
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => handleEdit(rate.id, rate.rate)}
                        className="rounded-lg"
                      >
                        <Edit2 className="w-4 h-4 mr-2" />
                        Edit
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      })}

      {filteredRates.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No items found matching your search</p>
        </div>
      )}
    </div>
  );
};
