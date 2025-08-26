'use client';

import { User } from '@/types';
import { getCurrentUser } from '@/utils/auth';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: 'admin' | 'user';
  fallbackUrl?: string;
}

export default function ProtectedRoute({ 
  children, 
  requiredRole, 
  fallbackUrl = '/signin' 
}: ProtectedRouteProps) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = () => {
      console.log('🔒 ProtectedRoute: Checking authentication...');
      const currentUser = getCurrentUser();
      console.log('🔒 ProtectedRoute: Current user:', currentUser);
      
      if (!currentUser) {
        // No user found, redirect to sign in
        console.log('🔒 ProtectedRoute: No user found, redirecting to:', fallbackUrl);
        router.push(fallbackUrl);
        return;
      }

      if (requiredRole && currentUser.role !== requiredRole) {
        // User doesn't have required role
        const redirectUrl = currentUser.role === 'admin' ? '/admin/dashboard' : '/dashboard';
        console.log('🔒 ProtectedRoute: Role mismatch, redirecting to:', redirectUrl);
        router.push(redirectUrl);
        return;
      }

      // User is authenticated with correct role
      console.log('🔒 ProtectedRoute: User authenticated successfully:', {
        id: currentUser.id,
        role: currentUser.role,
        requiredRole: requiredRole
      });
      setUser(currentUser);
      setIsLoading(false);
    };

    checkAuth();
  }, [requiredRole, fallbackUrl, router]);

  // Show loading spinner while checking authentication
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#f8fafc' }}>
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mb-4"></div>
          <p className="text-gray-600">Verifying access...</p>
        </div>
      </div>
    );
  }

  // Don't render children if no user (will redirect)
  if (!user) {
    return null;
  }

  // Render protected content
  return <>{children}</>;
}

// Higher-order component for admin routes
export function withAdminAuth<P extends object>(Component: React.ComponentType<P>) {
  return function AdminProtectedComponent(props: P) {
    return (
      <ProtectedRoute requiredRole="admin">
        <Component {...props} />
      </ProtectedRoute>
    );
  };
}

// Higher-order component for user routes
export function withUserAuth<P extends object>(Component: React.ComponentType<P>) {
  return function UserProtectedComponent(props: P) {
    return (
      <ProtectedRoute requiredRole="user">
        <Component {...props} />
      </ProtectedRoute>
    );
  };
}

// Higher-order component for any authenticated user
export function withAuth<P extends object>(Component: React.ComponentType<P>) {
  return function AuthProtectedComponent(props: P) {
    return (
      <ProtectedRoute>
        <Component {...props} />
      </ProtectedRoute>
    );
  };
}
