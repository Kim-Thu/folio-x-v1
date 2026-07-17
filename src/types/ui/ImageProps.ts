export interface ImageProps {
  src: string;
  alt: string;
  class?: string;
  loading?: 'eager' | 'lazy';
  decoding?: 'sync' | 'async' | 'auto';
  fetchpriority?: 'high' | 'low' | 'auto';
  width?: number;
  height?: number;
  variant?: ImageVariant;
}

export type ImageVariant = 'default' | 'cover' | 'editorial' | 'fillCover' | 'interactiveCover' | 'interactiveFillCover' | 'hero' | 'natural';
