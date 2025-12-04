'use client';

import { useActiveAccount } from '@/contexts/ActiveAccountContext';
import { useEffect, useState } from 'react';

interface BalanceDetails {
  totalBalance: number;
  currentBalance: number;
  walletBalance: number;
  currency: string;
}

export default function UserBalanceDetails() {
  const { activeAccount, loading: accountLoading } = useActiveAccount();
  const [balanceDetails, setBalanceDetails] = useState<BalanceDetails | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (accountLoading) {
      setIsLoading(true);
      return;
    }

    if (!activeAccount) {
      setError('No trading account found. Please create an account.');
      setIsLoading(false);
      return;
    }

    // Use balance from active account
    const balance = activeAccount.balance || 0;
    const currency = activeAccount.currency || 'USD';
    
    if (process.env.NODE_ENV === 'development') {
      console.log('💰 Balance from active account:', {
        account_uid: activeAccount.account_uid,
        balance,
        currency
      });
    }

    setBalanceDetails({
      totalBalance: balance,
      currentBalance: balance,
      walletBalance: balance,
      currency
    });

    setIsLoading(false);
    setError(null);
  }, [activeAccount, accountLoading]);

  const refreshBalance = () => {
    // Balance is automatically updated when activeAccount changes
    // This function can trigger a refresh of the active account data
    if (activeAccount) {
      // The balance will update automatically via useEffect
      window.dispatchEvent(new CustomEvent('accountChanged', { detail: { accountUid: activeAccount.account_uid } }));
    }
  };

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 gap-6 mb-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="animate-pulse">
            <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
            <div className="h-8 bg-gray-200 rounded w-1/2"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
        <div className="flex items-center">
          <svg className="w-5 h-5 text-red-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
          <span className="text-red-800 text-sm">{error}</span>
        </div>
        <button
          onClick={refreshBalance}
          className="mt-2 text-red-600 hover:text-red-800 text-sm underline"
        >
          Try again
        </button>
      </div>
    );
  }

  if (!balanceDetails) {
    return (
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
        <div className="flex items-center">
          <svg className="w-5 h-5 text-yellow-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
          <span className="text-yellow-800 text-sm">No balance information available</span>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:gap-6">
      {/* Total Balance - Only showing this card now */}
      <div className="bg-[#2D4A35] text-white rounded-lg p-4 sm:p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm text-[#A0C8A9]">Balance</h3>
          <button
            onClick={refreshBalance}
            className="text-[#A0C8A9] hover:text-white transition-colors"
            title="Refresh balance"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
          </button>
        </div>
        <div className="text-xl sm:text-2xl font-bold">
          {balanceDetails.totalBalance.toLocaleString('en-US', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
          })}
        </div>
        <p className="text-sm text-[#A0C8A9] mt-1">{balanceDetails.currency}</p>
      </div>

      {/* Current Balance and Wallet Balance cards temporarily hidden */}
      {/* 
      <div className="bg-[#2D4A35] text-white rounded-lg p-4 sm:p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm text-[#A0C8A9]">Current Balance</h3>
          <div className="w-3 h-3 bg-green-400 rounded-full"></div>
        </div>
        <div className="text-xl sm:text-2xl font-bold">
          {balanceDetails.currentBalance.toLocaleString('en-US', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
          })}
        </div>
        <p className="text-sm text-[#A0C8A9] mt-1">{balanceDetails.currency}</p>
      </div>

      <div className="bg-[#2D4A35] text-white rounded-lg p-4 sm:p-6 sm:col-span-2 lg:col-span-1">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm text-[#A0C8A9]">Wallet Balance</h3>
          <div className="w-3 h-3 bg-blue-400 rounded-full"></div>
        </div>
        <div className="text-xl sm:text-2xl font-bold">
          {balanceDetails.walletBalance.toLocaleString('en-US', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
          })}
        </div>
        <p className="text-sm text-[#A0C8A9] mt-1">{balanceDetails.currency}</p>
      </div>
      */}

    </div>
  );
}
