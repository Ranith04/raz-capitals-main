import { Metadata } from 'next';
import TransferClient from './TransferClient';

export const metadata: Metadata = {
  title: 'Transfer - RAZ CAPITALS',
  description: 'Transfer funds between your accounts or to other users.',
};

export default function TransferPage() {
  return <TransferClient />;
}
