import type { CSubscriptionFormProps } from "@/types/components/object/component/CSubscriptionForm.types";

export const subscriptionFormBaseClasses =
	"flex min-w-0 items-center rounded-full p-1 pr-3 ring-1 ring-inset";

export const subscriptionFormToneClasses: Record<
	NonNullable<CSubscriptionFormProps["tone"]>,
	string
> = {
	dark: "bg-black/18 ring-gray-10/18",
	light: "bg-white/80 ring-gray-100 backdrop-blur-sm",
};
