import { Metadata } from 'next';
import WalletsClient from './WalletsClient';

export const metadata: Metadata = {
  title: 'Account Details - RAZ CAPITALS',
  description: 'View your account details and manage your trading accounts.',
};

export default function WalletsPage() {
  return <WalletsClient />;
}
