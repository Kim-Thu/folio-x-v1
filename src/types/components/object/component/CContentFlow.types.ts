import type { HTMLAttributes } from "astro/types";

import type { CImageData } from "@/types/components/object/component/CImage.types";

export type CContentFlowItem =
	| {
			type: "heading";
			id: string;
			level: 2 | 3;
			text: string;
	  }
	| {
			type: "paragraph";
			text: string;
	  }
	| {
			type: "image";
			image: CImageData;
	  };

export interface CContentFlowProps
	extends Omit<HTMLAttributes<"article">, "class"> {
	class?: string;
	items: CContentFlowItem[];
}
