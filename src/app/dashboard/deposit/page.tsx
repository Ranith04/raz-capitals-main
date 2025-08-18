import { Metadata } from 'next';
import DepositClient from './DepositClient';

export const metadata: Metadata = {
  title: 'Deposit - RAZ CAPITALS',
  description: 'Deposit funds to your trading account securely and instantly.',
};

export default function DepositPage() {
  return <DepositClient />;
}
