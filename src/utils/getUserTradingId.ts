/**
 * Utility function to get the Trading ID (account_uid) for the currently logged-in user.
 * This ensures consistency across all components that need to display Trading ID.
 * 
 * Returns the account_uid of the active trading account (from context or sessionStorage).
 * Falls back to most recent account if no active account is set.
 */

import { supabase } from '@/lib/supabaseClient';
import { getCurrentUser } from '@/utils/auth';

const ACTIVE_ACCOUNT_STORAGE_KEY = 'raz_capitals_active_account_uid';

export async function getUserTradingId(): Promise<string | null> {
  try {
    // First, check sessionStorage for active account (set by ActiveAccountContext)
    if (typeof window !== 'undefined') {
      const activeAccountUid = sessionStorage.getItem(ACTIVE_ACCOUNT_STORAGE_KEY);
      if (activeAccountUid) {
        return activeAccountUid;
      }
    }

    // Fallback: Get user ID and fetch most recent account
    let userId: string | null = null;
    
    // First, try to get from Supabase auth
    const { data: { user: authUser } } = await supabase.auth.getUser();
    if (authUser) {
      userId = authUser.id;
    } else {
      // Fall back to session user
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

    // If still no userId, try session storage trading credentials as last resort
    if (!userId) {
      if (typeof window !== 'undefined') {
        const tradingCredentials = sessionStorage.getItem('trading_credentials');
        if (tradingCredentials) {
          try {
            const { tradingId: storedTradingId } = JSON.parse(tradingCredentials);
            if (storedTradingId) {
              return storedTradingId;
            }
          } catch (e) {
            console.error('Error parsing trading credentials:', e);
          }
        }
      }
      return null;
    }

    // Fetch trading accounts for this user - ordered by most recent first
    const { data: accountsData, error: accountsError } = await supabase
      .from('tradingAccounts')
      .select('account_uid')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .limit(1);

    if (accountsError) {
      console.error('Error fetching trading account:', accountsError);
      return null;
    }

    if (accountsData && accountsData.length > 0) {
      // Use the most recent account (first in the ordered list)
      return accountsData[0].account_uid;
    }

    // No accounts found - try session storage as fallback
    if (typeof window !== 'undefined') {
      const tradingCredentials = sessionStorage.getItem('trading_credentials');
      if (tradingCredentials) {
        try {
          const { tradingId: storedTradingId } = JSON.parse(tradingCredentials);
          if (storedTradingId) {
            return storedTradingId;
          }
        } catch (e) {
          console.error('Error parsing trading credentials:', e);
        }
      }
    }

    return null;
  } catch (error) {
    console.error('Error in getUserTradingId:', error);
    return null;
  }
}

