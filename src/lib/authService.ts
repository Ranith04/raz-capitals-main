import type {
  AuthUser,
  SignUpResult,
  SignUpStep1Data,
  SignUpStep2Data,
  SignUpStep3Data,
  SignUpStep4Data,
  SignUpStep5Data,
  SignUpStep6Data,
  SignUpStep7Data,
  UserProfile
} from '@/types/user';
import { supabase } from './supabaseClient';

/**
 * Complete user registration service
 * Handles both Supabase auth and custom user profile creation
 */
export class AuthService {
  /**
   * Step 1: Create user account with email/password
   * This creates the user in Supabase auth.users table
   */
  static async createUserAccount(step1Data: SignUpStep1Data): Promise<SignUpResult> {
    try {
      const { email, password } = step1Data;

      // Create user in Supabase Auth
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
      });

      if (authError) {
        console.error('Auth signup error:', authError);
        return {
          success: false,
          message: authError.message || 'Failed to create user account',
        };
      }

      if (!authData.user?.id) {
        return {
          success: false,
          message: 'User account created but no user ID returned',
        };
      }

      const userUuid = authData.user.id;

      // Store the UUID (and temporary email/password) in sessionStorage for multi-step signup
      if (typeof window !== 'undefined') {
        sessionStorage.setItem('signup_user_uuid', userUuid);
        sessionStorage.setItem('signup_email', email);
        // Warning: storing plain password is temporary for multi-step signup only.
        // Consider removing after finalization.
        sessionStorage.setItem('signup_password', password);
      }

