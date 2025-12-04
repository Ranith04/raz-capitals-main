'use client';

import AdminHeader from '@/components/AdminHeader';
import AdminSidebar from '@/components/AdminSidebar';
import ProtectedRoute from '@/components/ProtectedRoute';
import { supabase } from '@/lib/supabaseClient';
import { TradingAccountWithUser } from '@/types';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

function TradeAccountDetailsContent() {
  const router = useRouter();
  const params = useSearchParams();
  const [account, setAccount] = useState<TradingAccountWithUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const accountId = params.get('id');

  useEffect(() => {
    document.title = 'Trade Account Details - RAZ CAPITALS';
    if (accountId) {
      fetchAccountDetails();
    }
  }, [accountId]);

  const fetchAccountDetails = async () => {
    if (!accountId) return;

    try {
      setLoading(true);
      setError(null);

      const { data: tradingAccounts, error: tradingError } = await supabase
        .from('tradingAccounts')
        .select(`
          *,
          user:users!tradingAccounts_user_id_fkey(
            id,
            user_uuid,
            first_name,
            last_name,
            email,
            created_at
          )
        `)
        .eq('account_uid', accountId)
        .single();

      if (tradingError) {
        console.error('Error fetching account details:', tradingError);
        setError('Failed to fetch account details');
        return;
      }

      if (tradingAccounts) {
        // Transform the data to match our interface
        const transformedAccount: TradingAccountWithUser = {
          id: tradingAccounts.id,
          account_uid: tradingAccounts.account_uid,
          account_password: tradingAccounts.account_password,
          levarage: tradingAccounts.levarage || 0,
          balance: tradingAccounts.balance || 0,
          currency: tradingAccounts.currency || 'USD',
          status: tradingAccounts.status || 'active',
          created_at: tradingAccounts.created_at,
          free_margin: tradingAccounts.free_margin || 0,
          equity: tradingAccounts.equity || 0,
          user_id: tradingAccounts.user_id,
          margin: tradingAccounts.margin || 0,
          watchlist: tradingAccounts.watchlist || [],
          account_type: tradingAccounts.account_type || 'standard',
          user: tradingAccounts.user || {
            id: 0,
            user_uuid: '',
            first_name: 'Unknown',
            last_name: 'User',
            email: 'unknown@example.com',
            created_at: new Date().toISOString()
          }
        };

        setAccount(transformedAccount);
      }
    } catch (err) {
      console.error('Exception while fetching account details:', err);
      setError('An unexpected error occurred while fetching account details');
    } finally {
      setLoading(false);
    }
  };

  // Loading state
  if (loading) {
    return (
      <div className="flex h-screen bg-[#9BC5A2] overflow-hidden">
        <AdminSidebar currentPage="live-accounts" />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#0A2E1D] mx-auto mb-4"></div>
            <p className="text-[#0A2E1D] text-lg">Loading account details...</p>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error || !account) {
    return (
      <div className="flex h-screen bg-[#9BC5A2] overflow-hidden">
        <AdminSidebar currentPage="live-accounts" />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="text-red-500 text-6xl mb-4">⚠️</div>
            <p className="text-[#0A2E1D] text-lg mb-4">
              {error || 'Account not found'}
            </p>
            <button 
              onClick={() => router.push('/admin/trade-accounts/live-accounts')}
              className="px-6 py-2 bg-[#2D4A32] text-white rounded-lg hover:bg-[#3A5A3F] transition-colors"
            >
              Back to Live Accounts
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Format currency
  const formatCurrency = (amount: number, currency: string = 'USD') => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 2
    }).format(amount);
  };

  // Format date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="flex h-screen bg-[#9BC5A2] overflow-hidden">
      {/* Sidebar */}
      <AdminSidebar currentPage="live-accounts" />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <AdminHeader 
          title={`Trade Account Details #${account.account_uid}`}
          showBackButton={true}
          backUrl="/admin/trade-accounts/live-accounts"
          showRefreshButton={false}
        />

        {/* Content */}
        <div className="flex-1 p-6 overflow-y-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 lg:grid-rows-2 gap-2">
            {/* Account Details (left, tall) */}
            <div className="bg-[#0B2417] text-white rounded-lg lg:row-span-2">
                <div className="px-2 py-0.5 bg-[#0A2E1D] rounded-t-lg font-semibold text-sm">Account Details</div>
                <div className="px-2 py-1.5">
                  <div className="h-px bg-white/10 mb-1" />
                  <div className="space-y-3 text-xl">
                    <div className="flex justify-between">
                      <span className="opacity-80">Login</span>
                      <span>{account.account_uid}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="opacity-80">Account Created On</span>
                      <span>{formatDate(account.created_at)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="opacity-80">Account Name</span>
                      <span>{`${account.user.first_name} ${account.user.last_name}`}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="opacity-80">Account Type</span>
                      <span className="capitalize">{account.account_type}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="opacity-80">Leverage</span>
                      <span className="flex items-center gap-1.5">
                        {account.levarage}:1
                        <svg className="w-3.5 h-3.5 text-red-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M12 15.5a3.5 3.5 0 110-7 3.5 3.5 0 010 7z" />
                          <path d="M19.4 15a1 1 0 00.2-1.1l-.6-1.1a8.1 8.1 0 000-2.6l.6-1.1a1 1 0 00-.2-1.1l-1.1-1.1a1 1 0 00-1.1-.2l-1.1.6a8.1 8.1 0 00-2.6 0l-1.1-.6a1 1 0 00-1.1.2L8.5 6.4a1 1 0 00-.2 1.1l.6 1.1a8.1 8.1 0 000 2.6l-.6 1.1a1 1 0 00.2 1.1l1.1 1.1a1 1 0 001.1.2l1.1-.6a8.1 8.1 0 002.6 0l1.1.6a1 1 0 001.1-.2l1.1-1.1z" />
                        </svg>
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="opacity-80">Status</span>
                      <span className={`px-2 py-1 rounded-full text-sm ${
                        account.status === 'active' ? 'bg-green-500/20 text-green-400' :
                        account.status === 'inactive' ? 'bg-yellow-500/20 text-yellow-400' :
                        account.status === 'suspended' ? 'bg-red-500/20 text-red-400' :
                        'bg-blue-500/20 text-blue-400'
                      }`}>
                        {account.status.charAt(0).toUpperCase() + account.status.slice(1)}
                      </span>
                    </div>
                  </div>
                </div>
            </div>

            {/* Account Passwords (middle, top) */}
            <div className="bg-[#0B2417] text-white rounded-lg">
                <div className="px-2 py-1 bg-[#0A2E1D] rounded-t-lg font-semibold">Account Passwords</div>
                <div className="px-2 py-2">
                  <div className="h-px bg-white/10 mb-1" />
                  <div className="space-y-0.5 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="opacity-80">Trade Password</span>
                      <span className="flex items-center gap-1.5">{account.account_password}
                        <svg className="w-3.5 h-3.5 text-red-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M12 15.5a3.5 3.5 0 110-7 3.5 3.5 0 010 7z" />
                          <path d="M19.4 15a1 1 0 00.2-1.1l-.6-1.1a8.1 8.1 0 000-2.6l.6-1.1a1 1 0 00-.2-1.1l-1.1-1.1a1 1 0 00-1.1-.2l-1.1.6a8.1 8.1 0 00-2.6 0l-1.1-.6a1 1 0 00-1.1.2L8.5 6.4a1 1 0 00-.2 1.1l.6 1.1a8.1 8.1 0 000 2.6l-.6 1.1a1 1 0 00.2 1.1l1.1 1.1a1 1 0 001.1.2l1.1-.6a8.1 8.1 0 002.6 0l1.1.6a1 1 0 001.1-.2l1.1-1.1z" />
                        </svg>
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="opacity-80">User Email</span>
                      <span className="text-[#9BC5A2]">{account.user.email}</span>
                    </div>
                  </div>
                </div>
            </div>

            {/* Account Funds Summary (right, tall) */}
            <div className="bg-[#0B2417] text-white rounded-lg lg:row-span-2">
                <div className="px-2 py-0.5 bg-[#0A2E1D] rounded-t-lg font-semibold text-sm">Account Funds</div>
                <div className="px-2 py-1.5">
                  <div className="h-px bg-white/10 mb-1" />
                  <div className="space-y-3 text-xl">
                    <div className="flex justify-between">
                      <span className="opacity-80">Balance</span>
                      <span className="font-medium">{formatCurrency(account.balance, account.currency)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="opacity-80">Equity</span>
                      <span>{formatCurrency(account.equity, account.currency)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="opacity-80">Free Margin</span>
                      <span>{formatCurrency(account.free_margin, account.currency)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="opacity-80">Used Margin</span>
                      <span>{formatCurrency(account.margin, account.currency)}</span>
                    </div>
                  </div>
                </div>
              </div>

            {/* Trade Account Funds (middle, bottom) */}
            <div className="bg-[#0B2417] text-white rounded-lg">
                <div className="px-2 py-1 bg-[#0A2E1D] rounded-t-lg font-semibold">Additional Info</div>
                <div className="px-2 py-2">
                  <div className="h-px bg-white/10 mb-1" />
                  <div className="grid grid-cols-2 gap-y-1 text-xs">
                    <div className="font-medium">Currency</div>
                    <div className="text-right">{account.currency}</div>
                    <div className="font-medium">User ID</div>
                    <div className="text-right text-[#9BC5A2]">{account.user_id}</div>
                    <div className="font-medium">Watchlist Items</div>
                    <div className="text-right">{account.watchlist.length}</div>
                    <div className="font-medium">Account ID</div>
                    <div className="text-right">{account.id}</div>
                  </div>
                </div>
              </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function TradeAccountDetailsPage() {
  return (
    <ProtectedRoute requiredRole="admin">
      <TradeAccountDetailsContent />
    </ProtectedRoute>
  );
}
