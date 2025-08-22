# Dashboard Metrics Implementation

This document describes the implementation of dashboard metrics for the RAZ Capitals trading platform, which fetches real-time data from Supabase according to the database schema.

## Overview

The dashboard metrics system provides real-time analytics for:
- User registrations (today and total)
- KYC verification status
- Trading account counts (live and demo)
- Transaction volumes (deposits and withdrawals)
- IB (Introducing Broker) client counts

## Database Schema Mapping

The metrics are fetched from the following tables according to the provided schema:

| Metric | Table | Field/Condition | Logic/Filter |
|--------|-------|-----------------|--------------|
| Today Registration | `users` | `created_at` | Count users where created_at = today |
| Total Registration | `users` | `id` | Count all rows in users |
| KYC Pending | `kyc_documents` | `status` | Count where status != 'verified' |
| Total Live Accounts | `tradingAccounts` | `account_type` | Count where account_type = 'live' |
| Total Demo Accounts | `tradingAccounts` | `account_type` | Count where account_type = 'demo' |
| Total Today Deposits | `transactions` | `type`, `created_at` | Count where type = 'deposit' AND created_at = today |
| Total Today Withdrawals | `transactions` | `type`, `created_at` | Count where type = 'withdrawal' AND created_at = today |
| This Month Deposits | `transactions` | `type`, `created_at` | Count where type = 'deposit' AND created_at in current month |
| This Month Withdrawals | `transactions` | `type`, `created_at` | Count where type = 'withdrawal' AND created_at in current month |
| Total IB Clients | `tradingAccounts` | `account_type` | Count where account_type = 'ib' |

## Components

### 1. DashboardMetrics Component (`src/components/DashboardMetrics.tsx`)

A reusable React component that displays all dashboard metrics in a grid layout.

**Features:**
- Responsive grid layout (2-5 columns based on screen size)
- Loading states with spinner
- Error handling with retry functionality
- Dark/light mode support
- Auto-refresh capability

**Props:**
```typescript
interface DashboardMetricsProps {
  darkMode?: boolean; // Default: true
}
```

### 2. useDashboardMetrics Hook (`src/hooks/useDashboardMetrics.ts`)

A custom React hook that manages the state and data fetching logic for dashboard metrics.

**Returns:**
```typescript
{
  metrics: DashboardMetrics;
  loading: boolean;
  error: string | null;
  fetchDashboardMetrics: () => Promise<void>;
}
```

**Usage:**
```typescript
const { metrics, loading, error, fetchDashboardMetrics } = useDashboardMetrics();
```

## Implementation Details

### Data Fetching

The hook performs the following operations:

1. **Date Calculations:**
   - Today: Start and end of current day
   - Current Month: Start of current month to now

2. **Supabase Queries:**
   - Uses `count: 'exact'` for efficient counting
   - Implements proper error handling for each query
   - Uses appropriate filters (gte, lt, eq, neq)

3. **Error Handling:**
   - Individual error handling for each query
   - Graceful fallback to 0 for failed queries
   - User-friendly error messages

### Performance Considerations

- **Efficient Counting:** Uses Supabase's built-in count functionality
- **Minimal Data Transfer:** Only fetches counts, not full records
- **Caching:** Metrics are cached in component state
- **Refresh Control:** Manual refresh button for on-demand updates

## Usage Examples

### Basic Implementation

```typescript
import DashboardMetrics from '@/components/DashboardMetrics';

function Dashboard() {
  return (
    <div>
      <DashboardMetrics darkMode={true} />
    </div>
  );
}
```

### Using the Hook Directly

```typescript
import { useDashboardMetrics } from '@/hooks/useDashboardMetrics';

function CustomDashboard() {
  const { metrics, loading, error } = useDashboardMetrics();
  
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  
  return (
    <div>
      <h2>Today's Registrations: {metrics.todayRegistration}</h2>
      <h2>Total Users: {metrics.totalRegistration}</h2>
    </div>
  );
}
```

### Integration with Existing Dashboard

The metrics are already integrated into the main dashboard (`src/app/dashboard/DashboardClient.tsx`) and display:

- **Platform Analytics Section:** Complete metrics grid
- **Trading Accounts Section:** Live and demo account counts
- **Verification Button:** KYC pending indicator

## Database Requirements

Ensure your Supabase database has the following tables with the correct structure:

### users
```sql
CREATE TABLE users (
  id BIGINT PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  -- other fields...
);
```

### kyc_documents
```sql
CREATE TABLE kyc_documents (
  id BIGINT PRIMARY KEY,
  status TEXT, -- 'verified', 'pending', 'rejected', etc.
  user_id UUID REFERENCES users(user_uuid),
  -- other fields...
);
```

### tradingAccounts
```sql
CREATE TABLE tradingAccounts (
  id BIGINT PRIMARY KEY,
  account_type TEXT, -- 'live', 'demo', 'ib'
  user_id UUID REFERENCES users(user_uuid),
  -- other fields...
);
```

### transactions
```sql
CREATE TABLE transactions (
  id BIGINT PRIMARY KEY,
  type TEXT, -- 'deposit', 'withdrawal'
  created_at TIMESTAMPTZ DEFAULT NOW(),
  account_id VARCHAR REFERENCES tradingAccounts(account_uid),
  -- other fields...
);
```

## Customization

### Adding New Metrics

1. **Update the interface:**
```typescript
interface DashboardMetrics {
  // ... existing metrics
  newMetric: number;
}
```

2. **Add to the hook:**
```typescript
const { count: newMetricCount } = await supabase
  .from('table_name')
  .select('*', { count: 'exact', head: true })
  .eq('field', 'value');
```

3. **Update the state:**
```typescript
setMetrics(prev => ({
  ...prev,
  newMetric: newMetricCount || 0,
}));
```

4. **Add to the component:**
```typescript
<div className="metric-card">
  <div className="metric-value">{metrics.newMetric}</div>
  <div className="metric-label">New Metric</div>
</div>
```

### Styling

The component uses Tailwind CSS classes and supports both dark and light modes. Customize by modifying the className props in the component.

## Troubleshooting

### Common Issues

1. **Metrics showing 0:**
   - Check if tables exist in Supabase
   - Verify table and column names match
   - Check Supabase permissions for the anon key

2. **Loading indefinitely:**
   - Check browser console for errors
   - Verify Supabase connection
   - Check network connectivity

3. **Permission errors:**
   - Ensure Supabase RLS policies allow reading from tables
   - Verify the anon key has appropriate permissions

### Debug Mode

Enable debug logging by adding console.log statements in the hook:

```typescript
console.log('Fetching metrics...');
console.log('Today start:', startOfDay);
console.log('Query result:', { count: todayRegCount, error: todayRegError });
```

## Future Enhancements

- **Real-time Updates:** WebSocket integration for live metrics
- **Historical Data:** Charts and graphs for trend analysis
- **Export Functionality:** CSV/PDF export of metrics
- **Custom Date Ranges:** User-selectable time periods
- **Caching:** Redis or local storage for improved performance
- **Notifications:** Alerts for significant metric changes

## Support

For issues or questions regarding the dashboard metrics implementation, refer to:
- Supabase documentation
- React hooks documentation
- Tailwind CSS documentation
