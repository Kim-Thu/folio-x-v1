export type SvgImageVariant = 'default' | 'profilePortrait';

export interface SvgImageProps {
  src: string;
  variant?: SvgImageVariant;
  class?: string;
  x?: string | number;
  y?: string | number;
  width?: string | number;
  height?: string | number;
  preserveAspectRatio?: string;
}
