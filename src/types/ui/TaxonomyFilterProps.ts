import type { TaxonomyTerm } from '@/types/content';
import type { ButtonTone } from '@/types/ui/ButtonCommonProps';

export type TaxonomyFilterVariant = 'buttons' | 'tabs';

export interface TaxonomyFilterBaseProps {
  categories: TaxonomyTerm[];
  allLabel: string;
  label: string;
}

export interface ButtonTaxonomyFilterProps extends TaxonomyFilterBaseProps {
  variant?: 'buttons';
  tone?: ButtonTone;
}

export interface TabTaxonomyFilterProps extends TaxonomyFilterBaseProps {
  variant: 'tabs';
  panelId: string;
}

export type TaxonomyFilterProps = ButtonTaxonomyFilterProps | TabTaxonomyFilterProps;
