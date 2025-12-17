import AnalyticsSection from '@/components/AnalyticsSection';
import HeroSection from '@/components/HeroSection';
import HomeFooter from '@/components/HomeFooter';
import Navbar from '@/components/Navbar';
import TradingChartsSection from '@/components/TradingChartsSection';

export default function HomePage() {
  return (
    <div>
      <Navbar />
      <HeroSection />
      
      {/* Portfolio Management Section */}
      <section className="py-20" style={{backgroundColor: '#F7F7F2'}}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Main Heading */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
              All your investments{' '}
              <span className="text-[#A0C8A9]">Unified.</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed mb-16">
              Manage, track, and optimize your entire portfolio from one powerful platform
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-8">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Portfolio Management Made Simple
              </h2>
              <p className="text-xl text-gray-600 leading-relaxed">
                Track all your investments, monitor performance, and manage risk with our intuitive portfolio management tools.
              </p>

              {/* Feature Cards */}
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                  <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4">
                    <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Real-Time Analytics</h3>
                  <p className="text-gray-600">Get Instant Insights into your portfolio performance and market trends.</p>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                  <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4">
                    <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Secure Trading</h3>
                  <p className="text-gray-600">Trade with confidence using our advanced security protocols.</p>
                </div>
              </div>
            </div>

            {/* Right Content - Mobile Mockup */}
            <div className="flex justify-center lg:justify-end">
              <div className="relative">
                {/* Mobile Phone Frame */}
                <div className="w-[280px] h-[560px] bg-black rounded-[38px] p-[10px] shadow-2xl overflow-hidden">
                  <div className="w-full h-full bg-[#0F3A25] rounded-[32px] overflow-hidden flex flex-col">
                    {/* Status Bar */}
                    <div className="bg-[#0F3A25] px-4 py-0.5 flex justify-between items-center">
                      <div className="text-white text-xs">7:16</div>
                      <div className="flex items-center space-x-1">
                        <div className="w-4 h-4 text-white">
                          <svg viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 2C6.5 2 2 6.5 2 12S6.5 22 12 22 22 17.5 22 12 17.5 2 12 2M12 20C7.59 20 4 16.41 4 12S7.59 4 12 4 20 7.59 20 12 16.41 20 12 20M16.59 7.58L10 14.17L7.41 11.59L6 13L10 17L18 9L16.59 7.58Z" />
                          </svg>
                        </div>
                        <div className="w-4 h-4 text-white">
                          <svg viewBox="0 0 24 24" fill="currentColor">
                            <path d="M1 21H23L12 2L1 21ZM13 18H11V16H13V18ZM13 14H11V10H13V14Z" />
                          </svg>
                        </div>
                      </div>
                    </div>
                    
                    {/* App Header */}
                    <div className="px-4 py-0.5 flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor">
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

                    {/* Buy/Sell Title */}
                    <div className="px-4 pt-0.5">
                      <h2 className="text-white text-xl font-bold">Buy/Sell</h2>
                      <p className="text-gray-400 text-xs">TSLA</p>
                    </div>

                    {/* Candlestick Chart */}
                    <div className="px-2 py-1">
                      <div className="h-[110px] w-full bg-[#0F3A25] relative">
                        {/* Chart grid lines */}
                        <div className="absolute top-0 left-0 right-0 bottom-0 grid grid-cols-4 grid-rows-3">
                          {/* Horizontal lines */}
                          <div className="col-span-4 border-b border-gray-600/30"></div>
                          <div className="col-span-4 border-b border-gray-600/30"></div>
                          <div className="col-span-4 border-b border-gray-600/30"></div>
                          
                          {/* Vertical lines */}
                          <div className="row-span-3 border-r border-gray-600/30"></div>
                          <div className="row-span-3 border-r border-gray-600/30"></div>
                          <div className="row-span-3 border-r border-gray-600/30"></div>
                        </div>
                        
                        {/* Percentage labels */}
                        <div className="absolute top-1 left-1 text-gray-400 text-[10px]">0.00%</div>
                        <div className="absolute top-[33%] left-1 text-gray-400 text-[10px]">-0.02%</div>
                        <div className="absolute top-[66%] left-1 text-gray-400 text-[10px]">-0.04%</div>
                        
                        {/* Candlesticks - exact representation */}
                        <div className="absolute inset-5 flex items-end justify-between">
                          {/* Candle 1 - Red */}
                          <div className="relative w-[6px] flex items-center justify-center">
                            <div className="absolute h-16 w-[1px] bg-[#E74C3C] top-[-24px]"></div>
                            <div className="w-[6px] h-12 bg-[#E74C3C]"></div>
                          </div>
                          
                          {/* Candle 2 - Red with wick */}
                          <div className="relative w-[6px] flex items-center justify-center">
                            <div className="absolute h-6 w-[1px] bg-[#E74C3C] top-[-6px]"></div>
                            <div className="w-[6px] h-5 bg-[#E74C3C]"></div>
                            <div className="absolute h-2 w-[1px] bg-[#E74C3C] bottom-[-2px]"></div>
                          </div>
                          
                          {/* Candle 3 - Green */}
                          <div className="relative w-[6px] flex items-center justify-center">
                            <div className="absolute h-3 w-[1px] bg-[#2ECC71] top-[-3px]"></div>
                            <div className="w-[6px] h-10 bg-[#2ECC71]"></div>
                            <div className="absolute h-2 w-[1px] bg-[#2ECC71] bottom-[-2px]"></div>
                          </div>
                          
                          {/* Candle 4 - Red */}
                          <div className="relative w-[6px] flex items-center justify-center">
                            <div className="absolute h-2 w-[1px] bg-[#E74C3C] top-[-2px]"></div>
                            <div className="w-[6px] h-6 bg-[#E74C3C]"></div>
                            <div className="absolute h-3 w-[1px] bg-[#E74C3C] bottom-[-3px]"></div>
                          </div>
                          
                          {/* Candle 5 - Green */}
                          <div className="relative w-[6px] flex items-center justify-center">
                            <div className="absolute h-2 w-[1px] bg-[#2ECC71] top-[-2px]"></div>
                            <div className="w-[6px] h-8 bg-[#2ECC71]"></div>
                            <div className="absolute h-1 w-[1px] bg-[#2ECC71] bottom-[-1px]"></div>
                          </div>
                          
                          {/* Candle 6 - Red */}
                          <div className="relative w-[6px] flex items-center justify-center">
                            <div className="absolute h-4 w-[1px] bg-[#E74C3C] top-[-4px]"></div>
                            <div className="w-[6px] h-8 bg-[#E74C3C]"></div>
                            <div className="absolute h-6 w-[1px] bg-[#E74C3C] bottom-[-6px]"></div>
                          </div>
                          
                          {/* Candle 7 - Red */}
                          <div className="relative w-[6px] flex items-center justify-center">
                            <div className="absolute h-2 w-[1px] bg-[#E74C3C] top-[-2px]"></div>
                            <div className="w-[6px] h-4 bg-[#E74C3C]"></div>
                            <div className="absolute h-4 w-[1px] bg-[#E74C3C] bottom-[-4px]"></div>
                          </div>
                          
                          {/* Candle 8 - Green */}
                          <div className="relative w-[6px] flex items-center justify-center">
                            <div className="absolute h-4 w-[1px] bg-[#2ECC71] top-[-4px]"></div>
                            <div className="w-[6px] h-12 bg-[#2ECC71]"></div>
                            <div className="absolute h-1 w-[1px] bg-[#2ECC71] bottom-[-1px]"></div>
                          </div>
                          
                          {/* Candle 9 - Red */}
                          <div className="relative w-[6px] flex items-center justify-center">
                            <div className="absolute h-2 w-[1px] bg-[#E74C3C] top-[-2px]"></div>
                            <div className="w-[6px] h-10 bg-[#E74C3C]"></div>
                            <div className="absolute h-1 w-[1px] bg-[#E74C3C] bottom-[-1px]"></div>
                          </div>
                        </div>
                        
                        {/* Bottom trend line */}
                        <div className="absolute bottom-[28px] left-0 right-0 border-t border-dashed border-[#E74C3C]/70"></div>
                      </div>
                    </div>

                    {/* Trading Interface */}
                    <div className="bg-[#0C1D30] rounded-t-xl p-2.5 space-y-2">
                      {/* Execution Type Dropdown */}
                      <div className="flex items-center justify-between bg-[#131F35] rounded-md p-1.5 border border-gray-700/50">
                        <span className="text-white text-sm font-medium">Instant Execution</span>
                        <svg className="w-5 h-5 text-white" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                      </div>
                      
                      {/* Price Display */}
                      <div className="flex justify-between items-center py-1">
                        <div className="text-[#2F7BF4] text-[20px] font-bold">
                          360.56<span className="text-xs align-super">2</span>
                        </div>
                        <div className="text-[#2F7BF4] text-[20px] font-bold">
                          360.56<span className="text-xs align-super">6</span>
                        </div>
                      </div>

                      {/* Stop Loss / Take Profit */}
                      <div className="grid grid-cols-2 gap-2">
                        <div className="bg-[#131F35] rounded-md p-1.5 border border-[#9A3E3E] flex justify-between items-center">
                          <span className="text-[#E74C3C] font-bold text-base">−</span>
                          <span className="text-white text-sm font-medium">SL</span>
                          <span className="text-[#E74C3C] font-bold text-base">+</span>
                        </div>
                        <div className="bg-[#131F35] rounded-md p-1.5 border border-[#2ECC71]/30 flex justify-between items-center">
                          <span className="text-[#2ECC71] font-bold text-base">−</span>
                          <span className="text-white text-sm font-medium">TP</span>
                          <span className="text-[#2ECC71] font-bold text-base">+</span>
                        </div>
                      </div>
                      
                      {/* Amount Input */}
                      <div className="bg-[#131F35] rounded-md p-1.5 border border-gray-700/50 flex justify-between items-center">
                        <span className="text-white font-bold text-base">−</span>
                        <span className="text-white text-sm font-medium">0.50</span>
                        <span className="text-white font-bold text-base">+</span>
                        </div>

                      {/* Deviation Input */}
                      <div className="bg-[#131F35] rounded-md p-1.5 border border-gray-700/50 flex justify-between items-center">
                        <span className="text-white font-bold text-base">−</span>
                        <span className="text-white text-sm font-medium">Deviation</span>
                        <span className="text-white font-bold text-base">+</span>
                        </div>

                      {/* Buy/Sell Buttons */}
                      <div className="grid grid-cols-2 gap-1 pt-1">
                        <button className="bg-[#9A3E3E] text-[#FF8A80] py-1.5 rounded-md text-sm font-bold border border-[#E74C3C]/30">
                          SELL
                          </button>
                        <button className="bg-[#2F7BF4] text-white py-1.5 rounded-md text-sm font-bold">
                          BUY
                          </button>
                      </div>
                      
                      {/* Bottom Navigation */}
                      <div className="flex justify-between items-center pt-2 mt-1 border-t border-gray-700/50">
                        <div className="flex flex-col items-center">
                          <svg className="w-4 h-4 text-gray-300" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M3 13h2v-2H3v2zm0 4h2v-2H3v2zm0-8h2V7H3v2zm4 4h14v-2H7v2zm0 4h14v-2H7v2zM7 7v2h14V7H7z" />
                          </svg>
                          <span className="text-gray-300 text-[9px] mt-0.5">Watchlist</span>
                        </div>
                        <div className="flex flex-col items-center">
                          <svg className="w-4 h-4 text-gray-300" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M3.5 18.49l6-6.01 4 4L22 6.92l-1.41-1.41-7.09 7.97-4-4L2 16.99z" />
                          </svg>
                          <span className="text-gray-300 text-[9px] mt-0.5">Charts</span>
                        </div>
                        <div className="flex flex-col items-center">
                          <svg className="w-4 h-4 text-gray-300" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M16 6l2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6z" />
                          </svg>
                          <span className="text-gray-300 text-[9px] mt-0.5">Trade</span>
                        </div>
                        <div className="flex flex-col items-center">
                          <svg className="w-4 h-4 text-gray-300" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M13 3c-4.97 0-9 4.03-9 9H1l3.89 3.89.07.14L9 12H6c0-3.87 3.13-7 7-7s7 3.13 7 7-3.13 7-7 7c-1.93 0-3.68-.79-4.94-2.06l-1.42 1.42C8.27 19.99 10.51 21 13 21c4.97 0 9-4.03 9-9s-4.03-9-9-9zm-1 5v5l4.28 2.54.72-1.21-3.5-2.08V8H12z" />
                          </svg>
                          <span className="text-gray-300 text-[9px] mt-0.5">History</span>
                        </div>
                        <div className="flex flex-col items-center">
                          <svg className="w-4 h-4 text-gray-300" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" />
                          </svg>
                          <span className="text-gray-300 text-[9px] mt-0.5">Menu</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <AnalyticsSection />
      
      {/* Feature Cards Section */}
      <section className="py-20" style={{backgroundColor: '#F7F7F2'}}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            {/* Bank-Grade Security */}
            <div className="text-center p-8 bg-white rounded-xl shadow-sm border border-gray-100">
              <div className="w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-6" style={{backgroundColor: '#A0C8A9'}}>
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Bank-Grade Security</h3>
              <p className="text-gray-600 leading-relaxed">Your investments are protected with enterprise-level security and encryption.</p>
            </div>

            {/* Lightning Fast */}
            <div className="text-center p-8 bg-white rounded-xl shadow-sm border border-gray-100">
              <div className="w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-6" style={{backgroundColor: '#A0C8A9'}}>
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Lightning Fast</h3>
              <p className="text-gray-600 leading-relaxed">Execute trades instantly with our high-performance trading engine.</p>
            </div>

            {/* Advanced Analytics */}
            <div className="text-center p-8 bg-white rounded-xl shadow-sm border border-gray-100">
              <div className="w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-6" style={{backgroundColor: '#A0C8A9'}}>
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Advanced Analytics</h3>
              <p className="text-gray-600 leading-relaxed">Make informed decisions with comprehensive market analysis tools.</p>
            </div>

            {/* Global Markets */}
            <div className="text-center p-8 bg-white rounded-xl shadow-sm border border-gray-100">
              <div className="w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-6" style={{backgroundColor: '#A0C8A9'}}>
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Global Markets</h3>
              <p className="text-gray-600 leading-relaxed">Access markets worldwide with real-time data and seamless trading.</p>
            </div>

            {/* Expert Support */}
            <div className="text-center p-8 bg-white rounded-xl shadow-sm border border-gray-100">
              <div className="w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-6" style={{backgroundColor: '#A0C8A9'}}>
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Expert Support</h3>
              <p className="text-gray-600 leading-relaxed">24/7 customer support from our team of trading professionals.</p>
            </div>

            {/* Real-Time Data */}
            <div className="text-center p-8 bg-white rounded-xl shadow-sm border border-gray-100">
              <div className="w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-6" style={{backgroundColor: '#A0C8A9'}}>
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Real-Time Data</h3>
              <p className="text-gray-600 leading-relaxed">Stay ahead with live market data and instant notifications.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Trading Charts Section */}
      <TradingChartsSection />

      <HomeFooter />
    </div>
  );
} 