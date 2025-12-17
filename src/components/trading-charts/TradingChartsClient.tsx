'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  type CandlestickData,
  type IChartApi,
  type ISeriesApi,
  type UTCTimestamp,
  CandlestickSeries,
  createChart,
} from 'lightweight-charts';

type SymbolOption = 'EURUSD' | 'XAUUSD';

function mulberry32(seed: number) {
  return function () {
    let t = (seed += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function seedFromSymbol(symbol: string) {
  let h = 2166136261;
  for (let i = 0; i < symbol.length; i++) {
    h ^= symbol.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

function generateMockCandles(symbol: SymbolOption, bars = 220): CandlestickData<UTCTimestamp>[] {
  const seed = seedFromSymbol(symbol);
  const rnd = mulberry32(seed);

  const nowSec = Math.floor(Date.now() / 1000);
  const stepSec = 60; // 1 minute bars (good default for a "live" feel)
  const start = nowSec - bars * stepSec;

  const base = symbol === 'EURUSD' ? 1.172 : 4320;
  const vol = symbol === 'EURUSD' ? 0.0015 : 18;

  let lastClose = base;
  const out: CandlestickData<UTCTimestamp>[] = [];

  for (let i = 0; i < bars; i++) {
    const t = (start + i * stepSec) as UTCTimestamp;

    const wave = Math.sin(i / 12) * (vol * 0.35) + Math.sin(i / 37) * (vol * 0.2);
    const noise = (rnd() - 0.5) * vol * 0.35;
    const drift = (rnd() - 0.5) * vol * 0.06;

    const open = lastClose;
    const close = open + wave + noise + drift;
    const high = Math.max(open, close) + rnd() * vol * 0.35;
    const low = Math.min(open, close) - rnd() * vol * 0.35;

    out.push({
      time: t,
      open: Number(open.toFixed(symbol === 'EURUSD' ? 5 : 2)),
      high: Number(high.toFixed(symbol === 'EURUSD' ? 5 : 2)),
      low: Number(low.toFixed(symbol === 'EURUSD' ? 5 : 2)),
      close: Number(close.toFixed(symbol === 'EURUSD' ? 5 : 2)),
    });

    lastClose = close;
  }

  return out;
}

export default function TradingChartsClient() {
  const symbols: SymbolOption[] = useMemo(() => ['EURUSD', 'XAUUSD'], []);
  const [activeSymbol, setActiveSymbol] = useState<SymbolOption>('EURUSD');
  const seriesData = useMemo(() => generateMockCandles(activeSymbol), [activeSymbol]);

  const chartContainerRef = useRef<HTMLDivElement | null>(null);
  const chartRef = useRef<IChartApi | null>(null);
  const candleSeriesRef = useRef<ISeriesApi<'Candlestick'> | null>(null);
  const resizeObserverRef = useRef<ResizeObserver | null>(null);

  useEffect(() => {
    const el = chartContainerRef.current;
    if (!el) return;

    const chart = createChart(el, {
      autoSize: true,
      layout: {
        background: { color: '#0A2E1D' },
        textColor: 'rgba(255,255,255,0.82)',
        fontFamily: 'ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Arial',
      },
      grid: {
        vertLines: { color: 'rgba(160,200,169,0.10)' },
        horzLines: { color: 'rgba(160,200,169,0.10)' },
      },
      rightPriceScale: {
        borderColor: 'rgba(160,200,169,0.22)',
        scaleMargins: { top: 0.18, bottom: 0.12 },
      },
      timeScale: {
        borderColor: 'rgba(160,200,169,0.22)',
        timeVisible: true,
        secondsVisible: false,
        rightOffset: 10,
      },
      crosshair: {
        vertLine: { color: 'rgba(160,200,169,0.35)' },
        horzLine: { color: 'rgba(160,200,169,0.35)' },
      },
      handleScroll: true,
      handleScale: true,
    });

    const candles = chart.addSeries(CandlestickSeries, {
      upColor: '#22c55e',
      downColor: '#ef4444',
      borderUpColor: '#22c55e',
      borderDownColor: '#ef4444',
      wickUpColor: '#22c55e',
      wickDownColor: '#ef4444',
    });

    chartRef.current = chart;
    candleSeriesRef.current = candles;

    // Initial data
    candles.setData(seriesData);
    chart.timeScale().fitContent();

    // Robust resizing (autoSize covers most cases, this covers flexbox edge-cases)
    const ro = new ResizeObserver(() => {
      chart.applyOptions({ width: el.clientWidth, height: el.clientHeight });
    });
    ro.observe(el);
    resizeObserverRef.current = ro;

    return () => {
      resizeObserverRef.current?.disconnect();
      resizeObserverRef.current = null;
      chartRef.current?.remove();
      chartRef.current = null;
      candleSeriesRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const candles = candleSeriesRef.current;
    const chart = chartRef.current;
    if (!candles || !chart) return;

    candles.setData(seriesData);
    chart.timeScale().fitContent();
  }, [seriesData]);

  return (
    <div className="w-full">
      <div className="flex flex-col lg:flex-row gap-4">
        <aside className="lg:w-64">
          <div className="rounded-xl border border-[#A0C8A9]/15 bg-[#1E2E23] p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="text-white font-semibold tracking-wide">Symbols</div>
              <div className="text-xs text-white/60">View-only</div>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-1 gap-2">
              {symbols.map((s) => {
                const isActive = s === activeSymbol;
                return (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setActiveSymbol(s)}
                    className={[
                      'rounded-lg px-3 py-2 text-left transition-colors border',
                      isActive
                        ? 'bg-[#A0C8A9] text-[#0A2E1D] border-[#A0C8A9]'
                        : 'bg-transparent text-white/85 border-white/10 hover:border-[#A0C8A9]/40 hover:bg-white/5',
                    ].join(' ')}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-semibold">{s}</span>
                      {isActive ? <span className="text-xs font-semibold">Active</span> : null}
                    </div>
                    <div className="text-xs opacity-80 mt-0.5">
                      {s === 'EURUSD' ? 'Euro / U.S. Dollar' : 'Gold / U.S. Dollar'}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </aside>

        <main className="flex-1">
          <div className="rounded-xl border border-[#A0C8A9]/15 bg-[#1E2E23] p-3 lg:p-4">
            <div className="flex items-center justify-between gap-4 px-1 pb-3">
              <div className="min-w-0">
                <div className="text-white font-semibold">{activeSymbol}</div>
                <div className="text-xs text-white/60 truncate">
                  Candlestick chart • right price scale • bottom time scale
                </div>
              </div>
              <div className="text-xs text-white/60">Mock data</div>
            </div>

            <div
              ref={chartContainerRef}
              className="h-[520px] md:h-[620px] w-full rounded-lg overflow-hidden"
              style={{ background: '#0A2E1D' }}
            />
          </div>
        </main>
      </div>
    </div>
  );
}


