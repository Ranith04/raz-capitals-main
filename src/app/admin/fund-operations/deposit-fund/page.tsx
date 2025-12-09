'use client';

import AdminHeader from '@/components/AdminHeader';
import AdminSidebar from '@/components/AdminSidebar';
import DocumentViewer from '@/components/DocumentViewer';
import ProtectedRoute from '@/components/ProtectedRoute';
import { supabase } from '@/lib/supabaseClient';
import { UserService } from '@/lib/userService';
import { updateBalanceForDeposit } from '@/utils/tradingBalanceManager';
import { sendDepositApprovalEmail, sendDepositRejectionEmail } from '@/lib/emailService';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

// Transaction type definition matching the database schema
interface Transaction {
  id: number;
  type: 'deposit' | 'withdrawal' | 'transfer';
  amount: number;
  currency: string;
  status: 'null' | 'pending' | 'completed' | 'failed';
  created_at: string;
  account_id: string;
  transaction_comments?: string;
  // Additional fields that might be in the database
  user_name?: string;
  user_email?: string;
  payment_method?: string;
  transaction_document?: string;
  customer_name?: string;
}

function DepositFundContent() {
  const router = useRouter();
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newStatus, setNewStatus] = useState<'null' | 'pending' | 'completed' | 'failed'>('null');
  const [transactionComments, setTransactionComments] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [proofModalOpen, setProofModalOpen] = useState(false);
  const [selectedProofUrl, setSelectedProofUrl] = useState<string>('');
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [sortField, setSortField] = useState<'date' | 'amount' | 'status' | 'customer' | 'account_id'>('date');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  
  useEffect(() => {
    document.title = 'Deposit Fund - RAZ CAPITALS';
    fetchTransactions();
  }, []);

  const toggleMobileSidebar = () => {
    setIsMobileSidebarOpen(!isMobileSidebarOpen);
  };

  const closeMobileSidebar = () => {
    setIsMobileSidebarOpen(false);
  };

  const fetchTransactions = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Fetch all transactions with type 'deposit'
      const { data, error: fetchError } = await supabase
        .from('transactions')
        .select('*')
        .eq('type', 'deposit')
        .order('created_at', { ascending: false });

      if (fetchError) {
        console.error('Error fetching transactions:', fetchError);
        setError('Failed to fetch transactions. Please try again.');
        return;
      }

      if (data) {
        // Fetch all unique account IDs
        const accountIds = [...new Set(data.map((tx: any) => tx.account_id).filter(Boolean))];
        
        // Fetch user names from tradingAccounts table
        const customerNameMap: Record<string, string> = {};
        if (accountIds.length > 0) {
          const { data: tradingAccounts, error: tradingError } = await supabase
            .from('tradingAccounts')
            .select(`
              account_uid,
              user:users!tradingAccounts_user_id_fkey(
                first_name,
                last_name
              )
            `)
            .in('account_uid', accountIds);

          if (!tradingError && tradingAccounts) {
            tradingAccounts.forEach((account: any) => {
              if (account.user) {
                const fullName = `${account.user.first_name || ''} ${account.user.last_name || ''}`.trim();
                if (fullName) {
                  customerNameMap[account.account_uid] = fullName;
                }
              }
            });
          }
        }

        // Transform the data to match our interface
        const transformedTransactions = await Promise.all(
          data.map(async (tx: any) => {
            const customerName = customerNameMap[tx.account_id] || 'Unknown User';
            
            // Store the original document path/URL (don't pre-process signed URLs as they expire)
            const documentUrl = tx.proof_of_transaction_url || '-';

            return {
              id: tx.id,
              type: tx.type,
              amount: tx.amount,
              currency: tx.currency,
              status: tx.status,
              created_at: tx.created_at,
              account_id: tx.account_id,
              transaction_comments: tx.transaction_comments,
              user_name: customerName,
              user_email: tx.account_id ? `${tx.account_id}@example.com` : 'No email',
              payment_method: (tx.mode_of_payment || 'Unknown Method').replace(/_/g, ' ').trim(),
              transaction_document: documentUrl,
              customer_name: customerName
            };
          })
        );
        
        setTransactions(transformedTransactions);
      }
    } catch (err) {
      console.error('Unexpected error:', err);
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleViewClick = (transaction: Transaction) => {
    setSelectedTransaction(transaction);
    setIsModalOpen(true);
    setNewStatus(transaction.status);
    setTransactionComments('');
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedTransaction(null);
    setNewStatus('null');
    setTransactionComments('');
  };

  const handleProofClick = async (proofUrl: string) => {
    if (!proofUrl || proofUrl === '-' || proofUrl === '') {
      alert('No proof document available');
      return;
    }

    try {
      let documentUrl: string | null = null;
      
      // If it's already a full URL (http/https), try to extract and regenerate
      if (proofUrl.startsWith('http://') || proofUrl.startsWith('https://')) {
        // Extract bucket and path from the URL
        const urlMatch = proofUrl.match(/\/storage\/v1\/object\/(?:public|sign|authenticated)\/([^\/]+)\/(.+?)(?:\?|$)/);
        if (urlMatch && urlMatch[1] && urlMatch[2]) {
          const extractedBucket = urlMatch[1];
          const extractedPath = decodeURIComponent(urlMatch[2]);
          console.log('Extracted from URL:', { bucket: extractedBucket, path: extractedPath });
          
          // Generate signed URL using extracted bucket and path
          documentUrl = await UserService.getSignedUrlForDocument(extractedPath, 'transaction', extractedBucket);
        } else {
          // If we can't extract, try using the URL as-is
          documentUrl = proofUrl;
        }
      } else {
        // It's a file path - clean it and use transactions bucket
        let cleanPath = proofUrl.startsWith('/') ? proofUrl.slice(1) : proofUrl;
        
        // Remove bucket name if it's at the start of the path
        if (cleanPath.startsWith('transactions/')) {
          cleanPath = cleanPath.slice('transactions/'.length);
        }
        
        console.log('Processing file path:', { original: proofUrl, cleanPath, bucket: 'transactions' });
        
        // Generate signed URL from transactions bucket
        documentUrl = await UserService.getSignedUrlForDocument(cleanPath, 'transaction', 'transactions');
      }
      
      if (!documentUrl) {
        alert('Failed to load proof document. Please check if the file exists in the transactions bucket.');
        return;
      }
      
      console.log('Final document URL:', documentUrl);
      setSelectedProofUrl(documentUrl);
      setProofModalOpen(true);
    } catch (error) {
      console.error('Error loading proof document:', error);
      alert(`Error loading proof document: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  };

  const handleCloseProofModal = () => {
    setProofModalOpen(false);
    setSelectedProofUrl('');
  };

  const handleSubmit = async () => {
    if (!selectedTransaction) return;
    
    // Prevent updates if transaction is already completed or failed
    if (selectedTransaction.status === 'completed' || selectedTransaction.status === 'failed') {
      alert('Cannot update transaction. Transaction status is already finalized.');
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Fetch the existing transaction from database to get the actual old_status
      const { data: existingTransaction, error: fetchError } = await supabase
        .from('transactions')
        .select('status')
        .eq('id', selectedTransaction.id)
        .single();

      if (fetchError) {
        console.error('Error fetching transaction:', fetchError);
        alert('Error fetching transaction details. Please try again.');
        setIsSubmitting(false);
        return;
      }

      if (!existingTransaction) {
        alert('Transaction not found. Please refresh and try again.');
        setIsSubmitting(false);
        return;
      }

      const oldStatus = existingTransaction.status;
      const shouldUpdateBalance = oldStatus !== 'completed' && newStatus === 'completed';
      const shouldSendRejectionEmail = oldStatus !== 'failed' && newStatus === 'failed';

      // Update the transaction status in Supabase (always update status)
      const { error: updateError } = await supabase
        .from('transactions')
        .update({ 
          status: newStatus,
          transaction_comments: transactionComments || selectedTransaction.transaction_comments
        })
        .eq('id', selectedTransaction.id);

      if (updateError) {
        console.error('Error updating transaction:', updateError);
        alert('Error updating transaction. Please try again.');
        setIsSubmitting(false);
        return;
      }

      // Only update balance if transitioning from non-Completed to Completed
      if (shouldUpdateBalance && selectedTransaction.account_id) {
        const balanceResult = await updateBalanceForDeposit(
          selectedTransaction.account_id, 
          selectedTransaction.amount
        );

        if (!balanceResult.success) {
          alert(`Transaction status updated but balance update failed: ${balanceResult.message}`);
        } else {
          console.log(`Balance update successful: ${balanceResult.message}`);
        }

        // Send deposit approval email only when completing the transaction
        try {
          // Get user email from trading account
          const { data: tradingAccount } = await supabase
            .from('tradingAccounts')
            .select('user_id')
            .eq('account_uid', selectedTransaction.account_id)
            .single();

          if (tradingAccount?.user_id) {
            const user = await UserService.getUserByUuid(tradingAccount.user_id);
            if (user && user.email) {
              const userName = `${user.first_name || ''} ${user.last_name || ''}`.trim() || 'Valued Customer';
              await sendDepositApprovalEmail(
                user.email,
                userName,
                selectedTransaction.amount,
                selectedTransaction.currency,
                selectedTransaction.account_id,
                selectedTransaction.id
              );
              console.log('Deposit approval email sent to:', user.email);
            }
          }
        } catch (emailError) {
          console.error('Failed to send deposit approval email:', emailError);
          // Don't block the transaction if email fails
        }
      }

      // Send deposit rejection email when status is set to failed
      if (shouldSendRejectionEmail && selectedTransaction.account_id) {
        try {
          // Get user email from trading account
          const { data: tradingAccount } = await supabase
            .from('tradingAccounts')
            .select('user_id')
            .eq('account_uid', selectedTransaction.account_id)
            .single();

          if (tradingAccount?.user_id) {
            const user = await UserService.getUserByUuid(tradingAccount.user_id);
            if (user && user.email) {
              const userName = `${user.first_name || ''} ${user.last_name || ''}`.trim() || 'Valued Customer';
              const rejectionReason = transactionComments || selectedTransaction.transaction_comments || 'Transaction could not be processed';
              await sendDepositRejectionEmail(
                user.email,
                userName,
                selectedTransaction.amount,
                selectedTransaction.currency,
                selectedTransaction.account_id,
                selectedTransaction.id,
                rejectionReason
              );
              console.log('Deposit rejection email sent to:', user.email);
            }
          }
        } catch (emailError) {
          console.error('Failed to send deposit rejection email:', emailError);
          // Don't block the transaction if email fails
        }
      }
      
      // Show success message
      const balanceMessage = shouldUpdateBalance && selectedTransaction.account_id
        ? ` Balance has been updated for account ${selectedTransaction.account_id}.`
        : '';
      alert(`Transaction ${selectedTransaction.id} updated successfully! Status: ${newStatus}.${balanceMessage}`);
      
      // Refresh the transactions list
      await fetchTransactions();
      handleCloseModal();
    } catch (error) {
      console.error('Error updating transaction:', error);
      alert('Error updating transaction. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Button should be enabled if:
  // 1. A status is selected (not 'null')
  // 2. The transaction's current status is not already finalized (not 'completed' or 'failed')
  // 3. Either the status is being changed OR there are comments
  const canSubmit = newStatus !== 'null' 
    && selectedTransaction 
    && selectedTransaction.status !== 'completed' 
    && selectedTransaction.status !== 'failed'
    && (newStatus !== selectedTransaction.status || transactionComments.trim());

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-[#16a34a]/10 text-[#16a34a]';
      case 'failed':
        return 'bg-[#dc2626]/10 text-[#dc2626]';
      case 'pending':
        return 'bg-[#f59e0b]/10 text-[#f59e0b]';
      default:
        return 'bg-gray-100 text-gray-600';
    }
  };

  const getStatusDisplayName = (status: string) => {
    switch (status) {
      case 'null':
        return 'NULL';
      case 'pending':
        return 'Pending';
      case 'completed':
        return 'Completed';
      case 'failed':
        return 'Failed';
      default:
        return status;
    }
  };

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', {
        month: 'numeric',
        day: 'numeric',
        year: 'numeric'
      });
    } catch {
      return 'Invalid Date';
    }
  };

  const formatAmount = (amount: number, currency: string) => {
    return `${amount.toFixed(2)} ${currency.toUpperCase()}`;
  };

  // Sort transactions based on selected field and direction
  const getSortedTransactions = (): Transaction[] => {
    const sorted = [...transactions];
    
    sorted.sort((a, b) => {
      let comparison = 0;
      
      switch (sortField) {
        case 'date':
          comparison = new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
          break;
        case 'amount':
          comparison = a.amount - b.amount;
          break;
        case 'status':
          const statusOrder = { 'completed': 1, 'pending': 2, 'failed': 3, 'null': 4 };
          comparison = (statusOrder[a.status] || 99) - (statusOrder[b.status] || 99);
          break;
        case 'customer':
          const nameA = (a.customer_name || '').toLowerCase();
          const nameB = (b.customer_name || '').toLowerCase();
          comparison = nameA.localeCompare(nameB);
          break;
        case 'account_id':
          comparison = (a.account_id || '').localeCompare(b.account_id || '');
          break;
        default:
          return 0;
      }
      
      return sortDirection === 'asc' ? comparison : -comparison;
    });
    
    return sorted;
  };

  const handleSortChange = (field: 'date' | 'amount' | 'status' | 'customer' | 'account_id') => {
    if (sortField === field) {
      // Toggle direction if same field
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      // Set new field with default descending
      setSortField(field);
      setSortDirection('desc');
    }
  };

  // Loading state
  if (loading) {
    return (
      <div className="flex h-screen bg-[#9BC5A2] overflow-hidden">
        <AdminSidebar 
          currentPage="deposit-fund" 
          isMobileOpen={isMobileSidebarOpen}
          onMobileClose={closeMobileSidebar}
        />
        <div className="flex-1 flex flex-col">
          <AdminHeader 
            title="Deposit Fund"
            onRefresh={fetchTransactions}
            refreshing={loading}
            showRefreshButton={true}
            refreshButtonText="Refresh Data"
            showBackButton={true}
            backUrl="/admin/dashboard"
            onMobileMenuToggle={toggleMobileSidebar}
          />
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#0A2E1D] mx-auto mb-4"></div>
              <p className="text-[#0A2E1D] text-lg">Loading deposit transactions...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="flex h-screen bg-[#9BC5A2] overflow-hidden">
        <AdminSidebar 
          currentPage="deposit-fund" 
          isMobileOpen={isMobileSidebarOpen}
          onMobileClose={closeMobileSidebar}
        />
        <div className="flex-1 flex flex-col">
          <AdminHeader 
            title="Deposit Fund"
            onRefresh={fetchTransactions}
            refreshing={false}
            showRefreshButton={true}
            refreshButtonText="Refresh Data"
            showBackButton={true}
            backUrl="/admin/dashboard"
            onMobileMenuToggle={toggleMobileSidebar}
          />
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <div className="text-red-500 text-6xl mb-4">⚠️</div>
              <p className="text-[#0A2E1D] text-lg mb-4">{error}</p>
              <button 
                onClick={fetchTransactions}
                className="px-6 py-2 bg-[#2D4A32] text-white rounded-lg hover:bg-[#3A5A3F] transition-colors"
              >
                Retry
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-[#9BC5A2] overflow-hidden">
      {/* Sidebar */}
      <AdminSidebar 
        currentPage="deposit-fund" 
        isMobileOpen={isMobileSidebarOpen}
        onMobileClose={closeMobileSidebar}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <AdminHeader 
          title="Deposit Fund"
          onRefresh={fetchTransactions}
          refreshing={loading}
          showRefreshButton={true}
          refreshButtonText="Refresh Data"
          showBackButton={true}
          backUrl="/admin/dashboard"
          onMobileMenuToggle={toggleMobileSidebar}
        />

        {/* Deposit Fund Content */}
        <div className="flex-1 p-2 xs:p-3 sm:p-4 md:p-6 lg:p-8 overflow-y-auto">
          <div className="bg-[#E5E7EB] rounded-xl p-4 sm:p-6 shadow-sm border border-black/10">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 sm:mb-6 gap-3">
              <div>
                <h2 className="text-[#0A2E1D] text-xl sm:text-2xl font-semibold">Deposit Finance</h2>
                {!loading && !error && (
                  <p className="text-[#0A2E1D] text-xs sm:text-sm mt-1">
                    {transactions.length} transaction{transactions.length !== 1 ? 's' : ''} found
                  </p>
                )}
              </div>
              <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
                {/* Sort Dropdown */}
                <div className="relative">
                  <select
                    value={`${sortField}_${sortDirection}`}
                    onChange={(e) => {
                      const [field, direction] = e.target.value.split('_');
                      setSortField(field as 'date' | 'amount' | 'status' | 'customer' | 'account_id');
                      setSortDirection(direction as 'asc' | 'desc');
                    }}
                    className="w-full sm:w-auto px-4 py-2 bg-white border border-gray-300 rounded-lg text-[#0A2E1D] text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-[#0A2E1D] cursor-pointer appearance-none pr-8"
                  >
                    <option value="date_desc">Sort by: Date (Newest First)</option>
                    <option value="date_asc">Sort by: Date (Oldest First)</option>
                    <option value="amount_desc">Sort by: Amount (High to Low)</option>
                    <option value="amount_asc">Sort by: Amount (Low to High)</option>
                    <option value="status_asc">Sort by: Status (A-Z)</option>
                    <option value="status_desc">Sort by: Status (Z-A)</option>
                    <option value="customer_asc">Sort by: Customer Name (A-Z)</option>
                    <option value="customer_desc">Sort by: Customer Name (Z-A)</option>
                    <option value="account_id_asc">Sort by: Account ID (A-Z)</option>
                    <option value="account_id_desc">Sort by: Account ID (Z-A)</option>
                  </select>
                  <div className="absolute right-2 top-1/2 transform -translate-y-1/2 pointer-events-none">
                    <svg className="w-4 h-4 text-[#0A2E1D]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
                <button
                  onClick={fetchTransactions}
                  disabled={loading}
                  className="w-full sm:w-auto px-4 py-2 bg-[#0A2E1D] text-white rounded-lg hover:bg-[#2D4A32] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2 text-sm sm:text-base"
                >
                  {loading ? (
                    <svg className="w-4 h-4 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                  ) : (
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                  )}
                  <span>{loading ? 'Refreshing...' : 'Refresh'}</span>
                </button>
              </div>
            </div>

            {/* Mobile Card View */}
            <div className="lg:hidden space-y-4">
              {loading ? (
                <div className="text-center text-gray-500 py-8">Loading...</div>
              ) : error ? (
                <div className="text-center text-red-500 py-8">{error}</div>
              ) : transactions.length === 0 ? (
                <div className="text-center text-gray-500 py-8">No deposit transactions found.</div>
              ) : (
                getSortedTransactions().map((row) => (
                  <div key={row.id} className="bg-white rounded-lg p-4 space-y-3 border border-gray-200">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="text-[#0A2E1D] font-medium text-sm">ID: {row.id}</div>
                        <div className="text-[#0A2E1D] text-xs text-gray-600">{formatDate(row.created_at)}</div>
                      </div>
                      <span className={`inline-block px-2 py-1 rounded text-xs font-semibold bg-blue-100 text-blue-800`}>
                        {row.type}
                      </span>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div>
                        <div className="text-[#0A2E1D] text-xs font-medium">Account ID</div>
                        <div className="text-[#0A2E1D] font-mono text-xs">{row.account_id || 'N/A'}</div>
                      </div>
                      <div>
                        <div className="text-[#0A2E1D] text-xs font-medium">Customer Name</div>
                        <div className="text-[#0A2E1D] text-xs">{row.customer_name || 'Unknown User'}</div>
                      </div>
                      <div>
                        <div className="text-[#0A2E1D] text-xs font-medium">Payment Method</div>
                        <div className="text-[#0A2E1D] text-xs">{row.payment_method}</div>
                      </div>
                      <div>
                        <div className="text-[#0A2E1D] text-xs font-medium">Amount</div>
                        <div className="text-[#0A2E1D] font-semibold text-xs">{formatAmount(row.amount, row.currency)}</div>
                      </div>
                      <div>
                        <div className="text-[#0A2E1D] text-xs font-medium">Status</div>
                        <span className={`inline-block px-2 py-1 rounded text-xs font-semibold ${getStatusColor(row.status)}`}>
                          {getStatusDisplayName(row.status)}
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center pt-2 border-t border-gray-200">
                      {row.transaction_document && row.transaction_document !== '-' ? (
                        <button
                          aria-label="View Proof"
                          onClick={() => handleProofClick(row.transaction_document || '')}
                          className="p-2 rounded text-xs font-semibold bg-blue-100 text-blue-800 hover:bg-blue-200 transition-colors"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                        </button>
                      ) : (
                        <span className="text-gray-400 text-xs">No proof</span>
                      )}
                      
                      <button
                        aria-label="View"
                        onClick={() => handleViewClick(row)}
                        className="px-3 py-2 rounded-lg bg-[#2D4A32] text-white hover:bg-[#3A5A3F] transition-colors font-medium text-xs"
                      >
                        View
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Desktop Table View */}
            <div className="hidden lg:block overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-black/10">
                    <th className="py-3 pr-4 text-[#0A2E1D] font-bold">ID</th>
                    <th className="py-3 pr-4 text-[#0A2E1D] font-bold">Type</th>
                    <th className="py-3 pr-4 text-[#0A2E1D] font-bold">Date</th>
                    <th className="py-3 pr-4 text-[#0A2E1D] font-bold">Account ID</th>
                    <th className="py-3 pr-4 text-[#0A2E1D] font-bold">Customer Name</th>
                    <th className="py-3 pr-4 text-[#0A2E1D] font-bold">Payment Method</th>
                    <th className="py-3 pr-4 text-[#0A2E1D] font-bold">Amount</th>
                    <th className="py-3 pr-4 text-[#0A2E1D] font-bold">Currency</th>
                    <th className="py-3 pr-4 text-[#0A2E1D] font-bold">Status</th>
                    <th className="py-3 pr-4 text-[#0A2E1D] font-bold">Proof</th>
                    <th className="py-3 pr-4 text-[#0A2E1D] font-bold">Action</th>
                  </tr>
                </thead>
                <tbody className="text-[#0A2E1D]">
                  {loading ? (
                    <tr>
                      <td colSpan={11} className="py-8 text-center text-gray-500">Loading...</td>
                    </tr>
                  ) : error ? (
                    <tr>
                      <td colSpan={11} className="py-8 text-center text-red-500">{error}</td>
                    </tr>
                  ) : transactions.length === 0 ? (
                    <tr>
                      <td colSpan={11} className="py-8 text-center text-gray-500">No deposit transactions found.</td>
                    </tr>
                  ) : (
                    getSortedTransactions().map((row) => (
                      <tr key={row.id} className="border-b border-black/10 last:border-b-0">
                        <td className="py-4 pr-4">{row.id}</td>
                        <td className="py-4 pr-4">
                          <span className="inline-block px-2 py-1 rounded text-xs font-semibold bg-blue-100 text-blue-800">
                            {row.type}
                          </span>
                        </td>
                        <td className="py-4 pr-4">{formatDate(row.created_at)}</td>
                        <td className="py-4 pr-4 font-mono text-sm">{row.account_id || 'N/A'}</td>
                        <td className="py-4 pr-4">{row.customer_name || 'Unknown User'}</td>
                        <td className="py-4 pr-4">{row.payment_method}</td>
                        <td className="py-4 pr-4 font-semibold">{formatAmount(row.amount, row.currency)}</td>
                        <td className="py-4 pr-4">{row.currency.toUpperCase()}</td>
                        <td className="py-4 pr-4">
                          <span className={`inline-block px-3 py-1 rounded text-xs font-semibold ${getStatusColor(row.status)}`}>
                            {getStatusDisplayName(row.status)}
                          </span>
                        </td>
                        <td className="py-4 pr-4">
                          {row.transaction_document && row.transaction_document !== '-' ? (
                            <button
                              aria-label="View Proof"
                              onClick={() => handleProofClick(row.transaction_document || '')}
                              className="p-3 rounded text-xs font-semibold bg-blue-100 text-blue-800 hover:bg-blue-200 transition-colors"
                            >
                              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                              </svg>
                            </button>
                          ) : (
                            <span className="text-gray-400 text-sm">No proof</span>
                          )}
                        </td>
                        <td className="py-4 pr-4">
                          <button
                            aria-label="View"
                            onClick={() => handleViewClick(row)}
                            className="px-4 py-2 rounded-lg bg-[#2D4A32] text-white hover:bg-[#3A5A3F] transition-colors font-medium text-sm"
                          >
                            View
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Scroll to top button (bottom-right) */}
          <button
            aria-label="Scroll to top"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="fixed bottom-6 right-6 h-12 w-12 sm:h-14 sm:w-14 rounded-full bg-[#0A2E1D] text-white flex items-center justify-center shadow-md"
          >
            <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
            </svg>
          </button>
        </div>
      </div>

      {/* Transaction Details Modal */}
      {isModalOpen && selectedTransaction && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="bg-[#0A2E1D] text-white p-4 sm:p-6 rounded-t-xl">
              <div className="flex justify-between items-center">
                <h3 className="text-lg sm:text-xl font-semibold">Transaction Details</h3>
                <button
                  onClick={handleCloseModal}
                  className="text-white hover:text-gray-300 transition-colors"
                >
                  <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-4 sm:p-6">
              {/* Transaction Information */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-4 sm:mb-6">
                <div>
                  <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">Transaction ID</label>
                  <p className="text-gray-900 font-mono text-sm">{selectedTransaction.id}</p>
                </div>
                <div>
                  <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">Type</label>
                  <span className="inline-block px-2 py-1 rounded text-xs font-semibold bg-blue-100 text-blue-800">
                    {selectedTransaction.type}
                  </span>
                </div>
                <div>
                  <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">Date</label>
                  <p className="text-gray-900 text-sm">{formatDate(selectedTransaction.created_at)}</p>
                </div>
                <div>
                  <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">Account ID</label>
                  <p className="text-gray-900 font-mono text-xs">{selectedTransaction.account_id || 'N/A'}</p>
                </div>
                <div>
                  <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">Payment Method</label>
                  <p className="text-gray-900 text-sm">{selectedTransaction.payment_method}</p>
                </div>
                <div>
                  <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">Amount</label>
                  <p className="text-gray-900 font-semibold text-sm">{formatAmount(selectedTransaction.amount, selectedTransaction.currency)}</p>
                </div>
                <div>
                  <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">Currency</label>
                  <p className="text-gray-900 text-sm">{selectedTransaction.currency.toUpperCase()}</p>
                </div>
                <div>
                  <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">Status</label>
                  <span className={`inline-block px-3 py-1 rounded text-xs font-semibold ${
                    selectedTransaction.status === 'completed' 
                      ? 'bg-[#16a34a]/10 text-[#16a34a]' 
                      : selectedTransaction.status === 'failed'
                        ? 'bg-[#dc2626]/10 text-[#dc2626]'
                        : selectedTransaction.status === 'pending'
                          ? 'bg-[#f59e0b]/10 text-[#f59e0b]'
                          : 'bg-gray-100 text-gray-600'
                  }`}>
                    {getStatusDisplayName(selectedTransaction.status)}
                  </span>
                </div>
                {selectedTransaction.transaction_comments && (
                  <div className="col-span-1 sm:col-span-2">
                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">Current Comments</label>
                    <p className="text-gray-900 bg-gray-50 p-3 rounded-lg text-sm">{selectedTransaction.transaction_comments}</p>
                  </div>
                )}
              </div>

              {/* Status Dropdown */}
              <div className="mb-4 sm:mb-6">
                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-3">Update Status</label>
                <select
                  value={newStatus}
                  onChange={(e) => setNewStatus(e.target.value as 'null' | 'pending' | 'completed' | 'failed')}
                  disabled={selectedTransaction.status === 'completed' || selectedTransaction.status === 'failed'}
                  className={`w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0A2E1D] focus:border-transparent text-gray-900 bg-white text-sm ${
                    selectedTransaction.status === 'completed' || selectedTransaction.status === 'failed'
                      ? 'bg-gray-100 cursor-not-allowed opacity-60'
                      : ''
                  }`}
                >
                  <option value="null">Select Status</option>
                  <option value="pending">Pending</option>
                  <option value="completed">Completed</option>
                  <option value="failed">Failed</option>
                </select>
              </div>

              {/* Transaction Comments */}
              {newStatus !== 'null' && newStatus !== selectedTransaction?.status && (
                <div className="mb-4 sm:mb-6">
                  <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">
                    transaction_comments
                  </label>
                  <textarea
                    value={transactionComments}
                    onChange={(e) => setTransactionComments(e.target.value)}
                    placeholder="Please provide transaction comments..."
                    disabled={selectedTransaction.status === 'completed' || selectedTransaction.status === 'failed'}
                    className={`w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0A2E1D] focus:border-transparent resize-none text-gray-900 bg-white text-sm ${
                      selectedTransaction.status === 'completed' || selectedTransaction.status === 'failed'
                        ? 'bg-gray-100 cursor-not-allowed opacity-60'
                        : ''
                    }`}
                    rows={3}
                  />
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row justify-end gap-3 pt-4 border-t border-gray-200">
                <button
                  onClick={handleCloseModal}
                  className="w-full sm:w-auto px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={!canSubmit || isSubmitting || selectedTransaction.status === 'completed' || selectedTransaction.status === 'failed'}
                  className={`w-full sm:w-auto px-6 py-2 rounded-lg font-medium transition-colors text-sm ${
                    canSubmit && !isSubmitting && selectedTransaction.status !== 'completed' && selectedTransaction.status !== 'failed'
                      ? newStatus === 'completed'
                        ? 'bg-[#16a34a] text-white hover:bg-[#15803d]'
                        : newStatus === 'failed'
                          ? 'bg-[#dc2626] text-white hover:bg-[#b91c1c]'
                          : 'bg-[#f59e0b] text-white hover:bg-[#d97706]'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  {isSubmitting ? 'Processing...' : 'Update Transaction'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Proof Document Modal */}
      {proofModalOpen && selectedProofUrl && (
        <DocumentViewer
          isOpen={proofModalOpen}
          onClose={handleCloseProofModal}
          documentUrl={selectedProofUrl}
          documentName="Proof Document"
          documentType="Transaction Proof"
        />
      )}
    </div>
  );
}

export default function DepositFundPage() {
  return (
    <ProtectedRoute requiredRole="admin">
      <DepositFundContent />
    </ProtectedRoute>
  );
}