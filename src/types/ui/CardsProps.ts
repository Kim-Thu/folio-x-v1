import type { HTMLAttributes } from 'astro/types';

export interface CardsProps extends Omit<HTMLAttributes<'div'>, 'class'> {
  class?: string;
}
