import type { ImageVariant } from '@/types/ui';
import { twJoin } from '@/utils/cn';

const variantClasses: Record<ImageVariant, string> = {
  default: '',
  cover: 'size-full object-cover',
  editorial: 'aspect-editorial w-full object-cover',
  fillCover: 'absolute inset-0 size-full object-cover',
  interactiveCover: 'size-full object-cover transition-transform duration-reveal group-hover:scale-media group-hover/card:scale-media',
  interactiveFillCover: 'absolute inset-0 size-full object-cover transition-transform duration-reveal group-hover:scale-media',
  hero: 'absolute inset-0 size-full object-cover object-hero opacity-70 saturate-hero sm:object-center',
  natural: 'block h-auto w-full',
};

export function getImageClasses(variant: ImageVariant, className: string): string {
  return twJoin('bg-skeleton bg-skeleton-size', variantClasses[variant], className);
}
