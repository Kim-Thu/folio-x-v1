import type { ButtonSize, ButtonStyleOptions, ButtonTone, ButtonVariant } from '@/types/ui';
import { twJoin } from '@/utils/cn';

const baseClasses = 'group/button inline-flex cursor-pointer items-center justify-center gap-xs border-hairline border-transparent font-medium leading-none no-underline transition-colors duration-interaction disabled:cursor-not-allowed disabled:opacity-disabled aria-disabled:cursor-not-allowed aria-disabled:opacity-disabled aria-pressed:border-brand aria-pressed:bg-brand aria-pressed:text-on-brand';

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'px-sm py-xs text-xs',
  md: 'px-md py-sm text-sm',
  lg: 'px-lg py-md text-base',
};

const iconSizeClasses: Record<ButtonSize, string> = {
  sm: 'size-control-sm',
  md: 'size-control-md',
  lg: 'size-control-lg',
};

const toneClasses: Record<ButtonTone, Record<Exclude<ButtonVariant, 'primary' | 'text'>, string>> = {
  dark: {
    secondary: 'bg-on-dark text-surface-dark',
    outline: 'border-button-outline bg-button-surface text-on-dark backdrop-blur-button-outline hover:border-brand',
    ghost: 'bg-transparent text-on-dark hover:bg-surface-hover',
  },
  light: {
    secondary: 'bg-on-light text-surface-light',
    outline: 'border-line-light bg-transparent text-on-light hover:border-brand',
    ghost: 'bg-transparent text-on-light hover:bg-surface-hover-light',
  },
};

const variantClasses: Record<Extract<ButtonVariant, 'primary' | 'text'>, string> = {
  primary: 'bg-brand text-on-brand hover:bg-brand-soft',
  text: 'rounded-none border-0 bg-transparent p-0 text-inherit hover:text-brand-soft',
};

export function getButtonClasses({ iconOnly = false, size, tone, variant }: ButtonStyleOptions): string {
  const shapeClasses = variant === 'text' ? '' : 'rounded-full';
  const dimensionClasses = iconOnly ? `${iconSizeClasses[size]} aspect-square p-0` : variant === 'text' ? '' : sizeClasses[size];
  const appearanceClasses = variant === 'primary' || variant === 'text' ? variantClasses[variant] : toneClasses[tone][variant];

  return twJoin(baseClasses, shapeClasses, dimensionClasses, appearanceClasses);
}
