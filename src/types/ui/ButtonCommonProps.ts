import type { IconName } from '@/types/ui/IconName';

export type ButtonIconPosition = 'start' | 'end';
export type ButtonSize = 'sm' | 'md' | 'lg';
export type ButtonTone = 'dark' | 'light';
export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'text';

export interface ButtonCommonProps {
  label: string;
  icon?: IconName;
  iconOnly?: boolean;
  iconPosition?: ButtonIconPosition;
  variant?: ButtonVariant;
  size?: ButtonSize;
  tone?: ButtonTone;
  class?: string;
  ariaLabel?: string;
}
