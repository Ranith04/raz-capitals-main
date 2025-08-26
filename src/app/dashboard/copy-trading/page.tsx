import { Metadata } from 'next';
import CopyTradingClient from './CopyTradingClient';

export const metadata: Metadata = {
  title: 'Copy Trading - RAZ CAPITALS',
  description: 'Follow and copy successful traders to maximize your profits.',
};

export default function CopyTradingPage() {
  return <CopyTradingClient />;
}
