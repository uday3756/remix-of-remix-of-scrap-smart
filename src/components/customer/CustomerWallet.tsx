import React from 'react';
import { ArrowLeft, Wallet, ArrowDownCircle, ArrowUpCircle, CreditCard, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { MobileLayout, MobileHeader } from '@/components/ui/MobileLayout';
import { mockWalletBalance, mockWalletTransactions } from '@/data/mockData';
import { cn } from '@/lib/utils';

interface CustomerWalletProps {
  onBack: () => void;
}

export const CustomerWallet: React.FC<CustomerWalletProps> = ({ onBack }) => {
  return (
    <MobileLayout>
      <MobileHeader
        leftAction={
          <button onClick={onBack}>
            <ArrowLeft className="w-6 h-6 text-foreground" />
          </button>
        }
        title="My Wallet"
      />

      <div className="py-4 space-y-6 animate-fade-in">
        {/* Balance Card */}
        <div className="gradient-primary rounded-3xl p-6 text-white relative overflow-hidden">
          <div className="absolute -right-8 -top-8 w-32 h-32 bg-white/10 rounded-full" />
          <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-white/10 rounded-full" />
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-2">
              <Wallet className="w-5 h-5" />
              <span className="text-white/80">Available Balance</span>
            </div>
            <p className="text-4xl font-bold mb-4">₹{mockWalletBalance}</p>
            <div className="flex gap-3">
              <Button size="sm" className="bg-white text-primary hover:bg-white/90">
                <ArrowUpCircle className="w-4 h-4 mr-2" />
                Withdraw
              </Button>
              <Button size="sm" variant="outline" className="border-white text-white hover:bg-white/10">
                <CreditCard className="w-4 h-4 mr-2" />
                Add Bank
              </Button>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 gap-3">
          <div className="p-4 bg-card rounded-2xl border border-border">
            <div className="flex items-center gap-2 text-success mb-1">
              <TrendingUp className="w-4 h-4" />
              <span className="text-sm">Total Earned</span>
            </div>
            <p className="text-2xl font-bold text-foreground">₹2,450</p>
          </div>
          <div className="p-4 bg-card rounded-2xl border border-border">
            <div className="flex items-center gap-2 text-muted-foreground mb-1">
              <ArrowUpCircle className="w-4 h-4" />
              <span className="text-sm">Withdrawn</span>
            </div>
            <p className="text-2xl font-bold text-foreground">₹2,005</p>
          </div>
        </div>

        {/* Transactions */}
        <div>
          <h3 className="font-semibold text-foreground mb-4">Transaction History</h3>
          <div className="space-y-3">
            {mockWalletTransactions.map((txn) => (
              <div
                key={txn.id}
                className="flex items-center justify-between p-4 bg-card rounded-2xl border border-border"
              >
                <div className="flex items-center gap-3">
                  <div className={cn(
                    "w-10 h-10 rounded-full flex items-center justify-center",
                    txn.type === 'credit' ? "bg-success/10" : "bg-destructive/10"
                  )}>
                    {txn.type === 'credit' ? (
                      <ArrowDownCircle className="w-5 h-5 text-success" />
                    ) : (
                      <ArrowUpCircle className="w-5 h-5 text-destructive" />
                    )}
                  </div>
                  <div>
                    <p className="font-medium text-foreground">{txn.description}</p>
                    <p className="text-sm text-muted-foreground">{txn.date}</p>
                  </div>
                </div>
                <p className={cn(
                  "font-bold",
                  txn.type === 'credit' ? "text-success" : "text-destructive"
                )}>
                  {txn.type === 'credit' ? '+' : '-'}₹{txn.amount}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </MobileLayout>
  );
};
