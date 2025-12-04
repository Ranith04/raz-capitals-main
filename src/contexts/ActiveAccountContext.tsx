'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { getCurrentUser } from '@/utils/auth';
import { TradingAccount } from '@/types';

interface ActiveAccountContextType {
  activeAccount: TradingAccount | null;
  accounts: TradingAccount[];
  loading: boolean;
  setActiveAccount: (account: TradingAccount | null) => void;
  refreshAccounts: () => Promise<void>;
}

const ActiveAccountContext = createContext<ActiveAccountContextType | undefined>(undefined);

const ACTIVE_ACCOUNT_STORAGE_KEY = 'raz_capitals_active_account_uid';

export function ActiveAccountProvider({ children }: { children: ReactNode }) {
  const [activeAccount, setActiveAccountState] = useState<TradingAccount | null>(null);
  const [accounts, setAccounts] = useState<TradingAccount[]>([]);
  const [loading, setLoading] = useState(true);

  // Load accounts and set active account
  const loadAccounts = async () => {
    try {
      setLoading(true);

      // Get user ID
      let userId: string | null = null;
      
      const { data: { user: authUser } } = await supabase.auth.getUser();
      if (authUser) {
        userId = authUser.id;
      } else {
        const sessionUser = getCurrentUser();
        if (sessionUser?.id) {
          userId = sessionUser.id;
          
          // If session user ID is not a UUID, try to find the user in users table
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
        setLoading(false);
        return;
      }

      // Fetch all trading accounts for this user
      const { data: tradingAccounts, error: accountsError } = await supabase
        .from('tradingAccounts')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false });

      if (accountsError) {
        console.error('Error fetching trading accounts:', accountsError);
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
          account_type: account.account_type || 'real',
        }));

        setAccounts(transformedAccounts);

        // Determine active account
        let activeAccountUid: string | null = null;

        // First, check sessionStorage for saved active account
        if (typeof window !== 'undefined') {
          const savedActiveAccountUid = sessionStorage.getItem(ACTIVE_ACCOUNT_STORAGE_KEY);
          if (savedActiveAccountUid) {
            // Verify the saved account still exists
            const savedAccount = transformedAccounts.find(acc => acc.account_uid === savedActiveAccountUid);
            if (savedAccount) {
              activeAccountUid = savedActiveAccountUid;
            }
          }
        }

        // If no saved account, use the most recent account (first in list)
        if (!activeAccountUid && transformedAccounts.length > 0) {
          activeAccountUid = transformedAccounts[0].account_uid;
        }

        // Set active account
        if (activeAccountUid) {
          const account = transformedAccounts.find(acc => acc.account_uid === activeAccountUid);
          if (account) {
            setActiveAccountState(account);
            // Save to sessionStorage
            if (typeof window !== 'undefined') {
              sessionStorage.setItem(ACTIVE_ACCOUNT_STORAGE_KEY, activeAccountUid);
            }
          }
        }
      } else {
        setAccounts([]);
        setActiveAccountState(null);
      }
    } catch (error) {
      console.error('Error loading accounts:', error);
    } finally {
      setLoading(false);
    }
  };

  // Set active account and persist to sessionStorage
  const setActiveAccount = (account: TradingAccount | null) => {
    setActiveAccountState(account);
    if (account && typeof window !== 'undefined') {
      sessionStorage.setItem(ACTIVE_ACCOUNT_STORAGE_KEY, account.account_uid);
      // Dispatch custom event to notify other components
      window.dispatchEvent(new CustomEvent('accountChanged', { detail: { accountUid: account.account_uid } }));
    } else if (typeof window !== 'undefined') {
      sessionStorage.removeItem(ACTIVE_ACCOUNT_STORAGE_KEY);
    }
  };

  // Refresh accounts list
  const refreshAccounts = async () => {
    await loadAccounts();
  };

  // Load accounts on mount
  useEffect(() => {
    loadAccounts();

    // Listen for account changes from other tabs/windows
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === ACTIVE_ACCOUNT_STORAGE_KEY) {
        loadAccounts();
      }
    };

    // Listen for custom account change events
    const handleAccountChange = () => {
      loadAccounts();
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('accountChanged', handleAccountChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('accountChanged', handleAccountChange);
    };
  }, []);

  return (
    <ActiveAccountContext.Provider
      value={{
        activeAccount,
        accounts,
        loading,
        setActiveAccount,
        refreshAccounts,
      }}
    >
      {children}
    </ActiveAccountContext.Provider>
  );
}

export function useActiveAccount() {
  const context = useContext(ActiveAccountContext);
  if (context === undefined) {
    throw new Error('useActiveAccount must be used within an ActiveAccountProvider');
  }
  return context;
}

