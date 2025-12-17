'use client';

export default function TradingAccounts() {
  return (
    <section className="bg-[#0A2E1D] text-white py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Trading Accounts <span className="text-[#A0C8A9]">We Offer</span>
          </h2>
          <p className="text-xl text-[#C4CEC1] max-w-4xl mx-auto leading-relaxed">
            Choose the perfect plan for your trading needs and start building your portfolio today
          </p>
        </div>

        {/* Account Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {/* Starter Plan */}
          <div className="bg-[#1E2E23] rounded-xl p-8 border border-[#A0C8A9]/20 relative">
            <div className="text-center">
              <h3 className="text-2xl font-bold text-white mb-2">Starter</h3>
              <p className="text-[#C4CEC1] text-sm mb-6">Perfect for beginners</p>
              
              <div className="mb-8">
                <span className="text-4xl font-bold text-white">$0</span>
                <span className="text-[#C4CEC1] text-sm ml-2">per month</span>
              </div>

              <ul className="space-y-4 mb-8 text-left">
                <li className="flex items-center text-[#C4CEC1]">
                  <svg className="w-5 h-5 text-[#A0C8A9] mr-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Basic trading tools
                </li>
                <li className="flex items-center text-[#C4CEC1]">
                  <svg className="w-5 h-5 text-[#A0C8A9] mr-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Email support
                </li>
                <li className="flex items-center text-[#C4CEC1]">
                  <svg className="w-5 h-5 text-[#A0C8A9] mr-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Mobile trading
                </li>
                <li className="flex items-center text-[#C4CEC1]">
                  <svg className="w-5 h-5 text-[#A0C8A9] mr-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Basic analytics
                </li>
              </ul>

              <button className="w-full bg-transparent border border-[#A0C8A9] text-[#A0C8A9] hover:bg-[#A0C8A9] hover:text-[#1E2E23] py-3 px-6 rounded-lg font-semibold transition-colors duration-200">
                Get Started
              </button>
            </div>
          </div>

          {/* Professional Plan - Most Popular */}
          <div className="bg-[#1E2E23] rounded-xl p-8 border-2 border-[#A0C8A9] relative">
            {/* Most Popular Badge */}
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
              <span className="bg-[#A0C8A9] text-[#1E2E23] px-6 py-2 rounded-full text-sm font-semibold">
                Most Popular
              </span>
            </div>

            <div className="text-center">
              <h3 className="text-2xl font-bold text-white mb-2">Professional</h3>
              <p className="text-[#C4CEC1] text-sm mb-6">Most popular choice</p>
              
              <div className="mb-8">
                <span className="text-4xl font-bold text-white">$29</span>
                <span className="text-[#C4CEC1] text-sm ml-2">per month</span>
              </div>

              <ul className="space-y-4 mb-8 text-left">
                <li className="flex items-center text-[#C4CEC1]">
                  <svg className="w-5 h-5 text-[#A0C8A9] mr-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Everything in Starter
                </li>
                <li className="flex items-center text-[#C4CEC1]">
                  <svg className="w-5 h-5 text-[#A0C8A9] mr-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Advanced charting tools
                </li>
                <li className="flex items-center text-[#C4CEC1]">
                  <svg className="w-5 h-5 text-[#A0C8A9] mr-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Priority support
                </li>
                <li className="flex items-center text-[#C4CEC1]">
                  <svg className="w-5 h-5 text-[#A0C8A9] mr-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  API access
                </li>
                <li className="flex items-center text-[#C4CEC1]">
                  <svg className="w-5 h-5 text-[#A0C8A9] mr-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Portfolio optimization
                </li>
              </ul>

              <button className="w-full bg-[#A0C8A9] hover:bg-[#8FB89A] text-[#1E2E23] py-3 px-6 rounded-lg font-semibold transition-colors duration-200">
                Start Free Trial
              </button>
            </div>
          </div>

          {/* Enterprise Plan */}
          <div className="bg-[#1E2E23] rounded-xl p-8 border border-[#A0C8A9]/20 relative">
            <div className="text-center">
              <h3 className="text-2xl font-bold text-white mb-2">Enterprise</h3>
              <p className="text-[#C4CEC1] text-sm mb-6">For large organizations</p>
              
              <div className="mb-8">
                <span className="text-4xl font-bold text-white">$99</span>
                <span className="text-[#C4CEC1] text-sm ml-2">per month</span>
              </div>

              <ul className="space-y-4 mb-8 text-left">
                <li className="flex items-center text-[#C4CEC1]">
                  <svg className="w-5 h-5 text-[#A0C8A9] mr-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Everything in Professional
                </li>
                <li className="flex items-center text-[#C4CEC1]">
                  <svg className="w-5 h-5 text-[#A0C8A9] mr-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Custom integrations
                </li>
                <li className="flex items-center text-[#C4CEC1]">
                  <svg className="w-5 h-5 text-[#A0C8A9] mr-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Dedicated account manager
                </li>
                <li className="flex items-center text-[#C4CEC1]">
                  <svg className="w-5 h-5 text-[#A0C8A9] mr-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  White-label solutions
                </li>
                <li className="flex items-center text-[#C4CEC1]">
                  <svg className="w-5 h-5 text-[#A0C8A9] mr-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Advanced security
                </li>
              </ul>

              <button className="w-full bg-transparent border border-[#A0C8A9] text-[#A0C8A9] hover:bg-[#A0C8A9] hover:text-[#1E2E23] py-3 px-6 rounded-lg font-semibold transition-colors duration-200">
                Contact Sales
              </button>
            </div>
          </div>
        </div>

        {/* Features Guarantee */}
        <div className="text-center">
          <p className="text-[#C4CEC1] text-sm mb-4">Trusted by thousands of traders worldwide</p>
          <div className="flex justify-center space-x-8 text-[#C4CEC1]">
            <div className="flex items-center space-x-2">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="text-sm">SSL Secured</span>
            </div>
            <div className="flex items-center space-x-2">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="text-sm">24/7 Support</span>
            </div>
            <div className="flex items-center space-x-2">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="text-sm">Cancel Anytime</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}