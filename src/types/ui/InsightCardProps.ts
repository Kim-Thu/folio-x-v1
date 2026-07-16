import type { Insight } from '../content/Insight';

export interface InsightCardProps {
  insight: Insight;
  variant?: 'featured' | 'compact';
  featuredLabel?: string;
  featuredImageAlt?: string;
}
