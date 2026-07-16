import type { Insight } from '@/types/content/Insight';

export interface InsightCardProps {
  insight: Insight;
  variant?: 'featured' | 'compact';
}
