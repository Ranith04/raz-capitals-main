import { Metadata } from 'next';
import WithdrawClient from './WithdrawClient';

export const metadata: Metadata = {
  title: 'Withdraw - RAZ CAPITALS',
  description: 'Withdraw your funds securely from your trading account.',
};

export default function WithdrawPage() {
  return <WithdrawClient />;
}
