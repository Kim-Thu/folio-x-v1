import type { HeaderContactVariant } from '@/types/layout';

const headerContactClasses: Record<HeaderContactVariant, string> = {
  bar: 'hidden text-xs font-semibold uppercase tracking-contact md:inline-flex',
  menu: 'text-sm text-brand',
};

export const getHeaderContactClasses = (variant: HeaderContactVariant): string => headerContactClasses[variant];
