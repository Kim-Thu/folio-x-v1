import type { HTMLAttributes } from 'astro/types';

export type CTextElement = 'p' | 'span' | 'small';
export type CTextVariant =
  | 'inherit'
  | 'body'
  | 'body-responsive'
  | 'body-sm'
  | 'caption'
  | 'label'
  | 'lead'
  | 'price'
  | 'price-display'
  | 'price-old'
  | 'reader'
  | 'reader-emphasis'
  | 'reader-separator';
export type CTextTone =
  | 'brand'
  | 'inherit'
  | 'muted'
  | 'subtle'
  | 'on-dark'
  | 'on-dark-muted'
  | 'on-dark-subtle';

export interface CTextProps
  extends Omit<HTMLAttributes<'p'>, 'class'> {
  as?: CTextElement;
  class?: string;
  variant?: CTextVariant;
  tone?: CTextTone;
}
