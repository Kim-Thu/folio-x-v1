import type { HTMLAttributes } from 'astro/types';
import type { ButtonCommonProps } from '@/types/ui/ButtonCommonProps';

export interface ButtonElementProps extends ButtonCommonProps, Omit<HTMLAttributes<'button'>, 'aria-label' | 'class'> {
  href?: never;
}
