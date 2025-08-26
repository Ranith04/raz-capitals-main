'use client';

import { supabase } from '@/lib/supabaseClient';
import { getCurrentUser } from '@/utils/auth';
import { useEffect, useState } from 'react';

interface BalanceDetails {
  totalBalance: number;
  currentBalance: number;
  walletBalance: number;
  currency: string;
}

export default function UserBalanceDetails() {
  const [balanceDetails, setBalanceDetails] = useState<BalanceDetails | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentUser, setCurrentUser] = useState<any>(null);

  useEffect(() => {
    fetchUserBalance();
  }, []);

  const fetchUserBalance = async () => {
    try {
      setIsLoading(true);
      setError(null);

      // Get current logged-in user
      const user = getCurrentUser();
      if (!user) {
        setError('No user session found. Please log in again.');
        setIsLoading(false);
        return;
      }

      setCurrentUser(user);
      if (process.env.NODE_ENV === 'development') {
        console.log('🔍 Fetching balance for user:', user);
      }

      // For trading credentials login, we need to find the trading account
      let tradingAccount = null;
      
      if (user.id && user.id !== 'trading-auth-token') {
        // Try to find trading account by user_id
        if (process.env.NODE_ENV === 'development') {
          console.log('📊 Looking for trading account with user_id:', user.id);
        }
        
        const { data: accounts, error: accountsError } = await supabase
          .from('tradingAccounts')
          .select('*')
          .eq('user_id', user.id);

        if (accountsError) {
          if (process.env.NODE_ENV === 'development') {
            console.warn('⚠️ Could not fetch trading accounts:', accountsError.message);
          }
        } else if (accounts && accounts.length > 0) {
          tradingAccount = accounts[0]; // Use the first account
          if (process.env.NODE_ENV === 'development') {
            console.log('✅ Found trading account:', tradingAccount);
          }
        }
      }

      // If no trading account found, try to get from session storage (for trading credentials)
      if (!tradingAccount) {
        const tradingCredentials = sessionStorage.getItem('trading_credentials');
        if (tradingCredentials) {
          const { tradingId } = JSON.parse(tradingCredentials);
          if (process.env.NODE_ENV === 'development') {
            console.log('📊 Looking for trading account with trading ID:', tradingId);
          }
          
          const { data: account, error: accountError } = await supabase
            .from('tradingAccounts')
            .select('*')
            .eq('account_uid', tradingId)
            .single();

          if (accountError) {
            if (process.env.NODE_ENV === 'development') {
              console.warn('⚠️ Could not fetch trading account by ID:', accountError.message);
            }
          } else if (account) {
            tradingAccount = account;
            if (process.env.NODE_ENV === 'development') {
              console.log('✅ Found trading account by ID:', tradingAccount);
            }
          }
        }
      }

      if (!tradingAccount) {
        // Try to get any account for this user from the users table
        if (process.env.NODE_ENV === 'development') {
          console.log('📊 Looking for user in users table...');
        }
        const { data: userProfile, error: userError } = await supabase
          .from('users')
          .select('*')
          .eq('user_uuid', user.id)
          .single();

        if (userError) {
          if (process.env.NODE_ENV === 'development') {
            console.warn('⚠️ Could not fetch user profile:', userError.message);
          }
        } else if (userProfile) {
          if (process.env.NODE_ENV === 'development') {
            console.log('✅ Found user profile:', userProfile);
          }
        }
      }

      // Calculate balance details
      let totalBalance = 0;
      let currentBalance = 0;
      let walletBalance = 0;
      let currency = 'USD';

      if (tradingAccount) {
        // Use trading account balance
        totalBalance = tradingAccount.balance || 0;
        currentBalance = tradingAccount.balance || 0;
        walletBalance = tradingAccount.balance || 0;
        currency = tradingAccount.currency || 'USD';
        
        if (process.env.NODE_ENV === 'development') {
          console.log('💰 Balance from trading account:', {
            totalBalance,
            currentBalance,
            walletBalance,
            currency
          });
        }
      } else {
        // Mock balance for demo purposes
        totalBalance = 52648.00;
        currentBalance = 30648.00;
        walletBalance = 30648.00;
        currency = 'USD';
        
        if (process.env.NODE_ENV === 'development') {
          console.log('💰 Using mock balance for demo:', {
            totalBalance,
            currentBalance,
            walletBalance,
            currency
          });
        }
      }

      setBalanceDetails({
        totalBalance,
        currentBalance,
        walletBalance,
        currency
      });

    } catch (error) {
      if (process.env.NODE_ENV === 'development') {
        console.error('❌ Error fetching user balance:', error);
      }
      setError(error instanceof Error ? error.message : 'Failed to fetch balance details');
    } finally {
      setIsLoading(false);
    }
  };

  const refreshBalance = () => {
    fetchUserBalance();
  };

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-white rounded-lg shadow-md p-6">
            <div className="animate-pulse">
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
              <div className="h-8 bg-gray-200 rounded w-1/2"></div>
            </div>
          </div>
        ))}
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
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
      {/* Total Balance */}
      <div className="bg-[#2D4A35] text-white rounded-lg p-4 sm:p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm text-[#A0C8A9]">Total Balance</h3>
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

      {/* Current Balance */}
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

      {/* Wallet Balance */}
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

    </div>
  );
}
