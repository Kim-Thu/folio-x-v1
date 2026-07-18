import type { HTMLAttributes } from 'astro/types';

export type InputVariant = 'default' | 'hidden';

export interface InputProps extends Omit<HTMLAttributes<'input'>, 'class'> {
  class?: string;
  variant?: InputVariant;
}
