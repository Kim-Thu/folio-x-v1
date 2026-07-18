import type { ArticleMetaSize, ArticleMetaTone } from '@/types/ui';
import { cn } from '@/utils/cn';

const toneClasses: Record<ArticleMetaTone, string> = {
  dark: 'text-on-dark-subtle',
  light: 'text-on-light-subtle',
};

const categoryHoverClasses: Record<ArticleMetaTone, string> = {
  dark: 'hover:text-on-dark',
  light: 'hover:text-on-light',
};

const sizeClasses: Record<ArticleMetaSize, string> = {
  caption: 'text-caption',
  label: 'text-label',
};

export const getArticleMetaClasses = (tone: ArticleMetaTone, size: ArticleMetaSize, className: string): string =>
  cn('flex flex-wrap items-center gap-xs font-mono uppercase tracking-meta', toneClasses[tone], sizeClasses[size], className);

export const getArticleMetaCategoryClasses = (tone: ArticleMetaTone): string =>
  cn('transition-colors', categoryHoverClasses[tone]);
