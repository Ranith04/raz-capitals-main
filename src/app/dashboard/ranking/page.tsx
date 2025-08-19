import { Metadata } from 'next';
import RankingBadgeClient from './RankingBadgeClient';

export const metadata: Metadata = {
  title: 'All The Badges - RAZ CAPITALS',
  description: 'View your ranking badges and achievements',
};

export default function RankingBadgePage() {
  return <RankingBadgeClient />;
}
