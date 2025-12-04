import { supabase } from './supabaseClient';

export type KYCStatus = 'pending' | 'verified' | 'rejected' | null;

/**
 * Get KYC status for a user by user_id
 * Fetches the latest KYC document record ordered by submitted_at desc
 * @param user_id - User ID (from trading account) to check KYC status for
 * @returns 'verified' if kyc_status = 'verified', otherwise 'unverified'
 */
export async function getKycStatusByUserId(user_id: string): Promise<'verified' | 'unverified'> {
  try {
    const { data: kycRecord, error } = await supabase
      .from('kyc_documents')
      .select('status, submitted_at')
      .eq('user_id', user_id)
      .order('submitted_at', { ascending: false })
      .limit(1)
      .maybeSingle();

    if (error) {
      console.error('Error fetching KYC status:', error);
      return 'unverified';
    }

    if (!kycRecord) {
      console.log('No KYC record found for user_id:', user_id);
      return 'unverified';
    }

    // Normalize status to lowercase
    const status = (kycRecord.status || '').toLowerCase();
    
    // Return 'verified' only if status is exactly 'verified'
    if (status === 'verified') {
      return 'verified';
    }

    return 'unverified';
  } catch (error) {
    console.error('Exception fetching KYC status:', error);
    return 'unverified';
  }
}

/**
 * Check KYC status for a user
 * @param userUuid - User UUID to check KYC status for
 * @returns KYC status or null if no KYC record found
 */
export async function checkKYCStatus(userUuid: string): Promise<KYCStatus> {
  try {
    const { data: kycRecord, error } = await supabase
      .from('kyc_documents')
      .select('status')
      .eq('user_id', userUuid)
      .maybeSingle();

    if (error) {
      console.error('Error checking KYC status:', error);
      return null;
    }

    if (!kycRecord) {
      console.log('No KYC record found for user:', userUuid);
      return null;
    }

    // Normalize status to lowercase to match enum values
    const status = (kycRecord.status || '').toLowerCase();
    
    if (status === 'pending' || status === 'verified' || status === 'rejected') {
      return status as KYCStatus;
    }

    return null;
  } catch (error) {
    console.error('Exception checking KYC status:', error);
    return null;
  }
}

