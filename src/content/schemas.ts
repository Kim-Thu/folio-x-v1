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
  icon: z.enum(["arrowLeft", "arrowRight", "arrowUp", "arrowUpRight", "chevronLeft", "chevronRight"]).optional(),
});

const imageSchema = z.object({
  src: z.string().min(1),
  alt: z.string(),
  width: z.number().int().positive(),
  height: z.number().int().positive(),
});

const systemStateSchema = z.object({
  id: z.string().min(1),
  displayCode: z.string().min(1).optional(),
  eyebrow: z.string().min(1),
  title: z.string().min(1),
  description: z.string().min(1),
  primaryAction: systemStateActionSchema,
  secondaryAction: systemStateActionSchema.optional(),
  image: imageSchema,
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

const insightContentNodeSchema = z.discriminatedUnion("type", [
  z.object({ type: z.literal("heading"), id: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/), level: z.union([z.literal(2), z.literal(3)]), text: z.string().min(1) }),
  z.object({ type: z.literal("paragraph"), text: z.string().min(1) }),
  z.object({ type: z.literal("image"), image: imageSchema }),
]);

const worksArchiveSchema = archiveGroupSchema.extend({
  headingLines: z.array(z.string().min(1)).min(1),
  breadcrumbLabel: z.string().min(1),
  breadcrumbHomeLabel: z.string().min(1),
  breadcrumbProjectsLabel: z.string().min(1),
  actionLabel: z.string().min(1),
  sortLabel: z.string().min(1),
  sortOptions: z.array(z.object({ label: z.string().min(1), value: z.enum(["featured", "newest", "oldest"]) })),
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
    name: z.string().min(1), shortName: z.string().min(1), role: z.string().min(1), location: z.string().min(1), email: z.email(),
    logo: z.string().optional(), logoLight: z.string().optional(), logoDark: z.string().optional(), favicon: z.string().optional(), contactLabel: z.string().min(1).default("LET'S TALK"),
  }),
  metadata: z.object({ language: z.string().min(2), title: z.string().min(1), description: z.string().min(1) }),
});

export const navigationSettingsSchema = z.object({
  navItems: z.array(navigationItemSchema), footerNavItems: z.array(navigationItemSchema), resourceLinks: z.array(navigationItemSchema).default([]), legalLinks: z.array(navigationItemSchema), socialLinks: z.array(socialLinkSchema),
});

const pageSectionSettingsSchema = z.object({
  theme: z.enum(["dark", "light", "canvas", "accent", "none"]),
  spacing: z.enum(["compact", "default", "none", "lead", "body", "closing"]),
  container: z.enum(["site", "content", "none"]),
  layout: z.string().optional(),
  columns: z.number().int().positive().optional(),
  gap: z.string().optional(),
  mediaRatio: z.string().optional(),
  separator: z.string().optional(),
});

const pageActionSchema = z.object({
  href: z.string().min(1),
  label: z.string().min(1),
  icon: z.string().optional(),
  iconPosition: z.enum(["start", "end"]).optional(),
  variant: z.string().optional(),
  tone: z.string().optional(),
  size: z.string().optional(),
});

const pageHeadingSchema = z.object({
  number: z.string().optional(),
  label: z.string().optional(),
  title: z.union([z.string().min(1), z.array(z.string().min(1)).min(1)]),
  description: z.string().optional(),
  action: pageActionSchema.optional(),
});

const pageCardConfigSchema = z.object({
  template: z.string().optional(),
  layout: z.string().optional(),
  columns: z.number().int().positive().optional(),
  gap: z.string().optional(),
  mediaRatio: z.string().optional(),
  separator: z.string().optional(),
  headingLevel: z.number().int().min(1).max(6).optional(),
  slots: z.record(z.string(), z.boolean()).optional(),
  actionLabel: z.string().optional(),
  itemPresentation: z.record(z.string(), z.unknown()).optional(),
});

