import AuthShell from '@/components/AuthShell';
import SignUpForm from '@/components/SignUpForm';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sign Up - RAZ CAPITALS',
  description: 'Create your RAZ CAPITALS account to start trading and managing your investment portfolio.',
};

export default function SignUpPage() {
  return (
    <AuthShell>
      <SignUpForm />
    </AuthShell>
  );
}
