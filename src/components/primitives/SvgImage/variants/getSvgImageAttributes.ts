import type { SvgImageVariant } from '@/types/ui';

export interface SvgImageAttributes {
  x: string | number;
  y: string | number;
  width: string | number;
  height: string | number;
  preserveAspectRatio: string;
}

const variantAttributes: Record<SvgImageVariant, SvgImageAttributes> = {
  default: {
    x: 0,
    y: 0,
    width: '100%',
    height: '100%',
    preserveAspectRatio: 'xMidYMid meet',
  },
  profilePortrait: {
    x: '30%',
    y: '5%',
    width: '40%',
    height: '95%',
    preserveAspectRatio: 'xMidYMax meet',
  },
};

export function getSvgImageAttributes(variant: SvgImageVariant): SvgImageAttributes {
  return variantAttributes[variant];
}
