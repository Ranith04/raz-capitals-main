import { supabase } from './supabaseClient';

export interface ClientUser {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  created_at: string;
  kyc_status?: string;
  account_status?: string;
  account_type?: string;
}

export interface ClientMetrics {
  totalClients: number;
  activeClients: number;
  kycApproved: number;
  kycPending: number;
  liveAccounts: number;
  demoAccounts: number;
}

export class UserService {
  /**
   * Fetch all users from the database with KYC and account information
   */
  static async getAllUsers(): Promise<ClientUser[]> {
    try {
      console.log('🔍 Fetching users from database...');
      
      // First get all users
      const { data: users, error: usersError } = await supabase
        .from('users')
        .select(`
          id,
          first_name,
          last_name,
          email,
          created_at
        `)
        .order('created_at', { ascending: false });

      if (usersError) {
        console.error('Error fetching users:', usersError);
        throw usersError;
      }

      console.log('✅ Users fetched:', users?.length || 0, 'users found');
      console.log('📋 Sample user data:', users?.[0]);

      if (!users || users.length === 0) {
        return [];
      }

      // Get KYC documents for all users
      console.log('🔍 Fetching KYC documents...');
      const { data: kycDocs, error: kycError } = await supabase
        .from('kyc_documents')
        .select(`
          user_id,
          status
        `);

      if (kycError) {
        console.error('Error fetching KYC documents:', kycError);
      } else {
        console.log('✅ KYC documents fetched:', kycDocs?.length || 0, 'documents found');
        console.log('📋 Sample KYC data:', kycDocs?.[0]);
      }

      // Get trading accounts for all users
      console.log('🔍 Fetching trading accounts...');
      const { data: tradingAccounts, error: tradingError } = await supabase
        .from('tradingAccounts')
        .select(`
          user_id,
          status,
          account_type
        `);

      if (tradingError) {
        console.error('Error fetching trading accounts:', tradingError);
      } else {
        console.log('✅ Trading accounts fetched:', tradingAccounts?.length || 0, 'accounts found');
        console.log('📋 Sample trading account data:', tradingAccounts?.[0]);
      }

      // Combine the data
      const usersWithDetails = users.map(user => {
        console.log(`🔗 Processing user ${user.id}:`, { 
          userId: user.id, 
          kycDocs: kycDocs?.length || 0, 
          tradingAccounts: tradingAccounts?.length || 0 
        });
        
        // Find KYC status for this user - using user.id as the foreign key
        const kycDoc = kycDocs?.find(doc => doc.user_id === user.id.toString());
        
        // Find trading account for this user - using user.id as the foreign key
        const tradingAccount = tradingAccounts?.find(acc => acc.user_id === user.id.toString());

        const result = {
          ...user,
          kyc_status: kycDoc?.status || 'Pending',
          account_status: tradingAccount?.status || 'Active',
          account_type: tradingAccount?.account_type || 'Demo'
        };
        
        console.log(`✅ User ${user.id} processed:`, {
          kyc_status: result.kyc_status,
          account_status: result.account_status,
          account_type: result.account_type
        });
        
        return result;
      });

      return usersWithDetails;
    } catch (error) {
      console.error('Failed to fetch users:', error);
      return [];
    }
  }

  /**
   * Fetch users with KYC status from kyc_documents table
   */
  static async getUsersWithKYC(): Promise<ClientUser[]> {
    try {
      console.log('🔍 Fetching users with KYC...');
      
      // First get all users
      const { data: users, error: usersError } = await supabase
        .from('users')
        .select(`
          id,
          first_name,
          last_name,
          email,
          created_at
        `)
        .order('created_at', { ascending: false });

      if (usersError) {
        console.error('Error fetching users:', usersError);
        throw usersError;
      }

      if (!users || users.length === 0) {
        return [];
      }

      // Get KYC documents for all users
      const { data: kycDocs, error: kycError } = await supabase
        .from('kyc_documents')
        .select(`
          user_id,
          status
        `);

      if (kycError) {
        console.error('Error fetching KYC documents:', kycError);
      }

      // Combine the data
      const usersWithKYC = users.map(user => {
        // Find KYC status for this user - using user.id as the foreign key
        const kycDoc = kycDocs?.find(doc => doc.user_id === user.id.toString());
        
        return {
          ...user,
          kyc_status: kycDoc?.status || 'Pending'
        };
      });

      return usersWithKYC;
    } catch (error) {
      console.error('Failed to fetch users with KYC:', error);
      return [];
    }
  }

  /**
   * Get client metrics for dashboard by combining data from multiple tables
   */
  static async getClientMetrics(): Promise<ClientMetrics> {
    try {
      console.log('🔍 Fetching client metrics...');
      
      // Get total users count
      const { count: totalUsers, error: usersError } = await supabase
        .from('users')
        .select('count', { count: 'exact', head: true });

      if (usersError) {
        console.error('Error fetching users count:', usersError);
        throw usersError;
      }

      // Get KYC status counts
      const { data: kycDocs, error: kycError } = await supabase
        .from('kyc_documents')
        .select('status');

      if (kycError) {
        console.error('Error fetching KYC documents:', kycError);
      }

      // Get trading account counts
      const { data: tradingAccounts, error: tradingError } = await supabase
        .from('tradingAccounts')
        .select('status, account_type');

      if (tradingError) {
        console.error('Error fetching trading accounts:', tradingError);
      }

      // Calculate metrics
      const kycApproved = kycDocs?.filter(doc => doc.status === 'Approved').length || 0;
      const kycPending = kycDocs?.filter(doc => doc.status === 'Pending').length || 0;
      const liveAccounts = tradingAccounts?.filter(acc => acc.account_type === 'Live').length || 0;
      const demoAccounts = tradingAccounts?.filter(acc => acc.account_type === 'Demo').length || 0;
      const activeAccounts = tradingAccounts?.filter(acc => acc.status === 'Active').length || 0;

      const metrics = {
        totalClients: totalUsers || 0,
        activeClients: activeAccounts,
        kycApproved,
        kycPending,
        liveAccounts,
        demoAccounts,
      };

      console.log('✅ Client metrics calculated:', metrics);
      return metrics;
    } catch (error) {
      console.error('Failed to fetch client metrics:', error);
      return {
        totalClients: 0,
        activeClients: 0,
        kycApproved: 0,
        kycPending: 0,
        liveAccounts: 0,
        demoAccounts: 0,
      };
    }
  }

  /**
   * Format user data for display
   */
  static formatUserForDisplay(user: ClientUser) {
    return {
      id: user.id.toString(),
      name: `${user.first_name || ''} ${user.last_name || ''}`.trim() || 'N/A',
      email: user.email || 'N/A',
      registrationDate: user.created_at || 'N/A',
      kycStatus: user.kyc_status || 'Pending',
      accountStatus: user.account_status || 'Active',
      accountType: user.account_type || 'Demo'
    };
  }
}
