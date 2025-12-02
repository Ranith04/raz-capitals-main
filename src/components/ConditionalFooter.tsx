'use client';

import { usePathname } from 'next/navigation';
import Footer from './Footer';

export default function ConditionalFooter() {
  const pathname = usePathname();
  
  // Don't show footer on sign-in and sign-up pages
  if (pathname === '/signin' || pathname === '/signup' || pathname === '/signup/step-2' || pathname === '/signup/step-3' || pathname === '/signup/step-4' || pathname === '/signup/step-5' || pathname === '/signup/step-6' || pathname === '/signup/step-7' || pathname === '/signup/step-8' || pathname === '/signup/final-step') {
    return null;
  }
  
  return <Footer />;
}
