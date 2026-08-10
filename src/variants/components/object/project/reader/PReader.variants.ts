import type { CTextTone, CTextVariant } from "@/types/components/object/component/CText.types";
import type { PReaderTextItem } from "@/types/components/object/project/reader/PReader.types";

type ReaderTextKind = NonNullable<PReaderTextItem["kind"]>;

export const readerTextVariantByKind: Record<ReaderTextKind, CTextVariant> = {
	paragraph: "reader",
	emphasis: "reader-emphasis",
	separator: "reader-separator",
};

export const readerTextToneByKind: Record<ReaderTextKind, CTextTone> = {
	paragraph: "muted",
	emphasis: "muted",
	separator: "brand",
};
