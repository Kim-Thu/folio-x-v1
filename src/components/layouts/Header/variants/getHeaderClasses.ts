import { twJoin } from '@/utils/cn';

export function getHeaderClasses(solid: boolean): string {
  return twJoin(
    'fixed inset-x-0 top-0 z-40 border-b-hairline border-transparent transition-all duration-(--duration-interaction)',
    solid && 'bg-surface-dark/80',
  );
}

export function getHeaderContainerClasses(): string {
  return 'relative z-50 flex items-center justify-between py-md md:py-lg';
}
