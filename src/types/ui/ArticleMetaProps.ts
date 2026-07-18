export type ArticleMetaTone = 'dark' | 'light';
export type ArticleMetaSize = 'caption' | 'label';

export interface ArticleMetaProps {
  category: string;
  categoryHref: string;
  detail: string;
  dateTime?: string;
  tone?: ArticleMetaTone;
  size?: ArticleMetaSize;
  class?: string;
}
