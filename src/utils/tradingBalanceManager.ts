import { supabase } from '@/lib/supabaseClient';

export interface BalanceUpdateResult {
  success: boolean;
  message: string;
  previousBalance?: number;
  newBalance?: number;
  accountId?: string;
}

/**
 * Updates trading account balance when admin completes a deposit transaction
 * @param accountId - The trading account UID
 * @param amount - The deposit amount to add
 * @returns Promise<BalanceUpdateResult>
 */
export async function updateBalanceForDeposit(
  accountId: string, 
  amount: number
): Promise<BalanceUpdateResult> {
  try {
    // First, get the current balance of the trading account
    const { data: currentAccount, error: fetchError } = await supabase
      .from('tradingAccounts')
      .select('balance, currency')
      .eq('account_uid', accountId)
      .single();

    if (fetchError) {
      console.error('Error fetching current balance:', fetchError);
      return {
        success: false,
        message: 'Failed to fetch current balance from database.',
        accountId
      };
    }

    if (!currentAccount) {
      console.error('Trading account not found:', accountId);
      return {
        success: false,
        message: 'Trading account not found.',
        accountId
      };
    }

    // Calculate new balance (add amount for deposits)
    const currentBalance = currentAccount.balance || 0;
    const newBalance = currentBalance + amount;

    // Update the trading account balance
    const { error: balanceUpdateError } = await supabase
      .from('tradingAccounts')
      .update({ 
        balance: newBalance,
        // Also update equity and free_margin for deposits
        equity: newBalance,
        free_margin: newBalance
      })
      .eq('account_uid', accountId);

    if (balanceUpdateError) {
      console.error('Error updating trading account balance:', balanceUpdateError);
      return {
        success: false,
        message: 'Failed to update balance in database.',
        accountId
      };
    }

    console.log(`Trading account ${accountId} balance updated: ${currentBalance} + ${amount} = ${newBalance}`);
    
    return {
      success: true,
      message: `Balance updated successfully for account ${accountId}`,
      previousBalance: currentBalance,
      newBalance,
      accountId
    };

  } catch (error) {
    console.error('Error updating balance for deposit:', error);
    return {
      success: false,
      message: 'Unexpected error occurred while updating balance.',
      accountId
    };
  }
}

/**
 * Updates trading account balance when admin completes a withdrawal transaction
 * @param accountId - The trading account UID
 * @param amount - The withdrawal amount to subtract
 * @returns Promise<BalanceUpdateResult>
 */
export async function updateBalanceForWithdrawal(
  accountId: string, 
  amount: number
): Promise<BalanceUpdateResult> {
  try {
    // First, get the current balance of the trading account
    const { data: currentAccount, error: fetchError } = await supabase
      .from('tradingAccounts')
      .select('balance, currency')
      .eq('account_uid', accountId)
      .single();

    if (fetchError) {
      console.error('Error fetching current balance:', fetchError);
      return {
        success: false,
        message: 'Failed to fetch current balance from database.',
        accountId
      };
    }

    if (!currentAccount) {
      console.error('Trading account not found:', accountId);
      return {
        success: false,
        message: 'Trading account not found.',
        accountId
      };
    }

    // Check if there's sufficient balance for withdrawal
    const currentBalance = currentAccount.balance || 0;
    if (currentBalance < amount) {
      return {
        success: false,
        message: `Insufficient balance. Current: ${currentBalance}, Required: ${amount}`,
        previousBalance: currentBalance,
        accountId
      };
    }

    // Calculate new balance (subtract amount for withdrawals)
    const newBalance = currentBalance - amount;

    // Update the trading account balance
    const { error: balanceUpdateError } = await supabase
      .from('tradingAccounts')
      .update({ 
        balance: newBalance,
        // Also update equity and free_margin for withdrawals
        equity: newBalance,
        free_margin: newBalance
      })
      .eq('account_uid', accountId);

    if (balanceUpdateError) {
      console.error('Error updating trading account balance:', balanceUpdateError);
      return {
        success: false,
        message: 'Failed to update balance in database.',
        accountId
      };
    }

    console.log(`Trading account ${accountId} balance updated: ${currentBalance} - ${amount} = ${newBalance}`);
    
    return {
      success: true,
      message: `Balance updated successfully for account ${accountId}`,
      previousBalance: currentBalance,
      newBalance,
      accountId
    };

  } catch (error) {
    console.error('Error updating balance for withdrawal:', error);
    return {
      success: false,
      message: 'Unexpected error occurred while updating balance.',
      accountId
    };
  }
}

/**
 * Gets current balance for a trading account
 * @param accountId - The trading account UID
 * @returns Promise<BalanceUpdateResult>
 */
export async function getCurrentBalance(accountId: string): Promise<BalanceUpdateResult> {
  try {
    const { data: account, error } = await supabase
      .from('tradingAccounts')
      .select('balance, currency')
      .eq('account_uid', accountId)
      .single();

    if (error) {
      return {
        success: false,
        message: 'Failed to fetch balance from database.',
        accountId
      };
    }

    if (!account) {
      return {
        success: false,
        message: 'Trading account not found.',
        accountId
      };
    }

    return {
      success: true,
      message: 'Balance fetched successfully',
      newBalance: account.balance || 0,
      accountId
    };

  } catch (error) {
    console.error('Error fetching balance:', error);
    return {
      success: false,
      message: 'Unexpected error occurred while fetching balance.',
      accountId
    };
  }
}
