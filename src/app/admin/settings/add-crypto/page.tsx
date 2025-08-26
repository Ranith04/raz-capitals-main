'use client';

import AdminHeader from '@/components/AdminHeader';
import AdminSidebar from '@/components/AdminSidebar';
import ProtectedRoute from '@/components/ProtectedRoute';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

function AddCryptoContent() {
  const router = useRouter();
  
  useEffect(() => {
    document.title = 'Add Crypto - RAZ CAPITALS';
  }, []);

  return (
    <div className="flex h-screen bg-[#9BC5A2] overflow-hidden">
      {/* Sidebar */}
      <AdminSidebar currentPage="add-crypto" />

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

        {/* Add Crypto Content */}
        <div className="flex-1 p-8 overflow-y-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-[#0A2E1D] text-3xl font-bold">Cryptocurrency Management</h1>
            <button className="px-6 py-2 bg-[#2D4A32] text-white rounded-lg hover:bg-[#3A5A3F] transition-colors">
              Add New Crypto
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {/* Add New Crypto Form */}
            <div className="bg-[#2D4A32] rounded-2xl p-6">
              <h2 className="text-white text-xl font-bold mb-6">Add New Cryptocurrency</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="text-[#9BC5A2] text-sm font-medium mb-2 block">Cryptocurrency</label>
                  <select className="w-full bg-[#4A6741] text-white px-4 py-2 rounded-lg border border-[#9BC5A2]/30 focus:border-[#9BC5A2] focus:outline-none">
                    <option>Bitcoin (BTC)</option>
                    <option>Ethereum (ETH)</option>
                    <option>Tether (USDT)</option>
                    <option>Binance Coin (BNB)</option>
                    <option>Cardano (ADA)</option>
                    <option>Solana (SOL)</option>
                    <option>Polygon (MATIC)</option>
                    <option>Litecoin (LTC)</option>
                    <option>Other</option>
                  </select>
                </div>
                
                <div>
                  <label className="text-[#9BC5A2] text-sm font-medium mb-2 block">Symbol</label>
                  <input 
                    type="text" 
                    placeholder="e.g., BTC, ETH, USDT"
                    className="w-full bg-[#4A6741] text-white px-4 py-2 rounded-lg border border-[#9BC5A2]/30 focus:border-[#9BC5A2] focus:outline-none placeholder-gray-400"
                  />
                </div>
                
                <div>
                  <label className="text-[#9BC5A2] text-sm font-medium mb-2 block">Network</label>
                  <select className="w-full bg-[#4A6741] text-white px-4 py-2 rounded-lg border border-[#9BC5A2]/30 focus:border-[#9BC5A2] focus:outline-none">
                    <option>Bitcoin Network</option>
                    <option>Ethereum (ERC-20)</option>
                    <option>Binance Smart Chain (BEP-20)</option>
                    <option>Polygon Network</option>
                    <option>Tron Network (TRC-20)</option>
                    <option>Solana Network</option>
                    <option>Avalanche Network</option>
                  </select>
                </div>
                
                <div>
                  <label className="text-[#9BC5A2] text-sm font-medium mb-2 block">Wallet Address</label>
                  <input 
                    type="text" 
                    placeholder="Company wallet address for this crypto"
                    className="w-full bg-[#4A6741] text-white px-4 py-2 rounded-lg border border-[#9BC5A2]/30 focus:border-[#9BC5A2] focus:outline-none placeholder-gray-400"
                  />
                </div>
                
                <div>
                  <label className="text-[#9BC5A2] text-sm font-medium mb-2 block">Private Key (Encrypted)</label>
                  <input 
                    type="password" 
                    placeholder="For automated transactions"
                    className="w-full bg-[#4A6741] text-white px-4 py-2 rounded-lg border border-[#9BC5A2]/30 focus:border-[#9BC5A2] focus:outline-none placeholder-gray-400"
                  />
                </div>
                
                <div>
                  <label className="text-[#9BC5A2] text-sm font-medium mb-2 block">Minimum Deposit</label>
                  <input 
                    type="number" 
                    step="0.00000001"
                    placeholder="Minimum deposit amount"
                    className="w-full bg-[#4A6741] text-white px-4 py-2 rounded-lg border border-[#9BC5A2]/30 focus:border-[#9BC5A2] focus:outline-none placeholder-gray-400"
                  />
                </div>
                
                <div>
                  <label className="text-[#9BC5A2] text-sm font-medium mb-2 block">Transaction Fee (%)</label>
                  <input 
                    type="number" 
                    step="0.01"
                    placeholder="e.g., 1.5"
                    className="w-full bg-[#4A6741] text-white px-4 py-2 rounded-lg border border-[#9BC5A2]/30 focus:border-[#9BC5A2] focus:outline-none placeholder-gray-400"
                  />
                </div>
                
                <div>
                  <label className="text-[#9BC5A2] text-sm font-medium mb-2 block">Confirmation Blocks</label>
                  <input 
                    type="number" 
                    placeholder="Required confirmations"
                    className="w-full bg-[#4A6741] text-white px-4 py-2 rounded-lg border border-[#9BC5A2]/30 focus:border-[#9BC5A2] focus:outline-none placeholder-gray-400"
                  />
                </div>
                
                <div>
                  <label className="text-[#9BC5A2] text-sm font-medium mb-2 block">Exchange Rate Source</label>
                  <select className="w-full bg-[#4A6741] text-white px-4 py-2 rounded-lg border border-[#9BC5A2]/30 focus:border-[#9BC5A2] focus:outline-none">
                    <option>CoinGecko API</option>
                    <option>CoinMarketCap API</option>
                    <option>Binance API</option>
                    <option>Manual Entry</option>
                  </select>
                </div>
                
                <div>
                  <label className="text-[#9BC5A2] text-sm font-medium mb-2 block">Usage Options</label>
                  <div className="space-y-2">
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" className="text-[#9BC5A2] bg-[#4A6741] border-[#9BC5A2]/30 rounded" />
                      <span className="text-white">Accept Deposits</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" className="text-[#9BC5A2] bg-[#4A6741] border-[#9BC5A2]/30 rounded" />
                      <span className="text-white">Allow Withdrawals</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" className="text-[#9BC5A2] bg-[#4A6741] border-[#9BC5A2]/30 rounded" />
                      <span className="text-white">Trading Pairs</span>
                    </label>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <input type="checkbox" className="text-[#9BC5A2] bg-[#4A6741] border-[#9BC5A2]/30 rounded" />
                  <span className="text-white text-sm">Enable for new users</span>
                </div>
                
                <button className="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                  Add Cryptocurrency
                </button>
              </div>
            </div>

            {/* Crypto Statistics */}
            <div className="bg-[#2D4A32] rounded-2xl p-6">
              <h2 className="text-white text-xl font-bold mb-6">Crypto Usage Statistics</h2>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 bg-[#4A6741] rounded-lg">
                  <div>
                    <h3 className="text-white font-medium">Bitcoin (BTC)</h3>
                    <p className="text-[#9BC5A2] text-sm">Most popular crypto</p>
                  </div>
                  <span className="text-white text-lg font-bold">42%</span>
                </div>
                
                <div className="flex justify-between items-center p-3 bg-[#4A6741] rounded-lg">
                  <div>
                    <h3 className="text-white font-medium">Ethereum (ETH)</h3>
                    <p className="text-[#9BC5A2] text-sm">Smart contracts platform</p>
                  </div>
                  <span className="text-white text-lg font-bold">28%</span>
                </div>
                
                <div className="flex justify-between items-center p-3 bg-[#4A6741] rounded-lg">
                  <div>
                    <h3 className="text-white font-medium">Tether (USDT)</h3>
                    <p className="text-[#9BC5A2] text-sm">Stable coin</p>
                  </div>
                  <span className="text-white text-lg font-bold">18%</span>
                </div>
                
                <div className="flex justify-between items-center p-3 bg-[#4A6741] rounded-lg">
                  <div>
                    <h3 className="text-white font-medium">Others</h3>
                    <p className="text-[#9BC5A2] text-sm">Various altcoins</p>
                  </div>
                  <span className="text-white text-lg font-bold">12%</span>
                </div>
              </div>
              
              <div className="mt-6 p-4 bg-[#4A6741] rounded-lg">
                <h3 className="text-white font-medium mb-3">Monthly Crypto Stats</h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-[#9BC5A2]">Total Deposits</p>
                    <p className="text-green-400 font-bold">$847K</p>
                  </div>
                  <div>
                    <p className="text-[#9BC5A2]">Total Withdrawals</p>
                    <p className="text-orange-400 font-bold">$523K</p>
                  </div>
                  <div>
                    <p className="text-[#9BC5A2]">Active Wallets</p>
                    <p className="text-white font-bold">1,247</p>
                  </div>
                  <div>
                    <p className="text-[#9BC5A2]">Fees Collected</p>
                    <p className="text-green-400 font-bold">$12.4K</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Current Cryptocurrencies Table */}
          <div className="bg-[#2D4A32] rounded-2xl p-6">
            <h2 className="text-white text-xl font-bold mb-6">Supported Cryptocurrencies</h2>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-[#4A6741]">
                    <th className="text-left text-[#9BC5A2] font-medium py-3">Crypto</th>
                    <th className="text-left text-[#9BC5A2] font-medium py-3">Symbol</th>
                    <th className="text-left text-[#9BC5A2] font-medium py-3">Network</th>
                    <th className="text-left text-[#9BC5A2] font-medium py-3">Min Deposit</th>
                    <th className="text-left text-[#9BC5A2] font-medium py-3">Fee %</th>
                    <th className="text-left text-[#9BC5A2] font-medium py-3">Users</th>
                    <th className="text-left text-[#9BC5A2] font-medium py-3">Status</th>
                    <th className="text-left text-[#9BC5A2] font-medium py-3">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-[#4A6741]/50">
                    <td className="text-white py-4">Bitcoin</td>
                    <td className="text-white py-4">BTC</td>
                    <td className="text-white py-4">Bitcoin Network</td>
                    <td className="text-white py-4">0.001 BTC</td>
                    <td className="text-white py-4">1.5%</td>
                    <td className="text-white py-4">523</td>
                    <td className="py-4">
                      <span className="bg-green-500/20 text-green-400 px-2 py-1 rounded-full text-sm">
                        Active
                      </span>
                    </td>
                    <td className="py-4">
                      <div className="flex space-x-2">
                        <button className="text-blue-400 hover:text-blue-300 transition-colors px-3 py-1 bg-blue-900/20 rounded hover:bg-blue-900/30 text-sm">
                          Edit
                        </button>
                        <button className="text-orange-400 hover:text-orange-300 transition-colors px-3 py-1 bg-orange-900/20 rounded hover:bg-orange-900/30 text-sm">
                          Test
                        </button>
                      </div>
                    </td>
                  </tr>
                  <tr className="border-b border-[#4A6741]/50">
                    <td className="text-white py-4">Ethereum</td>
                    <td className="text-white py-4">ETH</td>
                    <td className="text-white py-4">Ethereum (ERC-20)</td>
                    <td className="text-white py-4">0.01 ETH</td>
                    <td className="text-white py-4">2.0%</td>
                    <td className="text-white py-4">347</td>
                    <td className="py-4">
                      <span className="bg-green-500/20 text-green-400 px-2 py-1 rounded-full text-sm">
                        Active
                      </span>
                    </td>
                    <td className="py-4">
                      <div className="flex space-x-2">
                        <button className="text-blue-400 hover:text-blue-300 transition-colors px-3 py-1 bg-blue-900/20 rounded hover:bg-blue-900/30 text-sm">
                          Edit
                        </button>
                        <button className="text-red-400 hover:text-red-300 transition-colors px-3 py-1 bg-red-900/20 rounded hover:bg-red-900/30 text-sm">
                          Disable
                        </button>
                      </div>
                    </td>
                  </tr>
                  <tr className="border-b border-[#4A6741]/50">
                    <td className="text-white py-4">Tether</td>
                    <td className="text-white py-4">USDT</td>
                    <td className="text-white py-4">Tron Network (TRC-20)</td>
                    <td className="text-white py-4">10 USDT</td>
                    <td className="text-white py-4">1.0%</td>
                    <td className="text-white py-4">892</td>
                    <td className="py-4">
                      <span className="bg-green-500/20 text-green-400 px-2 py-1 rounded-full text-sm">
                        Active
                      </span>
                    </td>
                    <td className="py-4">
                      <div className="flex space-x-2">
                        <button className="text-blue-400 hover:text-blue-300 transition-colors px-3 py-1 bg-blue-900/20 rounded hover:bg-blue-900/30 text-sm">
                          Edit
                        </button>
                        <button className="text-orange-400 hover:text-orange-300 transition-colors px-3 py-1 bg-orange-900/20 rounded hover:bg-orange-900/30 text-sm">
                          Test
                        </button>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td className="text-white py-4">Litecoin</td>
                    <td className="text-white py-4">LTC</td>
                    <td className="text-white py-4">Litecoin Network</td>
                    <td className="text-white py-4">0.1 LTC</td>
                    <td className="text-white py-4">1.8%</td>
                    <td className="text-white py-4">156</td>
                    <td className="py-4">
                      <span className="bg-yellow-500/20 text-yellow-400 px-2 py-1 rounded-full text-sm">
                        Maintenance
                      </span>
                    </td>
                    <td className="py-4">
                      <div className="flex space-x-2">
                        <button className="text-green-400 hover:text-green-300 transition-colors px-3 py-1 bg-green-900/20 rounded hover:bg-green-900/30 text-sm">
                          Activate
                        </button>
                        <button className="text-blue-400 hover:text-blue-300 transition-colors px-3 py-1 bg-blue-900/20 rounded hover:bg-blue-900/30 text-sm">
                          Edit
                        </button>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function AddCryptoPage() {
  return (
    <ProtectedRoute requiredRole="admin">
      <AddCryptoContent />
    </ProtectedRoute>
  );
}
