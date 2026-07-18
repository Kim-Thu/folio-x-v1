import type { BrandLogoVariant } from '@/types/branding';

const fallbackToneClasses: Record<BrandLogoVariant, string> = {
  default: '',
  light: 'brightness-0 invert',
  dark: 'brightness-0',
};

export function getBrandLogoImageClasses(variant: BrandLogoVariant, usesFallbackAsset: boolean): string {
  return usesFallbackAsset ? fallbackToneClasses[variant] : '';
}
