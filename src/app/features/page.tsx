'use client';

import Navbar from '@/components/Navbar';
import { useEffect } from 'react';

// Note: metadata is handled in layout.tsx for client components

export default function FeaturesPage() {
  useEffect(() => {
    // Hide the global footer on this page
    const globalFooter = document.querySelector('footer:not(.custom-footer)');
    if (globalFooter) {
      (globalFooter as HTMLElement).style.display = 'none';
    }

    // Cleanup function to restore footer when leaving the page
    return () => {
      const globalFooter = document.querySelector('footer:not(.custom-footer)');
      if (globalFooter) {
        (globalFooter as HTMLElement).style.display = '';
      }
    };
  }, []);

  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar />
      {/* Hero Section */}
      <section className="text-white" style={{ background: 'linear-gradient(180deg, #1E2E23 0%, #2A3A2F 100%)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <div className="inline-block bg-[#A0C8A9]/20 text-[#A0C8A9] px-4 py-2 rounded-full text-sm mb-6">
            Powerful Trading Features
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Powerful Trading <span className="text-[#A0C8A9]">Features</span>
          </h1>
          <p className="text-xl text-[#C4CEC1] max-w-4xl mx-auto leading-relaxed">
            Discover why thousands of traders choose our platform for their gold and precious metals trading. Experience cutting-edge technology designed for success.
          </p>
        </div>
      </section>

      {/* Main Feature Cards */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Pro Trading Platform */}
            <div className="bg-[#1E2E23] rounded-2xl p-8 text-white">
              <div className="mb-6">
                <div className="bg-[#A0C8A9] text-black px-3 py-1 rounded-full text-sm inline-block mb-4">
                  Premium
                </div>
                <h2 className="text-2xl font-bold mb-4">Pro Trading Platform & Mobile Apps</h2>
                <p className="text-[#C4CEC1] mb-6">
                  Advanced charting tools, technical analysis, and real-time market data. Built for traders who need cutting-edge performance for their investment decisions.
                </p>
            </div>

              {/* Mobile Mockup */}
              <div className="flex justify-center">
                <div className="relative w-48 h-80 rounded-2xl bg-gray-900 p-2 shadow-xl">
                  <div className="w-full h-full bg-gray-800 rounded-xl p-3">
                    <div className="text-center text-white text-xs mb-4">Trading Platform</div>
                    <div className="space-y-3">
                      {/* Chart area */}
                      <div className="bg-gray-700 rounded-lg h-24 flex items-center justify-center">
                        <svg className="w-12 h-12 text-[#A0C8A9]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
                      </div>
                      {/* Trading pairs */}
                      <div className="space-y-2">
                        {['GOLD', 'SILVER', 'COPPER'].map((pair, idx) => (
                          <div key={pair} className="flex justify-between items-center bg-gray-700 rounded p-2">
                            <span className="text-white text-xs">{pair}</span>
                            <span className="text-[#A0C8A9] text-xs">+2.4%</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Real-Time Gold Prices */}
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <div className="mb-6">
                <div className="bg-gray-800 text-white px-3 py-1 rounded-full text-sm inline-block mb-4">
                  Live Data
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Real-Time Gold Prices</h2>
                <p className="text-gray-600 mb-6">
                  Access live market data with our advanced charting system. Get real-time price feeds and professional-grade analysis tools.
                </p>
              </div>

              {/* Chart */}
              <div className="bg-gray-50 rounded-xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <div className="text-2xl font-bold text-gray-900">$2,045.22</div>
                    <div className="text-sm text-gray-500">GOLD Live Chart</div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-semibold text-green-600">+$12.45</div>
                    <div className="text-sm text-green-600">+0.61%</div>
                  </div>
                </div>
                
                {/* Simple chart visualization */}
                <div className="h-32 flex items-end space-x-1">
                  {Array.from({ length: 20 }).map((_, i) => (
                    <div
                      key={i}
                      className="bg-[#A0C8A9] w-3 rounded-t"
                      style={{ height: `${Math.random() * 100 + 20}%` }}
                    />
                  ))}
            </div>

                <div className="flex justify-between text-xs text-gray-400 mt-2">
                  <span>09:00</span>
                  <span>12:00</span>
                  <span>15:00</span>
                  <span>18:00</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Complete Trading Solution */}
      <section className="text-white py-20" style={{ background: 'linear-gradient(180deg, #1E2E23 0%, #2A3A2F 100%)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Complete Trading <span className="text-[#A0C8A9]">Solution</span></h2>
            <p className="text-xl text-[#C4CEC1]">Everything you need for successful precious metals trading, all in one platform</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: "⚡",
                title: "Advanced Trading Tools",
                description: "Professional-grade tools including algorithmic trading capabilities for optimal trading strategies."
              },
              {
                icon: "🛡️",
                title: "Bank-Level Security",
                description: "Multi-layer security protocols with encryption and segregated client accounts."
              },
              {
                icon: "📊",
                title: "Lightning Fast Execution",
                description: "Ultra-low latency execution with advanced order types for optimal trade execution."
              },
              {
                icon: "📈",
                title: "Comprehensive Analytics",
                description: "Advanced portfolio analytics, risk management tools, and performance tracking for informed decisions."
              },
              {
                icon: "🌍",
                title: "Global Market Access",
                description: "Trade gold, precious metals, forex, and commodities across international markets 24/5."
              },
              {
                icon: "📱",
                title: "Mobile Trading",
                description: "Dedicated mobile apps for iOS and Android with complete trading functionality on the go."
              },
              {
                icon: "👨‍💼",
                title: "Expert Support",
                description: "24/7 multilingual customer support with dedicated account managers and trading specialists."
              },
              {
                icon: "📋",
                title: "Regulatory Compliance",
                description: "Fully regulated and licensed operations with complete transparency and client protection."
              },
              {
                icon: "🏆",
                title: "Award Winning Platform",
                description: "Recognized as Best Futures Broker with innovative technology and superior service."
              }
            ].map((feature, index) => (
              <div key={index} className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                <div className="text-3xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-[#C4CEC1] text-sm leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gold Trading Options */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Gold Trading Options</h2>
            <p className="text-xl text-gray-600">Multiple gold trading accounts to suit every investment strategy and budget</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: "1 Gram Gold Trading",
                price: "$",
                description: "Perfect for beginners with flexible investment amounts",
                features: ["Low barrier to entry", "Instant execution", "Real-time pricing"]
              },
              {
                title: "10 Gram Gold Bars",
                price: "$$",
                description: "Ideal for intermediate traders seeking better value",
                features: ["Better pricing", "Physical delivery option", "Advanced analytics"]
              },
              {
                title: "Kilogram Gold Bars",
                price: "$$$",
                description: "For serious investors with substantial capital",
                features: ["Institutional pricing", "Priority support", "Custom solutions"]
              },
              {
                title: "FX Bar Trading",
                price: "$$$$",
                description: "Professional trading with maximum flexibility",
                features: ["Leverage options", "Advanced tools", "24/7 trading"]
              }
            ].map((option, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
                <div className="text-center mb-6">
                  <div className="text-3xl font-bold text-[#A0C8A9] mb-2">{option.price}</div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{option.title}</h3>
                  <p className="text-gray-600 text-sm">{option.description}</p>
            </div>

                <ul className="space-y-2 mb-6">
                  {option.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center text-sm text-gray-600">
                      <svg className="w-4 h-4 text-[#A0C8A9] mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
                
                <button className="w-full bg-gray-100 hover:bg-[#A0C8A9] hover:text-white text-gray-700 py-2 rounded-lg transition-colors duration-200">
                  Start Trading
                </button>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <button className="bg-[#1E2E23] hover:bg-[#2A3A2F] text-white px-8 py-3 rounded-lg font-semibold transition-colors duration-200">
              View Trading Plans
            </button>
          </div>
        </div>
      </section>

      {/* Customize Your Trading Experience */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="bg-gray-800 text-white px-3 py-1 rounded-full text-sm inline-block mb-4">
                Premium Features
              </div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Customize Your Trading Experience
              </h2>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Tailor your trading account to match your investment strategy. Customize spreads, swaps, commissions, base currency, instruments, and more to help you optimize trading to match your investment goals.
              </p>
              
              <ul className="space-y-4 mb-8">
                {[
                  "Custom spread configurations",
                  "Flexible commission structures", 
                  "Multiple base currencies",
                  "Extensive instrument selection"
                ].map((item, idx) => (
                  <li key={idx} className="flex items-center text-gray-700">
                    <svg className="w-5 h-5 text-[#A0C8A9] mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
              
              <button className="bg-[#1E2E23] hover:bg-[#2A3A2F] text-white px-8 py-3 rounded-lg font-semibold transition-colors duration-200">
                Customize Your Account
              </button>
            </div>

            <div className="bg-gray-50 rounded-2xl p-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">Account Customization Options</h3>
              
              <div className="space-y-6">
                {[
                  { label: "Account Type", options: ["Standard", "Professional", "Institutional"] },
                  { label: "Base Currency", options: ["USD", "EUR", "GBP", "JPY"] },
                  { label: "Leverage", options: ["1:50", "1:100", "1:200", "1:500"] },
                  { label: "Platform", options: ["WebTrader", "Mobile App", "Desktop"] }
                ].map((setting, idx) => (
                  <div key={idx}>
                    <label className="block text-sm font-medium text-gray-700 mb-2">{setting.label}</label>
                    <select className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#A0C8A9] focus:border-transparent">
                      {setting.options.map((option, optIdx) => (
                        <option key={optIdx} value={option}>{option}</option>
                      ))}
                    </select>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Ready to Start Trading CTA */}
      <section className="text-white py-20" style={{ background: 'linear-gradient(180deg, #1E2E23 0%, #2A3A2F 100%)' }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Start <span className="text-[#A0C8A9]">Trading?</span></h2>
          <p className="text-xl text-[#C4CEC1] mb-8 leading-relaxed">
            Join thousands of successful traders who trust our platform for their precious metals investments
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-[#A0C8A9] hover:bg-[#8FB89A] text-[#1E2E23] px-8 py-4 rounded-lg text-lg font-semibold transition-colors duration-200">
              Open Free Account
            </button>
            <button className="border border-[#A0C8A9] text-[#A0C8A9] hover:bg-[#A0C8A9] hover:text-[#1E2E23] px-8 py-4 rounded-lg text-lg font-semibold transition-colors duration-200">
              View Pricing
          </button>
          </div>
        </div>
      </section>

      {/* Custom Footer */}
      <footer className="custom-footer text-white py-16" style={{ background: 'linear-gradient(180deg, #1E2E23 0%, #2A3A2F 100%)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            {/* Company Info */}
            <div className="md:col-span-1">
              <div className="flex items-center space-x-2 mb-4">
                <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span className="text-lg font-bold">RAZ CAPITALS</span>
              </div>
              <p className="text-[#C4CEC1] text-sm leading-relaxed">
                Your trusted partner in precious metals trading.
              </p>
            </div>

            {/* Features */}
            <div>
              <h3 className="text-white font-semibold mb-4">Features</h3>
              <ul className="space-y-3">
                <li><a href="#" className="text-[#C4CEC1] hover:text-white text-sm transition-colors">Trading Platform</a></li>
                <li><a href="#" className="text-[#C4CEC1] hover:text-white text-sm transition-colors">Mobile Apps</a></li>
                <li><a href="#" className="text-[#C4CEC1] hover:text-white text-sm transition-colors">Analytics</a></li>
              </ul>
            </div>

            {/* Support */}
            <div>
              <h3 className="text-white font-semibold mb-4">Support</h3>
              <ul className="space-y-3">
                <li><a href="#" className="text-[#C4CEC1] hover:text-white text-sm transition-colors">Help Center</a></li>
                <li><a href="#" className="text-[#C4CEC1] hover:text-white text-sm transition-colors">Contact Us</a></li>
                <li><a href="#" className="text-[#C4CEC1] hover:text-white text-sm transition-colors">FAQ</a></li>
              </ul>
            </div>

            {/* Company */}
            <div>
              <h3 className="text-white font-semibold mb-4">Company</h3>
              <ul className="space-y-3">
                <li><a href="#" className="text-[#C4CEC1] hover:text-white text-sm transition-colors">About Us</a></li>
                <li><a href="#" className="text-[#C4CEC1] hover:text-white text-sm transition-colors">Careers</a></li>
                <li><a href="#" className="text-[#C4CEC1] hover:text-white text-sm transition-colors">Legal</a></li>
              </ul>
            </div>
          </div>

          {/* Copyright */}
          <div className="border-t border-white/20 pt-6">
            <div className="text-center">
              <p className="text-[#C4CEC1] text-sm">
                © 2025 RazCapitals. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
} 