'use client';

import UserHeader from '@/components/UserHeader';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { getCurrentUser } from '@/utils/auth';
import { useActiveAccount } from '@/contexts/ActiveAccountContext';
import { TradingAccount } from '@/types';

interface AccountStats {
  totalAccounts: number;
  totalEquity: number;
  averageReturn: number;
}

export default function MyAccountsClient() {
  const { activeAccount, setActiveAccount } = useActiveAccount();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(true);
  const [accounts, setAccounts] = useState<TradingAccount[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [stats, setStats] = useState<AccountStats>({
    totalAccounts: 0,
    totalEquity: 0,
    averageReturn: 0,
  });

  const handleSetActiveAccount = (account: TradingAccount) => {
    setActiveAccount(account);
    // Show feedback
    alert(`Account ${account.account_uid} is now active. All pages will display data for this account.`);
  };

  useEffect(() => {
    fetchUserAccounts();
  }, []);

  const fetchUserAccounts = async () => {
    try {
      setLoading(true);
      setError(null);

      // First, try to get user from Supabase auth (which has UUID)
      let userId: string | null = null;
      
      const { data: { user: authUser } } = await supabase.auth.getUser();
      if (authUser) {
        userId = authUser.id;
        console.log('✅ Found user from Supabase auth:', userId);
      } else {
        // Fallback to session storage user
        const sessionUser = getCurrentUser();
        if (sessionUser?.id) {
          userId = sessionUser.id;
          console.log('✅ Found user from session storage:', userId);
          
          // If session user ID is not a UUID, try to find the user in users table
          // and get their user_uuid which should match the user_id in tradingAccounts
          if (!userId.match(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i)) {
            const { data: userData, error: userError } = await supabase
              .from('users')
              .select('user_uuid')
              .eq('email', sessionUser.email)
              .single();
            
            if (!userError && userData?.user_uuid) {
              userId = userData.user_uuid;
              console.log('✅ Found user_uuid from users table:', userId);
            }
          }
        }
      }

      if (!userId) {
        setError('No user session found. Please log in again.');
        setLoading(false);
        return;
      }

      // Fetch trading accounts for this user
      let { data: tradingAccounts, error: accountsError } = await supabase
        .from('tradingAccounts')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false });

      if (accountsError) {
        console.error('Error fetching trading accounts:', accountsError);
        setError('Failed to fetch trading accounts. Please try again.');
        setLoading(false);
        return;
      }

      if (tradingAccounts && tradingAccounts.length > 0) {
        // Fix accounts that were incorrectly created as demo during signup
        // These should be standard accounts with 0 balance
        const accountsToFix = tradingAccounts.filter((acc: any) => 
          acc.account_type === 'demo' && acc.balance === 10000
        );
        
        if (accountsToFix.length > 0) {
          console.log(`🔧 Fixing ${accountsToFix.length} incorrectly created demo accounts...`);
          for (const account of accountsToFix) {
            try {
              const { error: updateError } = await supabase
                .from('tradingAccounts')
                 .update({
                   account_type: 'real',
                   balance: 0.0,
                   free_margin: 0.0,
                   equity: 0.0
                 })
                .eq('id', account.id);
              
              if (updateError) {
                console.error(`Error fixing account ${account.id}:`, updateError);
              } else {
                console.log(`✅ Fixed account ${account.account_uid} (ID: ${account.id})`);
              }
            } catch (fixError) {
              console.error(`Exception fixing account ${account.id}:`, fixError);
            }
          }
          
          // Refetch accounts after fixing
          const { data: updatedAccounts, error: refetchError } = await supabase
            .from('tradingAccounts')
            .select('*')
            .eq('user_id', userId)
            .order('created_at', { ascending: false });
          
          if (!refetchError && updatedAccounts) {
            tradingAccounts = updatedAccounts;
          }
        }
        
        // Transform and set accounts
        const transformedAccounts: TradingAccount[] = tradingAccounts.map((account: any) => ({
          id: account.id,
          account_uid: account.account_uid,
          account_password: account.account_password,
          levarage: account.levarage || 0,
          balance: account.balance || 0,
          currency: account.currency || 'USD',
          status: account.status || 'active',
          created_at: account.created_at,
          free_margin: account.free_margin || 0,
          equity: account.equity || account.balance || 0,
          user_id: account.user_id,
          margin: account.margin || 0,
          watchlist: account.watchlist || [],
          account_type: account.account_type || 'real',
        }));

        setAccounts(transformedAccounts);

        // Calculate statistics
        const activeAccounts = transformedAccounts.filter(acc => 
          acc.status === 'active'
        );
        
        const totalEquity = transformedAccounts.reduce((sum, acc) => sum + (acc.equity || acc.balance || 0), 0);
        const totalBalance = transformedAccounts.reduce((sum, acc) => sum + (acc.balance || 0), 0);
        const totalPL = totalEquity - totalBalance;
        const averageReturn = totalBalance > 0 ? (totalPL / totalBalance) * 100 : 0;

        setStats({
          totalAccounts: activeAccounts.length,
          totalEquity,
          averageReturn,
        });

        console.log('✅ Successfully fetched accounts:', transformedAccounts.length);
      } else {
        setAccounts([]);
        setStats({
          totalAccounts: 0,
          totalEquity: 0,
          averageReturn: 0,
        });
        console.log('ℹ️ No trading accounts found for this user');
      }
    } catch (err) {
      console.error('Exception while fetching accounts:', err);
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (amount: number, currency: string = 'USD'): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);
  };

  const formatAccountType = (type: string): string => {
    const typeMap: { [key: string]: string } = {
      'real': 'Real Trading Account',
      'standard': 'Standard Trading Account',
      'premium': 'Premium Trading Account',
      'vip': 'VIP Trading Account',
      'demo': 'Demo Account',
      'demo_30': 'Demo Account (30 days)',
      'demo_60': 'Demo Account (60 days)',
      'demo_90': 'Demo Account (90 days)',
      'demo_unlimited': 'Demo Account (Unlimited)',
    };
    return typeMap[type] || 'Trading Account';
  };

  const getStatusBadge = (status: string, accountType: string) => {
    if (accountType?.includes('demo')) {
      return (
        <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-medium">
          Demo
        </span>
      );
    }
    
    const statusLower = status?.toLowerCase();
    if (statusLower === 'active') {
      return (
        <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-medium">
          Active
        </span>
      );
    } else if (statusLower === 'inactive') {
      return (
        <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded text-xs font-medium">
          Inactive
        </span>
      );
    } else if (statusLower === 'suspended') {
      return (
        <span className="bg-red-100 text-red-800 px-2 py-1 rounded text-xs font-medium">
          Suspended
        </span>
      );
    } else {
      return (
        <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-xs font-medium">
          {status || 'Pending'}
        </span>
      );
    }
  };

  return (
    <div className={`flex h-screen overflow-hidden ${darkMode ? 'bg-[#0A2E1D]' : 'bg-gray-100'}`}>
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 ${darkMode ? 'bg-[#0F1B14] border-[#A0C8A9]/20' : 'bg-white border-gray-200'} border-r flex flex-col transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        {/* Logo */}
        <div className={`p-6 border-b ${darkMode ? 'border-[#A0C8A9]/20' : 'border-gray-200'}`}>
          <div className="flex items-center">
            <Image
              src="/logo/raz-capitals-logo.png"
              alt="RAZ CAPITALS"
              width={170}
              height={63}
              priority
              className="h-14 w-auto"
            />
          </div>
        </div>

        {/* Navigation - Scrollable Area */}
        <div className="flex-1 overflow-y-auto">
          <nav className="px-4 py-6 space-y-2">
            <a href="/dashboard" className={`flex items-center space-x-3 px-4 py-3 ${darkMode ? 'text-[#A0C8A9]/70 hover:text-white hover:bg-[#A0C8A9]/10' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'} rounded-lg transition-colors`}>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5a2 2 0 012-2h4a2 2 0 012 2v4H8V5z" />
              </svg>
              <span>Dashboard</span>
            </a>
            
            {/* Wallets menu item temporarily removed */}
            
            <a href="/dashboard/my-accounts" className={`flex items-center space-x-3 px-4 py-3 ${darkMode ? 'text-white bg-[#A0C8A9]/10 border-[#A0C8A9]' : 'text-gray-900 bg-blue-50 border-blue-500'} rounded-lg border-l-4`}>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              <span className="font-medium">My Accounts</span>
            </a>
            
            {/* New Account menu item temporarily removed */}
            
            <a href="/dashboard/deposit" className={`flex items-center space-x-3 px-4 py-3 ${darkMode ? 'text-[#A0C8A9]/70 hover:text-white hover:bg-[#A0C8A9]/10' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'} rounded-lg transition-colors`}>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" />
              </svg>
              <span>Deposit</span>
            </a>
            
            <a href="/dashboard/withdraw" className={`flex items-center space-x-3 px-4 py-3 ${darkMode ? 'text-[#A0C8A9]/70 hover:text-white hover:bg-[#A0C8A9]/10' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'} rounded-lg transition-colors`}>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
              <span>Withdraw</span>
            </a>
            
            <a href="/dashboard/history" className={`flex items-center space-x-3 px-4 py-3 ${darkMode ? 'text-[#A0C8A9]/70 hover:text-white hover:bg-[#A0C8A9]/10' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'} rounded-lg transition-colors`}>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>History</span>
            </a>
          </nav>
        </div>
        
        {/* Settings at bottom */}
        <div className={`p-4 border-t ${darkMode ? 'border-[#A0C8A9]/20' : 'border-gray-200'}`}>
          <a href="/dashboard/settings" className={`flex items-center space-x-3 px-4 py-3 ${darkMode ? 'text-[#A0C8A9]/70 hover:text-white hover:bg-[#A0C8A9]/10' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'} rounded-lg transition-colors`}>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span>Settings</span>
          </a>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Header */}
        <UserHeader 
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
          darkMode={darkMode}
          setDarkMode={setDarkMode}
        />

        {/* My Accounts Content */}
        <div className={`flex-1 p-4 sm:p-6 space-y-4 sm:space-y-6 overflow-y-auto ${darkMode ? 'bg-[#B8D4C1]' : 'bg-gray-50'}`}>
          {/* Page Title */}
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-[#1E2E23] mb-2">My Accounts</h2>
            <p className="text-[#2D4A35] text-sm sm:text-base">View and manage all your trading accounts and their performance.</p>
          </div>

          {/* Account Overview */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            <div className="bg-[#2D4A35] rounded-lg p-4 sm:p-6 text-white">
              <h3 className="text-sm text-[#A0C8A9] mb-2">Total Accounts</h3>
              {loading ? (
                <p className="text-xl sm:text-2xl font-bold">...</p>
              ) : (
                <p className="text-xl sm:text-2xl font-bold">{stats.totalAccounts}</p>
              )}
              <p className="text-xs text-[#A0C8A9]/70 mt-1">Active Trading Accounts</p>
            </div>
            <div className="bg-[#2D4A35] rounded-lg p-4 sm:p-6 text-white">
              <h3 className="text-sm text-[#A0C8A9] mb-2">Total Equity</h3>
              {loading ? (
                <p className="text-xl sm:text-2xl font-bold">...</p>
              ) : (
                <p className="text-xl sm:text-2xl font-bold">
                  {formatCurrency(stats.totalEquity, accounts[0]?.currency || 'USD')}
                </p>
              )}
              <p className="text-xs text-[#A0C8A9]/70 mt-1">Across All Accounts</p>
            </div>
            <div className="bg-[#2D4A35] rounded-lg p-4 sm:p-6 text-white sm:col-span-2 lg:col-span-1">
              <h3 className="text-sm text-[#A0C8A9] mb-2">Average Return</h3>
              {loading ? (
                <p className="text-xl sm:text-2xl font-bold">...</p>
              ) : (
                <p className={`text-xl sm:text-2xl font-bold ${stats.averageReturn >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                  {stats.averageReturn >= 0 ? '+' : ''}{stats.averageReturn.toFixed(2)}%
                </p>
              )}
              <p className="text-xs text-[#A0C8A9]/70 mt-1">Overall Performance</p>
            </div>
          </div>

          {/* Account List */}
          <div className="bg-[#2D4A35] rounded-lg p-4 sm:p-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 sm:mb-6 space-y-3 sm:space-y-0">
              <h3 className="text-white text-base sm:text-lg font-medium">Trading Accounts</h3>
              {/* Create New Account button temporarily removed */}
            </div>
            
            {loading ? (
              <div className="flex items-center justify-center py-12">
                <div className="text-white text-center">
                  <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-[#A0C8A9] mb-4"></div>
                  <p className="text-[#A0C8A9]">Loading your accounts...</p>
                </div>
              </div>
            ) : error ? (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-center">
                <p className="text-red-800 text-sm">{error}</p>
                <button
                  onClick={fetchUserAccounts}
                  className="mt-3 bg-red-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-red-700 transition-colors"
                >
                  Retry
                </button>
              </div>
            ) : accounts.length === 0 ? (
              <div className="bg-[#B8D4C1] rounded-lg p-8 text-center">
                <svg className="mx-auto h-12 w-12 text-[#2D4A35] mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                </svg>
                <p className="text-[#1E2E23] font-medium mb-2">No trading accounts found</p>
                <p className="text-[#2D4A35] text-sm mb-4">Get started by creating your first trading account.</p>
                {/* Create New Account button temporarily removed */}
              </div>
            ) : (
              <div className="space-y-4">
                {accounts.map((account) => {
                  const pl = (account.equity || account.balance || 0) - (account.balance || 0);
                  const plPercent = account.balance > 0 ? (pl / account.balance) * 100 : 0;
                  const isActive = activeAccount?.account_uid === account.account_uid;
                  
                  return (
                    <div key={account.id} className={`bg-[#B8D4C1] rounded-lg p-3 sm:p-4 ${isActive ? 'ring-2 ring-[#A0C8A9] ring-offset-2' : ''}`}>
                      <div className="flex flex-col sm:flex-row justify-between items-start mb-2 space-y-2 sm:space-y-0">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2">
                          <h4 className="text-[#1E2E23] font-medium text-sm sm:text-base">
                            {formatAccountType(account.account_type)}
                          </h4>
                            {isActive && (
                              <span className="px-2 py-0.5 bg-[#A0C8A9] text-[#0A2E1D] text-xs font-medium rounded">
                                Active
                              </span>
                            )}
                          </div>
                          <p className="text-[#2D4A35] text-xs sm:text-sm">
                            Account #: {account.account_uid}
                          </p>
                        </div>
                        <div className="flex items-center space-x-2">
                        {getStatusBadge(account.status, account.account_type)}
                          {!isActive && (
                            <button
                              onClick={() => handleSetActiveAccount(account)}
                              className="px-3 py-1 bg-[#2D4A35] text-white text-xs rounded hover:bg-[#3A5642] transition-colors"
                              title="Set as active account"
                            >
                              Set Active
                            </button>
                          )}
                        </div>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mt-3 sm:mt-4">
                        <div>
                          <p className="text-[#2D4A35] text-xs">Balance</p>
                          <p className="text-[#1E2E23] font-bold text-sm sm:text-base">
                            {formatCurrency(account.balance || 0, account.currency)}
                          </p>
                        </div>
                        <div>
                          <p className="text-[#2D4A35] text-xs">Equity</p>
                          <p className="text-[#1E2E23] font-bold text-sm sm:text-base">
                            {formatCurrency(account.equity || account.balance || 0, account.currency)}
                          </p>
                        </div>
                        <div>
                          <p className="text-[#2D4A35] text-xs">P&L</p>
                          <p className={`font-bold text-sm sm:text-base ${pl >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                            {pl >= 0 ? '+' : ''}{formatCurrency(pl, account.currency)}
                            {plPercent !== 0 && (
                              <span className="ml-1 text-xs">
                                ({plPercent >= 0 ? '+' : ''}{plPercent.toFixed(2)}%)
                              </span>
                            )}
                          </p>
                        </div>
                      </div>
                      {account.levarage > 0 && (
                        <div className="mt-3 pt-3 border-t border-[#2D4A35]/20">
                          <div className="flex justify-between items-center text-xs">
                            <span className="text-[#2D4A35]">Leverage:</span>
                            <span className="text-[#1E2E23] font-medium">1:{account.levarage}</span>
                          </div>
                          {account.free_margin > 0 && (
                            <div className="flex justify-between items-center text-xs mt-1">
                              <span className="text-[#2D4A35]">Free Margin:</span>
                              <span className="text-[#1E2E23] font-medium">
                                {formatCurrency(account.free_margin, account.currency)}
                              </span>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
