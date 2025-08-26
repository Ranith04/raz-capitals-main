import { TradingAccountWithUser } from '@/types';

/**
 * Calculate Profit & Loss (P&L) for a trading account
 * P&L = Equity - Balance
 */
export const calculatePnL = (account: TradingAccountWithUser): number => {
  return account.equity - account.balance;
};

/**
 * Calculate P&L percentage
 */
export const calculatePnLPercentage = (account: TradingAccountWithUser): number => {
  if (account.balance === 0) return 0;
  return ((account.equity - account.balance) / account.balance) * 100;
};

/**
 * Calculate margin level
 * Margin Level = (Equity / Used Margin) * 100
 */
export const calculateMarginLevel = (account: TradingAccountWithUser): number => {
  if (account.margin === 0) return 0;
  return (account.equity / account.margin) * 100;
};

/**
 * Check if account has sufficient margin
 */
export const hasSufficientMargin = (account: TradingAccountWithUser): boolean => {
  return account.free_margin > 0;
};

/**
 * Calculate free margin
 * Free Margin = Equity - Used Margin
 */
export const calculateFreeMargin = (account: TradingAccountWithUser): number => {
  return account.equity - account.margin;
};

/**
 * Format currency with proper symbol and decimals
 */
export const formatCurrency = (amount: number, currency: string = 'USD'): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 2
  }).format(amount);
};

/**
 * Format percentage with proper decimals
 */
export const formatPercentage = (value: number): string => {
  return `${value >= 0 ? '+' : ''}${value.toFixed(2)}%`;
};

/**
 * Get status badge styling based on account status
 */
export const getStatusBadgeStyle = (status: string): string => {
  switch (status) {
    case 'active':
      return 'bg-green-500/20 text-green-400';
    case 'inactive':
      return 'bg-yellow-500/20 text-yellow-400';
    case 'suspended':
      return 'bg-red-500/20 text-red-400';
    case 'pending':
      return 'bg-blue-500/20 text-blue-400';
    default:
      return 'bg-gray-500/20 text-gray-400';
  }
};

/**
 * Get account type display name
 */
export const getAccountTypeDisplayName = (accountType: string): string => {
  switch (accountType) {
    case 'standard':
      return 'Standard';
    case 'premium':
      return 'Premium';
    case 'vip':
      return 'VIP';
    default:
      return accountType.charAt(0).toUpperCase() + accountType.slice(1);
  }
};

/**
 * Calculate total balance across multiple accounts
 */
export const calculateTotalBalance = (accounts: TradingAccountWithUser[]): number => {
  return accounts.reduce((sum, account) => sum + account.balance, 0);
};

/**
 * Calculate average balance across multiple accounts
 */
export const calculateAverageBalance = (accounts: TradingAccountWithUser[]): number => {
  if (accounts.length === 0) return 0;
  return calculateTotalBalance(accounts) / accounts.length;
};

/**
 * Count accounts by status
 */
export const countAccountsByStatus = (accounts: TradingAccountWithUser[], status: string): number => {
  return accounts.filter(account => account.status === status).length;
};
