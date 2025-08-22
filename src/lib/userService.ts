import { supabase } from './supabaseClient';

export interface ClientUser {
  id: number;
  user_uuid: string;
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
      // First get all users with user_uuid
      const { data: users, error: usersError } = await supabase
        .from('users')
        .select(`
          id,
          user_uuid,
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
          id,
          user_id,
          status
        `);

      if (kycError) {
        console.error('Error fetching KYC documents:', kycError);
      }

      // Get trading accounts for all users
      const { data: tradingAccounts, error: tradingError } = await supabase
        .from('tradingAccounts')
        .select(`
          id,
          user_id,
          status,
          account_type
        `);

      if (tradingError) {
        console.error('Error fetching trading accounts:', tradingError);
      }

      // Combine the data
      const usersWithDetails = users.map(user => {
        // Find KYC status for this user - using user_uuid to match with user_id in kyc_documents
        const kycDoc = kycDocs?.find(doc => doc.user_id === user.user_uuid);
        
        // Find trading account for this user - using user_uuid to match with user_id in tradingAccounts
        const tradingAccount = tradingAccounts?.find(acc => acc.user_id === user.user_uuid);

        return {
          ...user,
          kyc_status: kycDoc?.status || 'Pending',
          account_status: tradingAccount?.status || 'Active',
          account_type: tradingAccount?.account_type || 'Demo'
        };
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
      // First get all users with user_uuid
      const { data: users, error: usersError } = await supabase
        .from('users')
        .select(`
          id,
          user_uuid,
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
          id,
          user_id,
          status
        `);

      if (kycError) {
        console.error('Error fetching KYC documents:', kycError);
      }

      // Combine the data
      const usersWithKYC = users.map(user => {
        // Find KYC status for this user - using user_uuid to match with user_id in kyc_documents
        const kycDoc = kycDocs?.find(doc => doc.user_id === user.user_uuid);
        
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

      return {
        totalClients: totalUsers || 0,
        activeClients: activeAccounts,
        kycApproved,
        kycPending,
        liveAccounts,
        demoAccounts,
      };
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
