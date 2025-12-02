import { supabase } from './supabaseClient';

export type KYCStatus = 'pending' | 'verified' | 'rejected' | null;

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

