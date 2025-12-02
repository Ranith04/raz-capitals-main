'use client';

import UserHeader from '@/components/UserHeader';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { getCurrentUser } from '@/utils/auth';
import { TradingAccount } from '@/types';

interface TransactionHistoryItem {
  id: string;
  date: string;
  type: string;
  description: string;
  account: string;
  amount: string;
  status: string;
  amountType: 'positive' | 'negative' | 'neutral';
  rawDate: string;
  accountUid?: string; // Store account_uid for filtering
}

export default function HistoryPage() {
  const [activeTab, setActiveTab] = useState('transactions');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(true);
  const [transactions, setTransactions] = useState<TransactionHistoryItem[]>([]);
  const [accounts, setAccounts] = useState<TradingAccount[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Filters
  const [daysFilter, setDaysFilter] = useState<string>('all');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [accountFilter, setAccountFilter] = useState<string>('all');

  useEffect(() => {
    fetchUserData();
  }, []);

  useEffect(() => {
    if (accounts.length > 0) {
      fetchTransactions();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [daysFilter, typeFilter, statusFilter, accountFilter, accounts.length]);

  const fetchUserData = async () => {
    try {
      setLoading(true);
      setError(null);

      // Get user ID
      let userId: string | null = null;
      
      const { data: { user: authUser } } = await supabase.auth.getUser();
      if (authUser) {
        userId = authUser.id;
      } else {
        const sessionUser = getCurrentUser();
        if (sessionUser?.id) {
          userId = sessionUser.id;
          
          if (!userId.match(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i)) {
            const { data: userData, error: userError } = await supabase
              .from('users')
              .select('user_uuid')
              .eq('email', sessionUser.email)
              .single();
            
            if (!userError && userData?.user_uuid) {
              userId = userData.user_uuid;
            }
          }
        }
      }

      if (!userId) {
        setError('No user session found. Please log in again.');
        setLoading(false);
        return;
      }

      // Fetch user's trading accounts
      const { data: tradingAccounts, error: accountsError } = await supabase
        .from('tradingAccounts')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false });

      if (accountsError) {
        console.error('Error fetching trading accounts:', accountsError);
        setError('Failed to fetch accounts. Please try again.');
        setLoading(false);
        return;
      }

      if (tradingAccounts && tradingAccounts.length > 0) {
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
          account_type: account.account_type || 'standard',
        }));

        setAccounts(transformedAccounts);
      } else {
        setAccounts([]);
      }
    } catch (err) {
      console.error('Exception while fetching data:', err);
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const fetchTransactions = async () => {
    try {
      setLoading(true);
      setError(null);
      
      if (accounts.length === 0) {
        setTransactions([]);
        setLoading(false);
        return;
      }

      const accountUids = accounts.map(acc => acc.account_uid);
      
      // Build date filter
      let dateFilter: Date | null = null;
      if (daysFilter !== 'all') {
        const days = parseInt(daysFilter);
        if (!isNaN(days)) {
          dateFilter = new Date();
          dateFilter.setDate(dateFilter.getDate() - days);
        }
      }

      // Determine which account UIDs to use for filtering
      const filteredAccountUids = accountFilter !== 'all' 
        ? [accountFilter] 
        : accountUids;

      // Fetch transactions (only if typeFilter allows it)
      let allTransactions: TransactionHistoryItem[] = [];

      // Only fetch transactions if typeFilter is 'all' or matches transaction types
      if (typeFilter === 'all' || typeFilter === 'deposit' || typeFilter === 'withdrawal' || typeFilter === 'transfer') {
        let query = supabase
          .from('transactions')
          .select('*')
          .in('account_id', filteredAccountUids)
          .order('created_at', { ascending: false });

        // Apply type filter (typeFilter is already lowercase from dropdown)
        if (typeFilter !== 'all') {
          query = query.eq('type', typeFilter);
        }

        // Apply status filter (statusFilter is already lowercase from dropdown)
        if (statusFilter !== 'all') {
          query = query.eq('status', statusFilter);
        }

        // Apply date filter
        if (dateFilter) {
          query = query.gte('created_at', dateFilter.toISOString());
        }

        const { data: transactionsData, error: transactionsError } = await query;

        if (transactionsError) {
          console.error('Error fetching transactions:', transactionsError);
        } else if (transactionsData) {
          // Transform transactions for display
          const transformedTransactions: TransactionHistoryItem[] = transactionsData.map((tx: any) => {
            const account = accounts.find(acc => acc.account_uid === tx.account_id);
            const accountName = account ? formatAccountType(account.account_type) : `Account ${tx.account_uid}`;
            
            let description = tx.transaction_comments || '';
            if (!description) {
              if (tx.type === 'deposit') {
                description = tx.mode_of_payment ? `${formatPaymentMethod(tx.mode_of_payment)} Deposit` : 'Deposit';
              } else if (tx.type === 'withdrawal') {
                description = tx.mode_of_payment ? `${formatPaymentMethod(tx.mode_of_payment)} Withdrawal` : 'Withdrawal';
              } else if (tx.type === 'transfer') {
                const toAccount = accounts.find(acc => acc.account_uid === tx.to_account_id);
                description = toAccount 
                  ? `Transfer to ${formatAccountType(toAccount.account_type)}`
                  : 'Transfer';
              }
            }

            let amountType: 'positive' | 'negative' | 'neutral' = 'neutral';
            let amountDisplay = formatCurrency(tx.amount || 0, tx.currency || 'USD');
            
            if (tx.type === 'deposit') {
              amountType = 'positive';
              amountDisplay = '+' + amountDisplay;
            } else if (tx.type === 'withdrawal') {
              amountType = 'negative';
              amountDisplay = '-' + amountDisplay;
            } else if (tx.type === 'transfer') {
              // For transfers, show neutral (no + or -)
              amountType = 'neutral';
            }

            return {
              id: `tx-${tx.id}`,
              date: formatDate(tx.created_at),
              type: capitalizeFirst(tx.type || 'Transaction'),
              description,
              account: accountName,
              amount: amountDisplay,
              status: capitalizeFirst(tx.status || 'pending'),
              amountType,
              rawDate: tx.created_at,
              accountUid: tx.account_id, // Store account_uid for filtering
            };
          });

          allTransactions.push(...transformedTransactions);
        }
      }

      // Fetch trades only if typeFilter is 'all' or 'trade'
      if (typeFilter === 'all' || typeFilter === 'trade') {
        try {
          let tradesQuery = supabase
            .from('trades')
            .select('*')
            .in('account_id', filteredAccountUids)
            .order('created_at', { ascending: false })
            .limit(100);

          // Note: Date filtering for trades will be done client-side since trades table
          // might have different date field names (created_at, close_time, open_time)

          const { data: tradesData, error: tradesError } = await tradesQuery;

          if (!tradesError && tradesData) {
            const tradeTransactions: TransactionHistoryItem[] = tradesData
              .map((trade: any) => {
                const account = accounts.find(acc => acc.account_uid === trade.account_id);
                const accountName = account ? formatAccountType(account.account_type) : `Account ${trade.account_id}`;
                
                const description = trade.instrument 
                  ? `${trade.type === 'buy' ? 'Buy' : 'Sell'} ${trade.instrument}`
                  : `${trade.type === 'buy' ? 'Buy' : 'Sell'} Trade`;
                
                const profit = trade.profit || trade.pnl || 0;
                const amountType: 'positive' | 'negative' | 'neutral' = profit >= 0 ? 'positive' : 'negative';
                const amountDisplay = (profit >= 0 ? '+' : '') + formatCurrency(Math.abs(profit), trade.currency || 'USD');

                const tradeStatus = trade.status === 'closed' ? 'Completed' : capitalizeFirst(trade.status || 'Open');
                const tradeDate = trade.created_at || trade.close_time || trade.open_time;

                return {
                  id: `trade-${trade.id}`,
                  date: formatDate(tradeDate),
                  type: 'Trade',
                  description,
                  account: accountName,
                  amount: amountDisplay,
                  status: tradeStatus,
                  amountType,
                  rawDate: tradeDate,
                  accountUid: trade.account_id, // Store account_uid for filtering
                };
              })
              // Apply status filter to trades client-side
              .filter((trade) => {
                if (statusFilter === 'all') return true;
                const tradeStatusLower = trade.status.toLowerCase();
                const filterStatusLower = statusFilter.toLowerCase();
                
                // Map trade statuses to filter statuses
                if (filterStatusLower === 'completed') {
                  return tradeStatusLower === 'completed' || tradeStatusLower === 'closed';
                }
                if (filterStatusLower === 'pending' || filterStatusLower === 'processing') {
                  return tradeStatusLower === 'pending' || tradeStatusLower === 'processing' || tradeStatusLower === 'open';
                }
                return tradeStatusLower === filterStatusLower;
              })
              // Apply account filter to trades client-side (double-check)
              .filter((trade) => {
                if (accountFilter === 'all') return true;
                return trade.accountUid === accountFilter;
              });

            allTransactions.push(...tradeTransactions);
          }
        } catch (err) {
          // Trades table might not exist, that's okay
          console.log('Trades table not available or error fetching:', err);
        }
      }

      // Apply client-side filtering for date (ensures all transaction types are filtered correctly)
      let filteredTransactions = allTransactions;
      
      if (dateFilter) {
        filteredTransactions = filteredTransactions.filter(tx => {
          try {
            const txDate = new Date(tx.rawDate);
            return txDate >= dateFilter!;
          } catch (err) {
            console.error('Error parsing date:', tx.rawDate, err);
            return false;
          }
        });
      }

      // Apply client-side account filter (double-check all transactions)
      if (accountFilter !== 'all') {
        filteredTransactions = filteredTransactions.filter(tx => {
          return tx.accountUid === accountFilter;
        });
      }

      // Sort by date (newest first)
      filteredTransactions.sort((a, b) => 
        new Date(b.rawDate).getTime() - new Date(a.rawDate).getTime()
      );

      setTransactions(filteredTransactions);
    } catch (err) {
      console.error('Exception while fetching transactions:', err);
      setError('An unexpected error occurred while fetching transactions.');
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

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
    });
  };

  const formatAccountType = (type: string): string => {
    const typeMap: { [key: string]: string } = {
      'standard': 'Standard Account',
      'premium': 'Premium Account',
      'vip': 'VIP Account',
      'demo': 'Demo Account',
      'demo_30': 'Demo Account (30 days)',
      'demo_60': 'Demo Account (60 days)',
      'demo_90': 'Demo Account (90 days)',
      'demo_unlimited': 'Demo Account (Unlimited)',
    };
    return typeMap[type] || 'Trading Account';
  };

  const formatPaymentMethod = (method?: string): string => {
    if (!method) return 'Unknown';
    return method.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  };

  const capitalizeFirst = (str: string): string => {
    if (!str) return '';
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  };

  const generateCSV = (): string => {
    const headers = ['Date', 'Type', 'Description', 'Account', 'Amount', 'Status'];
    const rows = transactions.map(tx => [
      tx.date,
      tx.type,
      tx.description,
      tx.account,
      tx.amount,
      tx.status,
    ]);
    
    return [
      headers.join(','),
      ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
    ].join('\n');
  };

  const downloadCSV = (csv: string, filename: string) => {
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
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
            <a href="/dashboard/wallets" className={`flex items-center space-x-3 px-4 py-3 ${darkMode ? 'text-[#A0C8A9]/70 hover:text-white hover:bg-[#A0C8A9]/10' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'} rounded-lg transition-colors`}>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
              </svg>
              <span>Wallets</span>
            </a>
            <a href="/dashboard/my-accounts" className={`flex items-center space-x-3 px-4 py-3 ${darkMode ? 'text-[#A0C8A9]/70 hover:text-white hover:bg-[#A0C8A9]/10' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'} rounded-lg transition-colors`}>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              <span>My Accounts</span>
            </a>
            <a href="/dashboard/new-account" className={`flex items-center space-x-3 px-4 py-3 ${darkMode ? 'text-[#A0C8A9]/70 hover:text-white hover:bg-[#A0C8A9]/10' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'} rounded-lg transition-colors`}>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
              </svg>
              <span>New Account</span>
            </a>
            <a href="/dashboard/deposit" className={`flex items-center space-x-3 px-4 py-3 ${darkMode ? 'text-[#A0C8A9]/70 hover:text-white hover:bg-[#A0C8A9]/10' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'} rounded-lg transition-colors`}>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" />
              </svg>
              <span>Deposit</span>
            </a>
            <a href="/dashboard/transfer" className={`flex items-center space-x-3 px-4 py-3 ${darkMode ? 'text-[#A0C8A9]/70 hover:text-white hover:bg-[#A0C8A9]/10' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'} rounded-lg transition-colors`}>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
              </svg>
              <span>Transfer</span>
            </a>
            <a href="/dashboard/withdraw" className={`flex items-center space-x-3 px-4 py-3 ${darkMode ? 'text-[#A0C8A9]/70 hover:text-white hover:bg-[#A0C8A9]/10' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'} rounded-lg transition-colors`}>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
              <span>Withdraw</span>
            </a>
            <a href="/dashboard/history" className={`flex items-center space-x-3 px-4 py-3 ${darkMode ? 'text-white bg-[#A0C8A9]/10 border-[#A0C8A9]' : 'text-gray-900 bg-blue-50 border-blue-500'} rounded-lg border-l-4`}>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="font-medium">History</span>
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
        <UserHeader 
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
          darkMode={darkMode}
          setDarkMode={setDarkMode}
        />

        {/* History Content */}
        <div className={`flex-1 p-6 space-y-6 overflow-y-auto ${darkMode ? 'bg-[#B8D4C1]' : 'bg-gray-50'}`}>
          {/* Tabs */}
          <div className="flex space-x-1 bg-[#2D4A35] p-1 rounded-lg max-w-md border border-[#A0C8A9]/30">
            <button
              onClick={() => setActiveTab('transactions')}
              className={`flex-1 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === 'transactions'
                  ? 'bg-[#0A2E1D] text-white'
                  : 'text-[#A0C8A9] hover:text-white'
              }`}
            >
              Transactions
            </button>
            <button
              onClick={() => setActiveTab('accounts')}
              className={`flex-1 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === 'accounts'
                  ? 'bg-[#0A2E1D] text-white'
                  : 'text-[#A0C8A9] hover:text-white'
              }`}
            >
              Accounts
            </button>
          </div>

          {/* Content based on active tab */}
          {activeTab === 'transactions' ? (
            <div>
              <h1 className="text-2xl font-bold text-[#1E2E23] mb-6">Transaction History</h1>

              {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                  <p className="text-red-800 text-sm">{error}</p>
                </div>
              )}

              {/* Filters */}
              <div className="flex flex-wrap items-center gap-4 mb-6">
                <select 
                  value={daysFilter}
                  onChange={(e) => setDaysFilter(e.target.value)}
                  className="px-4 py-2 bg-white/70 border border-[#A0C8A9]/30 rounded-lg text-sm text-[#1E2E23]"
                >
                  <option value="all">All Time</option>
                  <option value="7">Last 7 days</option>
                  <option value="30">Last 30 days</option>
                  <option value="90">Last 90 days</option>
                </select>
                <select 
                  value={typeFilter}
                  onChange={(e) => setTypeFilter(e.target.value)}
                  className="px-4 py-2 bg-white/70 border border-[#A0C8A9]/30 rounded-lg text-sm text-[#1E2E23]"
                >
                  <option value="all">All transaction types</option>
                  <option value="deposit">Deposits</option>
                  <option value="withdrawal">Withdrawals</option>
                  <option value="transfer">Transfers</option>
                  <option value="trade">Trades</option>
                </select>
                <select 
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="px-4 py-2 bg-white/70 border border-[#A0C8A9]/30 rounded-lg text-sm text-[#1E2E23]"
                >
                  <option value="all">All statuses</option>
                  <option value="completed">Completed</option>
                  <option value="processing">Processing</option>
                  <option value="pending">Pending</option>
                  <option value="failed">Failed</option>
                </select>
                <select 
                  value={accountFilter}
                  onChange={(e) => setAccountFilter(e.target.value)}
                  className="px-4 py-2 bg-white/70 border border-[#A0C8A9]/30 rounded-lg text-sm text-[#1E2E23]"
                >
                  <option value="all">All accounts</option>
                  {accounts.map((account) => (
                    <option key={account.id} value={account.account_uid}>
                      {formatAccountType(account.account_type)} ({account.account_uid})
                    </option>
                  ))}
                </select>
                <button 
                  onClick={() => {
                    const csv = generateCSV();
                    downloadCSV(csv, 'transaction-history.csv');
                  }}
                  className="px-4 py-2 bg-[#0A2E1D] text-white rounded-lg text-sm flex items-center space-x-2 hover:bg-[#0F1B14]"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <span>Export</span>
                </button>
              </div>

              {/* Transactions Table */}
              {loading ? (
                <div className="bg-[#2D4A35] border border-[#A0C8A9]/20 rounded-lg p-12 text-center">
                  <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-[#A0C8A9] mb-4"></div>
                  <p className="text-white text-sm">Loading transactions...</p>
                </div>
              ) : transactions.length === 0 ? (
                <div className="bg-[#2D4A35] border border-[#A0C8A9]/20 rounded-lg p-12 text-center">
                  <svg className="mx-auto h-12 w-12 text-[#A0C8A9] mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <p className="text-white font-medium mb-2">No transactions found</p>
                  <p className="text-[#A0C8A9] text-sm">Your transaction history will appear here</p>
                </div>
              ) : (
                <div className="bg-[#2D4A35] border border-[#A0C8A9]/20 rounded-lg overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-[#254031]">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-[#A0C8A9] uppercase tracking-wider">Date</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-[#A0C8A9] uppercase tracking-wider">Type</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-[#A0C8A9] uppercase tracking-wider">Description</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-[#A0C8A9] uppercase tracking-wider">Account</th>
                          <th className="px-6 py-3 text-right text-xs font-medium text-[#A0C8A9] uppercase tracking-wider">Amount</th>
                          <th className="px-6 py-3 text-center text-xs font-medium text-[#A0C8A9] uppercase tracking-wider">Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#A0C8A9]/10">
                        {transactions.map((transaction) => (
                          <tr key={transaction.id} className="hover:bg-[#23392c]">
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-white">{transaction.date}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-white">{transaction.type}</td>
                            <td className="px-6 py-4 text-sm text-white max-w-xs truncate" title={transaction.description}>
                              {transaction.description}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-white">{transaction.account}</td>
                            <td className={`px-6 py-4 whitespace-nowrap text-sm text-right font-medium ${
                              transaction.amountType === 'positive' ? 'text-green-400' :
                              transaction.amountType === 'negative' ? 'text-red-400' : 'text-white'
                            }`}>
                              {transaction.amount}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-center">
                              <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                                transaction.status === 'Completed' ? 'bg-green-100 text-green-800' :
                                transaction.status === 'Processing' ? 'bg-yellow-100 text-yellow-800' :
                                transaction.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                                transaction.status === 'Failed' ? 'bg-red-100 text-red-800' :
                                'bg-gray-100 text-gray-800'
                              }`}>
                                {transaction.status}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div>
              <h1 className="text-2xl font-bold text-[#1E2E23] mb-6">Accounts History</h1>
              
              {loading ? (
                <div className="bg-[#2D4A35] border border-[#A0C8A9]/20 rounded-lg p-12 text-center">
                  <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-[#A0C8A9] mb-4"></div>
                  <p className="text-white text-sm">Loading accounts...</p>
                </div>
              ) : accounts.length === 0 ? (
                <div className="bg-[#2D4A35] border border-[#A0C8A9]/20 rounded-lg p-12 text-center">
                  <svg className="mx-auto h-12 w-12 text-[#A0C8A9] mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                  </svg>
                  <p className="text-white font-medium mb-2">No accounts found</p>
                  <p className="text-[#A0C8A9] text-sm mb-4">You don't have any trading accounts yet.</p>
                  <a href="/dashboard/new-account" className="inline-block bg-[#A0C8A9] text-[#1E2E23] px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#8FB89A] transition-colors">
                    Create New Account
                  </a>
                </div>
              ) : (
                <>
                  {/* Accounts Table */}
                  <div className="bg-[#2D4A35] border border-[#A0C8A9]/20 rounded-lg overflow-hidden">
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead className="bg-[#254031]">
                          <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-[#A0C8A9] uppercase tracking-wider">Account Number</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-[#A0C8A9] uppercase tracking-wider">Account Type</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-[#A0C8A9] uppercase tracking-wider">Balance</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-[#A0C8A9] uppercase tracking-wider">Currency</th>
                            <th className="px-6 py-3 text-center text-xs font-medium text-[#A0C8A9] uppercase tracking-wider">Status</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-[#A0C8A9] uppercase tracking-wider">Created</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-[#A0C8A9]/10">
                          {accounts.map((account) => (
                            <tr key={account.id} className="hover:bg-[#23392c]">
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-white">{account.account_uid}</td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-white">{formatAccountType(account.account_type)}</td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">
                                {formatCurrency(account.equity || account.balance || 0, account.currency)}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-white">{account.currency}</td>
                              <td className="px-6 py-4 whitespace-nowrap text-center">
                                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                                  (account.status === 'active' || (account.status as string).toLowerCase().includes('activ')) ? 'bg-green-100 text-green-800' :
                                  account.status === 'inactive' ? 'bg-gray-100 text-gray-800' :
                                  account.status === 'suspended' ? 'bg-red-100 text-red-800' :
                                  'bg-yellow-100 text-yellow-800'
                                }`}>
                                  {capitalizeFirst(account.status)}
                                </span>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                                {new Date(account.created_at).toLocaleDateString('en-US', {
                                  year: 'numeric',
                                  month: 'short',
                                  day: 'numeric',
                                })}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
