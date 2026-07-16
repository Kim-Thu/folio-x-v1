import type { HTMLAttributes } from 'astro/types';
import type { ButtonSize, ButtonTone, ButtonVariant } from './ButtonCommonProps';

export interface IconButtonProps extends Omit<HTMLAttributes<'button'>, 'aria-label' | 'class'> {
  label: string;
  variant?: Exclude<ButtonVariant, 'text'>;
  size?: ButtonSize;
  tone?: ButtonTone;
  class?: string;
}
