import { supabase } from '@/lib/supabaseClient';
import { useEffect, useState } from 'react';

interface DashboardMetrics {
  todayRegistration: number;
  totalRegistration: number;
  kycPending: number;
  totalLiveAccounts: number;
  totalDemoAccounts: number;
  totalTodayDeposits: number;
  totalTodayWithdrawals: number;
  thisMonthDeposits: number;
  thisMonthWithdrawals: number;
  totalIBClients: number;
}

// Helper function to log to both console and terminal (no auth required)
const logToBoth = (message: string, ...args: any[]) => {
  // Log to browser console
  console.log(message, ...args);
  
  // Also send to server API to log in terminal (no auth required)
  fetch('/api/log', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      message,
      data: args.length === 1 ? args[0] : args,
      level: 'info'
    })
  }).catch(() => {
    // Silently fail if API is not available - no auth required
  });
};

export function useDashboardMetrics() {
  const [metrics, setMetrics] = useState<DashboardMetrics>({
    todayRegistration: 0,
    totalRegistration: 0,
    kycPending: 0,
    totalLiveAccounts: 0,
    totalDemoAccounts: 0,
    totalTodayDeposits: 0,
    totalTodayWithdrawals: 0,
    thisMonthDeposits: 0,
    thisMonthWithdrawals: 0,
    totalIBClients: 0,
  });
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Function 1: Get Today Registration Count
  const getTodayRegistration = async (): Promise<number> => {
    try {
      logToBoth('📊 Function 1: getTodayRegistration - STARTING');
      const today = new Date();
      const startOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate());
      const endOfDay = new Date(startOfDay.getTime() + 24 * 60 * 60 * 1000);
      
      logToBoth('   📅 Date parameters:');
      logToBoth('     startOfDay:', startOfDay.toISOString());
      logToBoth('     endOfDay:', endOfDay.toISOString());
      
      logToBoth('   🔍 Supabase Query Details:');
      logToBoth('     Table: users');
      logToBoth('     Select: * (with count)');
      logToBoth('     Filter 1: created_at >=', startOfDay.toISOString());
      logToBoth('     Filter 2: created_at <', endOfDay.toISOString());
      
      logToBoth('   🚀 Executing Supabase query...');
      const { count, error, data } = await supabase
        .from('users')
        .select('*', { count: 'exact', head: true })
        .gte('created_at', startOfDay.toISOString())
        .lt('created_at', endOfDay.toISOString());

      logToBoth('   📥 Supabase Response Received:');
      logToBoth('     Raw response:', { count, error, data });
      logToBoth('     Count value:', count);
      logToBoth('     Error:', error ? error.message : 'None');
      logToBoth('     Data length:', data ? data.length : 'No data');

      if (error) {
        logToBoth('   ❌ Error:', error.message);
        logToBoth('     Error details:', error.details);
        logToBoth('     Error hint:', error.hint);
        logToBoth('     Error code:', error.code);
        return 0;
      }
      
      const result = count || 0;
      logToBoth('   ✅ Today Registration result:', result);
      logToBoth('📊 Function 1: getTodayRegistration - COMPLETED');
      return result;
    } catch (err) {
      logToBoth('   ❌ Exception:', err);
      logToBoth('📊 Function 1: getTodayRegistration - FAILED');
      return 0;
    }
  };

  // Function 2: Get Total Registration Count
  const getTotalRegistration = async (): Promise<number> => {
    try {
      logToBoth('📊 Function 2: getTotalRegistration - STARTING');
      
      logToBoth('   🔍 Supabase Query Details:');
      logToBoth('     Table: users');
      logToBoth('     Select: * (with count)');
      logToBoth('     Filter: None (all rows)');
      
      logToBoth('   🚀 Executing Supabase query...');
      const { count, error, data } = await supabase
        .from('users')
        .select('*', { count: 'exact', head: true });

      logToBoth('   📥 Supabase Response Received:');
      logToBoth('     Raw response:', { count, error, data });
      logToBoth('     Count value:', count);
      logToBoth('     Error:', error ? error.message : 'None');
      logToBoth('     Data length:', data ? data.length : 'No data');

      if (error) {
        logToBoth('   ❌ Error:', error.message);
        logToBoth('     Error details:', error.details);
        logToBoth('     Error hint:', error.hint);
        logToBoth('     Error code:', error.code);
        return 0;
      }
      
      const result = count || 0;
      logToBoth('   ✅ Total Registration result:', result);
      logToBoth('📊 Function 2: getTotalRegistration - COMPLETED');
      return result;
    } catch (err) {
      logToBoth('   ❌ Exception:', err);
      logToBoth('📊 Function 2: getTotalRegistration - FAILED');
      return 0;
    }
  };

  // Function 3: Get KYC Pending Count
  const getKYCPending = async (): Promise<number> => {
    try {
      logToBoth('📊 Function 3: getKYCPending - STARTING');
      
      logToBoth('   🔍 Supabase Query Details:');
      logToBoth('     Table: kyc_documents');
      logToBoth('     Select: * (with count)');
      logToBoth('     Filter: status != "verified"');
      
      logToBoth('   🚀 Executing Supabase query...');
      const { count, error, data } = await supabase
        .from('kyc_documents')
        .select('*', { count: 'exact', head: true })
        .neq('status', 'verified');

      logToBoth('   📥 Supabase Response Received:');
      logToBoth('     Raw response:', { count, error, data });
      logToBoth('     Count value:', count);
      logToBoth('     Error:', error ? error.message : 'None');
      logToBoth('     Data length:', data ? data.length : 'No data');

      if (error) {
        logToBoth('   ❌ Error:', error.message);
        logToBoth('     Error details:', error.details);
        logToBoth('     Error hint:', error.hint);
        logToBoth('     Error code:', error.code);
        return 0;
      }
      
      const result = count || 0;
      logToBoth('   ✅ KYC Pending result:', result);
      logToBoth('📊 Function 3: getKYCPending - COMPLETED');
      return result;
    } catch (err) {
      logToBoth('   ❌ Exception:', err);
      logToBoth('📊 Function 3: getKYCPending - FAILED');
      return 0;
    }
  };

  // Function 4: Get Live Accounts Count
  const getLiveAccounts = async (): Promise<number> => {
    try {
      logToBoth('📊 Function 4: getLiveAccounts - STARTING');
      
      logToBoth('   🔍 Supabase Query Details:');
      logToBoth('     Table: tradingAccounts');
      logToBoth('     Select: * (with count)');
      logToBoth('     Filter: account_type = "live"');
      
      logToBoth('   🚀 Executing Supabase query...');
      const { count, error, data } = await supabase
        .from('tradingAccounts')
        .select('*', { count: 'exact', head: true })
        .eq('account_type', 'live');

      logToBoth('   📥 Supabase Response Received:');
      logToBoth('     Raw response:', { count, error, data });
      logToBoth('     Count value:', count);
      logToBoth('     Error:', error ? error.message : 'None');
      logToBoth('     Data length:', data ? data.length : 'No data');

      if (error) {
        logToBoth('   ❌ Error:', error.message);
        logToBoth('     Error details:', error.details);
        logToBoth('     Error hint:', error.hint);
        logToBoth('     Error code:', error.code);
        return 0;
      }
      
      const result = count || 0;
      logToBoth('   ✅ Live Accounts result:', result);
      logToBoth('📊 Function 4: getLiveAccounts - COMPLETED');
      return result;
    } catch (err) {
      logToBoth('   ❌ Exception:', err);
      logToBoth('📊 Function 4: getLiveAccounts - FAILED');
      return 0;
    }
  };

  // Function 5: Get Demo Accounts Count
  const getDemoAccounts = async (): Promise<number> => {
    try {
      logToBoth('📊 Function 5: getDemoAccounts - STARTING');
      
      logToBoth('   🔍 Supabase Query Details:');
      logToBoth('     Table: tradingAccounts');
      logToBoth('     Select: * (with count)');
      logToBoth('     Filter: account_type = "demo"');
      
      logToBoth('   🚀 Executing Supabase query...');
      const { count, error, data } = await supabase
        .from('tradingAccounts')
        .select('*', { count: 'exact', head: true })
        .eq('account_type', 'demo');

      logToBoth('   📥 Supabase Response Received:');
      logToBoth('     Raw response:', { count, error, data });
      logToBoth('     Count value:', count);
      logToBoth('     Error:', error ? error.message : 'None');
      logToBoth('     Data length:', data ? data.length : 'No data');

      if (error) {
        logToBoth('   ❌ Error:', error.message);
        logToBoth('     Error details:', error.details);
        logToBoth('     Error hint:', error.hint);
        logToBoth('     Error code:', error.code);
        return 0;
      }
      
      const result = count || 0;
      logToBoth('   ✅ Demo Accounts result:', result);
      logToBoth('📊 Function 5: getDemoAccounts - COMPLETED');
      return result;
    } catch (err) {
      logToBoth('   ❌ Exception:', err);
      logToBoth('📊 Function 5: getDemoAccounts - FAILED');
      return 0;
    }
  };

  // Function 6: Get Today Deposits Count
  const getTodayDeposits = async (): Promise<number> => {
    try {
      logToBoth('📊 Function 6: getTodayDeposits - STARTING');
      const today = new Date();
      const startOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate());
      const endOfDay = new Date(startOfDay.getTime() + 24 * 60 * 60 * 1000);
      
      logToBoth('   📅 Date parameters:');
      logToBoth('     startOfDay:', startOfDay.toISOString());
      logToBoth('     endOfDay:', endOfDay.toISOString());
      
      logToBoth('   🔍 Supabase Query Details:');
      logToBoth('     Table: transactions');
      logToBoth('     Select: * (with count)');
      logToBoth('     Filter 1: type = "deposit"');
      logToBoth('     Filter 2: created_at >=', startOfDay.toISOString());
      logToBoth('     Filter 3: created_at <', endOfDay.toISOString());
      
      logToBoth('   🚀 Executing Supabase query...');
      const { count, error, data } = await supabase
        .from('transactions')
        .select('*', { count: 'exact', head: true })
        .eq('type', 'deposit')
        .gte('created_at', startOfDay.toISOString())
        .lt('created_at', endOfDay.toISOString());

      logToBoth('   📥 Supabase Response Received:');
      logToBoth('     Raw response:', { count, error, data });
      logToBoth('     Count value:', count);
      logToBoth('     Error:', error ? error.message : 'None');
      logToBoth('     Data length:', data ? data.length : 'No data');

      if (error) {
        logToBoth('   ❌ Error:', error.message);
        logToBoth('     Error details:', error.details);
        logToBoth('     Error hint:', error.hint);
        logToBoth('     Error code:', error.code);
        return 0;
      }
      
      const result = count || 0;
      logToBoth('   ✅ Today Deposits result:', result);
      logToBoth('📊 Function 6: getTodayDeposits - COMPLETED');
      return result;
    } catch (err) {
      logToBoth('   ❌ Exception:', err);
      logToBoth('📊 Function 6: getTodayDeposits - FAILED');
      return 0;
    }
  };

  // Function 7: Get Today Withdrawals Count
  const getTodayWithdrawals = async (): Promise<number> => {
    try {
      logToBoth('📊 Function 7: getTodayWithdrawals - STARTING');
      const today = new Date();
      const startOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate());
      const endOfDay = new Date(startOfDay.getTime() + 24 * 60 * 60 * 1000);
      
      logToBoth('   📅 Date parameters:');
      logToBoth('     startOfDay:', startOfDay.toISOString());
      logToBoth('     endOfDay:', endOfDay.toISOString());
      
      logToBoth('   🔍 Supabase Query Details:');
      logToBoth('     Table: transactions');
      logToBoth('     Select: * (with count)');
      logToBoth('     Filter 1: type = "withdrawal"');
      logToBoth('     Filter 2: created_at >=', startOfDay.toISOString());
      logToBoth('     Filter 3: created_at <', endOfDay.toISOString());
      
      logToBoth('   🚀 Executing Supabase query...');
      const { count, error, data } = await supabase
        .from('transactions')
        .select('*', { count: 'exact', head: true })
        .eq('type', 'withdrawal')
        .gte('created_at', startOfDay.toISOString())
        .lt('created_at', endOfDay.toISOString());

      logToBoth('   📥 Supabase Response Received:');
      logToBoth('     Raw response:', { count, error, data });
      logToBoth('     Count value:', count);
      logToBoth('     Error:', error ? error.message : 'None');
      logToBoth('     Data length:', data ? data.length : 'No data');

      if (error) {
        logToBoth('   ❌ Error:', error.message);
        logToBoth('     Error details:', error.details);
        logToBoth('     Error hint:', error.hint);
        logToBoth('     Error code:', error.code);
        return 0;
      }
      
      const result = count || 0;
      logToBoth('   ✅ Today Withdrawals result:', result);
      logToBoth('📊 Function 7: getTodayWithdrawals - COMPLETED');
      return result;
    } catch (err) {
      logToBoth('   ❌ Exception:', err);
      logToBoth('📊 Function 7: getTodayWithdrawals - FAILED');
      return 0;
    }
  };

  // Function 8: Get Month Deposits Count
  const getMonthDeposits = async (): Promise<number> => {
    try {
      logToBoth('📊 Function 8: getMonthDeposits - STARTING');
      const today = new Date();
      const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
      
      logToBoth('   📅 Date parameters:');
      logToBoth('     startOfMonth:', startOfMonth.toISOString());
      
      logToBoth('   🔍 Supabase Query Details:');
      logToBoth('     Table: transactions');
      logToBoth('     Select: * (with count)');
      logToBoth('     Filter 1: type = "deposit"');
      logToBoth('     Filter 2: created_at >=', startOfMonth.toISOString());
      
      logToBoth('   🚀 Executing Supabase query...');
      const { count, error, data } = await supabase
        .from('transactions')
        .select('*', { count: 'exact', head: true })
        .eq('type', 'deposit')
        .gte('created_at', startOfMonth.toISOString());

      logToBoth('   📥 Supabase Response Received:');
      logToBoth('     Raw response:', { count, error, data });
      logToBoth('     Count value:', count);
      logToBoth('     Error:', error ? error.message : 'None');
      logToBoth('     Data length:', data ? data.length : 'No data');

      if (error) {
        logToBoth('   ❌ Error:', error.message);
        logToBoth('     Error details:', error.details);
        logToBoth('     Error hint:', error.hint);
        logToBoth('     Error code:', error.code);
        return 0;
      }
      
      const result = count || 0;
      logToBoth('   ✅ Month Deposits result:', result);
      logToBoth('📊 Function 8: getMonthDeposits - COMPLETED');
      return result;
    } catch (err) {
      logToBoth('   ❌ Exception:', err);
      logToBoth('📊 Function 8: getMonthDeposits - FAILED');
      return 0;
    }
  };

  // Function 9: Get Month Withdrawals Count
  const getMonthWithdrawals = async (): Promise<number> => {
    try {
      logToBoth('📊 Function 9: getMonthWithdrawals - STARTING');
      const today = new Date();
      const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
      
      logToBoth('   📅 Date parameters:');
      logToBoth('     startOfMonth:', startOfMonth.toISOString());
      
      logToBoth('   🔍 Supabase Query Details:');
      logToBoth('     Table: transactions');
      logToBoth('     Select: * (with count)');
      logToBoth('     Filter 1: type = "withdrawal"');
      logToBoth('     Filter 2: created_at >=', startOfMonth.toISOString());
      
      logToBoth('   🚀 Executing Supabase query...');
      const { count, error, data } = await supabase
        .from('transactions')
        .select('*', { count: 'exact', head: true })
        .eq('type', 'withdrawal')
        .gte('created_at', startOfMonth.toISOString());

      logToBoth('   📥 Supabase Response Received:');
      logToBoth('     Raw response:', { count, error, data });
      logToBoth('     Count value:', count);
      logToBoth('     Error:', error ? error.message : 'None');
      logToBoth('     Data length:', data ? data.length : 'No data');

      if (error) {
        logToBoth('   ❌ Error:', error.message);
        logToBoth('     Error details:', error.details);
        logToBoth('     Error hint:', error.hint);
        logToBoth('     Error code:', error.code);
        return 0;
      }
      
      const result = count || 0;
      logToBoth('   ✅ Month Withdrawals result:', result);
      logToBoth('📊 Function 9: getMonthWithdrawals - COMPLETED');
      return result;
    } catch (err) {
      logToBoth('   ❌ Exception:', err);
      logToBoth('📊 Function 9: getMonthWithdrawals - FAILED');
      return 0;
    }
  };

  // Function 10: Get IB Clients Count
  const getIBClients = async (): Promise<number> => {
    try {
      logToBoth('📊 Function 10: getIBClients - STARTING');
      
      logToBoth('   🔍 Supabase Query Details:');
      logToBoth('     Table: tradingAccounts');
      logToBoth('     Select: * (with count)');
      logToBoth('     Filter: account_type = "ib"');
      
      logToBoth('   🚀 Executing Supabase query...');
      const { count, error, data } = await supabase
        .from('tradingAccounts')
        .select('*', { count: 'exact', head: true })
        .eq('account_type', 'ib');

      logToBoth('   📥 Supabase Response Received:');
      logToBoth('     Raw response:', { count, error, data });
      logToBoth('     Count value:', count);
      logToBoth('     Error:', error ? error.message : 'None');
      logToBoth('     Data length:', data ? data.length : 'No data');

      if (error) {
        logToBoth('   ❌ Error:', error.message);
        logToBoth('     Error details:', error.details);
        logToBoth('     Error hint:', error.hint);
        logToBoth('     Error code:', error.code);
        return 0;
      }
      
      const result = count || 0;
      logToBoth('   ✅ IB Clients result:', result);
      logToBoth('📊 Function 10: getIBClients - COMPLETED');
      return result;
    } catch (err) {
      logToBoth('   ❌ Exception:', err);
      logToBoth('📊 Function 10: getIBClients - FAILED');
      return 0;
    }
  };

  // Main function to fetch all metrics by calling individual functions in parallel
  const fetchDashboardMetrics = async () => {
    try {
      logToBoth('🚀 === STARTING DASHBOARD METRICS FETCH ===');
      setLoading(true);
      setError(null);
      
      logToBoth('🔄 Calling all metric functions in parallel for maximum performance...');
      
      // Fetch all metrics in parallel using Promise.all() for 3-5x faster loading
      const [
        todayRegCount,
        totalRegCount,
        kycPendingCount,
        liveAccountsCount,
        demoAccountsCount,
        todayDepositsCount,
        todayWithdrawalsCount,
        monthDepositsCount,
        monthWithdrawalsCount,
        ibClientsCount
      ] = await Promise.all([
        getTodayRegistration(),
        getTotalRegistration(),
        getKYCPending(),
        getLiveAccounts(),
        getDemoAccounts(),
        getTodayDeposits(),
        getTodayWithdrawals(),
        getMonthDeposits(),
        getMonthWithdrawals(),
        getIBClients()
      ]);

      // Compile final metrics with real values (or 0 if not available)
      const finalMetrics = {
        todayRegistration: todayRegCount,
        totalRegistration: totalRegCount,
        kycPending: kycPendingCount,
        totalLiveAccounts: liveAccountsCount,
        totalDemoAccounts: demoAccountsCount,
        totalTodayDeposits: todayDepositsCount,
        totalTodayWithdrawals: todayWithdrawalsCount,
        thisMonthDeposits: monthDepositsCount,
        thisMonthWithdrawals: monthWithdrawalsCount,
        totalIBClients: ibClientsCount,
      };

      logToBoth('✅ All functions completed successfully in parallel!');
      logToBoth('📈 Final metrics compiled:', finalMetrics);
      
      setMetrics(finalMetrics);
      
      logToBoth('🎉 Dashboard metrics updated successfully!');
      
    } catch (error) {
      logToBoth('❌ === CRITICAL ERROR IN DASHBOARD METRICS ===');
      logToBoth('❌ Error details:', error);
      setError(error instanceof Error ? error.message : 'Failed to fetch metrics');
    } finally {
      setLoading(false);
      logToBoth('🏁 === DASHBOARD METRICS FETCH COMPLETED ===');
    }
  };

  // Function to refresh individual metrics
  const refreshMetric = async (metricName: string) => {
    try {
      logToBoth(`🔄 Refreshing individual metric: ${metricName}`);
      
      let newValue = 0;
      switch (metricName) {
        case 'todayRegistration':
          newValue = await getTodayRegistration();
          break;
        case 'totalRegistration':
          newValue = await getTotalRegistration();
          break;
        case 'kycPending':
          newValue = await getKYCPending();
          break;
        case 'totalLiveAccounts':
          newValue = await getLiveAccounts();
          break;
        case 'totalDemoAccounts':
          newValue = await getDemoAccounts();
          break;
        case 'totalTodayDeposits':
          newValue = await getTodayDeposits();
          break;
        case 'totalTodayWithdrawals':
          newValue = await getTodayWithdrawals();
          break;
        case 'thisMonthDeposits':
          newValue = await getMonthDeposits();
          break;
        case 'thisMonthWithdrawals':
          newValue = await getMonthWithdrawals();
          break;
        case 'totalIBClients':
          newValue = await getIBClients();
          break;
        default:
          logToBoth('❌ Unknown metric:', metricName);
          return;
      }
      
      setMetrics(prev => ({ ...prev, [metricName]: newValue }));
      logToBoth(`✅ ${metricName} refreshed to:`, newValue);
      
    } catch (error) {
      logToBoth(`❌ Error refreshing ${metricName}:`, error);
    }
  };

  useEffect(() => {
    logToBoth('🔄 useDashboardMetrics hook initialized, fetching metrics...');
    fetchDashboardMetrics();
  }, []);

  return {
    metrics,
    loading,
    error,
    fetchDashboardMetrics,
    refreshMetric, // New function to refresh individual metrics
    // Individual metric functions for external use
    getTodayRegistration,
    getTotalRegistration,
    getKYCPending,
    getLiveAccounts,
    getDemoAccounts,
    getTodayDeposits,
    getTodayWithdrawals,
    getMonthDeposits,
    getMonthWithdrawals,
    getIBClients,
  };
}
