import { z } from "astro/zod";
import {
	cardColumnsSchema,
	cardGapSchema,
	cardLayoutSchema,
	cardSlotsSchema,
	cardTemplateSchema,
	iconNameSchema,
	mediaRatioSchema,
} from "@/content/schemas";

const publicationSortValueSchema = z.enum(["newest", "oldest"]);
const optionSchema = z.object({
	label: z.string().min(1),
	value: publicationSortValueSchema,
});

const cardConfigSchema = z.object({
	template: cardTemplateSchema,
	layout: cardLayoutSchema,
	columns: cardColumnsSchema,
	gap: cardGapSchema,
	mediaRatio: mediaRatioSchema.optional(),
	slots: cardSlotsSchema.optional(),
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
		sortValue: publicationSortValueSchema,
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
		panel: z.object({
			surface: z.enum(["plain", "accent", "bordered", "canvas", "dark", "glass", "glass-dark", "soft"]),
			radius: z.enum(["none", "md", "lg"]),
			spacing: z.enum(["none", "xs", "sm", "md", "lg", "xl"]),
		}),
		trendingTitle: z.string().min(1),
		listCards: cardConfigSchema,
		trendingLimit: z.number().int().positive(),
	}),
	main: z.object({
		featuredTitle: z.string().min(1),
		latestTitle: z.string().min(1),
		popularGenresTitle: z.string().min(1),
		featuredLimit: z.number().int().positive(),
		popularGenresLimit: z.number().int().positive(),
		featuredCards: cardConfigSchema,
		latestCards: cardConfigSchema,
		genreCards: cardConfigSchema,
		genreIcons: z.array(iconNameSchema).min(1),
		genreWorksTemplate: z.string().min(1),
	}),
});
