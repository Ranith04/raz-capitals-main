// TEMPORARILY DISABLED - Wallets page removed from dashboard
// import { Metadata } from 'next';
// import WalletsClient from './WalletsClient';

// export const metadata: Metadata = {
//   title: 'Account Details - RAZ CAPITALS',
//   description: 'View your account details and manage your trading accounts.',
// };

// export default function WalletsPage() {
//   return <WalletsClient />;
// }

import { redirect } from 'next/navigation';

export default function WalletsPage() {
  // Redirect to dashboard instead
  redirect('/dashboard');
}
