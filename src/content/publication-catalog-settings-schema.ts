import { z } from "astro/zod";
import {
	cardColumnsSchema,
	cardConfigSchema,
	cardGapSchema,
	cardLayoutSchema,
	cardTemplateSchema,
} from "@/content/card-config-schema";

const optionSchema = z.object({
	label: z.string().min(1),
	value: z.string().min(1),
});

const catalogCardConfigSchema = cardConfigSchema.extend({
	template: cardTemplateSchema,
	layout: cardLayoutSchema,
	columns: cardColumnsSchema,
	gap: cardGapSchema,
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
		panel: z.object({
			surface: z.string().min(1),
			radius: z.string().min(1),
			spacing: z.string().min(1),
		}),
		trendingTitle: z.string().min(1),
		popularAuthorsTitle: z.string().min(1),
		listCards: catalogCardConfigSchema,
		authorPlaceholder: z.object({
			src: z.string().min(1),
			width: z.number().int().positive(),
			height: z.number().int().positive(),
		}),
		trendingLimit: z.number().int().positive(),
		authorLimit: z.number().int().positive(),
	}),
	main: z.object({
		featuredTitle: z.string().min(1),
		latestTitle: z.string().min(1),
		popularGenresTitle: z.string().min(1),
		topRatedTitle: z.string().min(1),
		completedTitle: z.string().min(1),
		allStoriesTitle: z.string().min(1),
		featuredLimit: z.number().int().positive(),
		latestLimit: z.number().int().positive(),
		popularGenresLimit: z.number().int().positive(),
		topRatedLimit: z.number().int().positive(),
		completedLimit: z.number().int().positive(),
		allStoriesPageSize: z.number().int().positive(),
		allStoriesPagination: z.object({
			label: z.string().min(1),
			previousLabel: z.string().min(1),
			nextLabel: z.string().min(1),
		}),
		featuredCards: catalogCardConfigSchema,
		latestCards: catalogCardConfigSchema,
		genreCards: catalogCardConfigSchema,
		topRatedCards: catalogCardConfigSchema,
		completedCards: catalogCardConfigSchema,
		allStoriesCards: catalogCardConfigSchema,
		genreIcons: z.array(z.string().min(1)).min(1),
		genreWorksTemplate: z.string().min(1),
		authorWorksTemplate: z.string().min(1),
	}),
});
