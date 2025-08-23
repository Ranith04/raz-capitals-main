import { EnhancedClientUser, KYCDocument } from '@/types';
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
  city?: string;
  pincode?: string;
  address?: string;
  phone?: string;
  country?: string;
  date_of_birth?: string;
  kyc_documents?: KYCDocument[];
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
      
      // Get user basic information by numeric ID - start with minimal fields
      const { data: user, error: userError } = await supabase
        .from('users')
        .select(`
          id,
          user_uuid,
          first_name,
          last_name,
          email,
          created_at
        `)
        .eq('id', userId)
        .single();

      if (userError || !user) {
        console.error('Error fetching user:', userError);
        return null;
      }

      console.log('User found:', user);

      // Try to get KYC documents for this user using user_uuid
      let kycDocs: KYCDocument[] = [];
      try {
        // First try to get documents from kyc_documents table
        const { data: kycData, error: kycError } = await supabase
          .from('kyc_documents')
          .select(`
            id,
            user_id,
            document_type,
            document_name,
            file_path,
            file_url,
            status,
            uploaded_at,
            reviewed_at,
            reviewed_by,
            rejection_reason
          `)
          .eq('user_id', user.user_uuid);

        if (kycError) {
          console.log('KYC documents table not found or error:', kycError);
          
          // Try alternative table names
          const alternativeTables = ['kyc_docs', 'documents', 'user_documents', 'verification_documents'];
          for (const tableName of alternativeTables) {
            try {
              const { data: altData, error: altError } = await supabase
                .from(tableName)
                .select('*')
                .eq('user_id', user.user_uuid);
              
              if (!altError && altData && altData.length > 0) {
                console.log(`Found documents in ${tableName} table:`, altData);
                // Transform the data to match our KYCDocument interface
                kycDocs = altData.map((doc: any) => ({
                  id: doc.id,
                  user_id: doc.user_id,
                  document_type: doc.document_type || doc.type || 'id_proof',
                  document_name: doc.document_name || doc.name || 'Document',
                  file_path: doc.file_path || doc.path || '',
                  file_url: doc.file_url || doc.url || '',
                  status: doc.status || 'pending',
                  uploaded_at: doc.uploaded_at || doc.created_at || doc.upload_date || new Date().toISOString(),
                  reviewed_at: doc.reviewed_at || doc.review_date,
                  reviewed_by: doc.reviewed_by || doc.reviewer,
                  rejection_reason: doc.rejection_reason || doc.reason
                }));
                break;
              }
            } catch (tableError) {
              console.log(`Table ${tableName} not accessible:`, tableError);
            }
          }
        } else {
          kycDocs = kycData || [];
          console.log('KYC documents found:', kycDocs.length);
        }
      } catch (kycTableError) {
        console.log('KYC documents table does not exist, continuing without it');
      }

      // If no documents found, create default documents based on user registration
      if (kycDocs.length === 0) {
        console.log('No KYC documents found, creating default documents');
        kycDocs = [
          {
            id: 1,
            user_id: user.user_uuid,
            document_type: 'id_proof',
            document_name: 'Identity Document',
            file_path: '',
            file_url: '',
            status: 'pending',
            uploaded_at: user.created_at,
            reviewed_at: undefined,
            reviewed_by: undefined,
            rejection_reason: undefined
          },
          {
            id: 2,
            user_id: user.user_uuid,
            document_type: 'address_proof',
            document_name: 'Address Proof Document',
            file_path: '',
            file_url: '',
            status: 'pending',
            uploaded_at: user.created_at,
            reviewed_at: undefined,
            reviewed_by: undefined,
            rejection_reason: undefined
          }
        ];
      }

      // Get overall KYC status
      const overallKycStatus = kycDocs && kycDocs.length > 0 
        ? kycDocs.every(doc => doc.status === 'approved') ? 'Approved' : 'Pending'
        : 'Pending';

      const enhancedUser = {
        ...user,
        kyc_status: overallKycStatus,
        kyc_documents: kycDocs,
        // Set default values for optional fields
        city: undefined,
        pincode: undefined,
        address: undefined,
        phone: undefined,
        country: undefined,
        date_of_birth: undefined
      };

      console.log('Enhanced user data:', enhancedUser);
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
  static async updateDocumentStatus(documentId: number, status: 'pending' | 'approved' | 'rejected', reviewedBy?: string, rejectionReason?: string): Promise<boolean> {
    try {
      console.log('Updating document status:', { documentId, status, reviewedBy, rejectionReason });
      
      const updateData: any = {
        status,
        reviewed_at: new Date().toISOString(),
        reviewed_by: reviewedBy || 'Admin'
      };
      
      if (status === 'rejected' && rejectionReason) {
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
   * Approve KYC for a user by updating all their KYC documents to approved status
   */
  static async approveUserKYC(userUuid: string, reviewedBy?: string): Promise<boolean> {
    try {
      console.log('Approving KYC for user:', { userUuid, reviewedBy });
      
      const updateData = {
        status: 'approved',
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
              console.log(`Successfully approved KYC in ${tableName} table`);
              return true;
            }
          } catch (tableError) {
            console.log(`Table ${tableName} not accessible:`, tableError);
          }
        }
        
        console.error('Failed to approve KYC in any table:', error);
        return false;
      }

      console.log('User KYC approved successfully');
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
