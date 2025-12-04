// TEMPORARILY DISABLED - New Account page removed from dashboard
// import { Metadata } from 'next';
// import NewAccountClient from './NewAccountClient';

// export const metadata: Metadata = {
//   title: 'New Account - RAZ CAPITALS',
//   description: 'Create a new trading account to start your investment journey.',
// };

// export default function NewAccountPage() {
//   return <NewAccountClient />;
// }

import { redirect } from 'next/navigation';

export default function NewAccountPage() {
  // Redirect to my-accounts page instead
  redirect('/dashboard/my-accounts');
}
