import { responsiveImageQuality, responsiveImageWidths } from '@/config/media';
import type { ImageVariant, ResponsiveImageAttributes } from '@/types/ui';

const imageSizes: Record<ImageVariant, string> = {
  default: '100vw',
  cover: '100vw',
  editorial: '100vw',
  fillCover: '(min-width: 64rem) 33vw, 100vw',
  interactiveCover: '(min-width: 64rem) 50vw, 100vw',
  interactiveFillCover: '(min-width: 64rem) 50vw, 100vw',
  hero: '100vw',
  natural: '(min-width: 80rem) 16rem, 12rem',
};

function isUnsplashImage(url: URL): boolean {
  return url.hostname === 'images.unsplash.com';
}

function buildUnsplashSource(url: URL, width: number): string {
  const source = new URL(url);
  source.searchParams.set('auto', 'format');
  source.searchParams.set('fit', 'crop');
  source.searchParams.set('w', String(width));
  source.searchParams.set('q', String(responsiveImageQuality));
  return source.toString();
}

export function getResponsiveImageAttributes(src: string, variant: ImageVariant): ResponsiveImageAttributes {
  let sourceUrl: URL;

  try {
    sourceUrl = new URL(src);
  } catch {
    return { src };
  }

  if (!isUnsplashImage(sourceUrl)) return { src };

  const fallbackWidth = variant === 'hero' || variant === 'editorial' ? 1200 : 960;
  const srcset = responsiveImageWidths
    .map((width) => `${buildUnsplashSource(sourceUrl, width)} ${width}w`)
    .join(', ');

  return {
    src: buildUnsplashSource(sourceUrl, fallbackWidth),
    srcset,
    sizes: imageSizes[variant],
  };
}
