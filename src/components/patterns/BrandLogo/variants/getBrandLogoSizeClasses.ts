import type { BrandLogoSize } from '@/types/branding';

const imageSizeClasses: Record<BrandLogoSize, string> = {
  sm: 'h-6 w-auto',
  md: 'h-8 w-auto',
  lg: 'h-10 w-auto',
};

const markSizeClasses: Record<BrandLogoSize, string> = {
  sm: 'size-6 text-caption',
  md: 'size-8 text-label',
  lg: 'size-10 text-sm',
};

const labelSizeClasses: Record<BrandLogoSize, string> = {
  sm: 'text-xs',
  md: 'text-sm',
  lg: 'text-base',
};

export function getBrandLogoImageSizeClass(size: BrandLogoSize): string {
  return imageSizeClasses[size];
}

export function getBrandLogoMarkSizeClass(size: BrandLogoSize): string {
  return markSizeClasses[size];
}

export function getBrandLogoLabelSizeClass(size: BrandLogoSize): string {
  return labelSizeClasses[size];
}
