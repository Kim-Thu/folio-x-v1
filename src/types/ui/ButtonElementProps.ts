import type { HTMLAttributes } from 'astro/types';
import type { ButtonCommonProps } from './ButtonCommonProps';

export interface ButtonElementProps extends ButtonCommonProps, Omit<HTMLAttributes<'button'>, 'aria-label' | 'class'> {
  href?: never;
}