const collectionSectionSchema = z.object({
  id: z.string().min(1),
  type: z.literal("collection"),
  template: z.string().optional(),
  settings: pageSectionSettingsSchema,
  content: z.object({
    heading: pageHeadingSchema.optional(),
    items: z.array(z.record(z.string(), z.unknown())).optional(),
    source: z.object({
      collection: z.enum(["products", "projects", "labs", "blog", "comics", "novels", "publications"]),
      limit: z.number().int().positive().optional(),
    }).optional(),
    cards: pageCardConfigSchema.optional(),
    itemPresentation: z.record(z.string(), z.unknown()).optional(),
  }),
});

const archiveSectionSchema = z.object({
  id: z.string().min(1),
  type: z.literal("archive"),
  template: z.enum(["taxonomy", "faceted"]),
  settings: pageSectionSettingsSchema,
  content: z.object({
    source: z.object({ collection: z.enum(["projects", "labs", "products"]) }),
    routes: z.record(z.string(), z.string()).optional(),
    taxonomy: z.record(z.string(), z.unknown()).optional(),
    toolbar: z.record(z.string(), z.unknown()),
    sidebar: z.record(z.string(), z.unknown()).optional(),
    result: z.record(z.string(), z.unknown()).optional(),
    resultLabel: z.string().optional(),
    cards: pageCardConfigSchema,
    itemPresentation: z.record(z.string(), z.unknown()).optional(),
    emptyLabel: z.string().min(1),
    pagination: z.object({
      label: z.string().min(1),
      previousLabel: z.string().min(1),
      nextLabel: z.string().min(1),
      pageSize: z.number().int().positive(),
    }),
  }),
});

const genericPageSectionSchema = z.object({
  id: z.string().min(1),
  type: z.enum(["hero", "page-header", "article", "cta"]),
  template: z.string().optional(),
  settings: pageSectionSettingsSchema,
  content: z.record(z.string(), z.unknown()),
});

export const pageSectionSchema = z.union([
  collectionSectionSchema,
  archiveSectionSchema,
  genericPageSectionSchema,
]);

const pageLayoutSchema = z.object({
  template: z.enum(["fluid", "contained", "boxed", "sidebar", "centered"]),
  containerSize: z.enum(["site", "content"]).optional(),
  asideLabel: z.string().min(1).optional(),
  asidePosition: z.enum(["start", "end"]).optional(),
});

const detailSectionSettingsSchema = z.object({
  theme: z.enum(["dark", "light", "canvas", "accent", "none"]),
  spacing: z.enum(["compact", "default", "none", "lead", "body", "closing"]),
  container: z.enum(["site", "content", "none"]),
});

const buttonActionSchema = z.object({
  label: z.string().min(1),
  href: z.string().min(1).optional(),
  icon: z.string().optional(),
  iconPosition: z.enum(["start", "end"]).optional(),
  variant: z.string().optional(),
  tone: z.string().optional(),
  size: z.string().optional(),
});

const productActionSchema = z.object({
  label: z.string().min(1),
  href: z.string().min(1),
  icon: z.string().optional(),
  variant: z.string().optional(),
});

const productDetailPageSchema = z.object({
  template: z.enum(["fluid", "contained", "boxed", "sidebar", "centered"]),
  sections: z.array(z.discriminatedUnion("type", [
    z.object({
      id: z.string().min(1),
      type: z.literal("page-header"),
      template: z.literal("gallery-summary"),
      settings: detailSectionSettingsSchema,
      content: z.object({
        breadcrumbLabel: z.string().min(1),
        productsLabel: z.string().min(1),
        galleryLabel: z.string().min(1),
        thumbnailLabel: z.string().min(1),
        salesLabel: z.string().min(1),
        features: z.array(z.record(z.string(), z.unknown())),
        facts: z.array(z.object({ label: z.string().min(1), value: z.string().min(1) })),
        actionsLabel: z.string().min(1),
        actions: z.array(productActionSchema),
        paymentLabel: z.string().min(1),
        paymentMethods: z.array(z.unknown()),
      }),
    }),
    z.object({
      id: z.string().min(1),
      type: z.literal("article"),
      template: z.string().optional(),
      settings: detailSectionSettingsSchema,
      content: z.object({
        blocks: z.array(z.object({
          id: z.string().min(1),
          title: z.string().min(1),
          paragraphs: z.array(z.string().min(1)).min(1),
        })).min(1),
      }),
    }),
  ])),
});

