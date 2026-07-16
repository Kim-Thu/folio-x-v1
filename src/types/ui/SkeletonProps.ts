export type SkeletonShape = 'line' | 'block' | 'circle';

export interface SkeletonProps {
  class?: string;
  shape?: SkeletonShape;
}
