export default function ToolsPage() {
  return (
    <div className="min-h-screen bg-[#B8D4C1] p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-[#0A2E1D] mb-6">Calculator Tools</h1>
        
        {/* Calculator Tools Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {/* Exchange Rate */}
          <div className="bg-white rounded-lg shadow p-6 border border-[#A0C8A9]/20 hover:shadow-lg transition-shadow cursor-pointer group">
            <div className="flex items-center justify-center w-16 h-16 bg-[#A0C8A9]/20 rounded-lg mb-4 mx-auto">
              <span className="text-3xl text-[#0A2E1D]">💱</span>
            </div>
            <h3 className="text-lg font-semibold text-[#0A2E1D] mb-2 text-center">Exchange Rate</h3>
            <p className="text-sm text-gray-600 text-center">Convert between different currencies using live exchange rates</p>
          </div>

          {/* Pip Value */}
          <div className="bg-white rounded-lg shadow p-6 border border-[#A0C8A9]/20 hover:shadow-lg transition-shadow cursor-pointer group">
            <div className="flex items-center justify-center w-16 h-16 bg-[#A0C8A9]/20 rounded-lg mb-4 mx-auto">
              <span className="text-3xl text-[#0A2E1D]">💰</span>
            </div>
            <h3 className="text-lg font-semibold text-[#0A2E1D] mb-2 text-center">Pip Value</h3>
            <p className="text-sm text-gray-600 text-center">Calculate the monetary value of pips based on position size</p>
          </div>

          {/* Margin */}
          <div className="bg-white rounded-lg shadow p-6 border border-[#A0C8A9]/20 hover:shadow-lg transition-shadow cursor-pointer group">
            <div className="flex items-center justify-center w-16 h-16 bg-[#A0C8A9]/20 rounded-lg mb-4 mx-auto">
              <span className="text-3xl text-[#0A2E1D]">💻</span>
            </div>
            <h3 className="text-lg font-semibold text-[#0A2E1D] mb-2 text-center">Margin</h3>
            <p className="text-sm text-gray-600 text-center">Determine required margin based on lot size and leverage</p>
          </div>

          {/* Position Size */}
          <div className="bg-white rounded-lg shadow p-6 border border-[#A0C8A9]/20 hover:shadow-lg transition-shadow cursor-pointer group">
            <div className="flex items-center justify-center w-16 h-16 bg-[#A0C8A9]/20 rounded-lg mb-4 mx-auto">
              <span className="text-3xl text-[#0A2E1D]">📊</span>
            </div>
            <h3 className="text-lg font-semibold text-[#0A2E1D] mb-2 text-center">Position Size</h3>
            <p className="text-sm text-gray-600 text-center">Find the optimal position size based on your risk parameters</p>
          </div>

          {/* Profit/Loss */}
          <div className="bg-white rounded-lg shadow p-6 border border-[#A0C8A9]/20 hover:shadow-lg transition-shadow cursor-pointer group">
            <div className="flex items-center justify-center w-16 h-16 bg-[#A0C8A9]/20 rounded-lg mb-4 mx-auto">
              <span className="text-3xl text-[#0A2E1D]">📈</span>
            </div>
            <h3 className="text-lg font-semibold text-[#0A2E1D] mb-2 text-center">Profit/Loss</h3>
            <p className="text-sm text-gray-600 text-center">Calculate potential profit or loss for a forex position</p>
          </div>

          {/* Swap */}
          <div className="bg-white rounded-lg shadow p-6 border border-[#A0C8A9]/20 hover:shadow-lg transition-shadow cursor-pointer group">
            <div className="flex items-center justify-center w-16 h-16 bg-[#A0C8A9]/20 rounded-lg mb-4 mx-auto">
              <span className="text-3xl text-[#0A2E1D]">🕒</span>
            </div>
            <h3 className="text-lg font-semibold text-[#0A2E1D] mb-2 text-center">Swap</h3>
            <p className="text-sm text-gray-600 text-center">Determine overnight fees for holding positions</p>
          </div>

          {/* Risk/Reward */}
          <div className="bg-white rounded-lg shadow p-6 border border-[#A0C8A9]/20 hover:shadow-lg transition-shadow cursor-pointer group">
            <div className="flex items-center justify-center w-16 h-16 bg-[#A0C8A9]/20 rounded-lg mb-4 mx-auto">
              <span className="text-3xl text-[#0A2E1D]">⚖️</span>
            </div>
            <h3 className="text-lg font-semibold text-[#0A2E1D] mb-2 text-center">Risk/Reward</h3>
            <p className="text-sm text-gray-600 text-center">Analyze the risk/reward ratio of your trade setups</p>
          </div>

          {/* Lot Size Converter */}
          <div className="bg-white rounded-lg shadow p-6 border border-[#A0C8A9]/20 hover:shadow-lg transition-shadow cursor-pointer group">
            <div className="flex items-center justify-center w-16 h-16 bg-[#A0C8A9]/20 rounded-lg mb-4 mx-auto">
              <span className="text-3xl text-[#0A2E1D]">🔄</span>
            </div>
            <h3 className="text-lg font-semibold text-[#0A2E1D] mb-2 text-center">Lot Size Converter</h3>
            <p className="text-sm text-gray-600 text-center">Convert between standard, mini, and micro lots</p>
          </div>
        </div>
      </div>
    </div>
  );
}