const publicationDetailPageSchema = z.object({
  template: z.enum(["fluid", "contained", "boxed", "sidebar", "centered"]),
  sections: z.array(z.discriminatedUnion("type", [
    z.object({
      id: z.string().min(1),
      type: z.literal("page-header"),
      template: z.literal("cover-summary"),
      settings: detailSectionSettingsSchema,
      content: z.object({
        breadcrumbLabel: z.string().min(1),
        collectionLabel: z.string().min(1),
        tagsLabel: z.string().min(1),
        authorLabel: z.string().min(1),
        metrics: z.object({
          ratingLabel: z.string().min(1),
          readsLabel: z.string().min(1),
          chaptersLabel: z.string().min(1),
          followersLabel: z.string().min(1),
        }),
        actionsLabel: z.string().min(1),
        primaryActionLabel: z.string().min(1),
        factsTitle: z.string().min(1),
        facts: z.object({
          authorLabel: z.string().min(1),
          genresLabel: z.string().min(1),
          languageLabel: z.string().min(1),
          statusLabel: z.string().min(1),
          updatedLabel: z.string().min(1),
          viewsLabel: z.string().min(1),
          ongoingLabel: z.string().min(1),
          completeLabel: z.string().min(1),
        }),
      }),
    }),
    z.object({
      id: z.string().min(1),
      type: z.literal("tabs"),
      template: z.string().optional(),
      settings: detailSectionSettingsSchema,
      content: z.object({
        label: z.string().min(1),
        appearance: z.literal("underline"),
        tone: z.literal("light"),
        activeValue: z.string().min(1),
        tabs: z.array(z.object({ label: z.string().min(1), value: z.string().min(1), href: z.string().min(1) })).min(1),
      }),
    }),
    z.object({
      id: z.string().min(1),
      type: z.literal("entry-index"),
      template: z.string().optional(),
      settings: detailSectionSettingsSchema,
      content: z.object({
        asideLabel: z.string().min(1),
        introductionLabel: z.string().min(1),
        tagsLabel: z.string().min(1),
        chapterIndexLabel: z.string().min(1),
        title: z.string().min(1),
        sort: z.object({
          id: z.string().min(1),
          label: z.string().min(1),
          value: z.string().min(1),
          options: z.array(z.object({ label: z.string().min(1), value: z.string().min(1) })).min(1),
        }),
        listViewLabel: z.string().min(1),
        numberPrefix: z.string(),
        chapterLabel: z.string().min(1),
        itemAction: buttonActionSchema.optional(),
      }),
    }),
  ])),
});

export const pageSchema = z.object({
  slug: z.string(),
  meta: z.object({ title: z.string(), description: z.string().optional(), author: z.string().optional(), publishedAt: z.string().optional(), updatedAt: z.string().optional() }),
  seo: z.record(z.string(), z.unknown()).nullable().optional(),
  content: z.object({ layout: pageLayoutSchema, sections: z.array(pageSectionSchema) }),
});

const entryDetailPageSchema = z.object({
  template: z.enum(["fluid", "contained", "boxed", "sidebar", "centered"]),
  sections: z.array(pageSectionSchema),
});

const readerPageSchema = z.object({
  template: z.enum(["fluid", "contained", "boxed", "sidebar", "centered"]),
  settings: z.object({
    theme: z.enum(["dark", "light", "canvas", "accent", "none"]),
    spacing: z.enum(["compact", "default", "none", "lead", "body", "closing"]),
    container: z.enum(["site", "content", "none"]),
  }),
  content: z.object({
    breadcrumbLabel: z.string().min(1),
    collectionLabel: z.string().min(1),
    chapterLabel: z.string().min(1),
    viewsSuffix: z.string().min(1),
    actionsLabel: z.string().min(1),
    chapterListLabel: z.string().min(1),
    settingsLabel: z.string().min(1),
    themeLabel: z.string().min(1),
    nextLabel: z.string().min(1),
    previousLabel: z.string().min(1),
    shareLabel: z.string().min(1),
    reactionsLabel: z.string().min(1),
    bookmarkLabel: z.string().min(1),
    navigationLabel: z.string().min(1),
  }),
});

