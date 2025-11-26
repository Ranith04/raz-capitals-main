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
    
    // Only allow specific admin credentials
    const ADMIN_EMAIL = 'admin@razcapitals.com';
    const ADMIN_PASSWORD = 'Admin@123';
    
    // Check for exact admin credentials match
    if (email.toLowerCase() === ADMIN_EMAIL.toLowerCase() && password === ADMIN_PASSWORD) {
      console.log('✅ Valid admin credentials detected');
      
      // Create admin user with exact credentials
      const adminUser: AdminUser = {
        id: 1,
        email: ADMIN_EMAIL,
        fullname: 'System Administrator',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };

      console.log('👤 Admin user authenticated:', { id: adminUser.id, email: adminUser.email, fullname: adminUser.fullname });

      return {
        success: true,
        user: adminUser,
        message: 'Admin authentication successful'
      };
    }
    
    // If admin email but wrong password, reject immediately
    if (isAdminEmail(email)) {
      console.log('❌ Admin email detected but invalid password');
      return {
        success: false,
        message: 'Invalid admin credentials. Please check your email and password.'
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
      
      // No fallback - only exact credentials are allowed
      console.log('❌ Admin authentication failed - database error');
      return {
        success: false,
        message: 'Admin authentication failed. Please check your credentials and try again.'
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
