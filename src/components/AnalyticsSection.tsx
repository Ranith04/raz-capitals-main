'use client';

import TradingHistory from './TradingHistory';

export default function AnalyticsSection() {
  return (
    <section className="py-20" style={{backgroundColor: '#F7F7F2'}}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content - Mobile Mockup */}
          <div className="flex justify-center lg:justify-start">
            <TradingHistory />
          </div>

          {/* Right Content - Exact match to the image */}
          <div className="space-y-8">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-[#1A202C] mb-4">
                Advanced Analytics & Insights
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed mb-12">
                Make data-driven decisions with comprehensive analytics, performance tracking, and market intelligence.
              </p>
            </div>

            {/* Numbered Features */}
            <div className="space-y-10">
              <div className="flex items-start gap-6">
                <div className="flex-shrink-0 w-10 h-10 bg-[#4CAF50] rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-lg">1</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-[#1A202C] mb-2">
                    Performance Tracking
                  </h3>
                  <p className="text-gray-600 text-lg">
                    Monitor your portfolio's performance across all timeframes with detailed analytics and insights.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-6">
                <div className="flex-shrink-0 w-10 h-10 bg-[#4CAF50] rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-lg">2</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-[#1A202C] mb-2">
                    Risk Assessment
                  </h3>
                  <p className="text-gray-600 text-lg">
                    Understand and manage your investment risks effectively with advanced risk analysis tools.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-6">
                <div className="flex-shrink-0 w-10 h-10 bg-[#4CAF50] rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-lg">3</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-[#1A202C] mb-2">
                    Market Intelligence
                  </h3>
                  <p className="text-gray-600 text-lg">
                    Stay informed with real-time market insights and trends to make better trading decisions.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 