import type { HTMLAttributes } from 'astro/types';

export type CHeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;

export type CHeadingVariant =
  | 'display-1'
  | 'display-2'
  | 'display-3'
  | 'page-title'
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'h6'
  | 'footer';

export type CHeadingTransform = 'none' | 'uppercase';

export interface CHeadingProps extends Omit<HTMLAttributes<'h1'>, 'class'> {
  accent?: string;
  class?: string;
  level: CHeadingLevel;
  lines?: readonly string[];
  transform?: CHeadingTransform;
  variant?: CHeadingVariant;
}
