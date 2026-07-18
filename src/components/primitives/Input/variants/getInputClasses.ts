import type { InputVariant } from '@/types/ui';
import { cn } from '@/utils/cn';

const variantClasses: Record<InputVariant, string> = {
  default: 'w-full bg-transparent px-md py-sm text-sm text-on-dark outline-none placeholder:text-on-dark-faint',
  hidden: 'hidden',
};

export const getInputClasses = (variant: InputVariant, className: string): string =>
  cn(variantClasses[variant], className);
