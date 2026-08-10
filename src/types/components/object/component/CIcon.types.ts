export type CIconName =
  | "arrowLeft"
  | "arrowRight"
  | "arrowUp"
  | "arrowUpRight"
  | "arrowPath"
  | "archiveBox"
  | "bars3"
  | "bolt"
  | "chevronLeft"
  | "chevronDown"
  | "chevronRight"
  | "github"
  | "globeAlt"
  | "lightBulb"
  | "linkedin"
  | "xMark"
  | "folder01"
  | "facebook"
  | "link"
  | "twitter"
  | "userCircle"
	| "calendar03"
	| "check"
	| "clock01"
  | "gridView"
  | "listView"
  | "play"
  | "search"
  | "shoppingBag"
  | "star"
  | "questionMarkCircle"
  | "bookOpen"
  | "bookmark"
  | "eye"
  | "lockClosed"
  | "adjustmentsHorizontal"
  | "moon"
  | "handThumbUp"
  | "heart"
  | "faceSmile"
  | "faceFrown";

export type CIconSize = "inline" | "sm" | "md" | "lg";

export interface CIconProps {
  class?: string;
  name: CIconName;
  size?: CIconSize;
}
