export type BrandLogoVariant = 'default' | 'light' | 'dark';
export type BrandLogoSize = 'sm' | 'md' | 'lg';

export interface BrandLogoProps {
  class?: string;
  size?: BrandLogoSize;
  variant?: BrandLogoVariant;
}
