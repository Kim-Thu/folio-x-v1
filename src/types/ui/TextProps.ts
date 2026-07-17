export type TextElement = 'p' | 'span' | 'h1' | 'h2' | 'h3' | 'h4';
export type TextVariant = 'body' | 'meta' | 'eyebrow' | 'heading';
export type TextSize = 'inherit' | 'caption' | 'label' | 'sm' | 'base' | 'lg' | 'h3' | 'h2' | 'h1' | 'display';

export interface TextProps extends Omit<HTMLAttributes<'p'>, 'class'> {
  as?: TextElement;
  variant?: TextVariant;
  size?: TextSize;
  class?: string;
}
import type { HTMLAttributes } from 'astro/types';
