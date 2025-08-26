import { supabase } from '@/lib/supabaseClient';
import { TradingAccountWithUser } from '@/types';
import { useCallback, useEffect, useState } from 'react';

export const useTradingAccounts = () => {
  const [accounts, setAccounts] = useState<TradingAccountWithUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTradingAccounts = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      // Fetch trading accounts with user information
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
        .eq('status', 'active'); // Only fetch live/active accounts

      if (tradingError) {
        console.error('Error fetching trading accounts:', tradingError);
        setError('Failed to fetch trading accounts data');
        return;
      }

      if (tradingAccounts) {
        // Transform the data to match our interface
        const transformedAccounts: TradingAccountWithUser[] = tradingAccounts.map((account: any) => ({
          id: account.id,
          account_uid: account.account_uid,
          account_password: account.account_password,
          levarage: account.levarage || 0,
          balance: account.balance || 0,
          currency: account.currency || 'USD',
          status: account.status || 'active',
          created_at: account.created_at,
          free_margin: account.free_margin || 0,
          equity: account.equity || 0,
          user_id: account.user_id,
          margin: account.margin || 0,
          watchlist: account.watchlist || [],
          account_type: account.account_type || 'standard',
          user: account.user || {
            id: 0,
            user_uuid: '',
            first_name: 'Unknown',
            last_name: 'User',
            email: 'unknown@example.com',
            created_at: new Date().toISOString()
          }
        }));

        setAccounts(transformedAccounts);
      }
    } catch (err) {
      console.error('Exception while fetching trading accounts:', err);
      setError('An unexpected error occurred while fetching data');
    } finally {
      setLoading(false);
    }
  }, []);

  const refreshAccounts = useCallback(() => {
    fetchTradingAccounts();
  }, [fetchTradingAccounts]);

  useEffect(() => {
    fetchTradingAccounts();
  }, [fetchTradingAccounts]);

  return {
    accounts,
    loading,
    error,
    refreshAccounts,
    fetchTradingAccounts
  };
};
