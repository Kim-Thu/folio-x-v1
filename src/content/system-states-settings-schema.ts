import { systemStatesSettingsSchema } from "@/content/schemas";

const systemStateSchema = systemStatesSettingsSchema.shape.notFound;

export const extendedSystemStatesSettingsSchema = systemStatesSettingsSchema.extend({
	comingSoon: systemStateSchema,
	maintenance: systemStateSchema,
});
