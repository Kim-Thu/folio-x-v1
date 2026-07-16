import type { SkeletonShape } from '@/types/ui';

const shapeClasses: Record<SkeletonShape, string> = {
  line: 'rounded-full py-2',
  block: 'rounded-card',
  circle: 'aspect-square rounded-full',
};

export function getSkeletonShapeClass(shape: SkeletonShape): string {
  return shapeClasses[shape];
}
