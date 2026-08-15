import { z } from "astro/zod";

const optionSchema = z.object({
	label: z.string().min(1),
	value: z.string().min(1),
});

const cardConfigSchema = z.object({
	template: z.string().min(1),
	layout: z.string().min(1),
	columns: z.number().int().positive(),
	gap: z.string().min(1),
	mediaRatio: z.string().optional(),
	slots: z.record(z.string(), z.boolean()).optional(),
});

export const publicationCatalogSettingsSchema = z.object({
	toolbar: z.object({
		searchLabel: z.string().min(1),
		searchPlaceholder: z.string().min(1),
		genreLabel: z.string().min(1),
		allGenresLabel: z.string().min(1),
		statusLabel: z.string().min(1),
		allStatusesLabel: z.string().min(1),
		ongoingLabel: z.string().min(1),
		completeLabel: z.string().min(1),
		sortLabel: z.string().min(1),
		sortValue: z.string().min(1),
		sortOptions: z.array(optionSchema).min(1),
		viewLabel: z.string().min(1),
		gridViewLabel: z.string().min(1),
		listViewLabel: z.string().min(1),
	}),
	sidebar: z.object({
		labelTemplate: z.string().min(1),
		position: z.enum(["start", "end"]),
		sticky: z.boolean(),
		genresLegend: z.string().min(1),
		allGenresShortLabel: z.string().min(1),
		panel: z.object({ surface: z.string().min(1), radius: z.string().min(1), spacing: z.string().min(1) }),
		trendingTitle: z.string().min(1),
		listCards: cardConfigSchema,
		trendingLimit: z.number().int().positive(),
	}),
	main: z.object({
		featuredTitle: z.string().min(1),
		latestTitle: z.string().min(1),
		popularGenresTitle: z.string().min(1),
		featuredLimit: z.number().int().positive(),
		latestLimit: z.number().int().positive(),
		popularGenresLimit: z.number().int().positive(),
		featuredCards: cardConfigSchema,
		latestCards: cardConfigSchema,
		genreCards: cardConfigSchema,
		genreIcons: z.array(z.string().min(1)).min(1),
		genreWorksTemplate: z.string().min(1),
	}),
});
