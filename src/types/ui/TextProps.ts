export type TextElement = 'p' | 'span' | 'h1' | 'h2' | 'h3' | 'h4';
export type TextVariant = 'body' | 'meta' | 'eyebrow' | 'heading';
export type TextSize = 'inherit' | 'caption' | 'label' | 'sm' | 'base' | 'lg' | 'h3' | 'h2' | 'h1' | 'display';

export interface TextProps {
  as?: TextElement;
  variant?: TextVariant;
  size?: TextSize;
  class?: string;
  id?: string;
}
