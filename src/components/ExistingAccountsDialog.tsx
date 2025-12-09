'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import VerifyPasswordDialog from './VerifyPasswordDialog';
import ErrorDialog from './ErrorDialog';
import SuccessDialog from './SuccessDialog';
import { AuthService } from '@/lib/authService';

interface TradingAccount {
  account_uid: string;
  status: string;
}

interface ExistingAccountsDialogProps {
  email: string;
  accounts: TradingAccount[];
  onClose: () => void;
  onCreateNewAccount: () => void;
}

export default function ExistingAccountsDialog({
  email,
  accounts,
  onClose,
  onCreateNewAccount,
}: ExistingAccountsDialogProps) {
  const router = useRouter();
  const [showVerifyPassword, setShowVerifyPassword] = useState(false);
  const [showErrorDialog, setShowErrorDialog] = useState(false);
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleLoginInstead = () => {
    onClose();
    router.push('/signin');
  };

  const handleCreateNewAccountClick = () => {
    setShowVerifyPassword(true);
  };

  const handleVerifyPassword = async (password: string) => {
    try {
      // Verify email and password from users table
      const verification = await AuthService.verifyPasswordForUser(email, password);

      if (!verification.valid || !verification.userUuid) {
        throw new Error('Invalid email or password. Please check your credentials and try again.');
      }

      // Create new trading account
      const result = await AuthService.createTradingAccountForExistingUser(
        verification.userUuid,
        email
      );

      if (result.success && result.tradingId && result.password) {
        // Success
        setShowVerifyPassword(false);
        setSuccessMessage(
          `New trading account created successfully!\n\nTrading ID: ${result.tradingId}\nPassword: ${result.password}\n\nThese credentials have been sent to your email address.`
        );
        setShowSuccessDialog(true);
      } else {
        throw new Error(result.message || 'Failed to create trading account. Please try again.');
      }
    } catch (error: any) {
      setShowVerifyPassword(false);
      setErrorMessage(error.message || 'An error occurred. Please try again.');
      setShowErrorDialog(true);
      throw error; // Re-throw to let the dialog handle loading state
    }
  };

  const handleCancel = () => {
    setShowVerifyPassword(false);
    router.push('/signin');
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full max-h-[90vh] overflow-y-auto">
        {/* Header Icon */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-xl mb-4" style={{ backgroundColor: '#BFDBFE' }}>
            <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Account Already Exists</h2>
          <p className="text-gray-600 text-sm">We found existing trading accounts for this email address.</p>
        </div>

        {/* Trading Accounts List */}
        <div className="mb-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Your Trading Accounts:</h3>
          {accounts.length > 0 ? (
            <div className="space-y-3">
              {accounts.map((account, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl border border-gray-200"
                >
                  {/* User Icon */}
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#A0C8A9' }}>
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>

                  {/* Account Info */}
                  <div className="flex-1 min-w-0">
                    <div className="text-sm text-gray-600">Trading ID:</div>
                    <div className="text-lg font-bold text-gray-900">{account.account_uid}</div>
                    <div className="text-sm mt-1" style={{ color: '#10B981' }}>
                      Account Status: {account.status.charAt(0).toUpperCase() + account.status.slice(1)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-sm">No trading accounts found.</p>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4">
          <button
            onClick={handleCreateNewAccountClick}
            className="flex-1 py-3 px-6 rounded-lg font-semibold transition-colors duration-200 text-white"
            style={{ backgroundColor: '#A0C8A9' }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#8FB89A';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#A0C8A9';
            }}
          >
            Create New Account
          </button>
          <button
            onClick={handleLoginInstead}
            className="flex-1 py-3 px-6 rounded-lg font-semibold transition-colors duration-200 bg-white border-2 border-gray-300 text-gray-900 hover:bg-gray-50"
          >
            Login Instead
          </button>
        </div>
      </div>

      {/* Verify Password Dialog */}
      {showVerifyPassword && (
        <VerifyPasswordDialog
          email={email}
          onClose={handleCancel}
          onVerify={handleVerifyPassword}
        />
      )}

      {/* Error Dialog */}
      {showErrorDialog && (
        <ErrorDialog
          title="Error"
          message={errorMessage}
          onClose={() => setShowErrorDialog(false)}
        />
      )}

      {/* Success Dialog */}
      {showSuccessDialog && (
        <SuccessDialog
          message={successMessage}
          onClose={() => setShowSuccessDialog(false)}
        />
      )}
    </div>
  );
}

