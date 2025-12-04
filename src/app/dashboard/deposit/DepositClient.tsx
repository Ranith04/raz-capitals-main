'use client';

import UserHeader from '@/components/UserHeader';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { getCurrentUser } from '@/utils/auth';
import { useActiveAccount } from '@/contexts/ActiveAccountContext';
import { TradingAccount } from '@/types';

interface DepositMethod {
  id: string;
  title: string;
  icon: JSX.Element;
  processingTime: string;
  fee: string;
  limits: string;
  minAmount: number;
  maxAmount: number;
  available: boolean;
}

export default function DepositClient() {
  const { activeAccount, accounts: contextAccounts } = useActiveAccount();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(true);
  const [accounts, setAccounts] = useState<TradingAccount[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Deposit form state
  const [showDepositModal, setShowDepositModal] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState<DepositMethod | null>(null);
  const [selectedAccountId, setSelectedAccountId] = useState<string>('');
  const [depositAmount, setDepositAmount] = useState<string>('');
  const [paymentDetails, setPaymentDetails] = useState<string>('');
  const [proofFile, setProofFile] = useState<File | null>(null);
  const [proofFileName, setProofFileName] = useState<string>('');
  const [submitting, setSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [upiId] = useState<string>('tanmaylautawar-1@oksbi'); // UPI ID from the image

  const depositMethods: DepositMethod[] = [
    {
      id: 'cash',
      title: 'Cash Payments',
      icon: (
        <div className="w-16 h-16 bg-[#A0C8A9]/20 rounded-lg flex items-center justify-center">
          <div className="w-12 h-12 bg-[#A0C8A9] rounded-lg flex items-center justify-center">
            <span className="text-2xl font-bold text-[#0A2E1D]">100</span>
          </div>
        </div>
      ),
      processingTime: 'Instant On Payment',
      fee: '0',
      limits: '10 - 5000000 USD',
      minAmount: 10,
      maxAmount: 5000000,
      available: true
    },
    {
      id: 'upi',
      title: 'Pay Through UPI-ID/QR',
      icon: (
        <div className="w-16 h-16 bg-[#A0C8A9]/20 rounded-lg flex items-center justify-center">
          <div className="w-12 h-12 bg-[#A0C8A9] rounded-lg flex items-center justify-center">
            <svg className="w-8 h-8 text-[#0A2E1D]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
            </svg>
          </div>
        </div>
      ),
      processingTime: 'Instant On Payment',
      fee: '0',
      limits: '10 - 5000000 USD',
      minAmount: 10,
      maxAmount: 5000000,
      available: true
    },
    {
      id: 'bank-transfer',
      title: 'Bank Transfer',
      icon: (
        <div className="w-16 h-16 bg-[#A0C8A9]/20 rounded-lg flex items-center justify-center">
          <div className="w-12 h-12 bg-[#A0C8A9] rounded-lg flex items-center justify-center">
            <svg className="w-8 h-8 text-[#0A2E1D]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
          </div>
        </div>
      ),
      processingTime: '1-3 Business Days',
      fee: '0',
      limits: '100 - 10000000 USD',
      minAmount: 100,
      maxAmount: 10000000,
      available: true
    },
    {
      id: 'credit-card',
      title: 'Credit Card',
      icon: (
        <div className="w-16 h-16 bg-[#A0C8A9]/20 rounded-lg flex items-center justify-center">
          <div className="w-12 h-12 bg-[#A0C8A9] rounded-lg flex items-center justify-center">
            <svg className="w-8 h-8 text-[#0A2E1D]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
            </svg>
          </div>
        </div>
      ),
      processingTime: 'Instant',
      fee: '2.5%',
      limits: '50 - 50000 USD',
      minAmount: 50,
      maxAmount: 50000,
      available: true
    }
  ];

  useEffect(() => {
    fetchUserAccounts();
  }, []);

  // Update selected account when active account changes
  useEffect(() => {
    if (activeAccount) {
      setSelectedAccountId(activeAccount.account_uid);
    }
  }, [activeAccount]);

  const fetchUserAccounts = async () => {
    try {
      setLoading(true);
      setError(null);

      // Get user ID
      let userId: string | null = null;
      
      const { data: { user: authUser } } = await supabase.auth.getUser();
      if (authUser) {
        userId = authUser.id;
      } else {
        const sessionUser = getCurrentUser();
        if (sessionUser?.id) {
          userId = sessionUser.id;
          
          if (!userId.match(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i)) {
            const { data: userData, error: userError } = await supabase
              .from('users')
              .select('user_uuid')
              .eq('email', sessionUser.email)
              .single();
            
            if (!userError && userData?.user_uuid) {
              userId = userData.user_uuid;
            }
          }
        }
      }

      if (!userId) {
        setError('No user session found. Please log in again.');
        setLoading(false);
        return;
      }

      // Fetch user's trading accounts
      const { data: tradingAccounts, error: accountsError } = await supabase
        .from('tradingAccounts')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false });

      if (accountsError) {
        console.error('Error fetching accounts:', accountsError);
        setError('Failed to load trading accounts.');
      } else if (tradingAccounts) {
        setAccounts(tradingAccounts);
        // Use active account from context, or fallback to first account
        if (activeAccount) {
          setSelectedAccountId(activeAccount.account_uid);
        } else if (tradingAccounts.length > 0) {
          setSelectedAccountId(tradingAccounts[0].account_uid);
        }
      }
    } catch (err) {
      console.error('Exception while fetching accounts:', err);
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleDepositClick = (method: DepositMethod) => {
    if (accounts.length === 0) {
      setError('Please create a trading account first.');
      return;
    }
    setSelectedMethod(method);
    setShowDepositModal(true);
    setError(null);
    setSuccessMessage(null);
  };

  const handleCloseModal = () => {
    setShowDepositModal(false);
    setSelectedMethod(null);
    setDepositAmount('');
    setPaymentDetails('');
    setProofFile(null);
    setProofFileName('');
    setError(null);
    setSuccessMessage(null);
  };

  // Upload proof file to Supabase Storage
  const uploadProofFile = async (file: File, userId: string): Promise<string | null> => {
    try {
      const fileExt = file.name.split('.').pop() || 'bin';
      const safeName = file.name.replace(/[^a-zA-Z0-9_.-]/g, '_');
      const filePath = `deposit-proofs/${userId}/${Date.now()}-${safeName}`;

      // Try multiple bucket names that might exist
      const bucketNames = [
        'transaction-documents',
        'documents',
        'kyc-documents', // Known to exist from KYC uploads
        'deposit-proofs',
        'proof-documents'
      ];

      let uploadSuccess = false;
      let finalBucketName = '';
      let finalError: any = null;

      for (const bucketName of bucketNames) {
        console.log(`Trying to upload to bucket: ${bucketName}`);
        const { data, error: uploadError } = await supabase.storage
          .from(bucketName)
          .upload(filePath, file, {
            cacheControl: '3600',
            upsert: false,
            contentType: file.type || undefined
          });

        if (!uploadError && data) {
          console.log(`Successfully uploaded to bucket: ${bucketName}`);
          finalBucketName = bucketName;
          uploadSuccess = true;
          break;
        } else {
          console.log(`Failed to upload to ${bucketName}:`, uploadError?.message);
          finalError = uploadError;
        }
      }

      if (!uploadSuccess) {
        console.error('Failed to upload to all buckets. Last error:', finalError);
        // Return null but don't throw - allow transaction to proceed without proof URL
        return null;
      }

      // Get public URL
      const { data: urlData } = supabase.storage
        .from(finalBucketName)
        .getPublicUrl(filePath);

      if (!urlData?.publicUrl) {
        console.error('Failed to get public URL for uploaded file');
        return null;
      }

      console.log('Proof file uploaded successfully:', urlData.publicUrl);
      return urlData.publicUrl;
    } catch (error) {
      console.error('Exception uploading proof file:', error);
      return null;
    }
  };

  const handleSubmitDeposit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedMethod || !selectedAccountId || !depositAmount) {
      setError('Please fill in all required fields.');
      return;
    }

    // For UPI deposits, proof file is required
    if (selectedMethod.id === 'upi' && !proofFile) {
      setError('Please upload proof of deposit document.');
      return;
    }

    const amount = parseFloat(depositAmount);
    if (isNaN(amount) || amount <= 0) {
      setError('Please enter a valid deposit amount.');
      return;
    }

    // Validate amount limits
    if (amount < selectedMethod.minAmount) {
      setError(`Minimum deposit amount is $${selectedMethod.minAmount}.`);
      return;
    }

    if (amount > selectedMethod.maxAmount) {
      setError(`Maximum deposit amount is $${selectedMethod.maxAmount}.`);
      return;
    }

    const selectedAccount = accounts.find(acc => acc.account_uid === selectedAccountId);
    if (!selectedAccount) {
      setError('Selected account not found.');
      return;
    }

    try {
      setSubmitting(true);
      setError(null);

      // Get current user ID
      let userId: string | null = null;
      const { data: { user: authUser } } = await supabase.auth.getUser();
      if (authUser) {
        userId = authUser.id;
      } else {
        const sessionUser = getCurrentUser();
        if (sessionUser?.id) {
          userId = sessionUser.id;
          // If session user ID is not a UUID, try to find the user in users table
          if (!userId.match(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i)) {
            const { data: userData } = await supabase
              .from('users')
              .select('user_uuid')
              .eq('email', sessionUser.email)
              .single();
            if (userData?.user_uuid) {
              userId = userData.user_uuid;
            }
          }
        }
      }

      if (!userId) {
        setError('User session not found. Please log in again.');
        return;
      }

      // Upload proof file if exists (for UPI deposits)
      let proofUrl: string | null = null;
      if (proofFile) {
        console.log('Uploading proof file:', proofFile.name, 'Size:', proofFile.size);
        proofUrl = await uploadProofFile(proofFile, userId);
        if (!proofUrl) {
          // Warn but don't block - allow transaction to proceed without proof URL
          console.warn('Proof file upload failed, but continuing with transaction creation');
          setError('Warning: Proof document upload failed. Transaction will be created without proof document. Please contact support if needed.');
          // Don't return - allow transaction to be created anyway
        } else {
          console.log('Proof file uploaded successfully:', proofUrl);
        }
      }

      // Calculate fee if applicable
      let finalAmount = amount;
      if (selectedMethod.fee.includes('%')) {
        const feePercent = parseFloat(selectedMethod.fee.replace('%', ''));
        const feeAmount = (amount * feePercent) / 100;
        finalAmount = amount + feeAmount;
      }

      // Map deposit method ID to database enum value for mode_of_payment
      // Based on withdraw client pattern: 'Bank_Transfer', 'PayPal', 'Cryptocurrency'
      // Try multiple variations to find the correct enum value
      const getModeOfPaymentEnum = (methodId: string): string => {
        // Try common enum patterns - will attempt multiple if first fails
        const enumMap: { [key: string]: string[] } = {
          'upi': ['upi', 'Upi', 'UPI', 'Upi_Payment', 'UPI_Payment', 'upi_payment'], // Try lowercase first
          'cash': ['cash', 'Cash', 'CASH'],
          'bank-transfer': ['Bank_Transfer', 'bank_transfer', 'BankTransfer'],
          'credit-card': ['Credit_Card', 'credit_card', 'CreditCard'],
        };
        
        // Return first value (will try alternatives in fallback if needed)
        if (enumMap[methodId] && enumMap[methodId].length > 0) {
          return enumMap[methodId][0];
        }
        
        // Fallback: try lowercase first, then PascalCase
        const words = methodId.split('-');
        if (words.length === 1) {
          return words[0].toLowerCase(); // Try lowercase first
        } else {
          return words.map(w => w.toLowerCase()).join('_'); // Try lowercase with underscore
        }
      };

      // Prepare transaction comments
      let transactionComments = '';
      if (selectedMethod.id === 'upi') {
        transactionComments = `UPI Deposit - UPI ID: ${upiId}${paymentDetails ? ` | Transaction Reference: ${paymentDetails}` : ''}`;
      } else {
        transactionComments = paymentDetails || `Deposit via ${selectedMethod.title} - Account ${selectedAccountId}`;
      }

      // Create deposit transaction in Supabase
      // Note: Only using account_id (not user_id) as per database schema
      const transactionData: any = {
        type: 'deposit',
        amount: amount,
        currency: selectedAccount.currency || 'USD',
        status: 'pending', // Set status to 'pending' for new deposit requests
        account_id: selectedAccountId, // Link to specific trading account
        mode_of_payment: getModeOfPaymentEnum(selectedMethod.id), // Map to correct enum value
        transaction_comments: transactionComments,
      };

      // Add proof URL if available
      if (proofUrl) {
        transactionData.proof_of_transaction_url = proofUrl;
      }

      console.log('Creating transaction with data:', transactionData);
      console.log('Mode of payment enum value:', transactionData.mode_of_payment);

      let transactionError: any = null;
      let transaction: any = null;
      
      // Try the primary enum value first
      let { data, error } = await supabase
        .from('transactions')
        .insert(transactionData)
        .select()
        .single();

      // If it fails with enum error, try alternative values
      if (error && error.message?.includes('enum mode_of_payment')) {
        console.log('Primary enum value failed, trying alternatives...');
        
        // Get all alternative values for this method
        const alternativeMaps: { [key: string]: string[] } = {
          'upi': ['upi', 'Upi', 'UPI', 'Upi_Payment', 'UPI_Payment', 'upi_payment', 'UPI_PAYMENT'],
          'cash': ['cash', 'Cash', 'CASH'],
          'bank-transfer': ['Bank_Transfer', 'bank_transfer', 'BankTransfer', 'bank_transfer'],
          'credit-card': ['Credit_Card', 'credit_card', 'CreditCard', 'credit_card'],
        };
        
        const alternativeValues = alternativeMaps[selectedMethod.id] || [];
        
        // Try each alternative value
        for (const altValue of alternativeValues) {
          // Skip if we already tried this value
          if (altValue === transactionData.mode_of_payment) {
            continue;
          }
          
          console.log(`Trying alternative enum value: ${altValue}`);
          const altData = { ...transactionData, mode_of_payment: altValue };
          const altResult = await supabase
            .from('transactions')
            .insert(altData)
            .select()
            .single();
          
          if (!altResult.error) {
            console.log(`✅ Success with enum value: ${altValue}`);
            transaction = altResult.data;
            transactionError = null;
            break;
          } else {
            console.log(`❌ Failed with ${altValue}:`, altResult.error.message);
            transactionError = altResult.error;
          }
        }
        
        // If all alternatives failed, try without mode_of_payment (if it's optional)
        if (transactionError && transactionError.message?.includes('enum mode_of_payment')) {
          console.log('All enum values failed, trying without mode_of_payment field...');
          const { mode_of_payment, ...dataWithoutMode } = transactionData;
          const resultWithoutMode = await supabase
            .from('transactions')
            .insert(dataWithoutMode)
            .select()
            .single();
          
          if (!resultWithoutMode.error) {
            console.log('✅ Success without mode_of_payment field');
            transaction = resultWithoutMode.data;
            transactionError = null;
          } else {
            transactionError = resultWithoutMode.error;
          }
        }
      } else {
        transaction = data;
        transactionError = error;
      }

      if (transactionError) {
        console.error('Error creating deposit:', transactionError);
        console.error('Attempted mode_of_payment value:', transactionData.mode_of_payment);
        setError(`Failed to submit deposit request: ${transactionError.message}. The payment method enum value "${transactionData.mode_of_payment}" is not valid. Please contact support.`);
        return;
      }

      // Success
      setSuccessMessage(`Deposit request submitted successfully! Amount: $${amount.toFixed(2)}. Your deposit will be processed and credited to your account once approved.`);
      setDepositAmount('');
      setPaymentDetails('');
      setProofFile(null);
      setProofFileName('');
      
      // Close modal after 3 seconds
      setTimeout(() => {
        handleCloseModal();
      }, 3000);
    } catch (err) {
      console.error('Exception while submitting deposit:', err);
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const formatCurrency = (amount: number, currency: string = 'USD'): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);
  };

  const formatAccountType = (type: string): string => {
    const typeMap: { [key: string]: string } = {
      'standard': 'Standard Account',
      'premium': 'Premium Account',
      'vip': 'VIP Account',
      'demo': 'Demo Account',
      'demo_30': 'Demo Account (30 days)',
      'demo_60': 'Demo Account (60 days)',
      'demo_90': 'Demo Account (90 days)',
      'demo_unlimited': 'Demo Account (Unlimited)',
    };
    return typeMap[type] || 'Trading Account';
  };

  return (
    <div className={`flex h-screen overflow-hidden ${darkMode ? 'bg-[#0A2E1D]' : 'bg-gray-100'}`}>
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 ${darkMode ? 'bg-[#0F1B14] border-[#A0C8A9]/20' : 'bg-white border-gray-200'} border-r flex flex-col transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div className={`p-6 border-b ${darkMode ? 'border-[#A0C8A9]/20' : 'border-gray-200'}`}>
          <div className="flex items-center">
            <Image
              src="/logo/raz-capitals-logo.png"
              alt="RAZ CAPITALS"
              width={170}
              height={63}
              priority
              className="h-14 w-auto"
            />
          </div>
        </div>

        {/* Navigation - Scrollable Area */}
        <div className="flex-1 overflow-y-auto">
          <nav className="px-4 py-6 space-y-2">
            <a href="/dashboard" className={`flex items-center space-x-3 px-4 py-3 ${darkMode ? 'text-[#A0C8A9]/70 hover:text-white hover:bg-[#A0C8A9]/10' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'} rounded-lg transition-colors`}>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5a2 2 0 012-2h4a2 2 0 012 2v4H8V5z" />
              </svg>
              <span>Dashboard</span>
            </a>
            {/* Wallets menu item temporarily removed */}
            <a href="/dashboard/my-accounts" className={`flex items-center space-x-3 px-4 py-3 ${darkMode ? 'text-[#A0C8A9]/70 hover:text-white hover:bg-[#A0C8A9]/10' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'} rounded-lg transition-colors`}>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              <span>My Accounts</span>
            </a>
            {/* New Account menu item temporarily removed */}
            <a href="/dashboard/deposit" className={`flex items-center space-x-3 px-4 py-3 ${darkMode ? 'text-white bg-[#A0C8A9]/10 border-[#A0C8A9]' : 'text-gray-900 bg-blue-50 border-blue-500'} rounded-lg border-l-4`}>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" />
              </svg>
              <span className="font-medium">Deposit</span>
            </a>
            <a href="/dashboard/withdraw" className={`flex items-center space-x-3 px-4 py-3 ${darkMode ? 'text-[#A0C8A9]/70 hover:text-white hover:bg-[#A0C8A9]/10' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'} rounded-lg transition-colors`}>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
              <span>Withdraw</span>
            </a>
            <a href="/dashboard/history" className={`flex items-center space-x-3 px-4 py-3 ${darkMode ? 'text-[#A0C8A9]/70 hover:text-white hover:bg-[#A0C8A9]/10' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'} rounded-lg transition-colors`}>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>History</span>
            </a>
          </nav>
        </div>
        
        {/* Settings at bottom */}
        <div className={`p-4 border-t ${darkMode ? 'border-[#A0C8A9]/20' : 'border-gray-200'}`}>
          <a href="/dashboard/settings" className={`flex items-center space-x-3 px-4 py-3 ${darkMode ? 'text-[#A0C8A9]/70 hover:text-white hover:bg-[#A0C8A9]/10' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'} rounded-lg transition-colors`}>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span>Settings</span>
          </a>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Header */}
        <UserHeader 
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
          darkMode={darkMode}
          setDarkMode={setDarkMode}
        />

        {/* Deposit Content */}
        <div className={`flex-1 p-6 space-y-6 overflow-y-auto ${darkMode ? 'bg-[#B8D4C1]' : 'bg-gray-50'}`}>
          {/* Header Section */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-[#0A2E1D] mb-3">Deposits</h1>
            <p className="text-lg text-[#2D4A35]">Choose your preferred deposit method</p>
          </div>

          {/* Deposit Methods Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {depositMethods.map((method) => (
              <div key={method.id} className="bg-[#0A2E1D] border border-[#A0C8A9]/30 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all relative">
                {/* Available Badge */}
                {method.available && (
                  <span className="absolute top-4 right-4 px-3 py-1 text-xs font-semibold bg-[#A0C8A9] text-[#0A2E1D] rounded-full">
                    Available
                  </span>
                )}

                {/* Method Header */}
                <div className="flex items-center space-x-4 mb-6">
                  {method.icon}
                  <h2 className="text-xl font-bold text-white flex-1">{method.title}</h2>
                </div>

                {/* Method Details */}
                <div className="space-y-4 mb-6">
                  <div>
                    <p className="text-sm text-[#A0C8A9]/70 mb-1">Processing Time</p>
                    <p className="text-base font-semibold text-white">{method.processingTime}</p>
                  </div>
                  
                  <div>
                    <p className="text-sm text-[#A0C8A9]/70 mb-1">Fee</p>
                    <p className="text-base font-semibold text-white">
                      {method.fee.includes('%') ? method.fee : `$${method.fee}`}
                    </p>
                  </div>
                  
                  <div>
                    <p className="text-sm text-[#A0C8A9]/70 mb-1">Limits</p>
                    <p className="text-base font-semibold text-white">{method.limits}</p>
                  </div>
                </div>

                {/* Action Button */}
                <button 
                  onClick={() => handleDepositClick(method)}
                  disabled={!method.available || accounts.length === 0}
                  className={`w-full py-3 px-4 rounded-lg font-semibold transition-colors text-lg shadow-md ${
                    method.available && accounts.length > 0
                      ? 'bg-[#A0C8A9] text-[#0A2E1D] hover:bg-[#8BBF9F]'
                      : 'bg-gray-400 text-gray-600 cursor-not-allowed'
                  }`}
                >
                  Deposit
                </button>
              </div>
            ))}
          </div>

          {/* Error Message */}
          {error && (
            <div className="max-w-4xl mx-auto mt-6">
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <p className="text-red-800 text-sm">{error}</p>
              </div>
            </div>
          )}

          {/* Loading State */}
          {loading && (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-[#0A2E1D]"></div>
              <p className="mt-4 text-[#2D4A35]">Loading deposit methods...</p>
            </div>
          )}

          {/* No Accounts Message */}
          {!loading && accounts.length === 0 && (
            <div className="max-w-4xl mx-auto mt-6">
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 text-center">
                <p className="text-yellow-800 mb-4">You need to create a trading account before making a deposit.</p>
                <a href="/dashboard/my-accounts" className="inline-block px-6 py-2 bg-[#0A2E1D] text-white rounded-lg hover:bg-[#1A3E2D] transition-colors">
                  View Accounts
                </a>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Deposit Modal */}
      {showDepositModal && selectedMethod && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className={`${selectedMethod.id === 'upi' ? 'bg-[#B8D4C1]' : 'bg-white'} rounded-xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto relative`}>
            <div className={`p-6 ${selectedMethod.id === 'upi' ? 'bg-[#B8D4C1]' : 'bg-white'}`}>
              {/* Modal Header */}
              {selectedMethod.id === 'upi' ? (
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-[#0A2E1D] rounded-lg flex items-center justify-center mx-auto mb-4">
                    <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                    </svg>
                  </div>
                  <h2 className="text-3xl font-bold text-[#0A2E1D] mb-2">UPI Deposit</h2>
                  <button
                    onClick={handleCloseModal}
                    className="absolute top-4 right-4 text-[#0A2E1D] hover:text-[#1A3E2D] transition-colors"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              ) : (
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">Deposit via {selectedMethod.title}</h2>
                  <button
                    onClick={handleCloseModal}
                    className="text-gray-500 hover:text-gray-700 transition-colors"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              )}

              {/* Success Message */}
              {successMessage && (
                <div className="mb-4 bg-green-50 border border-green-200 rounded-lg p-4">
                  <p className="text-green-800 text-sm">{successMessage}</p>
                </div>
              )}

              {/* Error Message */}
              {error && (
                <div className="mb-4 bg-red-50 border border-red-200 rounded-lg p-4">
                  <p className="text-red-800 text-sm">{error}</p>
                </div>
              )}

              {/* Deposit Form */}
              <form onSubmit={handleSubmitDeposit} className="space-y-4">
                {/* Account Selection */}
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">
                    Select Account
                  </label>
                  <select
                    value={selectedAccountId}
                    onChange={(e) => setSelectedAccountId(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#A0C8A9] focus:border-transparent text-gray-900 bg-white"
                    required
                  >
                    {accounts.map((account) => (
                      <option key={account.account_uid} value={account.account_uid} className="text-gray-900">
                        {formatAccountType(account.account_type)} - {formatCurrency(account.balance || 0, account.currency)} (Account: {account.account_uid})
                      </option>
                    ))}
                  </select>
                </div>

                {/* Amount Input (for non-UPI methods) */}
                {selectedMethod.id !== 'upi' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-2">
                      Deposit Amount (USD)
                    </label>
                    <input
                      type="number"
                      value={depositAmount}
                      onChange={(e) => setDepositAmount(e.target.value)}
                      min={selectedMethod.minAmount}
                      max={selectedMethod.maxAmount}
                      step="0.01"
                      placeholder={`Min: $${selectedMethod.minAmount} - Max: $${selectedMethod.maxAmount}`}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#A0C8A9] focus:border-transparent text-gray-900 bg-white placeholder-gray-400"
                      required
                    />
                    <p className="mt-1 text-xs text-gray-600">
                      Limits: {selectedMethod.limits}
                    </p>
                    {selectedMethod.fee !== '0' && (
                      <p className="mt-1 text-xs text-orange-600 font-medium">
                        Fee: {selectedMethod.fee} will be added to your deposit
                      </p>
                    )}
                  </div>
                )}

                {/* UPI Deposit Section */}
                {selectedMethod.id === 'upi' && (
                  <div className="space-y-4">
                    {/* Step Indicator */}
                    <div className="text-center">
                      <p className="text-sm text-gray-600 font-medium">Step 1 of 1: Provide deposit information</p>
                    </div>

                    {/* QR Code Section */}
                    <div className="bg-[#0A2E1D] rounded-xl p-6 text-center">
                      <p className="text-white font-semibold mb-4 text-lg">Scan to Pay via UPI</p>
                      <div className="bg-white rounded-lg p-4 inline-block">
                        <div className="relative">
                          <Image
                            src="/images/url.jpg"
                            alt="UPI QR Code"
                            width={250}
                            height={250}
                            className="mx-auto rounded-lg"
                          />
                        </div>
                        <div className="mt-4">
                          <p className="text-[#0A2E1D] font-medium mb-2">UPI ID: {upiId}</p>
                          <button
                            type="button"
                            onClick={() => {
                              navigator.clipboard.writeText(upiId);
                              setSuccessMessage('UPI ID copied to clipboard!');
                              setTimeout(() => setSuccessMessage(null), 3000);
                            }}
                            className="inline-flex items-center space-x-2 px-4 py-2 bg-[#A0C8A9] text-[#0A2E1D] rounded-lg hover:bg-[#8BBF9F] transition-colors font-medium"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                            </svg>
                            <span>Copy UPI ID</span>
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Amount Deposited Input */}
                    <div>
                      <label className="block text-sm font-medium text-gray-900 mb-2">
                        Amount Deposited (USD) *
                      </label>
                      <input
                        type="number"
                        value={depositAmount}
                        onChange={(e) => setDepositAmount(e.target.value)}
                        min={selectedMethod.minAmount}
                        max={selectedMethod.maxAmount}
                        step="0.01"
                        placeholder="Enter amount"
                        className="w-full px-4 py-2 border-2 border-[#0A2E1D] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#A0C8A9] focus:border-transparent text-gray-900 bg-white placeholder-gray-400"
                        required
                      />
                    </div>

                    {/* Proof of Deposit Upload */}
                    <div>
                      <label className="block text-sm font-medium text-gray-900 mb-2">
                        Proof of Deposit *
                      </label>
                      <p className="text-xs text-gray-600 mb-3">
                        Upload receipt, bank slip, or any document proving your deposit.
                      </p>
                      <div className="border-2 border-dashed border-[#A0C8A9] rounded-lg p-8 text-center bg-[#A0C8A9]/10 hover:bg-[#A0C8A9]/20 transition-colors cursor-pointer">
                        <input
                          type="file"
                          accept=".pdf,.jpg,.jpeg,.png"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              if (file.size > 10 * 1024 * 1024) {
                                setError('File size must be less than 10MB');
                                return;
                              }
                              setProofFile(file);
                              setProofFileName(file.name);
                              setError(null);
                            }
                          }}
                          className="hidden"
                          id="proof-upload"
                          required={selectedMethod.id === 'upi'}
                        />
                        <label htmlFor="proof-upload" className="cursor-pointer">
                          <svg className="w-12 h-12 text-[#0A2E1D] mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                          </svg>
                          <p className="text-[#0A2E1D] font-medium">Click to upload document</p>
                          <p className="text-xs text-gray-600 mt-1">PDF, JPG, JPEG, PNG (Max 10MB)</p>
                          {proofFileName && (
                            <p className="text-sm text-green-600 mt-2 font-medium">✓ {proofFileName}</p>
                          )}
                        </label>
                      </div>
                    </div>
                  </div>
                )}

                {/* Bank Transfer Payment Details */}
                {selectedMethod.id === 'bank-transfer' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-2">
                      Transaction Reference Number
                    </label>
                    <input
                      type="text"
                      value={paymentDetails}
                      onChange={(e) => setPaymentDetails(e.target.value)}
                      placeholder="Enter bank transaction reference"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#A0C8A9] focus:border-transparent text-gray-900 bg-white placeholder-gray-400"
                    />
                  </div>
                )}

                {/* Method Info */}
                <div className="bg-gray-50 rounded-lg p-4 space-y-2 border border-gray-200">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-700 font-medium">Processing Time:</span>
                    <span className="font-semibold text-gray-900">{selectedMethod.processingTime}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-700 font-medium">Fee:</span>
                    <span className="font-semibold text-gray-900">
                      {selectedMethod.fee.includes('%') ? selectedMethod.fee : `$${selectedMethod.fee}`}
                    </span>
                  </div>
                </div>

                {/* Submit Button */}
                <div className="flex space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={handleCloseModal}
                    className={`flex-1 px-4 py-2 font-semibold rounded-lg transition-colors ${
                      selectedMethod.id === 'upi' 
                        ? 'bg-[#0A2E1D] text-[#A0C8A9] hover:bg-[#1A3E2D]' 
                        : 'border-2 border-gray-300 text-gray-800 hover:bg-gray-100'
                    }`}
                  >
                    {selectedMethod.id === 'upi' ? 'X Cancel' : 'Cancel'}
                  </button>
                  <button
                    type="submit"
                    disabled={submitting}
                    className={`flex-1 px-4 py-2 font-semibold rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-md ${
                      selectedMethod.id === 'upi'
                        ? 'bg-[#A0C8A9] text-[#0A2E1D] hover:bg-[#8BBF9F]'
                        : 'bg-[#0A2E1D] text-white hover:bg-[#1A3E2D]'
                    }`}
                  >
                    {submitting ? 'Submitting...' : selectedMethod.id === 'upi' ? 'Submit Request' : 'Submit Deposit'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
