import type { ImageDimensions, ImageVariant } from '@/types/ui';

export const responsiveImageWidths = [320, 480, 640, 768, 960, 1200, 1600] as const;

export const responsiveImageQuality = 76;

export const imageDimensions: Partial<Record<ImageVariant, ImageDimensions>> = {
  cover: { width: 1600, height: 1000 },
  editorial: { width: 1600, height: 1000 },
  fillCover: { width: 1600, height: 1000 },
  interactiveCover: { width: 1600, height: 1000 },
  interactiveFillCover: { width: 1600, height: 1000 },
  hero: { width: 1600, height: 2399 },
  natural: { width: 640, height: 400 },
};
