export interface PricingPlan {
  id: string;
  title: string;
  description: string;
  price: string;
  period?: string;
  leverage?: string;
  commission?: string;
  minLot?: string;
  features: string[];
  buttonText: string;
  popular?: boolean;
}

export interface Feature {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

export interface Statistic {
  value: string;
  label: string;
}

export interface NavItem {
  label: string;
  href: string;
}

export interface FooterLink {
  title: string;
  links: {
    label: string;
    href: string;
  }[];
}

export interface MobileMockup {
  id: string;
  title: string;
  description: string;
  imageSrc: string;
  alt: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'user';
  createdAt: string;
  lastLogin?: string;
}

export interface AuthResponse {
  success: boolean;
  user?: User;
  message?: string;
  token?: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

// KYC Document interfaces
export interface KYCDocument {
  id: number;
  user_id: string;
  document_type: 'id_proof' | 'address_proof' | 'income_proof' | 'bank_statement';
  document_name: string;
  file_path: string;
  file_url?: string;
  status: 'pending' | 'approved' | 'rejected';
  uploaded_at: string;
  reviewed_at?: string;
  reviewed_by?: string;
  rejection_reason?: string;
}

export interface EnhancedClientUser {
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