export const closingProfileSettingsSchema = z.object({
  id: z.string().min(1), eyebrow: z.string().min(1), nameLines: z.array(z.string().min(1)).min(1), roleLabel: z.string().min(1), followAction: z.object({ label: z.string().min(1), href: z.string().min(1) }), emailActionLabel: z.string().min(1), locationLabel: z.string().min(1), portraits: z.object({ collapsed: imageSchema, expanded: imageSchema }).optional(),
});

export const interfaceSettingsSchema = z.object({
  skipToContent: z.string().min(1), backToTop: z.string().min(1), openMenu: z.string().min(1), closeMenu: z.string().min(1),
  loadingScreen: z.object({ label: z.string().min(1), status: z.string().min(1), tips: z.array(z.string().min(1)).min(1), holdOpen: z.boolean().default(false), progressLabel: z.string().min(1), image: imageSchema }),
  navigation: z.object({ primaryLabel: z.string().min(1), mobileLabel: z.string().min(1), socialLabel: z.string().min(1), footerSocialLabel: z.string().min(1), railSocialDisplay: z.enum(["label", "shortLabel", "icon"]).default("icon") }),
  progress: z.object({ railLabel: z.string().min(1), readingLabel: z.string().min(1), initialSection: z.string().min(1), initialValue: z.string().min(1) }),
  separators: z.object({ slash: z.string(), dot: z.string() }),
  contentFormatting: z.object({ readingTimeTemplate: z.string().includes("{minutes}"), dateLocale: z.string().min(2) }),
});

const reviewsSchema = z.object({
  eyebrow: z.string().min(1), title: z.string().min(1),
  summary: z.object({ score: z.number().min(0), maximum: z.number().int().positive(), totalLabel: z.string().min(1), distribution: z.array(z.object({ label: z.string().min(1), value: z.number().min(0).max(100) })) }),
  items: z.array(z.object({ name: z.string().min(1), date: z.string().min(1), quote: z.string().min(1), rating: z.number().int().positive(), avatar: imageSchema.optional() })).min(1),
});

export const pageBuilderSchema = z.object({
  layout: pageLayoutSchema,
  regions: z.array(z.object({
    key: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/), enabled: z.boolean().default(true),
    component: z.enum(["page-header","hero","section-header","article","reviews","cards","cta","post-navigation","collection","archive","advertisement","details","group","profile","status","tabs","toc","entry-index","reader"]),
    placement: z.enum(["header", "main", "aside", "cta"]).default("main"),
    template: z.enum(["split-media","editorial","immersive","slider-aside","split-benefits","gallery-summary","stacked","horizontal","overlay","featured","boxed","media-details","compact-media","compact-bordered","icon-panel","icon-summary","media-only","media-summary","default","callout","media-pricing","inline","subscription","split","sidebar","stack","taxonomy","faceted","media-aside","media-metrics","cover-summary"]).optional(),
    theme: z.enum(["dark", "light", "canvas", "accent", "none"]).default("none"), spacing: z.enum(["compact", "default", "none", "lead", "body", "closing"]).default("none"), container: z.enum(["site", "content", "none"]).default("none"),
  })),
});

