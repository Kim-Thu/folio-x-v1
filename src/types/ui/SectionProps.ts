import type { HTMLAttributes } from 'astro/types';

export type SectionTheme = 'dark' | 'light' | 'accent' | 'none';
export type SectionVariant = 'default' | 'hero' | 'callout' | 'state' | 'closing' | 'content';

export interface SectionVariantConfig {
  theme: SectionTheme;
  spacing: boolean;
  trackProgress: boolean;
  classes: string;
}

export interface SectionProps extends Omit<HTMLAttributes<'section'>, 'class' | 'id'> {
  id?: string;
  class?: string;
  variant?: SectionVariant;
  theme?: SectionTheme;
  spacing?: boolean;
  trackProgress?: boolean;
}
