export type CRatingStyle = "compact" | "filter" | "score" | "stars";

export interface CRatingSlots {
  control: boolean;
  count: boolean;
  maximum: boolean;
  stars: boolean;
  value: boolean;
}

export type CRatingSlotOptions = Partial<CRatingSlots>;

export interface CRatingProps {
  checked?: boolean;
  class?: string;
  count?: number;
  label?: string;
  maximum?: number;
  name?: string;
  slots?: CRatingSlotOptions;
  style?: CRatingStyle;
  value: number;
}
