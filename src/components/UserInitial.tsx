'use client';

import { shouldLog } from '@/lib/environment';
import { supabase } from '@/lib/supabaseClient';
import { getCurrentUser } from '@/utils/auth';
import { useEffect, useState } from 'react';

interface UserInitialProps {
  className?: string;
  fallback?: string;
}

export default function UserInitial({ className = '', fallback = 'U' }: UserInitialProps) {
  const [userInitial, setUserInitial] = useState<string>(fallback);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchUserInitial();
  }, []);

  const fetchUserInitial = async () => {
    try {
      setIsLoading(true);

      // Get current logged-in user
      const user = getCurrentUser();
      if (!user) {
        if (shouldLog()) {
          console.log('⚠️ No user session found, using fallback initial');
        }
        setUserInitial(fallback);
        setIsLoading(false);
        return;
      }

      if (shouldLog()) {
        console.log('🔍 Fetching user initial for user:', user);
      }

      // For trading credentials login, we need to find the trading account first
      let tradingAccount = null;
      
      if (user.id && user.id !== 'trading-auth-token') {
        // Try to find trading account by user_id
        if (shouldLog()) {
          console.log('📊 Looking for trading account with user_id:', user.id);
        }
        
        const { data: accounts, error: accountsError } = await supabase
          .from('tradingAccounts')
          .select('*')
          .eq('user_id', user.id);

        if (accountsError) {
          if (shouldLog()) {
            console.warn('⚠️ Could not fetch trading accounts:', accountsError.message);
          }
        } else if (accounts && accounts.length > 0) {
          tradingAccount = accounts[0];
          if (shouldLog()) {
            console.log('✅ Found trading account:', tradingAccount);
          }
        }
      }

      // If no trading account found, try to get from session storage (for trading credentials)
      if (!tradingAccount) {
        const tradingCredentials = sessionStorage.getItem('trading_credentials');
        if (tradingCredentials) {
          const { tradingId } = JSON.parse(tradingCredentials);
          if (shouldLog()) {
            console.log('📊 Looking for trading account with trading ID:', tradingId);
          }
          
          const { data: account, error: accountError } = await supabase
            .from('tradingAccounts')
            .select('*')
            .eq('account_uid', tradingId)
            .single();

          if (accountError) {
            if (shouldLog()) {
              console.warn('⚠️ Could not fetch trading account by ID:', accountError.message);
            }
          } else if (account) {
            tradingAccount = account;
            if (shouldLog()) {
              console.log('✅ Found trading account by ID:', tradingAccount);
            }
          }
        }
      }

      // Now get the user profile from the users table
      let userProfile = null;
      
      if (tradingAccount && tradingAccount.user_id) {
        if (shouldLog()) {
          console.log('📊 Fetching user profile for user_id:', tradingAccount.user_id);
        }
        
        const { data: profile, error: profileError } = await supabase
          .from('users')
          .select('*')
          .eq('user_uuid', tradingAccount.user_id)
          .single();

        if (profileError) {
          if (shouldLog()) {
            console.warn('⚠️ Could not fetch user profile:', profileError.message);
          }
        } else if (profile) {
          userProfile = profile;
          if (shouldLog()) {
            console.log('✅ Found user profile:', userProfile);
          }
        }
      }

      // Determine the user initial
      let displayName = fallback;

      if (userProfile) {
        // Try to get name from user profile
        if (userProfile.first_name && userProfile.last_name) {
          displayName = `${userProfile.first_name} ${userProfile.last_name}`;
        } else if (userProfile.first_name) {
          displayName = userProfile.first_name;
        } else if (userProfile.last_name) {
          displayName = userProfile.last_name;
        } else if (userProfile.full_name) {
          displayName = userProfile.full_name;
        } else if (userProfile.name) {
          displayName = userProfile.name;
        } else if (userProfile.email) {
          // Use email as fallback
          displayName = userProfile.email.split('@')[0].replace(/[._]/g, ' ').replace(/\b\w/g, (l: string) => l.toUpperCase());
        }
        
        if (shouldLog()) {
          console.log('✅ User name determined from profile:', displayName);
        }
      } else if (user.name && user.name !== 'Trading User') {
        // Use name from session if available
        displayName = user.name;
        if (shouldLog()) {
          console.log('✅ User name from session:', displayName);
        }
      } else if (user.email) {
        // Use email as fallback
        displayName = user.email.split('@')[0].replace(/[._]/g, ' ').replace(/\b\w/g, (l: string) => l.toUpperCase());
        if (shouldLog()) {
          console.log('✅ User name from email:', displayName);
        }
      }

      // Get the first letter and make it uppercase
      const initial = displayName.trim().charAt(0).toUpperCase();
      setUserInitial(initial);

      if (shouldLog()) {
        console.log('✅ User initial determined:', initial);
      }

    } catch (error) {
      if (shouldLog()) {
        console.error('❌ Error fetching user initial:', error);
      }
      setUserInitial(fallback);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <span className={`${className} animate-pulse bg-gray-300 rounded-full w-6 h-6 flex items-center justify-center`}>
        &nbsp;
      </span>
    );
  }

  return (
    <span className={className}>
      {userInitial}
    </span>
  );
}
