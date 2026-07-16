interface CardItemBaseProps {
  class?: string;
  linkClass?: string;
  reveal?: boolean;
  variant?: 'surface' | 'plain';
}

export interface LinkedCardItemProps extends CardItemBaseProps {
  href: string;
  ariaLabel: string;
}

export interface ContentCardItemProps extends CardItemBaseProps {
  href?: never;
  ariaLabel?: never;
}

export type CardItemProps = LinkedCardItemProps | ContentCardItemProps;
