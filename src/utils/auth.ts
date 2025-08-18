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
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));

  const { email, password } = credentials;

  // Accept any email and password combination
  if (!email.trim()) {
    return {
      success: false,
      message: 'Email is required.'
    };
  }

  if (!password.trim()) {
    return {
      success: false,
      message: 'Password is required.'
    };
  }

  // Determine role based on email pattern
  const role = isAdminEmail(email) ? 'admin' : 'user';
  
  // Create user object for any email
  const updatedUser: User = {
    id: `user-${Date.now()}`,
    email: email,
    name: email.split('@')[0].replace(/[._]/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
    role: role,
    createdAt: new Date().toISOString(),
    lastLogin: new Date().toISOString()
  };

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

// Clear user session
export function clearUserSession(): void {
  if (typeof window !== 'undefined') {
    sessionStorage.removeItem('user');
    sessionStorage.removeItem('token');
  }
}
