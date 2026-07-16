import type { HTMLAttributes } from 'astro/types';
import type { ButtonCommonProps } from '@/types/ui/ButtonCommonProps';

export interface ButtonAnchorProps extends ButtonCommonProps, Omit<HTMLAttributes<'a'>, 'aria-label' | 'class' | 'href' | 'type'> {
  href: string;
  type?: never;
}
