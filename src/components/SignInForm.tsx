'use client';

import { supabase } from '@/lib/supabaseClient';
import { LoginCredentials } from '@/types';
import { authenticateUser, getRedirectPath, storeUserSession } from '@/utils/auth';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function SignInForm() {
  const [loginMethod, setLoginMethod] = useState<'email' | 'trading'>('email');
  const [email, setEmail] = useState('admin@razcapitals.com');
  const [tradingId, setTradingId] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({ email: '', tradingId: '', password: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const router = useRouter();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Reset errors and success message
    setErrors({ email: '', tradingId: '', password: '' });
    setSuccessMessage('');
    
    // Validate fields based on login method
    const newErrors = { email: '', tradingId: '', password: '' };
    
    if (loginMethod === 'email') {
      if (!email.trim()) {
        newErrors.email = 'Please fill out this field.';
      }
    } else {
      if (!tradingId.trim()) {
        newErrors.tradingId = 'Please enter your Trading ID.';
      }
    }
    
    if (!password.trim()) {
      newErrors.password = 'Please fill out this field.';
    }
    
    if (newErrors.email || newErrors.tradingId || newErrors.password) {
      setErrors(newErrors);
      return;
    }
    
    // Set loading state
    setIsLoading(true);
    
    try {
      let authResponse: any = null;
      
      if (loginMethod === 'email') {
        // Email authentication
        const credentials: LoginCredentials = { email, password };
        authResponse = await authenticateUser(credentials);
      } else {
        // Trading credentials authentication
        try {
          console.log('🔐 Trading credentials authentication attempt:', { tradingId, password: '***' });
          
          // Check if trading credentials exist in tradingAccounts table
          console.log('📊 Querying tradingAccounts table for:', tradingId);
          
          const { data: tradingAccount, error } = await supabase
            .from('tradingAccounts')
            .select('user_id, account_uid, account_password')
            .eq('account_uid', tradingId)
            .eq('account_password', password)
            .single();

          console.log('📊 Trading account query result:', { 
            found: !!tradingAccount, 
            error: error?.message || 'No error',
            accountId: tradingAccount?.account_uid,
            userId: tradingAccount?.user_id 
          });

          if (error || !tradingAccount) {
            console.error('❌ Trading credentials not found:', error);
            setErrors({ email: '', tradingId: '', password: 'Invalid Trading ID or Password' });
            setIsLoading(false);
            return;
          }

          console.log('✅ Trading account found, looking up user profile...');

          // Get user profile from users table
          console.log('📊 Querying users table for user_id:', tradingAccount.user_id);
          
          const { data: userProfile, error: profileError } = await supabase
            .from('users')
            .select('*')
            .eq('user_uuid', tradingAccount.user_id)
            .single();

          console.log('📊 User profile lookup result:', { 
            found: !!userProfile, 
            error: profileError?.message || 'No error',
            userId: tradingAccount.user_id,
            profileFields: userProfile ? Object.keys(userProfile) : []
          });

          if (profileError || !userProfile) {
            console.error('❌ User profile not found:', profileError);
            setErrors({ email: '', tradingId: '', password: 'User profile not found' });
            setIsLoading(false);
            return;
          }

          console.log('✅ User profile found, creating auth response...');

          // Create a mock auth response for trading credentials
          authResponse = {
            success: true,
            user: {
              id: userProfile.user_uuid,
              name: userProfile.first_name && userProfile.last_name 
                ? `${userProfile.first_name} ${userProfile.last_name}`
                : userProfile.email || `User ${tradingId}`,
              email: userProfile.email || 'trading@razcapitals.com',
              role: 'user' as const, // Default role for trading users
              createdAt: userProfile.created_at || new Date().toISOString(),
              lastLogin: new Date().toISOString()
            },
            token: 'trading-auth-token', // You might want to generate a proper JWT here
            message: 'Login successful'
          };
          
          console.log('🎉 Trading authentication successful:', {
            userId: authResponse.user.id,
            name: authResponse.user.name,
            email: authResponse.user.email,
            role: authResponse.user.role
          });
        } catch (tradingError) {
          console.error('❌ Trading authentication error:', tradingError);
          setErrors({ email: '', tradingId: '', password: 'Authentication failed' });
          setIsLoading(false);
          return;
        }
      }
      
      console.log('🔐 Final authResponse:', authResponse);
      
      if (authResponse && authResponse.success && authResponse.user && authResponse.token) {
        // Store user session
        console.log('💾 Storing user session:', {
          id: authResponse.user.id,
          name: authResponse.user.name,
          email: authResponse.user.email,
          role: authResponse.user.role
        });
        
        storeUserSession(authResponse.user, authResponse.token);
        
        // Verify session was stored
        const storedUser = sessionStorage.getItem('user');
        console.log('✅ Stored user session:', storedUser);
        
        // Get redirect path based on user role
        const redirectPath = getRedirectPath(authResponse.user);
        
        console.log('🎯 Authentication successful:', {
          user: authResponse.user.name,
          role: authResponse.user.role,
          redirecting: redirectPath
        });

        // Show success message based on role
        if (authResponse.user.role === 'admin') {
          setSuccessMessage('Admin authentication successful! Redirecting to admin dashboard...');
        } else {
          setSuccessMessage('Login successful! Redirecting to dashboard...');
        }
        
        // Redirect based on user role
        console.log('🔄 Redirecting to:', redirectPath);
        
        // Add a small delay to ensure state is updated and user sees success message
        setTimeout(() => {
          console.log('🚀 Executing redirect to:', redirectPath);
          console.log('🚀 Router object:', router);
          console.log('🚀 Current window location:', window.location.href);
          
          try {
            router.push(redirectPath);
            console.log('🚀 Router.push called successfully');
          } catch (redirectError) {
            console.error('❌ Router.push failed:', redirectError);
            // Fallback: try window.location
            console.log('🔄 Trying window.location fallback...');
            window.location.href = redirectPath;
          }
        }, 1500);
      } else {
        // Authentication failed
        console.log('❌ Authentication failed:', {
          success: authResponse?.success,
          hasUser: !!authResponse?.user,
          hasToken: !!authResponse?.token,
          message: authResponse?.message
        });
        
        if (loginMethod === 'email') {
          setErrors({ 
            email: '', 
            tradingId: '',
            password: authResponse?.message || 'Invalid email or password. Please try again.' 
          });
        } else {
          setErrors({ 
            email: '', 
            tradingId: '', 
            password: authResponse?.message || 'Invalid trading credentials. Please try again.' 
          });
        }
      }
    } catch (error) {
      console.error('Login error:', error);
      setErrors({ email: '', tradingId: '', password: 'An error occurred. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8">
      {/* Header with icon */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-4" style={{ backgroundColor: '#A0C8A9' }}>
          <svg className="w-8 h-8" style={{ color: '#1E2E23' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
          </svg>
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Welcome to Your Secure Vault</h1>
        <p className="text-gray-600">Sign in to access your protected account safely</p>
      </div>

      {/* Success Message */}
      {successMessage && (
        <div className="mb-6 flex items-center gap-2 px-4 py-3 rounded-md text-sm font-medium" style={{ backgroundColor: '#D1FAE5', color: '#065F46' }}>
          <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
          {successMessage}
        </div>
      )}

      {/* Login Method Toggle */}
      <div className="mb-6">
        <div className="flex bg-gray-100 rounded-lg p-1">
          <button
            type="button"
            onClick={() => setLoginMethod('email')}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
              loginMethod === 'email'
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Email Login
          </button>
          <button
            type="button"
            onClick={() => setLoginMethod('trading')}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
              loginMethod === 'trading'
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Trading Credentials
          </button>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Email/Trading ID Field */}
        <div>
          <label htmlFor={loginMethod === 'email' ? 'email' : 'tradingId'} className="block text-sm font-medium text-gray-700 mb-2">
            {loginMethod === 'email' ? 'Email Address' : 'Trading ID'}
          </label>
          {loginMethod === 'email' ? (
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 transition-colors duration-200 text-gray-900 bg-white placeholder-gray-500 !text-gray-900"
              style={{ 
                color: '#111827', 
                backgroundColor: '#ffffff'
              }}
              onFocus={(e) => {
                e.target.style.borderColor = '#A0C8A9';
                e.target.style.boxShadow = '0 0 0 2px rgba(160, 200, 169, 0.3)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = '#d1d5db';
                e.target.style.boxShadow = 'none';
              }}
              placeholder="Enter your email address"
              required
            />
          ) : (
            <input
              type="text"
              id="tradingId"
              value={tradingId}
              onChange={(e) => setTradingId(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 transition-colors duration-200 text-gray-900 bg-white placeholder-gray-500 !text-gray-900"
              style={{ 
                color: '#111827', 
                backgroundColor: '#ffffff'
              }}
              onFocus={(e) => {
                e.target.style.borderColor = '#A0C8A9';
                e.target.style.boxShadow = '0 0 0 2px rgba(160, 200, 169, 0.3)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = '#d1d5db';
                e.target.style.boxShadow = 'none';
              }}
              placeholder="Enter your Trading ID"
              required
            />
          )}
        </div>

        {/* Password Field */}
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
            Password
          </label>
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 transition-colors duration-200 text-gray-900 bg-white placeholder-gray-500 !text-gray-900"
              style={{ 
                color: '#111827', 
                backgroundColor: '#ffffff'
              }}
              onFocus={(e) => {
                e.target.style.borderColor = '#A0C8A9';
                e.target.style.boxShadow = '0 0 0 2px rgba(160, 200, 169, 0.3)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = '#d1d5db';
                e.target.style.boxShadow = 'none';
              }}
              placeholder="Enter your password"
              required
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 hover:text-gray-700"
            >
              {showPassword ? (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              )}
            </button>
          </div>
          
          {/* Error message for password */}
          {errors.password && (
            <div className="mt-2 flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium" style={{ backgroundColor: '#FEF3C7', color: '#92400E' }}>
              <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              {errors.password}
            </div>
          )}
        </div>

        {/* Error messages */}
        {loginMethod === 'email' && errors.email && (
          <div className="flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium" style={{ backgroundColor: '#FEF3C7', color: '#92400E' }}>
            <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            {errors.email}
          </div>
        )}
        {loginMethod === 'trading' && errors.tradingId && (
          <div className="flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium" style={{ backgroundColor: '#FEF3C7', color: '#92400E' }}>
            <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            {errors.tradingId}
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-3 px-6 rounded-lg font-semibold transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          style={{ 
            backgroundColor: isLoading ? '#8FB89A' : '#A0C8A9', 
            color: '#1E2E23'
          }}
          onMouseEnter={(e) => {
            if (!isLoading) (e.target as HTMLButtonElement).style.backgroundColor = '#8FB89A';
          }}
          onMouseLeave={(e) => {
            if (!isLoading) (e.target as HTMLButtonElement).style.backgroundColor = '#A0C8A9';
          }}
        >
          {isLoading ? (
            <div className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Signing in...
            </div>
          ) : (
            'Sign in to Your Vault'
          )}
        </button>
      </form>

      {/* Divider */}
      <div className="my-6">
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">or continue with</span>
          </div>
        </div>
      </div>

      {/* Social Login Buttons */}
      <div className="flex justify-center">
        <button
          type="button"
          className="flex items-center justify-center p-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200"
        >
          <span className="text-lg font-bold text-gray-700">G</span>
        </button>
      </div>

      {/* Sign Up Link */}
      <div className="mt-6 text-center">
        <p className="text-sm text-gray-600">
          New to our platform?{' '}
          <a href="/signup" className="text-gray-900 font-medium hover:text-gray-700 transition-colors duration-200">
            Create your account
          </a>
        </p>
      </div>

      {/* Testing Note */}
      <div className="mt-4 text-center">
        <p className="text-xs text-gray-500">
          💡 <strong>Testing:</strong> Any password will work for admin@razcapitals.com
        </p>
      </div>
    </div>
  );
}
