import SignInForm from '@/components/SignInForm';
import AuthShell from '@/components/AuthShell';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sign In - RAZ CAPITALS',
  description:
    'Sign in to your secure RAZ CAPITALS account to access your trading dashboard and investment portfolio.',
};

export default function SignInPage() {
  return (
    <AuthShell>
      <SignInForm />
    </AuthShell>
  );
}
