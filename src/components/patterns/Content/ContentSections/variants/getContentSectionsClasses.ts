import type { ContentSectionsTone, ContentSectionsVariant } from '@/types/ui';
import { twJoin } from '@/utils/cn';

const toneClasses: Record<ContentSectionsTone, string> = {
  dark: 'text-on-dark-muted',
  light: 'text-on-light-muted',
};

const variantClasses: Record<ContentSectionsVariant, string> = {
  article: 'leading-8',
  policy: 'leading-7',
};

export function getContentSectionsBodyClasses(tone: ContentSectionsTone, variant: ContentSectionsVariant): string {
  return twJoin('mt-5 space-y-4 text-base', toneClasses[tone], variantClasses[variant]);
}
