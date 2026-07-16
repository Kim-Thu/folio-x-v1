import type { SectionProps } from '@/types/ui';
import { twJoin } from '@/utils/cn';

type SectionTheme = NonNullable<SectionProps['theme']>;

const themeClasses: Record<SectionTheme, string> = {
  dark: 'bg-surface-dark',
  light: 'bg-surface-light text-on-light',
  accent: 'bg-brand text-on-brand',
  none: '',
};

export function getSectionClasses(theme: SectionTheme, spacing: boolean): string {
  return twJoin(
    'scroll-mt-20 md:scroll-mt-24',
    spacing && 'py-3xl md:py-5xl lg:py-6xl',
    themeClasses[theme],
  );
}
