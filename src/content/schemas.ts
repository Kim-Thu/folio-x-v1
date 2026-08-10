import { z } from "astro/zod";

const navigationItemSchema = z.object({
  href: z.string().min(1),
  label: z.string().min(1),
});

const socialLinkSchema = navigationItemSchema.extend({
  shortLabel: z.string().min(1),
  icon: z.enum(["github", "linkedin"]).optional(),
});

const taxonomyTermSchema = z.object({
  label: z.string().min(1),
  slug: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
});

const contentSectionSchema = z.object({
  title: z.string().min(1),
  paragraphs: z.array(z.string().min(1)).min(1),
});

const systemStateActionSchema = z.object({
  href: z.string().min(1),
  label: z.string().min(1),
  icon: z
    .enum([
      "arrowLeft",
      "arrowRight",
      "arrowUp",
      "arrowUpRight",
      "chevronLeft",
      "chevronRight",
    ])
    .optional(),
});

const systemStateSchema = z.object({
  id: z.string().min(1),
  displayCode: z.string().min(1).optional(),
  eyebrow: z.string().min(1),
  title: z.string().min(1),
  description: z.string().min(1),
  primaryAction: systemStateActionSchema,
  secondaryAction: systemStateActionSchema.optional(),
  image: z.object({
    src: z.string().min(1),
    alt: z.string().min(1),
    width: z.number().int().positive(),
    height: z.number().int().positive(),
  }),
  metadataTitle: z.string().min(1),
  metadataDescription: z.string().min(1),
});

const archiveGroupSchema = z.object({
  eyebrow: z.string().min(1),
  title: z.string().min(1),
  description: z.string().min(1),
  filterLabel: z.string().min(1),
  allLabel: z.string().min(1),
  emptyLabel: z.string().min(1),
  backLabel: z.string().min(1),
  categoryPrefix: z.string().min(1),
  tagPrefix: z.string().min(1),
});

const imageSchema = z.object({
  src: z.string().min(1),
  alt: z.string().min(1),
  width: z.number().int().positive(),
  height: z.number().int().positive(),
});

const insightContentNodeSchema = z.discriminatedUnion("type", [
  z.object({
    type: z.literal("heading"),
    id: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
    level: z.union([z.literal(2), z.literal(3)]),
    text: z.string().min(1),
  }),
  z.object({
    type: z.literal("paragraph"),
    text: z.string().min(1),
  }),
  z.object({
    type: z.literal("image"),
    image: imageSchema,
  }),
]);

const worksArchiveSchema = archiveGroupSchema.extend({
  headingLines: z.array(z.string().min(1)).min(1),
  breadcrumbLabel: z.string().min(1),
  breadcrumbHomeLabel: z.string().min(1),
  breadcrumbProjectsLabel: z.string().min(1),
  actionLabel: z.string().min(1),
  sortLabel: z.string().min(1),
  sortOptions: z.array(
    z.object({
      label: z.string().min(1),
      value: z.enum(["featured", "newest", "oldest"]),
    }),
  ),
  heroImage: imageSchema.optional(),
  viewLabel: z.string().min(1),
  gridViewLabel: z.string().min(1),
  listViewLabel: z.string().min(1),
  paginationLabel: z.string().min(1),
  previousPageLabel: z.string().min(1),
  nextPageLabel: z.string().min(1),
  pageSize: z.number().int().positive(),
});

export const siteSettingsSchema = z.object({
  site: z.object({
    name: z.string().min(1),
    shortName: z.string().min(1),
    role: z.string().min(1),
    location: z.string().min(1),
    email: z.email(),
    logo: z.string().optional(),
    logoLight: z.string().optional(),
    logoDark: z.string().optional(),
    favicon: z.string().optional(),
    contactLabel: z.string().min(1).default("LET'S TALK"),
  }),
  metadata: z.object({
    language: z.string().min(2),
    title: z.string().min(1),
    description: z.string().min(1),
  }),
});

export const navigationSettingsSchema = z.object({
  navItems: z.array(navigationItemSchema),
  footerNavItems: z.array(navigationItemSchema),
  resourceLinks: z.array(navigationItemSchema).default([]),
  legalLinks: z.array(navigationItemSchema),
  socialLinks: z.array(socialLinkSchema),
});

const pageSectionSettingsSchema = z.record(z.string(), z.unknown());
const pageSectionContentSchema = z.record(z.string(), z.unknown());

export const pageSectionSchema = z.object({
	id: z.string(),
	type: z.string(),
	template: z.string().optional(),
	settings: pageSectionSettingsSchema.default({}),
	content: pageSectionContentSchema.default({}),
});

