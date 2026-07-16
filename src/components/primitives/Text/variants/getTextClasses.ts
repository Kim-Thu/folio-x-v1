import type { TextSize, TextVariant } from '@/types/ui';
import { twJoin } from '@/utils/cn';

const variantClasses: Record<TextVariant, string> = {
  body: '',
  meta: 'font-mono uppercase',
  eyebrow: 'font-mono uppercase tracking-eyebrow text-label',
  heading: 'font-semibold text-balance',
};

const sizeClasses: Record<TextSize, string> = {
  inherit: '',
  caption: 'text-caption',
  label: 'text-label',
  sm: 'text-sm',
  base: 'text-base',
  lg: 'text-lg',
  h3: 'text-h3',
  h2: 'text-h2',
  h1: 'text-h1',
  display: 'text-display',
};

export function getTextClasses(variant: TextVariant, size: TextSize): string {
  return twJoin(variantClasses[variant], sizeClasses[size]);
}
