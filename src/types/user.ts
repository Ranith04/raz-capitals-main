// User authentication and profile types based on Supabase schema

export interface AuthUser {
  id: string; // UUID from Supabase auth.users
  email: string;
  email_confirmed_at?: string;
  created_at: string;
  updated_at: string;
}

export interface UserProfile {
  id: number; // Auto-incrementing primary key
  user_uuid: string; // UUID referencing auth.users.id
  created_at: string;
  first_name: string;
  email: string;
  updated_at: string;
  password?: string; // Optional, stored separately from auth
  last_name?: string;
  dob?: string; // Date of birth
  middle_name?: string;
  phone_no?: string;
  country_of_birth?: string;
  gender?: string;
  residential_address?: string;
}

export interface SignUpData {
  email: string;
  password: string;
  first_name: string;
  last_name?: string;
  dob?: string;
  middle_name?: string;
  phone_no?: string;
  country_of_birth?: string;
  gender?: string;
  residential_address?: string;
}

export interface SignUpStep1Data {
  email: string;
  password: string;
}

export interface SignUpStep2Data {
  first_name: string;
  middle_name?: string;
  last_name: string;
  phone_no: string;
  country_code: string;
}

export interface SignUpStep3Data {
  dob?: string;
  gender?: string;
  country_of_birth?: string;
  residential_address?: string;
}

export interface SignUpStep4Data {
  country_of_birth?: string;
  residential_address?: string;
}

export interface SignUpStep5Data {
  // Additional step 5 data if needed
}

export interface SignUpStep6Data {
  signature: string;
  termsAgreed: boolean;
  kycCompleted: boolean;
}

export interface SignUpStep7Data {
  tradingExperience: string;
  investmentGoals?: string;
  riskTolerance: string;
}

export interface SignUpResult {
  success: boolean;
  message: string;
  userUuid?: string;
  userProfile?: UserProfile;
}

export interface AuthState {
  user: AuthUser | null;
  profile: UserProfile | null;
  loading: boolean;
  error: string | null;
}
