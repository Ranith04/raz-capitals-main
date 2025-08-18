import { Metadata } from 'next';
import NewAccountClient from './NewAccountClient';

export const metadata: Metadata = {
  title: 'New Account - RAZ CAPITALS',
  description: 'Create a new trading account to start your investment journey.',
};

export default function NewAccountPage() {
  return <NewAccountClient />;
}
