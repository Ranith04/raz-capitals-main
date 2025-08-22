import { authenticateAdmin } from '@/lib/adminAuth';
import { AuthResponse, LoginCredentials, User } from '@/types';

// Mock user database - In a real app, this would be your backend API
const mockUsers: User[] = [
  {
    id: '1',
    email: 'admin@razcapitals.com',
    name: 'System Administrator',
    role: 'admin',
    createdAt: '2024-01-01T00:00:00Z',
    lastLogin: '2024-01-15T10:30:00Z'
  },
  {
    id: '2',
    email: 'admin@admin.com',
    name: 'Admin User',
    role: 'admin',
    createdAt: '2024-01-01T00:00:00Z',
    lastLogin: '2024-01-15T09:15:00Z'
  },
  {
    id: '3',
    email: 'user@razcapitals.com',
    name: 'John Trader',
    role: 'user',
    createdAt: '2024-01-05T00:00:00Z',
    lastLogin: '2024-01-15T11:45:00Z'
  },
  {
    id: '4',
    email: 'trader@example.com',
    name: 'Demo Trader',
    role: 'user',
    createdAt: '2024-01-10T00:00:00Z',
    lastLogin: '2024-01-14T16:20:00Z'
  }
];

// Authentication function
export async function authenticateUser(credentials: LoginCredentials): Promise<AuthResponse> {
  const { email, password } = credentials;

  console.log('🔐 Starting user authentication for:', email);

  // First, check if this is an admin login attempt
  if (isAdminEmail(email)) {
    console.log('👑 Admin email detected, attempting admin authentication...');
    
    try {
      const adminAuth = await authenticateAdmin(email, password);
      
      console.log('👑 Admin authentication result:', {
        success: adminAuth.success,
        message: adminAuth.message,
        hasUser: !!adminAuth.user
      });
      
      if (adminAuth.success && adminAuth.user) {
        // Convert admin user to User type
        const adminUser: User = {
          id: adminAuth.user.id.toString(),
          email: adminAuth.user.email,
          name: adminAuth.user.fullname,
          role: 'admin',
          createdAt: adminAuth.user.created_at,
          lastLogin: new Date().toISOString()
        };

        console.log('✅ Admin user converted successfully:', {
          id: adminUser.id,
          name: adminUser.name,
          role: adminUser.role
        });

        return {
          success: true,
          user: adminUser,
          token: `admin-token-${adminUser.id}-${Date.now()}`,
          message: 'Admin authentication successful'
        };
      } else {
        console.log('❌ Admin authentication failed:', adminAuth.message);
        return {
          success: false,
          message: adminAuth.message
        };
      }
    } catch (error) {
      console.error('❌ Admin authentication error:', error);
      return {
        success: false,
        message: 'Admin authentication failed. Please try again.'
      };
    }
  }

  console.log('👤 Regular user email detected, using mock authentication...');

  // For non-admin users, use the existing mock authentication logic
  // Simulate API delay
  console.log('⏳ Simulating API delay...');
  await new Promise(resolve => setTimeout(resolve, 1000));

  // Accept any email and password combination for testing
  if (!email.trim()) {
    console.log('❌ Email validation failed: empty email');
    return {
      success: false,
      message: 'Email is required.'
    };
  }

  if (!password.trim()) {
    console.log('❌ Password validation failed: empty password');
    return {
      success: false,
      message: 'Password is required.'
    };
  }

  console.log('✅ Email and password validation passed');

  // For testing purposes, accept ANY email and password combination
  // Determine role based on email pattern
  const role = isAdminEmail(email) ? 'admin' : 'user';
  
  console.log('🎭 User role determined:', role);
  
  // Create user object for any email
  const updatedUser: User = {
    id: `user-${Date.now()}`,
    email: email,
    name: email.split('@')[0].replace(/[._]/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
    role: role,
    createdAt: new Date().toISOString(),
    lastLogin: new Date().toISOString()
  };

  console.log('👤 Mock user created:', {
    id: updatedUser.id,
    name: updatedUser.name,
    email: updatedUser.email,
    role: updatedUser.role
  });

  return {
    success: true,
    user: updatedUser,
    token: `mock-token-${updatedUser.id}-${Date.now()}`,
    message: 'Authentication successful'
  };
}

// Helper function to determine redirect path based on user role
export function getRedirectPath(user: User): string {
  switch (user.role) {
    case 'admin':
      return '/admin/dashboard';
    case 'user':
      return '/dashboard';
    default:
      return '/dashboard';
  }
}

// Helper function to check if email looks like an admin email
export function isAdminEmail(email: string): boolean {
  const adminPatterns = [
    '@admin',
    'admin@',
    '@razcapital.com',
    '@razcapitals.com'
  ];
  
  return adminPatterns.some(pattern => 
    email.toLowerCase().includes(pattern.toLowerCase())
  );
}

// Mock function to store user session (in real app, use proper session management)
export function storeUserSession(user: User, token: string): void {
  if (typeof window !== 'undefined') {
    sessionStorage.setItem('user', JSON.stringify(user));
    sessionStorage.setItem('token', token);
    sessionStorage.setItem('userRole', user.role);
  }
}

// Get current user from session
export function getCurrentUser(): User | null {
  if (typeof window !== 'undefined') {
    const userStr = sessionStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  }
  return null;
}

// Get current user role from session
export function getCurrentUserRole(): string | null {
  if (typeof window !== 'undefined') {
    return sessionStorage.getItem('userRole');
  }
  return null;
}

// Clear user session
export function clearUserSession(): void {
  if (typeof window !== 'undefined') {
    sessionStorage.removeItem('user');
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('userRole');
  }
}
