import { twJoin } from '@/utils/cn';
import { getRevealClasses } from '@/components/patterns/Feedback/variants/getRevealClasses';

export function getCardItemClasses(reveal: boolean): string {
  return twJoin(reveal && getRevealClasses());
}

const linkVariantClasses = {
  surface: 'overflow-hidden rounded-card border-hairline border-line-dark bg-surface-dark transition-colors hover:bg-surface-hover',
  plain: '',
};

export function getCardItemLinkClasses(variant: keyof typeof linkVariantClasses): string {
  return linkVariantClasses[variant];
}
