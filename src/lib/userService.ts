import { EnhancedClientUser } from '@/types';
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
  phone_number?: string;
  country_of_birth?: string;
  dob?: string;
  middle_name?: string;
  residential_address?: string;
}

export interface ClientMetrics {
  totalClients: number;
  activeClients: number;
  kycVerified: number;
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
          created_at,
          phone_number,
          country_of_birth,
          dob,
          middle_name,
          residential_address
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
          kyc_status: kycDoc?.status || 'pending',
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
          created_at,
          phone_number,
          country_of_birth,
          dob,
          middle_name,
          residential_address
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
      const usersWithKYC = users.map(user => {
        // Find KYC status for this user - using user_uuid to match with user_id in kyc_documents
        const kycDoc = kycDocs?.find(doc => doc.user_id === user.user_uuid);
        
        // Find trading account for this user - using user_uuid to match with user_id in tradingAccounts
        const tradingAccount = tradingAccounts?.find(acc => acc.user_id === user.user_uuid);
        
        return {
          ...user,
          kyc_status: kycDoc?.status || 'pending',
          account_status: tradingAccount?.status || 'Active',
          account_type: tradingAccount?.account_type || 'Demo'
        };
      });

      return usersWithKYC;
    } catch (error) {
      console.error('Failed to fetch users with KYC:', error);
      return [];
    }
  }

  /**
   * Test method to check if we can fetch basic user data
   */
  static async testUserFetch(userId: number): Promise<any> {
    try {
      console.log('Testing user fetch for ID:', userId);
      
      // Simple test - just try to get the user
      const { data: user, error: userError } = await supabase
        .from('users')
        .select('id, first_name, last_name, email')
        .eq('id', userId)
        .single();

      if (userError) {
        console.error('Test user fetch error:', userError);
        return { error: userError.message };
      }

      console.log('Test user fetch success:', user);
      return { success: true, user };
    } catch (error) {
      console.error('Test user fetch exception:', error);
      return { error: error instanceof Error ? error.message : 'Unknown error' };
    }
  }

  /**
   * Fetch enhanced user data including KYC documents and profile information
   */
  static async getEnhancedUserData(userId: number): Promise<EnhancedClientUser | null> {
    try {
      console.log('Fetching enhanced user data for ID:', userId);
      
      // Get user basic information by numeric ID - including all profile fields
      console.log('🔍 [USER FETCH] Fetching user with ID:', userId);
      console.log('🔍 [USER FETCH] Querying users table for fields: id, user_uuid, first_name, last_name, email, created_at, phone_number, country_of_birth, dob, middle_name, residential_address');
      
      const { data: user, error: userError } = await supabase
        .from('users')
        .select(`
          id,
          user_uuid,
          first_name,
          last_name,
          email,
          created_at,
          phone_number,
          country_of_birth,
          dob,
          middle_name,
          residential_address
        `)
        .eq('id', userId)
        .single();

      if (userError || !user) {
        console.error('❌ [USER FETCH] Error fetching user:', userError);
        return null;
      }

      console.log('✅ [USER FETCH] User found successfully');
      console.log('✅ [USER FETCH] Raw user data from database:', user);

      // Get KYC status from kyc_documents table for this user
      console.log('🔍 [KYC STATUS] Looking for KYC record with user_id:', user.user_uuid);
      
      let kycStatus = 'pending'; // Default value
      
      try {
        // Get the single KYC record for this user
        const { data: kycRecord, error: kycError } = await supabase
          .from('kyc_documents')
          .select('status')
          .eq('user_id', user.user_uuid)
          .single();

        if (!kycError && kycRecord) {
          kycStatus = kycRecord.status || 'pending';
          console.log('✅ [KYC STATUS] Record found:', kycRecord);
          console.log('✅ [KYC STATUS] Status value:', kycStatus);
        } else {
          console.log('❌ [KYC STATUS] No record found or error:', kycError);
          console.log('⚠️ [KYC STATUS] Using default status:', kycStatus);
        }
      } catch (kycTableError) {
        console.log('💥 [KYC STATUS] Table error:', kycTableError);
        console.log('⚠️ [KYC STATUS] Using default status:', kycStatus);
      }

      // Get account status from tradingAccounts table
      console.log('🔍 [ACCOUNT STATUS] Looking for trading account with user_id:', user.user_uuid);
      
      let accountStatus = 'Active'; // Default value
      let accountType = 'Demo'; // Default value
      
      try {
        const { data: tradingAccount, error: tradingError } = await supabase
          .from('tradingAccounts')
          .select('status, account_type')
          .eq('user_id', user.user_uuid)
          .single();

        if (!tradingError && tradingAccount) {
          accountStatus = tradingAccount.status || 'Active';
          accountType = tradingAccount.account_type || 'Demo';
          console.log('✅ [ACCOUNT STATUS] Trading account found:', { 
            status: accountStatus, 
            type: accountType,
            fullData: tradingAccount 
          });
        } else {
          console.log('❌ [ACCOUNT STATUS] No trading account found or error:', tradingError);
        }
      } catch (tradingTableError) {
        console.log('💥 [ACCOUNT STATUS] Table error:', tradingTableError);
      }
      
      console.log('✅ [ACCOUNT STATUS] Final status:', accountStatus);
      console.log('✅ [ACCOUNT STATUS] Final type:', accountType);

      const enhancedUser = {
        ...user,
        status: kycStatus,
        account_status: accountStatus,
        account_type: accountType
      };

      console.log('📊 [FINAL USER DATA] ==========================================');
      console.log('👤 [USER BASIC INFO] ID:', user.id);
      console.log('👤 [USER BASIC INFO] UUID:', user.user_uuid);
      console.log('👤 [USER BASIC INFO] First Name:', user.first_name);
      console.log('👤 [USER BASIC INFO] Last Name:', user.last_name);
      console.log('👤 [USER BASIC INFO] Email:', user.email);
      console.log('👤 [USER BASIC INFO] Phone:', user.phone_number);
      console.log('👤 [USER BASIC INFO] Country:', user.country_of_birth);
      console.log('👤 [USER BASIC INFO] Residential Address:', user.residential_address);
      console.log('👤 [USER BASIC INFO] Date of Birth:', user.dob);
      console.log('👤 [USER BASIC INFO] Middle Name:', user.middle_name);
      console.log('👤 [USER BASIC INFO] Created At:', user.created_at);
      console.log('🔐 [KYC STATUS] Final Status:', kycStatus);
      console.log('💳 [ACCOUNT STATUS] Final Status:', accountStatus);
      console.log('💳 [ACCOUNT STATUS] Final Type:', accountType);
      console.log('📋 [COMPLETE USER OBJECT]:', enhancedUser);
      console.log('📊 [FINAL USER DATA] ==========================================');
      
      return enhancedUser;
    } catch (error) {
      console.error('Failed to fetch enhanced user data:', error);
      return null;
    }
  }

  /**
   * Create KYC documents for a user if they don't exist
   */
  static async createKYCDocuments(userId: string, userUuid: string): Promise<boolean> {
    try {
      console.log('Creating KYC documents for user:', { userId, userUuid });
      
      const defaultDocuments = [
        {
          user_id: userUuid,
          document_type: 'id_proof',
          document_name: 'Identity Document',
          file_path: '',
          file_url: '',
          status: 'pending',
          uploaded_at: new Date().toISOString()
        },
        {
          user_id: userUuid,
          document_type: 'address_proof',
          document_name: 'Address Proof Document',
          file_path: '',
          file_url: '',
          status: 'pending',
          uploaded_at: new Date().toISOString()
        }
      ];

      // Try to insert into kyc_documents table first
      let { error } = await supabase
        .from('kyc_documents')
        .insert(defaultDocuments);

      if (error) {
        console.log('Could not insert into kyc_documents table, trying alternatives');
        
        // Try alternative table names
        const alternativeTables = ['kyc_docs', 'documents', 'user_documents', 'verification_documents'];
        for (const tableName of alternativeTables) {
          try {
            const { error: altError } = await supabase
              .from(tableName)
              .insert(defaultDocuments);
            
            if (!altError) {
              console.log(`Successfully created documents in ${tableName} table`);
              return true;
            }
          } catch (tableError) {
            console.log(`Table ${tableName} not accessible:`, tableError);
          }
        }
        
        console.error('Failed to create documents in any table:', error);
        return false;
      }

      console.log('KYC documents created successfully');
      return true;
    } catch (error) {
      console.error('Failed to create KYC documents:', error);
      return false;
    }
  }

  /**
   * Update KYC document status
   */
  static async updateDocumentStatus(documentId: number, status: 'pending' | 'verified' | 'rejected', reviewedBy?: string, rejectionReason?: string): Promise<boolean> {
    try {
      // Ensure status is always lowercase to match enum values
      const normalizedStatus = status.toLowerCase() as 'pending' | 'verified' | 'rejected';
      
      console.log('Updating document status:', { documentId, status, normalizedStatus, reviewedBy, rejectionReason });
      
      const updateData: any = {
        status: normalizedStatus,
        reviewed_at: new Date().toISOString(),
        reviewed_by: reviewedBy || 'Admin'
      };
      
      if (normalizedStatus === 'rejected' && rejectionReason) {
        updateData.rejection_reason = rejectionReason;
      }

      // Try to update in kyc_documents table first
      let { error } = await supabase
        .from('kyc_documents')
        .update(updateData)
        .eq('id', documentId);

      if (error) {
        console.log('Could not update in kyc_documents table, trying alternatives');
        
        // Try alternative table names
        const alternativeTables = ['kyc_docs', 'documents', 'user_documents', 'verification_documents'];
        for (const tableName of alternativeTables) {
          try {
            const { error: altError } = await supabase
              .from(tableName)
              .update(updateData)
              .eq('id', documentId);
            
            if (!altError) {
              console.log(`Successfully updated document in ${tableName} table`);
              return true;
            }
          } catch (tableError) {
            console.log(`Table ${tableName} not accessible:`, tableError);
          }
        }
        
        console.error('Failed to update document status in any table:', error);
        return false;
      }

      console.log('Document status updated successfully');
      return true;
    } catch (error) {
      console.error('Failed to update document status:', error);
      return false;
    }
  }

  /**
   * Approve KYC for a user by updating all their KYC documents to verified status
   */
  static async approveUserKYC(userUuid: string, reviewedBy?: string): Promise<boolean> {
    try {
      console.log('Approving KYC for user:', { userUuid, reviewedBy });
      
      const updateData = {
        status: 'verified', // Already lowercase
        reviewed_at: new Date().toISOString(),
        reviewed_by: reviewedBy || 'Admin'
      };

      // Try to update all KYC documents for this user in kyc_documents table first
      let { error } = await supabase
        .from('kyc_documents')
        .update(updateData)
        .eq('user_id', userUuid);

      if (error) {
        console.log('Could not update in kyc_documents table, trying alternatives');
        
        // Try alternative table names
        const alternativeTables = ['kyc_docs', 'documents', 'user_documents', 'verification_documents'];
        for (const tableName of alternativeTables) {
          try {
            const { error: altError } = await supabase
              .from(tableName)
              .update(updateData)
              .eq('user_id', userUuid);
            
            if (!altError) {
              console.log(`Successfully verified KYC in ${tableName} table`);
              return true;
            }
          } catch (tableError) {
            console.log(`Table ${tableName} not accessible:`, tableError);
          }
        }
        
        console.error('Failed to approve KYC in any table:', error);
        return false;
      }

      console.log('User KYC verified successfully');
      return true;
    } catch (error) {
      console.error('Failed to approve user KYC:', error);
      return false;
    }
  }

  /**
   * Reject KYC for a user by updating all their KYC documents to rejected status
   */
  static async rejectUserKYC(userUuid: string, rejectionReason: string, reviewedBy?: string): Promise<boolean> {
    try {
      console.log('Rejecting KYC for user:', { userUuid, rejectionReason, reviewedBy });
      
      const updateData = {
        status: 'rejected',
        reviewed_at: new Date().toISOString(),
        reviewed_by: reviewedBy || 'Admin',
        rejection_reason: rejectionReason
      };

      // Try to update all KYC documents for this user in kyc_documents table first
      let { error } = await supabase
        .from('kyc_documents')
        .update(updateData)
        .eq('user_id', userUuid);

      if (error) {
        console.log('Could not update in kyc_documents table, trying alternatives');
        
        // Try alternative table names
        const alternativeTables = ['kyc_docs', 'documents', 'user_documents', 'verification_documents'];
        for (const tableName of alternativeTables) {
          try {
            const { error: altError } = await supabase
              .from(tableName)
              .update(updateData)
              .eq('user_id', userUuid);
            
            if (!altError) {
              console.log(`Successfully rejected KYC in ${tableName} table`);
              return true;
            }
          } catch (tableError) {
            console.log(`Table ${tableName} not accessible:`, tableError);
          }
        }
        
        console.error('Failed to reject KYC in any table:', error);
        return false;
      }

      console.log('User KYC rejected successfully');
      return true;
    } catch (error) {
      console.error('Failed to reject user KYC:', error);
      return false;
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
      const kycVerified = kycDocs?.filter(doc => doc.status === 'verified').length || 0;
      const kycPending = kycDocs?.filter(doc => doc.status === 'pending').length || 0;
      const liveAccounts = tradingAccounts?.filter(acc => acc.account_type === 'Live').length || 0;
      const demoAccounts = tradingAccounts?.filter(acc => acc.account_type === 'Demo').length || 0;
      const activeAccounts = tradingAccounts?.filter(acc => acc.status === 'Active').length || 0;

      return {
        totalClients: totalUsers || 0,
        activeClients: activeAccounts,
        kycVerified,
        kycPending,
        liveAccounts,
        demoAccounts,
      };
    } catch (error) {
      console.error('Failed to fetch client metrics:', error);
      return {
        totalClients: 0,
        activeClients: 0,
        kycVerified: 0,
        kycPending: 0,
        liveAccounts: 0,
        demoAccounts: 0,
      };
    }
  }

  /**
   * Fetch user data by user_uuid
   */
  static async getUserByUuid(userUuid: string): Promise<EnhancedClientUser | null> {
    try {
      console.log('Fetching user data by UUID:', userUuid);
      
      const { data: user, error: userError } = await supabase
        .from('users')
        .select(`
          id,
          user_uuid,
          first_name,
          last_name,
          email,
          created_at,
          phone_number,
          country_of_birth,
          dob,
          middle_name,
          residential_address
        `)
        .eq('user_uuid', userUuid)
        .single();

      if (userError || !user) {
        console.error('Error fetching user by UUID:', userError);
        return null;
      }

      console.log('User found by UUID:', user);
      return user;
    } catch (error) {
      console.error('Failed to fetch user by UUID:', error);
      return null;
    }
  }

  /**
   * Update KYC status for a user
   */
  static async updateKycStatus(userUuid: string, newStatus: 'pending' | 'verified' | 'rejected', approvalComments: string): Promise<boolean> {
    try {
      // Ensure status is always lowercase to match enum values
      const normalizedStatus = newStatus.toLowerCase() as 'pending' | 'verified' | 'rejected';
      
      console.log('🔄 [KYC UPDATE] Updating KYC status for user:', userUuid);
      console.log('🔄 [KYC UPDATE] Original status:', newStatus);
      console.log('🔄 [KYC UPDATE] Normalized status:', normalizedStatus);
      console.log('🔄 [KYC UPDATE] Comments:', approvalComments);
      
      const updateData = {
        status: normalizedStatus,
        approval_comments: approvalComments,
        verified_at: normalizedStatus === 'verified' ? new Date().toISOString() : null
      };

      const { error } = await supabase
        .from('kyc_documents')
        .update(updateData)
        .eq('user_id', userUuid);

      if (error) {
        console.log('❌ [KYC UPDATE] Database error:', error);
        return false;
      }

      console.log('✅ [KYC UPDATE] KYC status updated successfully');
      return true;
    } catch (error) {
      console.error('💥 [KYC UPDATE] Exception:', error);
      return false;
    }
  }

  /**
   * Format date for display - handles DD/MM/YYYY format from database
   */
  static formatDate(dateString: string): string {
    if (!dateString || dateString === 'N/A') return 'N/A';
    
    try {
      // Check if the date is in DD/MM/YYYY format (like "28/08/2004")
      if (dateString.includes('/')) {
        const parts = dateString.split('/');
        if (parts.length === 3) {
          const day = parseInt(parts[0]);
          const month = parseInt(parts[1]) - 1; // Month is 0-indexed in JavaScript
          const year = parseInt(parts[2]);
          
          const date = new Date(year, month, day);
          
          // Validate the date
          if (date.getFullYear() === year && date.getMonth() === month && date.getDate() === day) {
            return date.toLocaleDateString('en-US', { 
              month: 'long', 
              day: 'numeric', 
              year: 'numeric' 
            });
          }
        }
      }
      
      // Fallback to standard date parsing
      const date = new Date(dateString);
      if (!isNaN(date.getTime())) {
        return date.toLocaleDateString('en-US', { 
          month: 'long', 
          day: 'numeric', 
          year: 'numeric' 
        });
      }
      
      return 'N/A';
    } catch {
      return 'N/A';
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
              kycStatus: user.kyc_status || 'pending',
      accountStatus: user.account_status || 'Active',
      accountType: user.account_type || 'Demo'
    };
  }
}
