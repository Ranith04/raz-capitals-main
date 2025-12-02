'use client';

import { Statistic } from '@/types';
import Link from 'next/link';

const statistics: Statistic[] = [
  { value: '10K+', label: 'Active Traders' },
  { value: '$2.5B', label: 'Trading Volume' },
  { value: '99.9%', label: 'Uptime' },
];

export default function HeroSection() {
  return (
    <section className="text-white" style={{ background: 'linear-gradient(180deg, #1E2E23 0%, #2A3A2F 100%)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              <span className="text-white">Boost. Your.</span>{' '}
              <span className="text-[#A0C8A9]">Earnings.</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-[#C4CEC1] leading-relaxed">
              Your all-in-one hub for trading, selling, and expanding your investment portfolio with advanced tools and real-time insights.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/signup"
                className="bg-[#A0C8A9] hover:bg-[#8FB89A] text-[#1E2E23] px-8 py-4 rounded-lg text-lg font-semibold transition-colors duration-200 flex items-center justify-center space-x-2"
              >
                <span>Get Started Today</span>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
              
              <button className="border border-[#A0C8A9] text-[#A0C8A9] hover:bg-[#A0C8A9] hover:text-[#1E2E23] px-8 py-4 rounded-lg text-lg font-semibold transition-colors duration-200 flex items-center justify-center space-x-2 bg-transparent">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z"/>
                </svg>
                <span>Watch Demo</span>
              </button>
            </div>

            {/* Statistics */}
            <div className="grid grid-cols-3 gap-8 pt-8">
              {statistics.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-white">
                    {stat.value}
                  </div>
                  <div className="text-sm md:text-base text-[#C4CEC1] mt-1">
                    {stat.label}
                  </div>
                </div>
              ))}
              
            </div>
          </div>

          {/* Right Content - Mobile Mockup */}
          <div className="flex justify-center lg:justify-end">
            <div className="relative">
              {/* Phone body */}
              <div className="relative w-[280px] h-[560px] rounded-[2rem] bg-[#0B1110] p-2.5 shadow-[0_20px_50px_rgba(0,0,0,0.6)] border border-black/40">
                {/* Side buttons */}
                <div className="absolute left-[-3px] top-[80px] w-[3px] h-8 rounded-r bg-black/70" />
                <div className="absolute left-[-3px] top-[120px] w-[3px] h-12 rounded-r bg-black/70" />
                <div className="absolute right-[-3px] top-[105px] w-[3px] h-10 rounded-l bg-black/70" />

                {/* Screen */}
                <div className="relative w-full h-full overflow-hidden rounded-[1.6rem] bg-gradient-to-b from-[#1E2E23] via-[#223427] to-[#2A3A2F]">
                  {/* Notch / speaker */}
                  <div className="absolute left-1/2 -translate-x-1/2 top-1 w-20 h-4 bg-black/40 rounded-b-full" />

                  {/* Status bar */}
                  <div className="flex items-center justify-between px-3 pt-2.5">
                    <div className="text-[#C4CEC1] text-[9px] tracking-wide">7:16</div>
                    <div className="flex items-center gap-1.5 text-[#C4CEC1]">
                      <div className="w-2.5 h-2.5 rounded-full border border-[#C4CEC1]/70" />
                      <div className="w-3.5 h-[8px] border border-[#C4CEC1]/70 rounded-sm" />
                      <div className="w-3.5 h-1.5 bg-[#C4CEC1] rounded-sm" />
                    </div>
                  </div>

                  {/* Header */}
                  <div className="px-3 mt-1.5 flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <div className="w-4 h-4 rounded bg-[#A0C8A9]" />
                      <span className="text-[#E8F2EA] text-[10px] font-semibold">RAS CAPITALS</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-[#E8F2EA]">
                      <div className="w-5 h-5 rounded-full border border-white/30 grid place-items-center">
                        <svg viewBox="0 0 24 24" className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="1.5">
                          <path d="M12 12c2.21 0 4-1.79 4-4S14.21 4 12 4 8 5.79 8 8s1.79 4 4 4Zm0 2c-2.67 0-8 1.34-8 4v1h16v-1c0-2.66-5.33-4-8-4Z" />
                        </svg>
                      </div>
                      <div className="w-5 h-5 rounded-full border border-white/30 grid place-items-center">
                        <svg viewBox="0 0 24 24" className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="1.5">
                          <path d="M18 8a6 6 0 1 0-12 0c0 7-3 7-3 7h18s-3 0-3-7m-6 11a2 2 0 0 0 2-2h-4a2 2 0 0 0 2 2Z" />
                        </svg>
                      </div>
                      <div className="w-5 h-5 rounded-full bg-[#E95959] grid place-items-center text-[9px]">1</div>
                    </div>
                  </div>

                  {/* Title */}
                  <div className="px-3 mt-3">
                    <div className="text-[#E8F2EA] text-[16px] font-semibold">Trade</div>
                    <div className="flex items-center gap-1 text-[#6FE07D] text-[13px] font-semibold">
                      <span>+150.89</span>
                      <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M3 17l6-6 4 4 7-7" />
                      </svg>
                    </div>
                  </div>

                  {/* Stat cards */}
                  <div className="px-3 mt-2.5 grid grid-cols-3 gap-1.5">
                    {[
                      { k: 'Balance', v: '48 261,42' },
                      { k: 'Equity', v: '26 741,97' },
                      { k: 'Credit', v: '255.00' },
                      { k: 'Margin', v: '3 034,17' },
                      { k: 'Free Margin', v: '23 707,80' },
                      { k: 'Margin Level %', v: '881.36' },
                    ].map((c, i) => (
                      <div key={i} className="bg-[#1C2620]/80 rounded-lg border border-white/5 p-1.5">
                        <div className="text-[9px] text-[#C4CEC1]">{c.k}</div>
                        <div className="text-[11px] text-[#E8F2EA] font-semibold">{c.v}</div>
                      </div>
                    ))}
                  </div>

                  {/* Lists */}
                  <div className="px-3 mt-3">
                    <div className="text-[#C4CEC1] text-[10px]">Positions</div>
                    <div className="mt-1.5 space-y-1.5">
                      {Array.from({ length: 4 }).map((_, idx) => (
                        <div key={`pos-${idx}`} className="flex items-center justify-between rounded-lg bg-[#1C2620]/60 p-1.5 pl-2.5 border border-white/5">
                          <div className="flex items-center gap-2.5">
                            <div className="w-0.5 h-6 rounded bg-[#6FE07D]" />
                            <div>
                              <div className="flex items-center gap-1.5 text-[#E8F2EA] text-[11px] font-semibold">
                                <span>TSLA</span>
                                <span className="text-[9px] text-[#C4CEC1] font-normal">buy 0.01</span>
                              </div>
                              <div className="text-[9px] text-[#6FE07D]">1.0436 → 1.0536</div>
                            </div>
                          </div>
                          <div className="text-[#E8F2EA] text-[11px] font-semibold">360.56</div>
                        </div>
                      ))}
                    </div>

                    <div className="mt-2.5 text-[#C4CEC1] text-[10px]">Orders</div>
                    <div className="mt-1.5 space-y-1.5">
                      {Array.from({ length: 3 }).map((_, idx) => (
                        <div key={`ord-${idx}`} className="flex items-center justify-between rounded-lg bg-[#1C2620]/60 p-1.5 pl-2.5 border border-white/5">
                          <div>
                            <div className="flex items-center gap-1.5 text-[#E8F2EA] text-[11px] font-semibold">
                              <span>TSLA</span>
                              <span className="text-[9px] text-[#C4CEC1] font-normal">buy 0.01</span>
                            </div>
                            <div className="text-[9px] text-[#6FE07D]">1.0436/0.00 at 1.3142</div>
                          </div>
                          <div className="text-[10px] text-[#C4CEC1]">placed</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Bottom nav */}
                  <div className="absolute bottom-2.5 left-2.5 right-2.5 rounded-xl bg-[#0B1110]/90 border border-white/10 px-2.5 py-1.5">
                    <div className="grid grid-cols-5 text-[9px] text-[#C4CEC1]">
                      {[{ l: 'Watchlist', p: 'M3 6h18M3 12h18M3 18h18' }, { l: 'Charts', p: 'M4 18l4-4 3 3 7-7' }, { l: 'Trade', p: 'M12 5v14m-7-7h14' }, { l: 'History', p: 'M12 8v4l3 3M21 12a9 9 0 1 1-9-9' }, { l: 'Menu', p: 'M4 6h16M4 12h16M4 18h16' }].map((it, i) => (
                        <div key={i} className="flex flex-col items-center gap-0.5 py-0.5">
                          <svg viewBox="0 0 24 24" className={`w-4 h-4 ${i === 2 ? 'text-[#E8F2EA]' : 'text-[#C4CEC1]'}`} fill="none" stroke="currentColor" strokeWidth="1.8">
                            <path d={it.p} />
                          </svg>
                          <span className={`${i === 2 ? 'text-[#E8F2EA]' : ''}`}>{it.l}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 