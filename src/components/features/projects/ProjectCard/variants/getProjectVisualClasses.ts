import { twJoin } from '@/utils/cn';

export function getProjectVisualClasses(reverse: boolean): string {
  return twJoin('relative aspect-editorial overflow-hidden lg:col-span-7', reverse && 'lg:order-2');
}
