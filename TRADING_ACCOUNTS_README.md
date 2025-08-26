# Trading Accounts Management System

This document describes the implementation of the trading accounts management system for RAZ CAPITALS admin panel.

## Overview

The trading accounts system allows administrators to view, manage, and monitor live trading accounts from the Supabase database. It provides real-time data fetching, filtering, and comprehensive account information display.

## Features

### 🔍 Real-time Data Fetching
- Fetches live trading accounts from Supabase database
- Automatic data refresh capabilities
- Error handling and loading states

### 📊 Account Information Display
- Account ID and owner details
- Balance, equity, and P&L calculations
- Leverage and margin information
- Account status and type
- Currency support

### 🔧 Advanced Filtering
- Search by account ID or owner name
- Filter by account status (Active, Inactive, Suspended, Pending)
- Filter by account type (Standard, Premium, VIP)
- Filter by balance ranges
- Clear all filters functionality

### 📈 Statistics Dashboard
- Total live accounts count
- Active accounts count
- Total balance across all accounts
- Average balance calculation

## Database Schema

The system works with the following Supabase table structure:

### `tradingAccounts` Table
```sql
- id: number (Primary Key)
- account_uid: string (Unique Account Identifier)
- account_password: string
- levarage: number
- balance: number
- currency: string
- status: enum ('active', 'inactive', 'suspended', 'pending')
- created_at: timestamp
- free_margin: number
- equity: number
- user_id: string (Foreign Key to users table)
- margin: number
- watchlist: text[]
- account_type: enum ('standard', 'premium', 'vip')
```

### `users` Table (Related)
```sql
- id: number (Primary Key)
- user_uuid: string
- first_name: string
- last_name: string
- email: string
- created_at: timestamp
```

## Implementation Details

### 1. Custom Hook: `useTradingAccounts`

Located in `src/hooks/useTradingAccounts.ts`, this hook manages:
- Data fetching from Supabase
- Loading and error states
- Data transformation and mapping
- Refresh functionality

```typescript
const { accounts, loading, error, refreshAccounts } = useTradingAccounts();
```

### 2. Utility Functions: `tradingCalculations.ts`

Located in `src/utils/tradingCalculations.ts`, provides:
- P&L calculations
- Currency formatting
- Status badge styling
- Account statistics calculations

### 3. Type Definitions

Located in `src/types/index.d.ts`:
- `TradingAccount` interface
- `TradingAccountWithUser` interface
- Proper TypeScript typing for all components

## Usage

### Basic Implementation

```typescript
import { useTradingAccounts } from '@/hooks/useTradingAccounts';

function MyComponent() {
  const { accounts, loading, error, refreshAccounts } = useTradingAccounts();
  
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  
  return (
    <div>
      {accounts.map(account => (
        <div key={account.id}>
          {account.account_uid} - {account.user.first_name}
        </div>
      ))}
    </div>
  );
}
```

### Using Utility Functions

```typescript
import { 
  calculatePnL, 
  formatCurrency, 
  getStatusBadgeStyle 
} from '@/utils/tradingCalculations';

// Calculate P&L
const pnl = calculatePnL(account);

// Format currency
const formattedBalance = formatCurrency(account.balance, account.currency);

// Get status styling
const statusStyle = getStatusBadgeStyle(account.status);
```

## API Endpoints

The system uses Supabase client to fetch data:

```typescript
const { data, error } = await supabase
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
  .eq('status', 'active');
```

## Error Handling

The system includes comprehensive error handling:
- Database connection errors
- Query execution errors
- Data transformation errors
- User-friendly error messages
- Retry functionality

## Loading States

- Initial data loading spinner
- Refresh button states
- Table loading indicators
- Smooth transitions

## Filtering System

### Search Filter
- Searches across account ID and owner names
- Case-insensitive matching
- Real-time filtering

### Status Filter
- Active accounts (default)
- Inactive accounts
- Suspended accounts
- Pending accounts

### Account Type Filter
- Standard accounts
- Premium accounts
- VIP accounts

### Balance Range Filter
- $0 - $1,000
- $1,000 - $10,000
- $10,000 - $50,000
- $50,000+

## Performance Considerations

- Memoized filtering with `useMemo`
- Efficient data transformation
- Optimized re-renders
- Debounced search (if needed)

## Security Features

- Protected route access (admin only)
- Secure database queries
- No sensitive data exposure in UI
- Proper authentication checks

## Future Enhancements

### Planned Features
- Real-time updates with Supabase subscriptions
- Account creation/editing forms
- Advanced analytics and reporting
- Export functionality
- Bulk operations

### Potential Improvements
- Pagination for large datasets
- Advanced sorting options
- Custom filter presets
- Data caching strategies
- Performance monitoring

## Troubleshooting

### Common Issues

1. **No data displayed**
   - Check Supabase connection
   - Verify table structure
   - Check console for errors

2. **Filtering not working**
   - Ensure data types match
   - Check filter logic
   - Verify state updates

3. **Performance issues**
   - Check data size
   - Optimize queries
   - Implement pagination if needed

### Debug Mode

Enable console logging by checking the browser console for:
- Supabase connection status
- Data fetching logs
- Error details
- Performance metrics

## Dependencies

- `@supabase/supabase-js` - Database client
- `react` - UI framework
- `next/navigation` - Routing
- `tailwindcss` - Styling

## Contributing

When adding new features:
1. Update type definitions
2. Add utility functions
3. Update the hook if needed
4. Add proper error handling
5. Include loading states
6. Update documentation

## Support

For technical support or questions:
1. Check the console logs
2. Review the database schema
3. Verify Supabase configuration
4. Check the component props
5. Review the hook implementation