export const archiveSettingsSchema = z.object({
  projects: worksArchiveSchema,
  blog: archiveGroupSchema,
  detail: z.object({
    projectOverviewLabel: z.string().min(1), projectResultLabel: z.string().min(1), featuresLabel: z.string().min(1), galleryLabel: z.string().min(1), techStackLabel: z.string().min(1), testimonialLabel: z.string().min(1), clientLabel: z.string().min(1), roleLabel: z.string().min(1), durationLabel: z.string().min(1), onThisPageLabel: z.string().min(1), liveActionLabel: z.string().min(1), sourceActionLabel: z.string().min(1), previousLabel: z.string().min(1), nextLabel: z.string().min(1), articleByLabel: z.string().min(1), articlePublishedLabel: z.string().min(1), tagsLabel: z.string().min(1), pageHeaderPattern: imageSchema, defaultReviews: reviewsSchema,
  }),
});

export const blogEntrySchema = z.object({
  order: z.number().int().positive(), readingMinutes: z.number().int().positive(), slug: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/), category: z.string().min(1), categorySlug: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/), tags: z.array(taxonomyTermSchema).min(1), title: z.string().min(1), excerpt: z.string().min(1), publishedAt: z.iso.date(), author: z.string().min(1), image: z.string().min(1), imageAlt: z.string().min(1), content: z.array(insightContentNodeSchema).min(1), detail: z.object({ page: entryDetailPageSchema }).optional(),
});

export const productEntrySchema = z.object({
  id: z.number().int().positive(), slug: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/), title: z.string().min(1), category: z.string().min(1), categorySlug: z.string().min(1), platform: z.string().min(1), description: z.string().min(1), price: z.number().nonnegative(), oldPrice: z.number().nonnegative().optional(), rating: z.number().min(0).max(5), reviews: z.number().int().nonnegative(), badge: z.string().optional(), image: z.string().min(1), detail: z.object({ page: productDetailPageSchema }),
});

export const labEntrySchema = z.object({
  order: z.number().int().positive(), slug: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/), title: z.string().min(1), category: taxonomyTermSchema, status: z.enum(["experiment", "in-progress", "complete"]), statusLabel: z.string().min(1), summary: z.string().min(1), image: imageSchema, technologies: z.array(taxonomyTermSchema).min(1), stars: z.number().int().nonnegative(), forks: z.number().int().nonnegative(), updatedLabel: z.string().min(1), liveUrl: z.string().min(1).optional(), sourceUrl: z.string().min(1).optional(), sections: z.array(contentSectionSchema).min(1),
  features: z.array(z.object({ title: z.string().min(1), description: z.string().min(1), icon: z.enum(["lightBulb", "bolt", "globeAlt", "arrowPath"]) })).default([]),
  gallery: z.array(imageSchema).default([]),
  resources: z.array(z.object({ title: z.string().min(1), description: z.string().min(1), href: z.string().min(1), icon: z.enum(["folder01", "github", "play"]) })).default([]),
  facts: z.array(z.object({ label: z.string().min(1), value: z.string().min(1) })).default([]),
  detail: z.object({ page: entryDetailPageSchema }).optional(),
});

export const publicationEntrySchema = z.object({
  order: z.number().int().positive(), slug: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/), title: z.string().min(1), summary: z.string().min(1), cover: imageSchema, genres: z.array(taxonomyTermSchema).min(1), status: z.enum(["complete", "ongoing"]), rating: z.number().min(0).max(5), views: z.string().min(1), chapters: z.number().int().nonnegative(), updatedLabel: z.string().min(1), author: z.string().min(1),
  detail: z.object({
    language: z.string().min(1), followers: z.string(), description: z.array(z.string().min(1)).min(1), tags: z.array(taxonomyTermSchema), chapterTitles: z.array(z.string().min(1)),
    reader: z.array(z.object({ number: z.number().int().positive(), title: z.string().min(1), publishedAt: z.string().min(1), publishedLabel: z.string().min(1), readTime: z.string().min(1), views: z.string().min(1), kind: z.enum(["prose", "sequential-media"]), prose: z.array(z.object({ kind: z.enum(["paragraph", "emphasis", "separator"]).optional(), text: z.string().min(1) })).optional(), images: z.array(imageSchema).optional() })).optional(),
    page: publicationDetailPageSchema,
    readerPage: readerPageSchema.optional(),
  }),
});