'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

import { NavItem } from '@/types';

const navItems: NavItem[] = [
  { label: 'Home', href: '/' },
  { label: 'Features', href: '/features' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'Contact', href: '/contact' },
];

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav 
      className="sticky top-0 z-50"
      style={{ 
        backgroundColor: '#0A2E1D',
        height: '65px',
        borderBottom: '1px solid rgba(160, 200, 169, 0.2)',
        backdropFilter: 'blur(4px)'
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
        <div className="flex justify-between items-center h-full">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center">
              <Image
                src="/logo/raz-capitals-logo.png"
                alt="Raz Capitals"
                width={170}
                height={63}
                priority
                className="h-12 w-auto"
              />
              <span className="sr-only">Raz Capitals</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center">
            <div className="ml-10 flex items-center space-x-8">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-white hover:text-[#A0C8A9] px-3 py-2 text-sm font-medium transition-colors duration-200 flex items-center"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Desktop CTA Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Link
              href="/signin"
              className="text-white hover:text-[#A0C8A9] px-3 py-2 text-sm font-medium transition-colors duration-200 flex items-center"
            >
              Sign In
            </Link>
            <Link
              href="/get-started"
              className="bg-[#A0C8A9] hover:bg-[#8FB89A] text-[#1E2E23] px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 flex items-center"
            >
              Get Started
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-white hover:text-[#A0C8A9] focus:outline-none focus:text-[#A0C8A9] flex items-center"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="md:hidden" style={{ backgroundColor: '#1E2E23' }}>
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 border-t" style={{ borderColor: 'rgba(160, 200, 169, 0.2)' }}>
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-white hover:text-[#A0C8A9] block px-3 py-2 text-base font-medium transition-colors duration-200"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <div className="pt-4 pb-3 border-t" style={{ borderColor: 'rgba(160, 200, 169, 0.2)' }}>
              <Link
                href="/signin"
                className="text-white hover:text-[#A0C8A9] block px-3 py-2 text-base font-medium transition-colors duration-200"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Sign In
              </Link>
              <Link
                href="/get-started"
                className="bg-[#A0C8A9] hover:bg-[#8FB89A] text-[#1E2E23] block mt-2 px-3 py-2 rounded-lg text-base font-medium transition-colors duration-200"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
} 