import AuthShell from '@/components/AuthShell';
import SignUpStepSix from '@/components/SignUpStepSix';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sign Up - Step 7 - RAZ CAPITALS',
  description: 'Complete your RAZ CAPITALS account registration with digital signature.',
};

export default function SignUpStepSevenPage() {
  return (
    <AuthShell>
      <SignUpStepSix />
    </AuthShell>
  );
}
