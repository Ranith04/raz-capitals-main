import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Features - RAZ CAPITALS',
  description: 'Discover why thousands of traders choose our platform for their gold and precious metals trading. Experience cutting-edge technology designed for success.',
}

export default function FeaturesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
