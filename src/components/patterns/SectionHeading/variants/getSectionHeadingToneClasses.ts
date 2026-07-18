import type { SectionHeadingTone, SectionHeadingToneClasses } from '@/types/ui';

const toneClasses: Record<SectionHeadingTone, SectionHeadingToneClasses> = {
  dark: { kicker: 'text-on-dark-muted', description: 'text-on-dark-muted' },
  light: { kicker: 'text-on-light-muted', description: 'text-on-light-muted' },
};

export function getSectionHeadingToneClasses(tone: SectionHeadingTone): SectionHeadingToneClasses {
  return toneClasses[tone];
}