export const pageSchema = z.object({
	slug: z.string(),
	meta: z.object({
		title: z.string(),
		description: z.string().optional(),
		author: z.string().optional(),
		publishedAt: z.string().optional(),
		updatedAt: z.string().optional(),
	}),
	seo: z.record(z.string(), z.unknown()).nullable().optional(),
	content: z.object({ sections: z.array(pageSectionSchema) }),
});

export const closingProfileSettingsSchema = z.object({
  id: z.string().min(1),
  eyebrow: z.string().min(1),
  nameLines: z.array(z.string().min(1)).min(1),
  roleLabel: z.string().min(1),
  followAction: z.object({
    label: z.string().min(1),
    href: z.string().min(1),
  }),
  emailActionLabel: z.string().min(1),
  locationLabel: z.string().min(1),
  portraits: z
    .object({
      collapsed: z.object({
        src: z.string().min(1),
        alt: z.string().min(1),
        width: z.number().int().positive(),
        height: z.number().int().positive(),
      }),
      expanded: z.object({
        src: z.string().min(1),
        alt: z.string().min(1),
        width: z.number().int().positive(),
        height: z.number().int().positive(),
      }),
    })
    .optional(),
});

export const interfaceSettingsSchema = z.object({
  skipToContent: z.string().min(1),
  backToTop: z.string().min(1),
  openMenu: z.string().min(1),
  closeMenu: z.string().min(1),
  loadingScreen: z.object({
    label: z.string().min(1),
    status: z.string().min(1),
    tips: z.array(z.string().min(1)).min(1),
    holdOpen: z.boolean().default(false),
    progressLabel: z.string().min(1),
    image: z.object({
      src: z.string().min(1),
      alt: z.string().min(1),
      width: z.number().int().positive(),
      height: z.number().int().positive(),
    }),
  }),
  navigation: z.object({
    primaryLabel: z.string().min(1),
    mobileLabel: z.string().min(1),
    socialLabel: z.string().min(1),
    footerSocialLabel: z.string().min(1),
    railSocialDisplay: z.enum(["label", "shortLabel", "icon"]).default("icon"),
  }),
  progress: z.object({
    railLabel: z.string().min(1),
    readingLabel: z.string().min(1),
    initialSection: z.string().min(1),
    initialValue: z.string().min(1),
  }),
  separators: z.object({ slash: z.string(), dot: z.string() }),
  contentFormatting: z.object({
    readingTimeTemplate: z.string().includes("{minutes}"),
    dateLocale: z.string().min(2),
  }),
});

const reviewsSchema = z.object({
  eyebrow: z.string().min(1),
  title: z.string().min(1),
  summary: z.object({
    score: z.number().min(0),
    maximum: z.number().int().positive(),
    totalLabel: z.string().min(1),
    distribution: z.array(
      z.object({
        label: z.string().min(1),
        value: z.number().min(0).max(100),
      }),
    ),
  }),
  items: z
    .array(
      z.object({
        name: z.string().min(1),
        date: z.string().min(1),
        quote: z.string().min(1),
        rating: z.number().int().positive(),
        avatar: imageSchema.optional(),
      }),
    )
    .min(1),
});

export const pageBuilderSchema = z.object({
  layout: z.object({
    template: z.enum(["fluid", "contained", "boxed", "sidebar", "centered"]),
    containerSize: z.enum(["site", "content"]).optional(),
    asideLabel: z.string().min(1).optional(),
    asidePosition: z.enum(["start", "end"]).optional(),
  }),
  regions: z.array(
    z.object({
      key: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
      enabled: z.boolean().default(true),
      component: z.enum([
        "page-header",
        "hero",
        "section-header",
        "article",
        "reviews",
        "cards",
        "cta",
        "post-navigation",
        "collection",
        "archive",
        "advertisement",
        "details",
        "group",
        "profile",
        "status",
        "tabs",
        "toc",
        "entry-index",
        "reader",
      ]),
      placement: z.enum(["header", "main", "aside", "cta"]).default("main"),
      template: z
        .enum([
          "split-media",
          "editorial",
          "immersive",
          "slider-aside",
          "split-benefits",
          "gallery-summary",
          "stacked",
          "horizontal",
          "overlay",
          "featured",
          "boxed",
          "media-details",
          "compact-media",
          "compact-bordered",
          "icon-panel",
          "icon-summary",
          "media-only",
          "media-summary",
          "default",
          "callout",
          "media-pricing",
          "inline",
          "subscription",
          "split",
          "sidebar",
          "stack",
          "taxonomy",
          "faceted",
          "media-aside",
          "media-metrics",
          "cover-summary",
        ])
        .optional(),
      theme: z
        .enum(["dark", "light", "canvas", "accent", "none"])
        .default("none"),
      spacing: z
        .enum(["compact", "default", "none", "lead", "body", "closing"])
        .default("none"),
      container: z.enum(["site", "content", "none"]).default("none"),
    }),
  ),
});

