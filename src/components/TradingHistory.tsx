'use client';


export default function TradingHistory() {
  return (
    <div className="relative w-[280px] h-[580px] bg-black rounded-[38px] p-[10px] shadow-2xl overflow-hidden">
      <div className="w-full h-full bg-[#0A2E1D] rounded-[28px] overflow-hidden flex flex-col">
        {/* Status Bar */}
        <div className="bg-[#0A2E1D] px-4 py-2 flex justify-between items-center">
          <div className="text-white text-xs">7:16</div>
          <div className="flex items-center space-x-1">
            <div className="w-4 h-4">
              <svg viewBox="0 0 24 24" fill="white">
                <path d="M17.65 6.35A7.958 7.958 0 0012 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08A5.99 5.99 0 0112 18c-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z"/>
              </svg>
            </div>
            <div className="w-4 h-4">
              <svg viewBox="0 0 24 24" fill="white">
                <path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6-6v-5c0-3.07-1.63-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.64 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2zm-2 1H8v-6c0-2.48 1.51-4.5 4-4.5s4 2.02 4 4.5v6z"/>
              </svg>
            </div>
          </div>
        </div>
        
        {/* App Header */}
        <div className="px-4 py-2 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="white">
              <path d="M12 2L2 7L12 12L22 7L12 2Z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M2 17L12 22L22 17" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M2 12L12 17L22 12" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <div>
              <span className="text-white font-bold text-xs block leading-none">RAZ</span>
              <span className="text-white font-bold text-xs block leading-none">CAPITALS</span>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">
              <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z" />
              </svg>
            </div>
            <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center relative">
              <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6-6v-5c0-3.07-1.63-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.64 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2zm-2 1H8v-6c0-2.48 1.51-4.5 4-4.5s4 2.02 4 4.5v6z" />
              </svg>
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></div>
            </div>
          </div>
        </div>

        {/* Page Title */}
        <div className="px-4 pt-2">
          <h2 className="text-white text-2xl font-bold">History</h2>
        </div>

        {/* Tabs */}
        <div className="px-4 pt-2 pb-3 flex space-x-6">
          <button className="text-[#4CAF50] font-medium text-sm border-b-2 border-[#4CAF50] pb-1">
            Positions
          </button>
          <button className="text-gray-400 font-medium text-sm">
            Orders
          </button>
          <button className="text-gray-400 font-medium text-sm">
            Deals
          </button>
          <div className="flex-grow"></div>
          <button className="text-white">
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M10 18h4v-2h-4v2zM3 6v2h18V6H3zm3 7h12v-2H6v2z" />
            </svg>
          </button>
          <button className="text-white">
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M10 18h4v-2h-4v2zM3 6v2h18V6H3zm3 7h12v-2H6v2z" />
            </svg>
          </button>
        </div>

        {/* Stats Cards */}
        <div className="px-4 grid grid-cols-3 gap-2">
          {/* Profit Card */}
          <div className="bg-[#121C26] p-2 rounded-lg">
            <p className="text-gray-400 text-xs mb-1">Profit</p>
            <p className="text-white text-sm font-bold">48 261.42</p>
          </div>
          
          {/* Deposit Card */}
          <div className="bg-[#121C26] p-2 rounded-lg">
            <p className="text-gray-400 text-xs mb-1">Deposit</p>
            <p className="text-white text-sm font-bold">26 741.97</p>
          </div>
          
          {/* Swap Card */}
          <div className="bg-[#121C26] p-2 rounded-lg">
            <p className="text-gray-400 text-xs mb-1">Swap</p>
            <p className="text-white text-sm font-bold">255.00</p>
          </div>
          
          {/* Commission Card */}
          <div className="bg-[#121C26] p-2 rounded-lg col-span-1">
            <p className="text-gray-400 text-xs mb-1">Commission</p>
            <p className="text-white text-sm font-bold">3 034.17</p>
          </div>
          
          {/* Balance Card */}
          <div className="bg-[#121C26] p-2 rounded-lg col-span-2">
            <p className="text-gray-400 text-xs mb-1">Balance</p>
            <p className="text-white text-sm font-bold">23 707.80</p>
          </div>
        </div>

        {/* Positions List */}
        <div className="px-4 pt-3">
          <p className="text-gray-400 text-xs mb-2">Positions</p>
          <div className="space-y-1 overflow-y-auto max-h-[140px] pb-2">
            {/* Position Item 1 */}
            <div className="bg-[#121C26] rounded-md p-2 flex justify-between items-center">
              <div className="flex-1">
                <div className="flex items-center">
                  <span className="text-white text-xs font-medium">TSLA</span>
                  <span className="text-gray-400 text-[10px] ml-2">buy 0.01</span>
                </div>
                <div className="text-gray-400 text-[10px]">1.0436 → 1.0536</div>
              </div>
              <div className="text-[#4CAF50] text-xs font-bold">+360.56</div>
            </div>
            
            {/* Position Item 2 */}
            <div className="bg-[#121C26] rounded-md p-2 flex justify-between items-center">
              <div className="flex-1">
                <div className="flex items-center">
                  <span className="text-white text-xs font-medium">TSLA</span>
                  <span className="text-gray-400 text-[10px] ml-2">buy 0.01</span>
                </div>
                <div className="text-gray-400 text-[10px]">1.0436 → 1.0536</div>
              </div>
              <div className="text-[#4CAF50] text-xs font-bold">+360.56</div>
            </div>
            
            {/* Position Item 3 */}
            <div className="bg-[#121C26] rounded-md p-2 flex justify-between items-center">
              <div className="flex-1">
                <div className="flex items-center">
                  <span className="text-white text-xs font-medium">TSLA</span>
                  <span className="text-gray-400 text-[10px] ml-2">buy 0.01</span>
                </div>
                <div className="text-gray-400 text-[10px]">1.0436 → 1.0536</div>
              </div>
              <div className="text-[#F44336] text-xs font-bold">-360.56</div>
            </div>
            
            {/* Position Item 4 */}
            <div className="bg-[#121C26] rounded-md p-2 flex justify-between items-center">
              <div className="flex-1">
                <div className="flex items-center">
                  <span className="text-white text-xs font-medium">TSLA</span>
                  <span className="text-gray-400 text-[10px] ml-2">buy 0.01</span>
                </div>
                <div className="text-gray-400 text-[10px]">1.0436 → 1.0536</div>
              </div>
              <div className="text-[#4CAF50] text-xs font-bold">+360.56</div>
            </div>
            
            {/* Position Item 5 */}
            <div className="bg-[#121C26] rounded-md p-2 flex justify-between items-center">
              <div className="flex-1">
                <div className="flex items-center">
                  <span className="text-white text-xs font-medium">TSLA</span>
                  <span className="text-gray-400 text-[10px] ml-2">buy 0.01</span>
                </div>
                <div className="text-gray-400 text-[10px]">1.0436 → 1.0536</div>
              </div>
              <div className="text-[#F44336] text-xs font-bold">-360.56</div>
            </div>
            
            {/* Position Item 6 */}
            <div className="bg-[#121C26] rounded-md p-2 flex justify-between items-center">
              <div className="flex-1">
                <div className="flex items-center">
                  <span className="text-white text-xs font-medium">TSLA</span>
                  <span className="text-gray-400 text-[10px] ml-2">buy 0.01</span>
                </div>
                <div className="text-gray-400 text-[10px]">1.0436 → 1.0536</div>
              </div>
              <div className="text-[#F44336] text-xs font-bold">-360.56</div>
            </div>
            
            {/* Position Item 7 */}
            <div className="bg-[#121C26] rounded-md p-2 flex justify-between items-center">
              <div className="flex-1">
                <div className="flex items-center">
                  <span className="text-white text-xs font-medium">TSLA</span>
                  <span className="text-gray-400 text-[10px] ml-2">buy 0.01</span>
                </div>
                <div className="text-gray-400 text-[10px]">1.0436 → 1.0536</div>
              </div>
              <div className="text-[#F44336] text-xs font-bold">-360.56</div>
            </div>
            
            {/* Position Item 8 */}
            <div className="bg-[#121C26] rounded-md p-2 flex justify-between items-center">
              <div className="flex-1">
                <div className="flex items-center">
                  <span className="text-white text-xs font-medium">TSLA</span>
                  <span className="text-gray-400 text-[10px] ml-2">buy 0.01</span>
                </div>
                <div className="text-gray-400 text-[10px]">1.0436 → 1.0536</div>
              </div>
              <div className="text-[#4CAF50] text-xs font-bold">+360.56</div>
            </div>
          </div>
        </div>

        {/* Bottom Navigation */}
        <div className="mt-auto bg-[#0A0E14] border-t border-gray-800/50 py-2 px-4">
          <div className="flex justify-between items-center">
            <div className="flex flex-col items-center">
              <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
                <path d="M3 13h2v-2H3v2zm0 4h2v-2H3v2zm0-8h2V7H3v2zm4 4h14v-2H7v2zm0 4h14v-2H7v2zM7 7v2h14V7H7z" />
              </svg>
              <span className="text-white text-[9px] mt-0.5">Watchlist</span>
            </div>
            <div className="flex flex-col items-center">
              <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
                <path d="M3.5 18.49l6-6.01 4 4L22 6.92l-1.41-1.41-7.09 7.97-4-4L2 16.99z" />
              </svg>
              <span className="text-white text-[9px] mt-0.5">Charts</span>
            </div>
            <div className="flex flex-col items-center">
              <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
                <path d="M16 6l2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6z" />
              </svg>
              <span className="text-white text-[9px] mt-0.5">Trade</span>
            </div>
            <div className="flex flex-col items-center">
              <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
                <path d="M13 3c-4.97 0-9 4.03-9 9H1l3.89 3.89.07.14L9 12H6c0-3.87 3.13-7 7-7s7 3.13 7 7-3.13 7-7 7c-1.93 0-3.68-.79-4.94-2.06l-1.42 1.42C8.27 19.99 10.51 21 13 21c4.97 0 9-4.03 9-9s-4.03-9-9-9zm-1 5v5l4.28 2.54.72-1.21-3.5-2.08V8H12z" />
              </svg>
              <span className="text-white text-[9px] mt-0.5">History</span>
            </div>
            <div className="flex flex-col items-center">
              <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
                <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" />
              </svg>
              <span className="text-white text-[9px] mt-0.5">Menu</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
