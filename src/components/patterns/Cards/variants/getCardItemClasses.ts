import { twJoin } from '@/utils/cn';

const revealClasses = 'translate-y-6 opacity-0 transition duration-(--duration-reveal) ease-reveal data-[visible=true]:translate-y-0 data-[visible=true]:opacity-100 motion-reduce:translate-y-0 motion-reduce:opacity-100';

export function getCardItemClasses(reveal: boolean): string {
  return twJoin(reveal && revealClasses);
}

const linkVariantClasses = {
  surface: 'overflow-hidden rounded-card border-hairline border-line-dark bg-surface-dark transition-colors hover:bg-surface-hover',
  plain: '',
};

export function getCardItemLinkClasses(variant: keyof typeof linkVariantClasses): string {
  return linkVariantClasses[variant];
}