export const archiveSettingsSchema = z.object({
  projects: worksArchiveSchema,
  blog: archiveGroupSchema,
  detail: z.object({
    projectOverviewLabel: z.string().min(1),
    projectResultLabel: z.string().min(1),
    featuresLabel: z.string().min(1),
    galleryLabel: z.string().min(1),
    techStackLabel: z.string().min(1),
    testimonialLabel: z.string().min(1),
    clientLabel: z.string().min(1),
    roleLabel: z.string().min(1),
    durationLabel: z.string().min(1),
    onThisPageLabel: z.string().min(1),
    liveActionLabel: z.string().min(1),
    sourceActionLabel: z.string().min(1),
    previousLabel: z.string().min(1),
    nextLabel: z.string().min(1),
    articleByLabel: z.string().min(1),
    articlePublishedLabel: z.string().min(1),
    tagsLabel: z.string().min(1),
    pageHeaderPattern: imageSchema,
    defaultReviews: reviewsSchema,
  }),
});

export const footerSettingsSchema = z.object({
  brandDescription: z.string().min(1),
  socialDisplay: z.enum(["label", "shortLabel", "icon"]).default("icon"),
  menuLabel: z.string().min(1),
  resourcesLabel: z.string().min(1),
  legalLabel: z.string().min(1),
  locationLabel: z.string().min(1),
  copyrightSymbol: z.string().min(1),
  buildLabel: z.string().min(1),
  newsletter: z.object({
    label: z.string().min(1),
    description: z.string().min(1),
    inputLabel: z.string().min(1),
    placeholder: z.string().min(1),
    submitLabel: z.string().min(1),
  }),
});

export const systemStatesSettingsSchema = z.object({
  notFound: systemStateSchema,
  empty: systemStateSchema,
});

export const projectEntrySchema = z.object({
  order: z.number().int().positive(),
  slug: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
  title: z.string().min(1),
  client: z.string().min(1),
  year: z.string().min(1),
  category: z.string().min(1),
  categorySlug: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
  tags: z.array(taxonomyTermSchema).min(1),
  summary: z.string().min(1),
  outcome: z.string().min(1),
  image: z.string().min(1),
  alt: z.string().min(1),
  tone: z.enum(["light", "dark"]),
  sections: z.array(contentSectionSchema).min(1),
  detail: z
    .object({
      role: z.string().min(1),
      duration: z.string().min(1),
      showBackAction: z.boolean().default(true),
      liveUrl: z.string().min(1).optional(),
      sourceUrl: z.string().min(1).optional(),
      features: z
        .array(
          z.object({
            title: z.string().min(1),
            description: z.string().min(1),
            icon: z.enum(["folder01", "userCircle", "calendar03", "lightBulb"]),
          }),
        )
        .default([]),
      gallery: z.array(imageSchema).default([]),
      results: z
        .array(
          z.object({
            value: z.string().min(1),
            label: z.string().min(1),
          }),
        )
        .default([]),
      reviews: reviewsSchema.optional(),
      testimonial: z
        .object({
          quote: z.string().min(1),
          name: z.string().min(1),
          role: z.string().min(1),
        })
        .optional(),
      builder: pageBuilderSchema.optional(),
    })
    .optional(),
});

export const blogEntrySchema = z.object({
  order: z.number().int().positive(),
  readingMinutes: z.number().int().positive(),
  slug: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
  category: z.string().min(1),
  categorySlug: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
  tags: z.array(taxonomyTermSchema).min(1),
  title: z.string().min(1),
  excerpt: z.string().min(1),
  publishedAt: z.iso.date(),
  author: z.string().min(1),
  image: z.string().min(1),
  imageAlt: z.string().min(1),
  content: z.array(insightContentNodeSchema).min(1),
});

const productSchema = z.object({
  id: z.number().int().positive(),
  slug: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
  title: z.string().min(1),
  category: z.string().min(1),
  categorySlug: z.string().min(1),
  platform: z.string().min(1),
  description: z.string().min(1),
  price: z.number().nonnegative(),
  oldPrice: z.number().nonnegative().optional(),
  rating: z.number().min(0).max(5),
  reviews: z.number().int().nonnegative(),
  badge: z.string().optional(),
  image: z.string().min(1),
});

