import type { HTMLAttributes } from 'astro/types';

export interface SectionProps extends Omit<HTMLAttributes<'section'>, 'class' | 'id'> {
  id?: string;
  class?: string;
  theme?: 'dark' | 'light' | 'accent' | 'none';
  spacing?: boolean;
}
