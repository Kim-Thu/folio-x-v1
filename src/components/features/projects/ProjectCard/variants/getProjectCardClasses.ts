import { twJoin } from '@/utils/cn';

export function getProjectCardClasses(reverse: boolean): string {
  return twJoin(
    'group grid lg:grid-cols-12',
    reverse && 'lg:[&>.project-visual]:order-2',
  );
}