      return {
        success: true,
        message: 'Account created successfully! Please check your email to verify your account.',
        userUuid: userUuid,
      };

    } catch (error) {
      console.error('Unexpected error during account creation:', error);
      return {
        success: false,
        message: 'An unexpected error occurred. Please try again.',
      };
    }
  }

  /**
   * Persist Step 2 details directly into users table using upsert on user_uuid
   */
  static async saveStep2ToUsers(step2Data: SignUpStep2Data): Promise<SignUpResult> {
    try {
      const userUuid = sessionStorage.getItem('signup_user_uuid');
      const email = sessionStorage.getItem('signup_email');
      const password = sessionStorage.getItem('signup_password');

      if (!userUuid || !email || !password) {
        return {
          success: false,
          message: 'Missing signup context. Please complete step 1 again.',
        };
      }

      // Save to session for continuity
      sessionStorage.setItem('signup_step2', JSON.stringify(step2Data));

      const nowIso = new Date().toISOString();

      // Check if a row exists for this user_uuid
      const { data: existingRow, error: selectErr } = await supabase
        .from('users')
        .select('id')
        .eq('user_uuid', userUuid)
        .maybeSingle();

      if (selectErr) {
        console.error('Select step2 error:', selectErr);
        return { success: false, message: selectErr.message || 'Failed to load profile (step 2).' };
      }

      if (existingRow) {
        const { error: updateErr } = await supabase
          .from('users')
          .update({
            email,
            password,
            first_name: step2Data.first_name,
            middle_name: step2Data.middle_name ?? null,
            last_name: step2Data.last_name,
            phone_no: step2Data.phone_no,
            updated_at: nowIso,
          })
          .eq('user_uuid', userUuid);

        if (updateErr) {
          console.error('Update step2 error:', updateErr);
          return { success: false, message: updateErr.message || 'Failed to save profile (step 2).' };
        }
      } else {
        const { error: insertErr } = await supabase
          .from('users')
          .insert({
            user_uuid: userUuid,
            email,
            password,
            first_name: step2Data.first_name,
            middle_name: step2Data.middle_name ?? null,
            last_name: step2Data.last_name,
            phone_no: step2Data.phone_no,
            created_at: nowIso,
            updated_at: nowIso,
          });

        if (insertErr) {
          console.error('Insert step2 error:', insertErr);
          return { success: false, message: insertErr.message || 'Failed to save profile (step 2).' };
        }
      }

      return { success: true, message: 'Profile saved (step 2).', userUuid };
    } catch (error) {
      console.error('Unexpected error saving step 2:', error);
      return { success: false, message: 'Unexpected error saving step 2.' };
    }
  }

  /**
   * Persist Step 3 details onto the same row keyed by user_uuid
   */
  static async saveStep3ToUsers(step3Data: SignUpStep3Data): Promise<SignUpResult> {
    try {
      const userUuid = sessionStorage.getItem('signup_user_uuid');
      const email = sessionStorage.getItem('signup_email');

      if (!userUuid || !email) {
        return {
          success: false,
          message: 'Missing signup context. Please complete previous steps.',
        };
      }

      sessionStorage.setItem('signup_step3', JSON.stringify(step3Data));

      const nowIso = new Date().toISOString();

      // Check if row exists
      const { data: existingRow, error: selectErr } = await supabase
        .from('users')
        .select('id')
        .eq('user_uuid', userUuid)
        .maybeSingle();

      if (selectErr) {
        console.error('Select step3 error:', selectErr);
        return { success: false, message: selectErr.message || 'Failed to load profile (step 3).' };
      }

      if (existingRow) {
        const { error: updateErr } = await supabase
          .from('users')
          .update({
            email,
            dob: step3Data.dob ?? null,
            gender: step3Data.gender ?? null,
            country_of_birth: step3Data.country_of_birth ?? null,
            residential_address: step3Data.residential_address ?? null,
            updated_at: nowIso,
          })
          .eq('user_uuid', userUuid);

        if (updateErr) {
          console.error('Update step3 error:', updateErr);
          return { success: false, message: updateErr.message || 'Failed to save profile (step 3).' };
        }
      } else {
        const { error: insertErr } = await supabase
          .from('users')
          .insert({
            user_uuid: userUuid,
            email,
            dob: step3Data.dob ?? null,
            gender: step3Data.gender ?? null,
            country_of_birth: step3Data.country_of_birth ?? null,
            residential_address: step3Data.residential_address ?? null,
            created_at: nowIso,
            updated_at: nowIso,
          });

        if (insertErr) {
          console.error('Insert step3 error:', insertErr);
          return { success: false, message: insertErr.message || 'Failed to save profile (step 3).' };
        }
      }

      return { success: true, message: 'Profile saved (step 3).', userUuid };
    } catch (error) {
      console.error('Unexpected error saving step 3:', error);
      return { success: false, message: 'Unexpected error saving step 3.' };
    }
  }

  /**
   * Step 2: Add basic profile information
   */
  static async addBasicProfile(step2Data: SignUpStep2Data): Promise<SignUpResult> {
    try {
      const userUuid = sessionStorage.getItem('signup_user_uuid');
      const email = sessionStorage.getItem('signup_email');

      if (!userUuid || !email) {
        return {
          success: false,
          message: 'Please complete step 1 first',
        };
      }

      // Store step 2 data in sessionStorage
      sessionStorage.setItem('signup_step2', JSON.stringify(step2Data));

      return {
        success: true,
        message: 'Basic profile information saved',
        userUuid: userUuid,
      };

    } catch (error) {
      console.error('Error saving basic profile:', error);
      return {
        success: false,
        message: 'Failed to save basic profile information',
      };
    }
  }

  /**
   * Step 3: Add personal details
   */
  static async addPersonalDetails(step3Data: SignUpStep3Data): Promise<SignUpResult> {
    try {
      const userUuid = sessionStorage.getItem('signup_user_uuid');

      if (!userUuid) {
        return {
          success: false,
          message: 'Please complete previous steps first',
        };
      }

      // Store step 3 data in sessionStorage
      sessionStorage.setItem('signup_step3', JSON.stringify(step3Data));

      return {
        success: true,
        message: 'Personal details saved',
        userUuid: userUuid,
      };

    } catch (error) {
      console.error('Error saving personal details:', error);
      return {
        success: false,
        message: 'Failed to save personal details',
      };
    }
  }

  /**
   * Step 4: Add contact information
   */
  static async addContactInfo(step4Data: SignUpStep4Data): Promise<SignUpResult> {
    try {
      const userUuid = sessionStorage.getItem('signup_user_uuid');

      if (!userUuid) {
        return {
          success: false,
          message: 'Please complete previous steps first',
        };
      }

      // Store step 4 data in sessionStorage
      sessionStorage.setItem('signup_step4', JSON.stringify(step4Data));

      return {
        success: true,
        message: 'Contact information saved',
        userUuid: userUuid,
      };

    } catch (error) {
      console.error('Error saving contact info:', error);
      return {
        success: false,
        message: 'Failed to save contact information',
      };
    }
  }

  /**
   * Step 5: Add additional details
   */
  static async addAdditionalDetails(step5Data: SignUpStep5Data): Promise<SignUpResult> {
    try {
      const userUuid = sessionStorage.getItem('signup_user_uuid');

      if (!userUuid) {
        return {
          success: false,
          message: 'Please complete previous steps first',
        };
      }

      // Store step 5 data in sessionStorage
      sessionStorage.setItem('signup_step5', JSON.stringify(step5Data));

      return {
        success: true,
        message: 'Additional details saved',
        userUuid: userUuid,
      };

    } catch (error) {
      console.error('Error saving additional details:', error);
      return {
        success: false,
        message: 'Failed to save additional details',
      };
    }
  }

  /**
   * Step 6: Add step 6 data
   */
  static async addStep6Data(step6Data: SignUpStep6Data): Promise<SignUpResult> {
    try {
      const userUuid = sessionStorage.getItem('signup_user_uuid');

      if (!userUuid) {
        return {
          success: false,
          message: 'Please complete previous steps first',
        };
      }

      // Store step 6 data in sessionStorage
      sessionStorage.setItem('signup_step6', JSON.stringify(step6Data));

      return {
        success: true,
        message: 'Step 6 data saved',
        userUuid: userUuid,
      };

    } catch (error) {
      console.error('Error saving step 6 data:', error);
      return {
        success: false,
        message: 'Failed to save step 6 data',
      };
    }
  }

  /**
   * Step 7: Add step 7 data
   */
  static async addStep7Data(step7Data: SignUpStep7Data): Promise<SignUpResult> {
    try {
      const userUuid = sessionStorage.getItem('signup_user_uuid');

      if (!userUuid) {
        return {
          success: false,
          message: 'Please complete previous steps first',
        };
      }

      // Store step 7 data in sessionStorage
      sessionStorage.setItem('signup_step7', JSON.stringify(step7Data));

      return {
        success: true,
        message: 'Step 7 data saved',
        userUuid: userUuid,
      };

    } catch (error) {
      console.error('Error saving step 7 data:', error);
      return {
        success: false,
        message: 'Failed to save step 7 data',
      };
    }
  }

  /**
   * Final step: Complete registration and save to database
   */
  static async completeRegistration(): Promise<SignUpResult> {
    try {
      const userUuid = sessionStorage.getItem('signup_user_uuid');
      const email = sessionStorage.getItem('signup_email');
      const step2Data = JSON.parse(sessionStorage.getItem('signup_step2') || '{}');
      const step3Data = JSON.parse(sessionStorage.getItem('signup_step3') || '{}');
      const step4Data = JSON.parse(sessionStorage.getItem('signup_step4') || '{}');
      const step5Data = JSON.parse(sessionStorage.getItem('signup_step5') || '{}');
      const step6Data = JSON.parse(sessionStorage.getItem('signup_step6') || '{}');
      const step7Data = JSON.parse(sessionStorage.getItem('signup_step7') || '{}');

      if (!userUuid || !email) {
        return {
          success: false,
          message: 'Please complete all previous steps first',
        };
      }

      // Combine all step data based on your actual table schema
      const userProfileData = {
        user_uuid: userUuid,
        email: email,
        first_name: (step2Data.first_name as string) || '',
        last_name: (step2Data.last_name as string) || '',
        middle_name: (step2Data.middle_name as string) || '',
        phone_no: (step2Data.phone_no as string) || '',
        dob: (step3Data.dob as string) || '',
        gender: (step3Data.gender as string) || '',
        country_of_birth: (step4Data.country_of_birth as string) || '',
        residential_address: (step4Data.residential_address as string) || '',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };

      // Insert into custom users table
      const { data: profileData, error: insertError } = await supabase
        .from('users')
        .insert(userProfileData)
        .select()
        .single();

      if (insertError) {
        console.error('Database insertion error:', insertError);
        return {
          success: false,
          message: 'Failed to save user profile. Please contact support.',
          userUuid: userUuid,
        };
      }

      // Clear sessionStorage
      sessionStorage.removeItem('signup_user_uuid');
      sessionStorage.removeItem('signup_email');
      sessionStorage.removeItem('signup_step2');
      sessionStorage.removeItem('signup_step3');
      sessionStorage.removeItem('signup_step4');
      sessionStorage.removeItem('signup_step5');
      sessionStorage.removeItem('signup_step6');
      sessionStorage.removeItem('signup_step7');

      return {
        success: true,
        message: 'Registration completed successfully! Welcome to RAZ CAPITALS.',
        userUuid: userUuid,
        userProfile: profileData as UserProfile,
      };

    } catch (error) {
      console.error('Error completing registration:', error);
      return {
        success: false,
        message: 'Failed to complete registration. Please try again.',
      };
    }
  }

  /**
   * Get current user from Supabase
   */
  static async getCurrentUser(): Promise<AuthUser | null> {
    try {
      const { data: { user }, error } = await supabase.auth.getUser();
      
      if (error || !user) {
        return null;
      }

      // Cast to AuthUser, tolerating possibly undefined optional fields
      const current: AuthUser = {
        id: user.id,
        email: user.email || '',
        created_at: user.created_at as unknown as string,
        updated_at: user.updated_at as unknown as string,
      };
      if (user.email_confirmed_at) (current as any).email_confirmed_at = user.email_confirmed_at as unknown as string;
      return current;
    } catch (error) {
      console.error('Error getting current user:', error);
      return null;
    }
  }

  /**
   * Get user profile from custom table
   */
  static async getUserProfile(userUuid: string): Promise<UserProfile | null> {
    try {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('user_uuid', userUuid)
        .single();

      if (error || !data) {
        return null;
      }

      return data as UserProfile;
    } catch (error) {
      console.error('Error getting user profile:', error);
      return null;
    }
  }

  /**
   * Sign out user
   */
  static async signOut(): Promise<void> {
    try {
      await supabase.auth.signOut();
      
      // Clear sessionStorage
      if (typeof window !== 'undefined') {
        sessionStorage.clear();
      }
    } catch (error) {
      console.error('Error signing out:', error);
    }
  }

  // ==========================================
  // KYC: Step 4, 5, 6 helpers (kyc_documents)
  // ==========================================

  private static async uploadKycFile(
    file: File,
    userUuid: string,
    keyPrefix: string
  ): Promise<{ path: string }> {
    const fileExt = file.name.split('.').pop() || 'bin';
    const safeName = file.name.replace(/[^a-zA-Z0-9_.-]/g, '_');
    const filePath = `${userUuid}/${keyPrefix}-${Date.now()}-${safeName}`;

    const { error } = await supabase
      .storage
      .from('kyc-documents')
      .upload(filePath, file, { upsert: true, contentType: file.type || undefined });

    if (error) throw error;
    return { path: filePath };
  }

  static async saveKycDocuments(params: {
    primaryDocumentType: string;
    primaryDocument: File;
    secondaryDocumentType: string;
    secondaryDocument: File;
  }): Promise<SignUpResult> {
    try {
      const userUuid = sessionStorage.getItem('signup_user_uuid');
      const email = sessionStorage.getItem('signup_email');
      if (!userUuid || !email) {
        return { success: false, message: 'Missing signup context. Please complete previous steps.' };
      }

      // Upload both documents
      const [primaryRes, secondaryRes] = await Promise.all([
        this.uploadKycFile(params.primaryDocument, userUuid, 'primary-id'),
        this.uploadKycFile(params.secondaryDocument, userUuid, 'secondary-id'),
      ]);

      // Upsert into kyc_documents keyed by user_id
      const nowIso = new Date().toISOString();
      const { data: existing, error: selErr } = await supabase
        .from('kyc_documents')
        .select('id')
        .eq('user_id', userUuid)
        .maybeSingle();

      if (selErr) {
        console.error('Select kyc_documents (step4) error:', selErr);
        return { success: false, message: selErr.message || 'Failed to load KYC docs.' };
      }

      if (existing) {
        const { error: updErr } = await supabase
          .from('kyc_documents')
          .update({
            id_document_type: params.primaryDocumentType,
            id_document_url: primaryRes.path,
            "secondaryID_type": params.secondaryDocumentType,
            "secondaryID_document": secondaryRes.path,
          })
          .eq('user_id', userUuid);
        if (updErr) {
          console.error('Update kyc_documents (step4) error:', updErr);
          return { success: false, message: updErr.message || 'Failed to save KYC docs.' };
        }
      } else {
        const { error: insErr } = await supabase
          .from('kyc_documents')
          .insert({
            user_id: userUuid,
            created_at: nowIso,
            id_document_type: params.primaryDocumentType,
            id_document_url: primaryRes.path,
            "secondaryID_type": params.secondaryDocumentType,
            "secondaryID_document": secondaryRes.path,
            status: 'in_progress',
          });
        if (insErr) {
          console.error('Insert kyc_documents (step4) error:', insErr);
          return { success: false, message: insErr.message || 'Failed to save KYC docs.' };
        }
      }

      return { success: true, message: 'KYC documents saved.', userUuid };
    } catch (error) {
      console.error('Unexpected error saving KYC documents:', error);
      return { success: false, message: 'Unexpected error saving KYC documents.' };
    }
  }

  static async saveBankDetails(params: {
    bankName: string;
    accountNumber: string;
    ifscCode: string;
    bankDocument: File;
  }): Promise<SignUpResult> {
    try {
      const userUuid = sessionStorage.getItem('signup_user_uuid');
      const email = sessionStorage.getItem('signup_email');
      if (!userUuid || !email) {
        return { success: false, message: 'Missing signup context. Please complete previous steps.' };
      }

      const nowIso = new Date().toISOString();
      const uploaded = await this.uploadKycFile(params.bankDocument, userUuid, 'bank-doc');

      const { data: existing, error: selErr } = await supabase
        .from('kyc_documents')
        .select('id')
        .eq('user_id', userUuid)
        .maybeSingle();
      if (selErr) {
        console.error('Select kyc_documents (step5) error:', selErr);
        return { success: false, message: selErr.message || 'Failed to load KYC record.' };
      }

      if (existing) {
        const { error: updErr } = await supabase
          .from('kyc_documents')
          .update({
            bank_name: params.bankName,
            bank_account_number: params.accountNumber,
            ifsc_code: params.ifscCode,
            bank_statement_url: uploaded.path,
            updated_at: nowIso,
          })
          .eq('user_id', userUuid);
        if (updErr) {
          console.error('Update kyc_documents (step5) error:', updErr);
          return { success: false, message: updErr.message || 'Failed to save bank details.' };
        }
      } else {
        const { error: insErr } = await supabase
          .from('kyc_documents')
          .insert({
            user_id: userUuid,
            created_at: nowIso,
            bank_name: params.bankName,
            bank_account_number: params.accountNumber,
            ifsc_code: params.ifscCode,
            bank_statement_url: uploaded.path,
            status: 'in_progress',
          });
        if (insErr) {
          console.error('Insert kyc_documents (step5) error:', insErr);
          return { success: false, message: insErr.message || 'Failed to save bank details.' };
        }
      }

      return { success: true, message: 'Bank details saved.', userUuid };
    } catch (error) {
      console.error('Unexpected error saving bank details:', error);
      return { success: false, message: 'Unexpected error saving bank details.' };
    }
  }

  static async submitKyc(): Promise<SignUpResult> {
    try {
      const userUuid = sessionStorage.getItem('signup_user_uuid');
      if (!userUuid) return { success: false, message: 'Missing signup context.' };

      const nowIso = new Date().toISOString();
      const { data: existing, error: selErr } = await supabase
        .from('kyc_documents')
        .select('id')
        .eq('user_id', userUuid)
        .maybeSingle();
      if (selErr) {
        console.error('Select kyc_documents (submit) error:', selErr);
        return { success: false, message: selErr.message || 'Failed to load KYC record.' };
      }

      if (existing) {
        const { error: updErr } = await supabase
          .from('kyc_documents')
          .update({ status: 'submitted', submitted_at: nowIso, updated_at: nowIso })
          .eq('user_id', userUuid);
        if (updErr) {
          console.error('Update kyc_documents (submit) error:', updErr);
          return { success: false, message: updErr.message || 'Failed to submit KYC.' };
        }
      } else {
        const { error: insErr } = await supabase
          .from('kyc_documents')
          .insert({ user_id: userUuid, created_at: nowIso, status: 'submitted', submitted_at: nowIso });
        if (insErr) {
          console.error('Insert kyc_documents (submit) error:', insErr);
          return { success: false, message: insErr.message || 'Failed to submit KYC.' };
        }
      }

      return { success: true, message: 'KYC submitted successfully.', userUuid };
    } catch (error) {
      console.error('Unexpected error submitting KYC:', error);
      return { success: false, message: 'Unexpected error submitting KYC.' };
    }
  }
}
