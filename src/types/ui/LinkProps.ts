import type { HTMLAttributes } from 'astro/types';

export interface LinkProps extends Omit<HTMLAttributes<'a'>, 'class' | 'href'> {
  href: string;
  class?: string;
  ariaLabel?: string;
}