export const productCatalogSchema = z.object({
  items: z.array(productSchema).min(1),
  categories: z.array(z.object({ value: z.string(), label: z.string() })).min(1),
});

export const policyEntrySchema = z.object({
  eyebrow: z.string().min(1),
  title: z.string().min(1),
  description: z.string().min(1),
  lastUpdatedLabel: z.string().min(1),
  lastUpdated: z.string().min(1),
  sections: z.array(contentSectionSchema).min(1),
});

export const labEntrySchema = z.object({
  order: z.number().int().positive(),
  slug: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
  title: z.string().min(1),
  category: taxonomyTermSchema,
  status: z.enum(["experiment", "in-progress", "complete"]),
  statusLabel: z.string().min(1),
  summary: z.string().min(1),
  image: imageSchema,
  technologies: z.array(taxonomyTermSchema).min(1),
  stars: z.number().int().nonnegative(),
  forks: z.number().int().nonnegative(),
  updatedLabel: z.string().min(1),
  liveUrl: z.string().min(1).optional(),
  sourceUrl: z.string().min(1).optional(),
  sections: z.array(contentSectionSchema).min(1),
  features: z
    .array(
      z.object({
        title: z.string().min(1),
        description: z.string().min(1),
        icon: z.enum(["lightBulb", "bolt", "globeAlt", "arrowPath"]),
      }),
    )
    .default([]),
  gallery: z.array(imageSchema).default([]),
  resources: z
    .array(
      z.object({
        title: z.string().min(1),
        description: z.string().min(1),
        href: z.string().min(1),
        icon: z.enum(["folder01", "github", "play"]),
      }),
    )
    .default([]),
  facts: z
    .array(
      z.object({
        label: z.string().min(1),
        value: z.string().min(1),
      }),
    )
    .default([]),
});

const publicationIconSchema = z.enum([
  "archiveBox",
  "bolt",
  "folder01",
  "globeAlt",
  "lightBulb",
  "star",
  "userCircle",
]);

export const publicationCatalogSchema = z.object({
  order: z.number().int().positive(),
  slug: z.enum(["comics", "novels"]),
  label: z.string().min(1),
  title: z.string().min(1),
  accent: z.string().min(1),
  description: z.string().min(1),
  hero: imageSchema,
  primaryAction: navigationItemSchema,
  secondaryAction: navigationItemSchema,
  quote: z.string().min(1),
  quoteCredit: z.string().min(1),
  stats: z
    .array(
      z.object({
        label: z.string().min(1),
        value: z.string().min(1),
        icon: publicationIconSchema,
      }),
    )
    .length(4),
  genres: z
    .array(
      taxonomyTermSchema.extend({
        count: z.number().int().nonnegative(),
        icon: publicationIconSchema,
      }),
    )
    .min(1),
  authors: z
    .array(
      z.object({
        name: z.string().min(1),
        works: z.number().int().nonnegative(),
        image: imageSchema,
      }),
    )
    .min(1),
  entries: z
    .array(
      z.object({
        order: z.number().int().positive(),
        slug: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
        title: z.string().min(1),
        summary: z.string().min(1),
        cover: imageSchema,
        genres: z.array(taxonomyTermSchema).min(1),
        status: z.enum(["complete", "ongoing"]),
        rating: z.number().min(0).max(5),
        views: z.string().min(1),
        chapters: z.number().int().nonnegative(),
        updatedLabel: z.string().min(1),
        author: z.string().min(1),
        detail: z
          .object({
            language: z.string().min(1),
            followers: z.string().min(1),
            description: z.array(z.string().min(1)).min(1),
            tags: z.array(taxonomyTermSchema).min(1),
            chapterTitles: z.array(z.string().min(1)).min(1),
            reader: z
              .array(
                z.object({
                  number: z.number().int().positive(),
                  title: z.string().min(1),
                  publishedAt: z.string().min(1),
                  publishedLabel: z.string().min(1),
                  readTime: z.string().min(1),
                  views: z.string().min(1),
                  kind: z.enum(["prose", "sequential-media"]),
                  prose: z
                    .array(
                      z.object({
                        kind: z
                          .enum(["paragraph", "emphasis", "separator"])
                          .optional(),
                        text: z.string().min(1),
                      }),
                    )
                    .optional(),
                  images: z.array(imageSchema).optional(),
                }),
              )
              .optional(),
          })
          .optional(),
      }),
    )
    .min(1),
  newsletter: z.object({
    title: z.string().min(1),
    description: z.string().min(1),
    inputLabel: z.string().min(1),
    placeholder: z.string().min(1),
    submitLabel: z.string().min(1),
    image: imageSchema,
  }),
  builder: pageBuilderSchema.optional(),
});
