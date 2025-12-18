export const dynamic = 'force-dynamic';

type StooqQuote = {
  symbol: string;
  date: string;
  time: string;
  open: number | null;
  high: number | null;
  low: number | null;
  close: number | null;
};

function toNumber(value: string | undefined): number | null {
  if (!value) return null;
  const n = Number(value);
  return Number.isFinite(n) ? n : null;
}

function parseStooqQuoteCsv(csv: string): StooqQuote | null {
  const lines = csv
    .split(/\r?\n/)
    .map((l) => l.trim())
    .filter(Boolean);

  if (lines.length < 2) return null;

  // Symbol,Date,Time,Open,High,Low,Close,Volume
  const cols = lines[1].split(',');
  if (cols.length < 7) return null;

  return {
    symbol: cols[0] ?? 'XAUUSD',
    date: cols[1] ?? '',
    time: cols[2] ?? '',
    open: toNumber(cols[3]),
    high: toNumber(cols[4]),
    low: toNumber(cols[5]),
    close: toNumber(cols[6]),
  };
}

export async function GET() {
  const url = 'https://stooq.com/q/l/?s=xauusd&f=sd2t2ohlcv&h&e=csv';

  const res = await fetch(url, {
    // Avoid caching so users see fresh data.
    cache: 'no-store',
    headers: {
      'User-Agent': 'raz-capitals/1.0 (nextjs)',
      Accept: 'text/csv,*/*',
    },
  });

  if (!res.ok) {
    return Response.json(
      { ok: false, error: `Upstream request failed (${res.status})` },
      { status: 502, headers: { 'Cache-Control': 'no-store' } },
    );
  }

  const csv = await res.text();
  const quote = parseStooqQuoteCsv(csv);

  if (!quote?.close) {
    return Response.json(
      { ok: false, error: 'Failed to parse XAUUSD quote' },
      { status: 502, headers: { 'Cache-Control': 'no-store' } },
    );
  }

  const asOf = quote.date && quote.time ? `${quote.date}T${quote.time}Z` : new Date().toISOString();

  return Response.json(
    {
      ok: true,
      symbol: 'XAUUSD',
      price: quote.close,
      asOf,
    },
    { headers: { 'Cache-Control': 'no-store' } },
  );
}


