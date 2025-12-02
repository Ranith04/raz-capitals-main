'use client';

import AuthShell from '@/components/AuthShell';
import { supabase } from '@/lib/supabaseClient';
import { TradingCredentialsService } from '@/lib/tradingCredentialsService';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

interface TradingCredentials {
  tradingId: string;
  password: string;
}

export default function SignUpSuccess() {
  const router = useRouter();
  const [credentials, setCredentials] = useState<TradingCredentials | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [isCreatingAccount, setIsCreatingAccount] = useState(true);

  useEffect(() => {
    // Generate trading credentials and create trading account
    const generateCredentialsAndAccount = async () => {
      try {
        const userUuid = sessionStorage.getItem('signup_user_uuid');
        if (!userUuid) {
          console.error('No user UUID found');
          alert('User session not found. Please restart the signup process.');
          return;
        }

        console.log('Creating trading account for user:', userUuid);

        // Generate trading credentials using your exact logic
        const tradingId = generateTradingId();
        const password = generatePassword();

        // Check if trading ID already exists (in case of collision)
        const { data: existingAccount, error: checkError } = await supabase
          .from('tradingAccounts')
          .select('account_uid')
          .eq('account_uid', tradingId)
          .maybeSingle();

        if (checkError) {
          console.error('Error checking existing trading ID:', checkError);
          alert('Failed to verify trading ID. Please try again.');
          return;
        }

        if (existingAccount) {
          // Generate a new ID if collision occurs
          const newTradingId = generateTradingId();
          const newPassword = generatePassword();
          
          // Update the credentials
          setCredentials({ tradingId: newTradingId, password: newPassword });
          
          // Create trading account with new credentials
          const { error: accountError } = await supabase
            .from('tradingAccounts')
            .insert({
              account_uid: newTradingId,
              account_password: newPassword,
              user_id: userUuid,
              levarage: 100.0,
              balance: 0.0, // Start with zero balance - user needs to deposit
              currency: 'USD',
              status: 'active',
              free_margin: 0.0, // Start with zero free margin
              equity: 0.0, // Start with zero equity
              margin: 0.0,
              watchlist: [],
              account_type: 'real', // Real live account, not demo
              created_at: new Date().toISOString()
            });

          if (accountError) {
            console.error('Error creating trading account with new ID:', accountError);
            alert(`Failed to create trading account: ${accountError.message}`);
            return;
          }

          // Store credentials in sessionStorage for login
          sessionStorage.setItem('trading_credentials', JSON.stringify({ tradingId: newTradingId, password: newPassword }));
          
          // Get user email from sessionStorage
          const userEmail = sessionStorage.getItem('signup_email') || '';
          
          // Send trading credentials via email API
          if (userEmail) {
            try {
              console.log('📧 Sending trading credentials to email:', userEmail);
              const emailResult = await TradingCredentialsService.sendTradingCredentials(
                userEmail,
                newTradingId,
                newPassword
              );
              
              if (emailResult.success) {
                console.log('✅ Trading credentials email sent successfully');
              } else {
                console.warn('⚠️ Failed to send trading credentials email:', emailResult.error);
                // Don't block the flow if email fails
              }
            } catch (emailError) {
              console.error('❌ Error sending trading credentials email:', emailError);
              // Don't block the flow if email fails
            }
          } else {
            console.warn('⚠️ No user email found, skipping email notification');
          }
          
          // Also store basic user info for immediate access
          const basicUserInfo = {
            id: userUuid,
            name: 'Trading User',
            email: userEmail || 'trading@razcapitals.com',
            role: 'user',
            createdAt: new Date().toISOString(),
            lastLogin: new Date().toISOString()
          };
          sessionStorage.setItem('user', JSON.stringify(basicUserInfo));
          sessionStorage.setItem('token', 'trading-auth-token');
          
          setIsCreatingAccount(false);
          return;
        }

        // Create trading account in the tradingAccounts table
        try {
          const { error: accountError } = await supabase
            .from('tradingAccounts')
            .insert({
              account_uid: tradingId,
              account_password: password,
              user_id: userUuid,
              levarage: 100.0, // Default leverage as float8
              balance: 0.0, // Start with zero balance - user needs to deposit
              currency: 'USD', // Default currency as varchar
              status: 'active', // Default status as enum
              free_margin: 0.0, // Start with zero free margin
              equity: 0.0, // Start with zero equity
              margin: 0.0, // Default margin as float8
              watchlist: [], // Empty watchlist as array
              account_type: 'real', // Real live account, not demo
              created_at: new Date().toISOString()
            });

          if (accountError) {
            console.error('Error creating trading account:', accountError);
            console.error('Error details:', {
              code: accountError.code,
              message: accountError.message,
              details: accountError.details,
              hint: accountError.hint
            });
            alert(`Failed to create trading account: ${accountError.message}`);
            return;
          }
        } catch (insertError) {
          console.error('Exception during insert:', insertError);
          alert('Database error occurred. Please try again.');
          return;
        }

        // Store credentials in sessionStorage for login
        sessionStorage.setItem('trading_credentials', JSON.stringify({ tradingId, password }));
        
        // Get user email from sessionStorage
        const userEmail = sessionStorage.getItem('signup_email') || '';
        
        // Send trading credentials via email API
        if (userEmail) {
          try {
            console.log('📧 Sending trading credentials to email:', userEmail);
            const emailResult = await TradingCredentialsService.sendTradingCredentials(
              userEmail,
              tradingId,
              password
            );
            
            if (emailResult.success) {
              console.log('✅ Trading credentials email sent successfully');
            } else {
              console.warn('⚠️ Failed to send trading credentials email:', emailResult.error);
              // Don't block the flow if email fails
            }
          } catch (emailError) {
            console.error('❌ Error sending trading credentials email:', emailError);
            // Don't block the flow if email fails
          }
        } else {
          console.warn('⚠️ No user email found, skipping email notification');
        }
        
        // Also store basic user info for immediate access
        const basicUserInfo = {
          id: userUuid,
          name: 'Trading User',
          email: userEmail || 'trading@razcapitals.com',
          role: 'user',
          createdAt: new Date().toISOString(),
          lastLogin: new Date().toISOString()
        };
        sessionStorage.setItem('user', JSON.stringify(basicUserInfo));
        sessionStorage.setItem('token', 'trading-auth-token');
        
        setCredentials({ tradingId, password });
        setIsCreatingAccount(false);
        
        console.log('Trading account created successfully:', {
          tradingId,
          password,
          userUuid
        });
        
        console.log('Session storage updated:', {
          trading_credentials: sessionStorage.getItem('trading_credentials'),
          user: sessionStorage.getItem('user'),
          token: sessionStorage.getItem('token')
        });
      } catch (error) {
        console.error('Error in credential generation:', error);
        alert('Failed to generate trading credentials. Please try again.');
      }
    };

    generateCredentialsAndAccount();
  }, []);

  // Generate a random trading ID (8 digits)
  const generateTradingId = (): string => {
    const chars = '0123456789';
    let result = '';
    for (let i = 0; i < 8; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  };

  // Generate a random password (7 characters: uppercase + numbers)
  const generatePassword = (): string => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    for (let i = 0; i < 7; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  };

  const copyToClipboard = (text: string, label: string = '') => {
    navigator.clipboard.writeText(text).then(() => {
      // Show success feedback
      console.log(`${label || 'Text'} copied to clipboard`);
    }).catch((err) => {
      console.error('Failed to copy:', err);
    });
  };

  const handleProceedToLogin = () => {
    // Clear signup session data
    sessionStorage.removeItem('signup_user_uuid');
    sessionStorage.removeItem('signup_email');
    sessionStorage.removeItem('signup_password');
    sessionStorage.removeItem('signup_step2');
    sessionStorage.removeItem('signup_step3');
    sessionStorage.removeItem('signup_step4');
    sessionStorage.removeItem('signup_step5');
    sessionStorage.removeItem('signup_step6');
    sessionStorage.removeItem('signup_step7');
    
    // Navigate to login page
    router.push('/signin');
  };

  if (isCreatingAccount) {
    return (
      <AuthShell>
        <div className="bg-white rounded-2xl p-8 shadow-2xl text-center">
          <div className="animate-spin w-16 h-16 border-4 border-green-500 border-t-transparent rounded-full mx-auto mb-6"></div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Creating Your Trading Account</h2>
          <p className="text-gray-600">Please wait while we set up your trading credentials...</p>
        </div>
      </AuthShell>
    );
  }

  if (!credentials) {
    return <div>Error: Failed to generate credentials</div>;
  }

  return (
    <AuthShell>
      {/* Success Card - Exact match to mobile design */}
      <div className="bg-white rounded-2xl p-8 shadow-2xl">
          {/* Success Icon - Large square green with white checkmark */}
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-green-500 rounded-lg flex items-center justify-center">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            </div>
          </div>

          {/* Main Heading - Large bold dark green */}
          <h1 className="text-3xl font-bold text-center mb-2" style={{ color: '#0A2E1D' }}>
            KYC Verification Complete!
          </h1>
          <p className="text-gray-600 text-center mb-8">
            Your trading account has been created successfully
          </p>

          {/* Trading Credentials Section - Light grey box with rounded corners */}
          <div className="bg-gray-100 rounded-xl p-6 mb-6">
            <h2 className="text-lg font-bold mb-4" style={{ color: '#0A2E1D' }}>
              Your Trading Credentials
            </h2>

            {/* Trading ID - Person icon, grey text, copy button */}
            <div className="mb-4">
              <div className="flex items-center mb-2">
                <svg className="w-5 h-5 text-gray-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                <span className="text-sm text-gray-600">Trading ID</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xl font-bold text-gray-800">{credentials.tradingId}</span>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    copyToClipboard(credentials.tradingId, 'Trading ID');
                  }}
                  className="p-2.5 hover:bg-gray-200 rounded-lg transition-all duration-200 hover:scale-105 active:scale-95"
                  title="Copy Trading ID"
                  aria-label="Copy Trading ID to clipboard"
                >
                  <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Password - Padlock icon, grey text, eye toggle, copy button */}
            <div>
              <div className="flex items-center mb-2">
                <svg className="w-5 h-5 text-gray-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                <span className="text-sm text-gray-600">Password</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xl font-bold text-gray-800 font-mono tracking-wider">
                  {showPassword ? credentials.password : '•'.repeat(credentials.password.length)}
                </span>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setShowPassword(!showPassword)}
                    className="p-2.5 hover:bg-gray-200 rounded-lg transition-all duration-200 hover:scale-105 active:scale-95"
                    title={showPassword ? 'Hide password' : 'Show password'}
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? (
                      <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                      </svg>
                    ) : (
                      <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9a3 3 0 100 6 3 3 0 000-6z" />
                      </svg>
                    )}
                  </button>
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      copyToClipboard(credentials.password, 'Password');
                    }}
                    className="p-2.5 hover:bg-gray-200 rounded-lg transition-all duration-200 hover:scale-105 active:scale-95"
                    title="Copy password"
                    aria-label="Copy password to clipboard"
                  >
                    <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Email Notification - Blue background with email icon */}
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-4">
            <div className="flex items-start">
              <svg className="w-5 h-5 text-blue-600 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <p className="text-sm text-blue-800">
                These trading credentials have been sent to your email address for future reference.
              </p>
            </div>
          </div>

          {/* Warning Message - Light yellow background with warning icon */}
          <div className="bg-yellow-100 border border-yellow-300 rounded-xl p-4 mb-6">
            <div className="flex items-start">
              <svg className="w-5 h-5 text-yellow-600 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
              <p className="text-sm text-yellow-800">
                Please save these credentials securely. You will need them to login to your trading account.
              </p>
            </div>
          </div>

          {/* Action Button - Light green background with dark grey text */}
          <button
            onClick={handleProceedToLogin}
            className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-6 rounded-xl transition-colors duration-200"
          >
            Proceed to Login
          </button>
      </div>
    </AuthShell>
  );
}
