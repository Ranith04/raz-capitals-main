'use client';

import Image from 'next/image';
import Link from 'next/link';
import type { ReactNode } from 'react';

interface AuthShellProps {
  children: ReactNode;
  /**
   * Tailwind max-width class for the main card container.
   * Defaults to `max-w-md` for standard auth forms.
   */
  maxWidthClass?: string;
}

export default function AuthShell({ children, maxWidthClass = 'max-w-md' }: AuthShellProps) {
  return (
    <div className="min-h-screen relative flex items-center justify-center px-4 overflow-hidden bg-[#0A2E1D]">
      {/* Background image + gradient overlay (trading chart style) */}
      <div className="absolute inset-0">
        {/* Trading background image - file at /public/images/background.jpg */}
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: "url('/images/background.jpg')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        {/* Dark green translucent overlay for depth + readability */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#0A2E1D]/90 via-[#0A2E1D]/85 to-[#0A2E1D]/92 backdrop-blur-[1px]" />
      </div>

      {/* Floating circles for subtle depth, matching dashboard theme */}
      <div className="pointer-events-none absolute inset-0">
        <div
          className="absolute top-24 left-20 w-32 h-32 rounded-full border"
          style={{ borderColor: 'rgba(160, 200, 169, 0.18)' }}
        />
        <div
          className="absolute bottom-24 left-32 w-24 h-24 rounded-full border"
          style={{ borderColor: 'rgba(160, 200, 169, 0.14)' }}
        />
        <div
          className="absolute bottom-32 right-32 w-40 h-40 rounded-full border"
          style={{ borderColor: 'rgba(160, 200, 169, 0.18)' }}
        />
      </div>

      {/* Top-left logo, consistent with marketing site */}
      <header className="absolute top-7 left-7 flex items-center gap-3">
        <Link href="/" className="flex items-center gap-3 group" aria-label="Go to RAZ CAPITALS website">
          <Image
            src="/logo/raz-capitals-logo.png"
            alt="RAZ CAPITALS"
            width={240}
            height={90}
            priority
            className="h-14 w-auto drop-shadow-md transition-transform duration-200 group-hover:scale-[1.02] cursor-pointer"
          />
        </Link>
      </header>

      {/* Centered auth card */}
      <main className={`relative z-10 w-full ${maxWidthClass}`}>{children}</main>
    </div>
  );
}


