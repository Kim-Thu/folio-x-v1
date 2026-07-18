import type { ContentSectionsTone, DetailPageToneClasses } from '@/types/ui';

const toneClasses: Record<ContentSectionsTone, DetailPageToneClasses> = {
  dark: {
    main: 'bg-surface-dark pb-3xl pt-6xl text-on-dark md:pb-5xl lg:pb-6xl',
  },
  light: {
    main: 'bg-surface-light pb-3xl pt-6xl text-on-light md:pb-5xl lg:pb-6xl',
  },
};

export const getDetailPageClasses = (tone: ContentSectionsTone): DetailPageToneClasses => toneClasses[tone];
