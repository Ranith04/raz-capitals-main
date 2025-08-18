import ConditionalFooter from '@/components/ConditionalFooter'
import '@/styles/globals.css'
import '@/styles/variables.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'RAZ CAPITALS - Boost Your Earnings',
  description: 'Your all-in-one hub for trading, selling, and expanding your investment portfolio with advanced tools and real-time insights.',
  keywords: 'trading, investment, portfolio, forex, crypto, stocks, financial platform',
  authors: [{ name: 'RAZ CAPITALS' }],
  viewport: 'width=device-width, initial-scale=1',
  robots: 'index, follow',
  openGraph: {
    title: 'RAZ CAPITALS - Boost Your Earnings',
    description: 'Your all-in-one hub for trading, selling, and expanding your investment portfolio with advanced tools and real-time insights.',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'RAZ CAPITALS - Boost Your Earnings',
    description: 'Your all-in-one hub for trading, selling, and expanding your investment portfolio with advanced tools and real-time insights.',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="min-h-screen flex flex-col">
          <main className="flex-grow">
            {children}
          </main>
          <ConditionalFooter />
        </div>
      </body>
    </html>
  )
} 