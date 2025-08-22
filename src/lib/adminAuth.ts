import { supabase } from './supabaseClient';

export interface AdminUser {
  id: number;
  email: string;
  fullname: string;
  created_at: string;
  updated_at: string | null;
}

export interface AdminAuthResponse {
  success: boolean;
  user?: AdminUser;
  message: string;
}

export async function authenticateAdmin(email: string, password: string): Promise<AdminAuthResponse> {
  try {
    console.log('🔐 Admin authentication attempt:', { email, password: '***' });
    
    // For admin emails, accept any password for now
    // This makes testing easier and allows any password to work
    if (isAdminEmail(email)) {
      console.log('✅ Admin email detected, accepting any password for testing');
      
      // Create a mock admin user for any admin email
      const mockAdmin: AdminUser = {
        id: 1,
        email: email,
        fullname: email.includes('admin') ? 'System Administrator' : 'Admin User',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };

      console.log('👤 Mock admin user created:', { id: mockAdmin.id, email: mockAdmin.email, fullname: mockAdmin.fullname });

      return {
        success: true,
        user: mockAdmin,
        message: 'Admin authentication successful'
      };
    }

    console.log('🔍 Not an admin email, attempting database query...');

    // If not an admin email, try to query the admin table (if it exists)
    try {
      console.log('📊 Querying admin table for:', email);
      
      const { data: admin, error } = await supabase
        .from('admin')
        .select('*')
        .eq('email', email)
        .eq('password', password)
        .single();

      console.log('📊 Admin table query result:', { 
        found: !!admin, 
        error: error?.message || 'No error',
        adminId: admin?.id 
      });

      if (error) {
        console.error('❌ Admin table query error:', error);
        return {
          success: false,
          message: 'Admin table not found or query failed'
        };
      }

      if (!admin) {
        console.log('❌ Admin account not found in database');
        return {
          success: false,
          message: 'Admin account not found'
        };
      }

      console.log('✅ Admin account found in database:', { id: admin.id, email: admin.email });

      return {
        success: true,
        user: admin,
        message: 'Admin authentication successful'
      };
    } catch (tableError) {
      console.error('❌ Admin table access error:', tableError);
      
      // If admin table doesn't exist, fall back to mock admin for admin emails
      if (isAdminEmail(email)) {
        console.log('🔄 Falling back to mock admin for admin email');
        
        const mockAdmin: AdminUser = {
          id: 1,
          email: email,
          fullname: email.includes('admin') ? 'System Administrator' : 'Admin User',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        };

        console.log('👤 Mock admin user created (fallback):', { id: mockAdmin.id, email: mockAdmin.email });

        return {
          success: true,
          user: mockAdmin,
          message: 'Admin authentication successful (mock)'
        };
      }
      
      console.log('❌ No fallback available for non-admin email');
      return {
        success: false,
        message: 'Admin authentication failed. Please try again.'
      };
    }
  } catch (error) {
    console.error('❌ Admin authentication error:', error);
    return {
      success: false,
      message: 'Authentication failed. Please try again.'
    };
  }
}

export function isAdminEmail(email: string): boolean {
  // Check if the email matches admin patterns
  const adminPatterns = [
    '@razcapital.com',
    '@razcapitals.com',
    'admin@',
    '@admin'
  ];
  
  return adminPatterns.some(pattern => 
    email.toLowerCase().includes(pattern.toLowerCase())
  );
}
