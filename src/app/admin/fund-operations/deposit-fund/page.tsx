'use client';

import AdminSidebar from '@/components/AdminSidebar';
import ProtectedRoute from '@/components/ProtectedRoute';
import { supabase } from '@/lib/supabaseClient';
import { updateBalanceForDeposit } from '@/utils/tradingBalanceManager';
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
  
  useEffect(() => {
    document.title = 'Deposit Fund - RAZ CAPITALS';
    fetchTransactions();
  }, []);

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
        // Transform the data to match our interface
        const transformedTransactions = data.map((tx: any) => ({
          id: tx.id,
          type: tx.type,
          amount: tx.amount,
          currency: tx.currency,
          status: tx.status,
          created_at: tx.created_at,
          account_id: tx.account_id,
          transaction_comments: tx.transaction_comments,
          // Extract user information from account_id or related tables
          user_name: tx.account_id || 'Unknown User',
          user_email: tx.account_id ? `${tx.account_id}@example.com` : 'No email',
          payment_method: (tx.mode_of_payment || 'Unknown Method').replace(/_/g, ' ').trim(),
          transaction_document: tx.proof_of_transaction_url || '-'
        }));
        
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

  const handleProofClick = (proofUrl: string) => {
    setSelectedProofUrl(proofUrl);
    setProofModalOpen(true);
  };

  const handleCloseProofModal = () => {
    setProofModalOpen(false);
    setSelectedProofUrl('');
  };

  const handleSubmit = async () => {
    if (!selectedTransaction) return;
    
    setIsSubmitting(true);
    
    try {
      // Update the transaction status in Supabase
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
        return;
      }

      // If status is 'completed', update the trading account balance
      if (newStatus === 'completed' && selectedTransaction.account_id) {
        const balanceResult = await updateBalanceForDeposit(
          selectedTransaction.account_id, 
          selectedTransaction.amount
        );

        if (!balanceResult.success) {
          alert(`Transaction status updated but balance update failed: ${balanceResult.message}`);
        } else {
          console.log(`Balance update successful: ${balanceResult.message}`);
        }
      }
      
      // Show success message
      const balanceMessage = (newStatus === 'completed' && selectedTransaction.account_id) 
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

  const canSubmit = newStatus !== 'null' && (newStatus === selectedTransaction?.status || transactionComments.trim());

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

  return (
    <div className="flex h-screen bg-[#9BC5A2] overflow-hidden">
      {/* Sidebar */}
      <AdminSidebar currentPage="deposit-fund" />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="bg-[#0A2E1D] p-4 flex justify-between items-center">
          <div 
            className="w-12 h-12 bg-[#2D4A32] rounded-lg flex items-center justify-center cursor-pointer hover:bg-[#3A5A3F] transition-all duration-300 hover:scale-110 hover:shadow-lg transform"
            onClick={() => router.push('/admin/dashboard')}
          >
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </div>
          
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
              <span className="text-[#0A2E1D] font-bold text-sm">A</span>
            </div>
            <span className="text-white font-medium">Admin</span>
            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>

        {/* Deposit Fund Content (Live Account style) */}
        <div className="flex-1 p-8 overflow-y-auto">
          <div className="bg-[#E5E7EB] rounded-xl p-6 shadow-sm border border-black/10">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-[#0A2E1D] text-2xl font-semibold">Deposit Finance</h2>
                {!loading && !error && (
                  <p className="text-[#0A2E1D] text-sm mt-1">
                    {transactions.length} transaction{transactions.length !== 1 ? 's' : ''} found
                  </p>
                )}
              </div>
              <button
                onClick={fetchTransactions}
                disabled={loading}
                className="px-4 py-2 bg-[#0A2E1D] text-white rounded-lg hover:bg-[#2D4A32] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
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

            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-black/10">
                    <th className="py-3 pr-4 text-[#0A2E1D] font-bold">ID</th>
                    <th className="py-3 pr-4 text-[#0A2E1D] font-bold">Type</th>
                    <th className="py-3 pr-4 text-[#0A2E1D] font-bold">Date</th>
                    <th className="py-3 pr-4 text-[#0A2E1D] font-bold">Account ID</th>
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
                       <td colSpan={10} className="py-8 text-center text-gray-500">Loading...</td>
                     </tr>
                   ) : error ? (
                     <tr>
                       <td colSpan={10} className="py-8 text-center text-red-500">{error}</td>
                     </tr>
                   ) : transactions.length === 0 ? (
                     <tr>
                       <td colSpan={10} className="py-8 text-center text-gray-500">No deposit transactions found.</td>
                     </tr>
                  ) : (
                                         transactions.map((row) => (
                       <tr key={row.id} className="border-b border-black/10 last:border-b-0">
                         <td className="py-4 pr-4">{row.id}</td>
                         <td className="py-4 pr-4">
                           <span className="inline-block px-2 py-1 rounded text-xs font-semibold bg-blue-100 text-blue-800">
                             {row.type}
                           </span>
                         </td>
                         <td className="py-4 pr-4">{formatDate(row.created_at)}</td>
                         <td className="py-4 pr-4 font-mono text-sm">{row.account_id || 'N/A'}</td>
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
            className="fixed bottom-6 right-6 h-14 w-14 rounded-full bg-[#0A2E1D] text-white flex items-center justify-center shadow-md"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
            <div className="bg-[#0A2E1D] text-white p-6 rounded-t-xl">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-semibold">Transaction Details</h3>
                <button
                  onClick={handleCloseModal}
                  className="text-white hover:text-gray-300 transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6">
              {/* Transaction Information */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Transaction ID</label>
                  <p className="text-gray-900 font-mono">{selectedTransaction.id}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                  <span className="inline-block px-2 py-1 rounded text-xs font-semibold bg-blue-100 text-blue-800">
                    {selectedTransaction.type}
                  </span>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                  <p className="text-gray-900">{formatDate(selectedTransaction.created_at)}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Account ID</label>
                  <p className="text-gray-900 font-mono text-sm">{selectedTransaction.account_id || 'N/A'}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Payment Method</label>
                  <p className="text-gray-900">{selectedTransaction.payment_method}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Amount</label>
                  <p className="text-gray-900 font-semibold">{formatAmount(selectedTransaction.amount, selectedTransaction.currency)}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Currency</label>
                  <p className="text-gray-900">{selectedTransaction.currency.toUpperCase()}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
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
                  <div className="col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Current Comments</label>
                    <p className="text-gray-900 bg-gray-50 p-3 rounded-lg">{selectedTransaction.transaction_comments}</p>
                  </div>
                )}
              </div>

              {/* Status Dropdown */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-3">Update Status</label>
                <select
                  value={newStatus}
                  onChange={(e) => setNewStatus(e.target.value as 'null' | 'pending' | 'completed' | 'failed')}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0A2E1D] focus:border-transparent text-gray-900 bg-white"
                >
                  <option value="null">Select Status</option>
                  <option value="pending">Pending</option>
                  <option value="completed">Completed</option>
                  <option value="failed">Failed</option>
                </select>
              </div>

              {/* Transaction Comments */}
              {newStatus !== 'null' && newStatus !== selectedTransaction?.status && (
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    transaction_comments
                  </label>
                  <textarea
                    value={transactionComments}
                    onChange={(e) => setTransactionComments(e.target.value)}
                    placeholder="Please provide transaction comments..."
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0A2E1D] focus:border-transparent resize-none text-gray-900 bg-white"
                    rows={3}
                  />
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
                <button
                  onClick={handleCloseModal}
                  className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={!canSubmit || isSubmitting}
                  className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                    canSubmit && !isSubmitting
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
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              {/* Modal Header */}
              <div className="bg-[#0A2E1D] text-white p-6 rounded-t-xl">
                <div className="flex justify-between items-center">
                  <h3 className="text-xl font-semibold">Proof Document</h3>
                  <button
                    onClick={handleCloseProofModal}
                    className="text-white hover:text-gray-300 transition-colors"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Modal Body */}
              <div className="p-6">
                <div className="w-full h-96 bg-gray-100 rounded-lg flex items-center justify-center">
                  {selectedProofUrl.endsWith('.pdf') ? (
                    <iframe
                      src={selectedProofUrl}
                      className="w-full h-full rounded-lg"
                      title="Proof Document"
                    />
                  ) : (
                    <img
                      src={selectedProofUrl}
                      alt="Proof Document"
                      className="max-w-full max-h-full object-contain rounded-lg"
                    />
                  )}
                </div>
                
                <div className="mt-4 text-center">
                  <a
                    href={selectedProofUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 underline"
                  >
                    Open in New Tab
                  </a>
                </div>
              </div>
            </div>
          </div>
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