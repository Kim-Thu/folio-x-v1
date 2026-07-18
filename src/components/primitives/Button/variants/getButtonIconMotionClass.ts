import type { IconName } from '@/types/ui';

const iconMotionClasses: Record<IconName, string> = {
  arrowUpRight: 'group-hover/button:translate-x-1 group-hover/button:-translate-y-1',
  chevronRight: 'group-hover/button:translate-x-1',
  chevronLeft: 'group-hover/button:-translate-x-1',
  arrowLeft: 'group-hover/button:-translate-x-1',
  arrowRight: 'group-hover/button:translate-x-1',
  arrowUp: 'group-hover/button:-translate-y-1',
  lightBulb: '',
  bars3: '',
  xMark: '',
};

export const getButtonIconMotionClass = (icon: IconName): string => iconMotionClasses[icon];
