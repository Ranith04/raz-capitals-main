import AuthShell from '@/components/AuthShell';
import SignUpStepTwo from '@/components/SignUpStepTwo';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sign Up - Step 2 - RAZ CAPITALS',
  description: 'Complete your RAZ CAPITALS account registration with your personal details.',
};

export default function SignUpStepTwoPage() {
  return (
    <AuthShell>
      <SignUpStepTwo />
    </AuthShell>
  );
}
