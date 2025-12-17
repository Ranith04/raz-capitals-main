/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import React, { useEffect, useMemo, useRef } from 'react';

declare global {
  interface Window {
    TradingView?: any;
  }
}

let tradingViewScriptPromise: Promise<void> | null = null;

function loadTradingViewScript(): Promise<void> {
  if (tradingViewScriptPromise) return tradingViewScriptPromise;

  tradingViewScriptPromise = new Promise((resolve, reject) => {
    if (typeof window === 'undefined') return resolve();
    if (window.TradingView) return resolve();

    const existing = document.querySelector<HTMLScriptElement>('script[data-tradingview="tv.js"]');
    if (existing) {
      existing.addEventListener('load', () => resolve());
      existing.addEventListener('error', () => reject(new Error('Failed to load TradingView script')));
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://s3.tradingview.com/tv.js';
    script.async = true;
    script.defer = true;
    script.dataset.tradingview = 'tv.js';
    script.onload = () => resolve();
    script.onerror = () => reject(new Error('Failed to load TradingView script'));
    document.head.appendChild(script);
  });

  return tradingViewScriptPromise;
}

export type TradingViewLiveChartProps = {
  symbol: string;
  interval?: string;
  timezone?: string;
  locale?: string;
};

export default function TradingViewLiveChart({
  symbol,
  interval = '60',
  timezone = 'Etc/UTC',
  locale = 'en',
}: TradingViewLiveChartProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const widgetId = useMemo(
    () => `tv_${Math.random().toString(36).slice(2)}_${Date.now().toString(36)}`,
    [],
  );

  useEffect(() => {
    let cancelled = false;

    async function mount() {
      await loadTradingViewScript();
      if (cancelled) return;

      const el = containerRef.current;
      if (!el) return;

      // Reset container on symbol/interval changes
      el.innerHTML = '';

      if (!window.TradingView?.widget) {
        // tv.js loaded but widget API missing (blocked by CSP/adblock/etc.)
        return;
      }

      new window.TradingView.widget({
        autosize: true,
        symbol,
        interval,
        timezone,
        locale,
        theme: 'dark',
        style: '1',
        container_id: widgetId,
        enable_publishing: false,
        hide_legend: false,
        withdateranges: true,
        allow_symbol_change: true,
        save_image: false,
        calendar: false,
        studies: [],
      });
    }

    mount().catch(() => {
      // silent fail; container will remain blank
    });

    return () => {
      cancelled = true;
    };
  }, [symbol, interval, timezone, locale, widgetId]);

  return <div ref={containerRef} id={widgetId} className="h-full w-full" />;
}


