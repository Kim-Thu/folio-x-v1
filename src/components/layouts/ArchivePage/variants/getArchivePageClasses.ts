import type { ArchivePageListVariant, ArchivePageTheme } from '@/types/ui';

const themeClasses = {
  dark: {
    main: 'bg-surface-dark text-on-dark',
    border: 'border-line-dark',
    eyebrow: 'text-brand',
    description: 'text-on-dark-muted',
    empty: 'text-on-dark-muted',
  },
  light: {
    main: 'bg-surface-light text-on-light',
    border: 'border-line-light',
    eyebrow: 'text-on-light-muted',
    description: 'text-on-light-muted',
    empty: 'text-on-light-muted',
  },
} satisfies Record<ArchivePageTheme, Record<string, string>>;

const listClasses: Record<ArchivePageListVariant, string> = {
  grid: 'mt-8',
  stack: 'mt-12 grid gap-lg',
};

export function getArchivePageThemeClasses(theme: ArchivePageTheme) {
  return themeClasses[theme];
}

export function getArchivePageListClasses(variant: ArchivePageListVariant): string {
  return listClasses[variant];
}
