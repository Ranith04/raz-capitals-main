'use client';

import UserHeader from '@/components/UserHeader';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { getCurrentUser } from '@/utils/auth';
import { TradingAccount } from '@/types';

interface TransferTransaction {
  id: number;
  type: string;
  amount: number;
  currency: string;
  status: string;
  created_at: string;
  account_id: string;
  transaction_comments?: string;
  to_account_id?: string;
}

export default function TransferClient() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(true);
  const [accounts, setAccounts] = useState<TradingAccount[]>([]);
  const [transferType, setTransferType] = useState<'internal' | 'external'>('internal');
  const [fromAccountId, setFromAccountId] = useState<string>('');
  const [toAccountId, setToAccountId] = useState<string>('');
  const [externalRecipient, setExternalRecipient] = useState<string>('');
  const [externalRecipientName, setExternalRecipientName] = useState<string>('');
  const [amount, setAmount] = useState<string>('');
  const [currency, setCurrency] = useState<string>('USD');
  const [note, setNote] = useState<string>('');
  const [recentTransfers, setRecentTransfers] = useState<TransferTransaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchUserData();
  }, []);

  useEffect(() => {
    // Reset to account when from account changes
    setToAccountId('');
    setExternalRecipient('');
    setExternalRecipientName('');
  }, [fromAccountId, transferType]);

  const fetchUserData = async () => {
    try {
      setLoading(true);
      setError(null);

      // Get user ID (same logic as other pages)
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
        
        // Set default from account
        if (transformedAccounts.length > 0) {
          setFromAccountId(transformedAccounts[0].account_uid);
          setCurrency(transformedAccounts[0].currency || 'USD');
        }

        // Get all account UIDs for this user
        const accountUids = transformedAccounts.map(acc => acc.account_uid);

        // Fetch recent transfer transactions
        const { data: transactions, error: transactionsError } = await supabase
          .from('transactions')
          .select('*')
          .eq('type', 'transfer')
          .in('account_id', accountUids)
          .order('created_at', { ascending: false })
          .limit(10);

        if (transactionsError) {
          console.error('Error fetching transfers:', transactionsError);
        } else if (transactions) {
          setRecentTransfers(transactions.map((tx: any) => ({
            id: tx.id,
            type: tx.type,
            amount: tx.amount || 0,
            currency: tx.currency || 'USD',
            status: tx.status || 'pending',
            created_at: tx.created_at,
            account_id: tx.account_id,
            transaction_comments: tx.transaction_comments,
            to_account_id: tx.to_account_id,
          })));
        }
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
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) {
      return `Today, ${date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })}`;
    } else if (diffDays === 1) {
      return `Yesterday, ${date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })}`;
    } else {
      return date.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric',
        hour: 'numeric',
        minute: '2-digit'
      });
    }
  };

  const formatAccountType = (type: string): string => {
    const typeMap: { [key: string]: string } = {
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

  const getStatusBadge = (status: string) => {
    const statusLower = status?.toLowerCase();
    if (statusLower === 'completed') {
      return (
        <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-medium">
          Completed
        </span>
      );
    } else if (statusLower === 'pending') {
      return (
        <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-xs font-medium">
          Pending
        </span>
      );
    } else if (statusLower === 'failed') {
      return (
        <span className="bg-red-100 text-red-800 px-2 py-1 rounded text-xs font-medium">
          Failed
        </span>
      );
    } else {
      return (
        <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded text-xs font-medium">
          {status || 'Pending'}
        </span>
      );
    }
  };

  // Calculate transfer fee (0 for internal, 2% for external with $5 minimum)
  const calculateTransferFee = (amount: number): number => {
    if (transferType === 'internal') {
      return 0;
    }
    // External transfer: 2% fee with $5 minimum
    const fee = amount * 0.02;
    return Math.max(fee, 5);
  };

  const getAvailableBalance = (): number => {
    const selectedAccount = accounts.find(acc => acc.account_uid === fromAccountId);
    return selectedAccount ? (selectedAccount.equity || selectedAccount.balance || 0) : 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!fromAccountId || !amount) {
      setError('Please fill in all required fields.');
      return;
    }

    const transferAmount = parseFloat(amount);
    if (isNaN(transferAmount) || transferAmount <= 0) {
      setError('Please enter a valid transfer amount.');
      return;
    }

    const availableBalance = getAvailableBalance();
    const fee = calculateTransferFee(transferAmount);
    const totalAmount = transferAmount + fee;

    if (totalAmount > availableBalance) {
      setError(`Insufficient balance. Available: ${formatCurrency(availableBalance, currency)}, Required: ${formatCurrency(totalAmount, currency)}`);
      return;
    }

    // For internal transfer, validate to account
    if (transferType === 'internal') {
      if (!toAccountId) {
        setError('Please select a destination account.');
        return;
      }
      if (fromAccountId === toAccountId) {
        setError('From and To accounts must be different.');
        return;
      }
    }

    // For external transfer, validate recipient
    if (transferType === 'external') {
      if (!externalRecipient) {
        setError('Please enter recipient email or account ID.');
        return;
      }
    }

    try {
      setSubmitting(true);
      setError(null);

      let destinationAccountId = toAccountId;

      // For external transfers, find the recipient account
      if (transferType === 'external') {
        // Try to find account by account_uid first
        const { data: accountByUid, error: uidError } = await supabase
          .from('tradingAccounts')
          .select('account_uid')
          .eq('account_uid', externalRecipient)
          .single();

        if (!uidError && accountByUid) {
          destinationAccountId = accountByUid.account_uid;
        } else {
          // Try to find by user email
          const { data: userData, error: userError } = await supabase
            .from('users')
            .select('user_uuid')
            .eq('email', externalRecipient)
            .single();

          if (!userError && userData) {
            // Get first account for this user
            const { data: userAccount, error: accountError } = await supabase
              .from('tradingAccounts')
              .select('account_uid')
              .eq('user_id', userData.user_uuid)
              .limit(1)
              .single();

            if (!accountError && userAccount) {
              destinationAccountId = userAccount.account_uid;
            } else {
              setError('Recipient account not found. Please verify the email or account ID.');
              setSubmitting(false);
              return;
            }
          } else {
            setError('Recipient account not found. Please verify the email or account ID.');
            setSubmitting(false);
            return;
          }
        }
      }

      if (!destinationAccountId) {
        setError('Could not determine destination account.');
        setSubmitting(false);
        return;
      }

      // Verify destination account exists
      const { data: destAccount, error: destError } = await supabase
        .from('tradingAccounts')
        .select('account_uid, balance, currency')
        .eq('account_uid', destinationAccountId)
        .single();

      if (destError || !destAccount) {
        setError('Destination account not found.');
        setSubmitting(false);
        return;
      }

      // Create transfer transaction
      const { data: transaction, error: transactionError } = await supabase
        .from('transactions')
        .insert({
          type: 'transfer',
          amount: transferAmount,
          currency: currency,
          status: 'pending',
          account_id: fromAccountId,
          to_account_id: destinationAccountId,
          transaction_comments: note || `Transfer ${transferType === 'internal' ? 'between accounts' : 'to external user'}: ${formatAccountType(accounts.find(acc => acc.account_uid === fromAccountId)?.account_type || 'standard')} → ${transferType === 'external' ? (externalRecipientName || externalRecipient) : formatAccountType(accounts.find(acc => acc.account_uid === destinationAccountId)?.account_type || 'standard')}`,
        })
        .select()
        .single();

      if (transactionError) {
        console.error('Error creating transfer:', transactionError);
        setError('Failed to create transfer. Please try again.');
        setSubmitting(false);
        return;
      }

      // Update balances (deduct from source, add to destination)
      const fromAccount = accounts.find(acc => acc.account_uid === fromAccountId);
      if (!fromAccount) {
        setError('Source account not found.');
        setSubmitting(false);
        return;
      }

      // Deduct from source account
      const newFromBalance = (fromAccount.balance || 0) - totalAmount;
      const { error: updateFromError } = await supabase
        .from('tradingAccounts')
        .update({
          balance: newFromBalance,
          equity: newFromBalance,
          free_margin: newFromBalance,
        })
        .eq('account_uid', fromAccountId);

      if (updateFromError) {
        console.error('Error updating source account:', updateFromError);
        setError('Failed to update source account balance.');
        setSubmitting(false);
        return;
      }

      // Add to destination account (only the transfer amount, not the fee)
      const newToBalance = (destAccount.balance || 0) + transferAmount;
      const { error: updateToError } = await supabase
        .from('tradingAccounts')
        .update({
          balance: newToBalance,
          equity: newToBalance,
          free_margin: newToBalance,
        })
        .eq('account_uid', destinationAccountId);

      if (updateToError) {
        console.error('Error updating destination account:', updateToError);
        // Try to revert source account update
        await supabase
          .from('tradingAccounts')
          .update({
            balance: fromAccount.balance,
            equity: fromAccount.equity,
            free_margin: fromAccount.free_margin,
          })
          .eq('account_uid', fromAccountId);
        setError('Failed to update destination account balance. Transaction reverted.');
        setSubmitting(false);
        return;
      }

      // Update transaction status to completed
      await supabase
        .from('transactions')
        .update({ status: 'completed' })
        .eq('id', transaction.id);

      // Success - reset form and refresh data
      setAmount('');
      setNote('');
      setToAccountId('');
      setExternalRecipient('');
      setExternalRecipientName('');
      
      // Refresh data
      await fetchUserData();
      
      alert(`Transfer of ${formatCurrency(transferAmount, currency)} ${transferType === 'external' ? `(Fee: ${formatCurrency(fee, currency)})` : ''} completed successfully!`);
    } catch (err) {
      console.error('Exception while processing transfer:', err);
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setSubmitting(false);
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
            <a href="/dashboard/transfer" className={`flex items-center space-x-3 px-4 py-3 ${darkMode ? 'text-white bg-[#A0C8A9]/10 border-[#A0C8A9]' : 'text-gray-900 bg-blue-50 border-blue-500'} rounded-lg border-l-4`}>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
              </svg>
              <span className="font-medium">Transfer</span>
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
        <UserHeader 
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
          darkMode={darkMode}
          setDarkMode={setDarkMode}
        />

        {/* Transfer Content */}
        <div className={`flex-1 p-4 sm:p-6 space-y-4 sm:space-y-6 overflow-y-auto ${darkMode ? 'bg-[#B8D4C1]' : 'bg-gray-50'}`}>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-[#1E2E23] mb-2">Transfer Funds</h2>
            <p className="text-[#2D4A35] text-sm sm:text-base">Move funds between your accounts or send to other users.</p>
          </div>

          {/* Transfer Types */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            <div className="bg-[#2D4A35] rounded-lg p-4 sm:p-6 text-white cursor-pointer hover:bg-[#3A5642] transition-colors border border-[#A0C8A9]">
              <h3 className="text-base sm:text-lg font-medium mb-2 text-[#A0C8A9]">Internal Transfer</h3>
              <p className="text-xs sm:text-sm mb-4">Transfer between your own accounts instantly with no fees.</p>
              <ul className="text-xs space-y-1 text-[#A0C8A9]/70">
                <li>• Instant transfer</li>
                <li>• No fees</li>
                <li>• Between your accounts</li>
              </ul>
            </div>

            <div className="bg-[#2D4A35] rounded-lg p-4 sm:p-6 text-white cursor-pointer hover:bg-[#3A5642] transition-colors">
              <h3 className="text-base sm:text-lg font-medium mb-2 text-[#A0C8A9]">External Transfer</h3>
              <p className="text-xs sm:text-sm mb-4">Send funds to other RAZ CAPITALS users securely.</p>
              <ul className="text-xs space-y-1 text-[#A0C8A9]/70">
                <li>• To other users</li>
                <li>• Small processing fee</li>
                <li>• Secure verification</li>
              </ul>
            </div>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <p className="text-red-800 text-sm">{error}</p>
            </div>
          )}

          {/* Transfer Form */}
          <div className="bg-[#2D4A35] rounded-lg p-4 sm:p-6">
            <h3 className="text-white text-base sm:text-lg font-medium mb-4 sm:mb-6">Transfer Details</h3>
            {loading ? (
              <div className="flex items-center justify-center py-12">
                <div className="text-white text-center">
                  <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-[#A0C8A9] mb-4"></div>
                  <p className="text-[#A0C8A9]">Loading...</p>
                </div>
              </div>
            ) : accounts.length === 0 ? (
              <div className="bg-[#B8D4C1] rounded-lg p-8 text-center">
                <svg className="mx-auto h-12 w-12 text-[#2D4A35] mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                </svg>
                <p className="text-[#1E2E23] font-medium mb-2">No trading accounts found</p>
                <p className="text-[#2D4A35] text-sm mb-4">You need at least one trading account to make transfers.</p>
                <a href="/dashboard/new-account" className="inline-block bg-[#A0C8A9] text-[#1E2E23] px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#8FB89A] transition-colors">
                  Create New Account
                </a>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                <div>
                  <label className="block text-[#A0C8A9] text-sm font-medium mb-2">Transfer Type</label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <label className={`flex items-center p-3 rounded-lg cursor-pointer transition-colors ${transferType === 'internal' ? 'bg-[#A0C8A9]' : 'bg-[#B8D4C1] hover:bg-[#A0C8A9]'}`}>
                      <input 
                        type="radio" 
                        name="transferType" 
                        value="internal" 
                        checked={transferType === 'internal'}
                        onChange={(e) => setTransferType(e.target.value as 'internal' | 'external')}
                        className="mr-3" 
                      />
                      <span className="text-[#1E2E23] font-medium text-sm">Internal Transfer</span>
                    </label>
                    <label className={`flex items-center p-3 rounded-lg cursor-pointer transition-colors ${transferType === 'external' ? 'bg-[#A0C8A9]' : 'bg-[#B8D4C1] hover:bg-[#A0C8A9]'}`}>
                      <input 
                        type="radio" 
                        name="transferType" 
                        value="external" 
                        checked={transferType === 'external'}
                        onChange={(e) => setTransferType(e.target.value as 'internal' | 'external')}
                        className="mr-3" 
                      />
                      <span className="text-[#1E2E23] font-medium text-sm">External Transfer</span>
                    </label>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[#A0C8A9] text-sm font-medium mb-2">From Account</label>
                    <select 
                      value={fromAccountId}
                      onChange={(e) => {
                        setFromAccountId(e.target.value);
                        const selectedAccount = accounts.find(acc => acc.account_uid === e.target.value);
                        if (selectedAccount) {
                          setCurrency(selectedAccount.currency || 'USD');
                        }
                      }}
                      className="w-full px-3 py-2 bg-[#B8D4C1] text-[#1E2E23] rounded-lg border border-[#A0C8A9]/30 focus:border-[#A0C8A9] focus:outline-none"
                      required
                    >
                      {accounts.map((account) => (
                        <option key={account.id} value={account.account_uid}>
                          {formatAccountType(account.account_type)} - {formatCurrency(account.equity || account.balance || 0, account.currency)} (Account: {account.account_uid})
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-[#A0C8A9] text-sm font-medium mb-2">To Account</label>
                    {transferType === 'internal' ? (
                      <select 
                        value={toAccountId}
                        onChange={(e) => setToAccountId(e.target.value)}
                        className="w-full px-3 py-2 bg-[#B8D4C1] text-[#1E2E23] rounded-lg border border-[#A0C8A9]/30 focus:border-[#A0C8A9] focus:outline-none"
                        required
                      >
                        <option value="">Select destination account</option>
                        {accounts
                          .filter(acc => acc.account_uid !== fromAccountId)
                          .map((account) => (
                            <option key={account.id} value={account.account_uid}>
                              {formatAccountType(account.account_type)} - {formatCurrency(account.equity || account.balance || 0, account.currency)} (Account: {account.account_uid})
                            </option>
                          ))}
                      </select>
                    ) : (
                      <input 
                        type="text"
                        value={externalRecipient}
                        onChange={(e) => setExternalRecipient(e.target.value)}
                        placeholder="Enter recipient email or account ID"
                        className="w-full px-3 py-2 bg-[#B8D4C1] text-[#1E2E23] rounded-lg border border-[#A0C8A9]/30 focus:border-[#A0C8A9] focus:outline-none placeholder-[#2D4A35]"
                        required
                      />
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[#A0C8A9] text-sm font-medium mb-2">Amount</label>
                    <input 
                      type="number" 
                      step="0.01"
                      min="0.01"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      placeholder="Enter transfer amount"
                      className="w-full px-3 py-2 bg-[#B8D4C1] text-[#1E2E23] rounded-lg border border-[#A0C8A9]/30 focus:border-[#A0C8A9] focus:outline-none placeholder-[#2D4A35]"
                      required
                    />
                    <p className="text-[#A0C8A9]/70 text-xs mt-1">
                      Available: {formatCurrency(getAvailableBalance(), currency)}
                    </p>
                  </div>
                  <div>
                    <label className="block text-[#A0C8A9] text-sm font-medium mb-2">Currency</label>
                    <select 
                      value={currency}
                      onChange={(e) => setCurrency(e.target.value)}
                      className="w-full px-3 py-2 bg-[#B8D4C1] text-[#1E2E23] rounded-lg border border-[#A0C8A9]/30 focus:border-[#A0C8A9] focus:outline-none"
                    >
                      <option value="USD">USD</option>
                      <option value="EUR">EUR</option>
                      <option value="GBP">GBP</option>
                    </select>
                  </div>
                </div>

                {/* External Transfer Fields */}
                {transferType === 'external' && (
                  <div className="space-y-4 border-t border-[#A0C8A9]/20 pt-4">
                    <h4 className="text-[#A0C8A9] font-medium">Recipient Details (External Transfer)</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[#A0C8A9] text-sm font-medium mb-2">Recipient Name (Optional)</label>
                        <input 
                          type="text" 
                          value={externalRecipientName}
                          onChange={(e) => setExternalRecipientName(e.target.value)}
                          placeholder="Full name of recipient"
                          className="w-full px-3 py-2 bg-[#B8D4C1] text-[#1E2E23] rounded-lg border border-[#A0C8A9]/30 focus:border-[#A0C8A9] focus:outline-none placeholder-[#2D4A35]"
                        />
                      </div>
                    </div>
                  </div>
                )}

                <div>
                  <label className="block text-[#A0C8A9] text-sm font-medium mb-2">Reference/Note (Optional)</label>
                  <textarea 
                    rows={3}
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    placeholder="Add a note for this transfer"
                    className="w-full px-3 py-2 bg-[#B8D4C1] text-[#1E2E23] rounded-lg border border-[#A0C8A9]/30 focus:border-[#A0C8A9] focus:outline-none placeholder-[#2D4A35] resize-none"
                  ></textarea>
                </div>

                {/* Transfer Summary */}
                <div className="bg-[#B8D4C1] rounded-lg p-4">
                  <h4 className="text-[#1E2E23] font-medium mb-3">Transfer Summary</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-[#2D4A35]">Transfer Amount:</span>
                      <span className="text-[#1E2E23] font-medium">
                        {amount ? formatCurrency(parseFloat(amount) || 0, currency) : formatCurrency(0, currency)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#2D4A35]">Transfer Fee:</span>
                      <span className="text-[#1E2E23] font-medium">
                        {amount ? formatCurrency(calculateTransferFee(parseFloat(amount) || 0), currency) : formatCurrency(0, currency)}
                        {transferType === 'internal' && <span className="text-[#2D4A35] text-xs ml-1">(No fee)</span>}
                      </span>
                    </div>
                    <div className="border-t border-[#2D4A35]/20 pt-2 flex justify-between">
                      <span className="text-[#1E2E23] font-medium">Total:</span>
                      <span className="text-[#1E2E23] font-bold">
                        {amount ? formatCurrency((parseFloat(amount) || 0) + calculateTransferFee(parseFloat(amount) || 0), currency) : formatCurrency(0, currency)}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 pt-4">
                  <button 
                    type="submit"
                    disabled={submitting}
                    className="flex-1 bg-[#A0C8A9] text-[#1E2E23] py-3 px-6 rounded-lg font-medium hover:bg-[#8FB89A] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {submitting ? 'Processing...' : 'Execute Transfer'}
                  </button>
                  <button 
                    type="button"
                    onClick={() => {
                      setAmount('');
                      setNote('');
                      setToAccountId('');
                      setExternalRecipient('');
                      setExternalRecipientName('');
                      setError(null);
                    }}
                    className="px-6 py-3 border border-[#A0C8A9] text-[#A0C8A9] rounded-lg hover:bg-[#A0C8A9]/10 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* Recent Transfers */}
          <div className="bg-[#2D4A35] rounded-lg p-4 sm:p-6">
            <h3 className="text-white text-base sm:text-lg font-medium mb-4">Recent Transfers</h3>
            {loading ? (
              <div className="flex items-center justify-center py-8">
                <div className="text-white text-center">
                  <div className="inline-block animate-spin rounded-full h-6 w-6 border-b-2 border-[#A0C8A9] mb-2"></div>
                  <p className="text-[#A0C8A9] text-sm">Loading...</p>
                </div>
              </div>
            ) : recentTransfers.length === 0 ? (
              <div className="bg-[#B8D4C1] rounded-lg p-6 text-center">
                <svg className="mx-auto h-10 w-10 text-[#2D4A35] mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                </svg>
                <p className="text-[#1E2E23] font-medium text-sm">No transfer history</p>
                <p className="text-[#2D4A35] text-xs mt-1">Your recent transfers will appear here</p>
              </div>
            ) : (
              <div className="space-y-3">
                {recentTransfers.map((transfer) => {
                  const toAccount = accounts.find(acc => acc.account_uid === transfer.to_account_id);
                  const fromAccount = accounts.find(acc => acc.account_uid === transfer.account_id);
                  
                  return (
                    <div key={transfer.id} className="flex flex-col sm:flex-row sm:justify-between sm:items-center p-3 bg-[#B8D4C1] rounded-lg space-y-2 sm:space-y-0">
                      <div>
                        <p className="font-medium text-[#1E2E23] text-sm sm:text-base">
                          {formatCurrency(transfer.amount || 0, transfer.currency || 'USD')} → {
                            toAccount 
                              ? `${formatAccountType(toAccount.account_type)} (${toAccount.account_uid})`
                              : transfer.to_account_id || 'External Account'
                          }
                        </p>
                        <p className="text-xs sm:text-sm text-[#2D4A35]">
                          {transfer.transaction_comments?.includes('Internal') ? 'Internal' : 'External'} Transfer - {formatDate(transfer.created_at)}
                        </p>
                        {transfer.transaction_comments && (
                          <p className="text-xs text-[#2D4A35]/70 mt-1 truncate">
                            {transfer.transaction_comments}
                          </p>
                        )}
                      </div>
                      {getStatusBadge(transfer.status)}
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
