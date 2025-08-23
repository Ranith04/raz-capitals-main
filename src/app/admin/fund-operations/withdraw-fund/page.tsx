'use client';

import AdminSidebar from '@/components/AdminSidebar';
import ProtectedRoute from '@/components/ProtectedRoute';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

function WithdrawFundContent() {
  const router = useRouter();
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState<null | {
    id: number;
    trId: string;
    date: string;
    name: string;
    email: string;
    amount: string;
    withdrawType: string;
    status: 'Approved' | 'Pending' | 'Rejected' | 'High Risk' | 'Processing';
    withdrawMethod: string;
  }>(null);

  const openView = (row: any) => {
    setSelectedRow(row);
    setIsViewOpen(true);
  };

  const closeView = () => {
    setIsViewOpen(false);
    setSelectedRow(null);
  };
  
  useEffect(() => {
    document.title = 'Withdraw Fund - RAZ CAPITALS';
  }, []);

  return (
    <div className="flex h-screen bg-[#9BC5A2] overflow-hidden">
      {/* Sidebar */}
      <AdminSidebar currentPage="withdraw-fund" />

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

        {/* Withdraw Finance Content (card + table) */}
        <div className="flex-1 p-8 overflow-y-auto">
          <div className="bg-[#E5E7EB] rounded-xl p-6 shadow-sm border border-black/10">
            <h2 className="text-[#0A2E1D] text-2xl font-semibold mb-6">Withdraw Finance</h2>

            <div className="overflow-x-auto">
              <table className="w-full text-center">
                <thead>
                  <tr className="border-b border-black/10">
                    <th className="py-3 pr-4 text-[#0A2E1D] font-bold text-center">ID</th>
                    <th className="py-3 pr-4 text-[#0A2E1D] font-bold text-center">Tr.ID</th>
                    <th className="py-3 pr-4 text-[#0A2E1D] font-bold text-center">Date</th>
                    <th className="py-3 pr-4 text-[#0A2E1D] font-bold text-center">User Name</th>
                    <th className="py-3 pr-4 text-[#0A2E1D] font-bold text-center">Email</th>
                    <th className="py-3 pr-4 text-[#0A2E1D] font-bold text-center">Amount</th>
                    <th className="py-3 pr-4 text-[#0A2E1D] font-bold text-center">Withdraw Type</th>
                    <th className="py-3 pr-4 text-[#0A2E1D] font-bold text-center">Status</th>
                    <th className="py-3 pr-4 text-[#0A2E1D] font-bold text-center">Withdraw Method</th>
                    <th className="py-3 pr-4 text-[#0A2E1D] font-bold text-center">Action</th>
                  </tr>
                </thead>
                <tbody className="text-[#0A2E1D]">
                  {[
                    { id: 1, trId: 'TR-5JJEBPZ8G', date: '3/5/2025', name: 'Als6561', email: 'jhbeuc@gmail.com', amount: '1.00', withdrawType: 'usd', status: 'Approved', withdrawMethod: 'Bank Transfer' },
                  ].map((row) => (
                    <tr key={row.id} className="border-b border-black/10 last:border-b-0">
                      <td className="py-4 pr-4 text-center">{row.id}</td>
                      <td className="py-4 pr-4 text-center">{row.trId}</td>
                      <td className="py-4 pr-4 text-center">{row.date}</td>
                      <td className="py-4 pr-4 text-center">{row.name}</td>
                      <td className="py-4 pr-4 text-center text-[#0A2E1D] underline"><a href={`mailto:${row.email}`}>{row.email}</a></td>
                      <td className="py-4 pr-4 text-center">{row.amount}</td>
                      <td className="py-4 pr-4 text-center">{row.withdrawType}</td>
                      <td className="py-4 pr-4 text-center">
                        <span className="inline-block bg-[#16a34a]/10 text-[#16a34a] text-xs px-3 py-1 rounded font-semibold">Approved</span>
                      </td>
                      <td className="py-4 pr-4 text-center">
                        <button className="px-3 py-1 text-xs bg-[#0A2E1D] text-white rounded hover:opacity-90 font-semibold" onClick={() => openView(row)}>View</button>
                      </td>
                      <td className="py-4 pr-4 text-center">
                        <button
                          aria-label="Settings"
                          className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-[#0A2E1D] text-[#0A2E1D] hover:bg-[#0A2E1D] hover:text-white transition-colors"
                        >
                          <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M12 8.5a3.5 3.5 0 100 7 3.5 3.5 0 000-7z" />
                            <path d="M12 2v3M12 19v3M4.22 4.22l2.12 2.12M17.66 17.66l2.12 2.12M2 12h3M19 12h3M4.22 19.78l2.12-2.12M17.66 6.34l2.12-2.12" />
                          </svg>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* View modal */}
          {isViewOpen && selectedRow && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
              <div className="bg-white rounded-lg shadow-xl w-[560px] max-w-[92%]">
                <div className="flex items-center justify-between px-6 py-4 border-b border-black/10">
                  <h3 className="text-lg font-semibold text-[#0A2E1D]">Withdrawal Details</h3>
                  <button onClick={closeView} className="px-3 py-1 rounded bg-[#0A2E1D] text-white text-sm">Close</button>
                </div>
                <div className="px-6 py-6 text-[#0A2E1D]">
                  <div className="grid grid-cols-2 gap-y-3">
                    <div className="font-semibold">Tr.ID</div>
                    <div>{selectedRow.trId}</div>
                    <div className="font-semibold">Date</div>
                    <div>{selectedRow.date}</div>
                    <div className="font-semibold">User</div>
                    <div>{selectedRow.name}</div>
                    <div className="font-semibold">Email</div>
                    <div><a className="underline" href={`mailto:${selectedRow.email}`}>{selectedRow.email}</a></div>
                    <div className="font-semibold">Amount</div>
                    <div>{selectedRow.amount}</div>
                    <div className="font-semibold">Withdraw Type</div>
                    <div>{selectedRow.withdrawType}</div>
                    <div className="font-semibold">Status</div>
                    <div>{selectedRow.status}</div>
                    <div className="font-semibold">Withdraw Method</div>
                    <div>{selectedRow.withdrawMethod}</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Scroll to top button */}
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
    </div>
  );
}

export default function WithdrawFundPage() {
  return (
    <ProtectedRoute requiredRole="admin">
      <WithdrawFundContent />
    </ProtectedRoute>
  );
}
