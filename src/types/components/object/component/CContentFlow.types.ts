import type { HTMLAttributes } from "astro/types";

import type { CIconName } from "@/types/components/object/component/CIcon.types";
import type { CImageData } from "@/types/components/object/component/CImage.types";

export type CContentFlowItem =
	| {
			type: "heading";
			id: string;
			level: 2 | 3;
			text: string;
			navigationLabel?: string;
	  }
	| {
			type: "paragraph";
			text: string;
	  }
	| {
			type: "image";
			image: CImageData;
			caption?: string;
	  }
	| {
			type: "feature-grid";
			id: string;
			title: string;
			navigationLabel?: string;
			items: Array<{
				title: string;
				description: string;
				icon: "lightBulb" | "bolt" | "globeAlt" | "arrowPath";
			}>;
	  }
	| {
			type: "list";
			style: "bullet" | "ordered";
			items: string[];
	  }
	| {
			type: "table";
			id?: string;
			caption?: string;
			columns: Array<{ key: string; label: string }>;
			rows: Array<Record<string, string>>;
	  }
	| {
			type: "quote";
			text: string;
			attribution?: string;
			source?: string;
			sourceUrl?: string;
	  }
	| {
			type: "callout";
			tone: "neutral" | "info" | "success" | "warning" | "danger";
			title?: string;
			text: string;
			icon?: CIconName;
	  }
	| {
			type: "code";
			code: string;
			language?: string;
			filename?: string;
			caption?: string;
	  }
	| {
			type: "divider";
			style?: "subtle" | "solid" | "dashed";
	  }
	| {
			type: "media";
			mediaType: "video" | "embed";
			src: string;
			title: string;
			caption?: string;
			poster?: CImageData;
			aspectRatio?: "square" | "portrait" | "landscape" | "video" | "editorial";
			controls?: boolean;
			autoplay?: boolean;
	  }
	| {
			type: "metric-grid";
			id?: string;
			title?: string;
			navigationLabel?: string;
			items: Array<{
				label: string;
				value: string;
				description?: string;
				icon?: CIconName;
			}>;
	  };

export interface CContentFlowProps
	extends Omit<HTMLAttributes<"article">, "class"> {
	class?: string;
	items: CContentFlowItem[];
}
