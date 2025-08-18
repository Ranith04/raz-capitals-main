import SignInForm from '@/components/SignInForm';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sign In - RAZ CAPITALS',
  description: 'Sign in to your secure RAZ CAPITALS account to access your trading dashboard and investment portfolio.',
};

export default function SignInPage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden" style={{ backgroundColor: '#0A2E1D' }}>
      {/* Background decorative elements */}
      <div className="absolute inset-0">
        {/* Large circles matching the navbar theme */}
        <div className="absolute top-20 left-20 w-32 h-32 rounded-full border" style={{ borderColor: 'rgba(160, 200, 169, 0.3)' }}></div>
        <div className="absolute bottom-20 left-20 w-24 h-24 rounded-full border" style={{ borderColor: 'rgba(160, 200, 169, 0.2)' }}></div>
        <div className="absolute bottom-32 right-32 w-40 h-40 rounded-full border" style={{ borderColor: 'rgba(160, 200, 169, 0.25)' }}></div>
      </div>

      {/* Sign-in form - exact match to the image */}
      <div className="relative z-10 w-full max-w-md">
        <SignInForm />
      </div>
    </div>
  );
}
