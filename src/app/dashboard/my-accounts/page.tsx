import { Metadata } from 'next';
import MyAccountsClient from './MyAccountsClient';

export const metadata: Metadata = {
  title: 'My Accounts - RAZ CAPITALS',
  description: 'View and manage all your trading accounts and their performance.',
};

export default function MyAccountsPage() {
  return <MyAccountsClient />;
}
