import { z } from 'astro/zod';

const navigationItemSchema = z.object({
  href: z.string().min(1),
  label: z.string().min(1),
});

const socialLinkSchema = navigationItemSchema.extend({
  shortLabel: z.string().min(1),
});

const taxonomyTermSchema = z.object({
  label: z.string().min(1),
  slug: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
});

const contentSectionSchema = z.object({
  title: z.string().min(1),
  paragraphs: z.array(z.string().min(1)).min(1),
});

const sectionHeadingSchema = z.object({
  number: z.string().min(1),
  label: z.string().min(1),
  title: z.string().min(1),
  description: z.string().min(1).optional(),
});

const systemStateActionSchema = z.object({
  href: z.string().min(1),
  label: z.string().min(1),
  icon: z.enum(['arrowLeft', 'arrowRight', 'arrowUp', 'arrowUpRight']).optional(),
});

const systemStateSchema = z.object({
  id: z.string().min(1),
  eyebrow: z.string().min(1),
  title: z.string().min(1),
  description: z.string().min(1),
  primaryAction: systemStateActionSchema,
  secondaryAction: systemStateActionSchema.optional(),
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

export const siteSettingsSchema = z.object({
  site: z.object({
    name: z.string().min(1),
    shortName: z.string().min(1),
    role: z.string().min(1),
    location: z.string().min(1),
    email: z.email(),
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
  legalLinks: z.array(navigationItemSchema),
  socialLinks: z.array(socialLinkSchema),
});

export const homepageSettingsSchema = z.object({
  header: z.object({
    brand: z.string().min(1),
    contactLabel: z.string().min(1),
  }),
  hero: z.object({
    image: z.object({ src: z.string().min(1), alt: z.string().min(1) }),
    identityLines: z.array(z.string().min(1)).min(1),
    locationLines: z.array(z.string().min(1)).min(1),
    statusSymbol: z.string().min(1),
    summary: z.string().min(1),
    titleLines: z.array(z.string().min(1)).min(1),
    scrollLabel: z.string().min(1),
    contactLabel: z.string().min(1),
  }),
  about: z.object({
    heading: sectionHeadingSchema,
    principles: z.array(z.object({
      index: z.string().min(1),
      href: z.string().min(1),
      label: z.string().min(1),
      title: z.array(z.string().min(1)).min(1),
      description: z.string().min(1).optional(),
      variant: z.enum(['statement', 'graphic', 'image']),
      image: z.string().min(1).optional(),
      imageAlt: z.string().min(1).optional(),
    })).min(1),
    capability: z.object({
      label: z.string().min(1),
      primary: z.string().min(1),
      secondary: z.string().min(1),
    }),
  }),
  works: z.object({
    heading: sectionHeadingSchema,
    outcomeLabel: z.string().min(1),
    linkLabel: z.string().min(1),
    archiveLabel: z.string().min(1),
    previewLimit: z.number().int().positive(),
  }),
  insights: z.object({
    heading: sectionHeadingSchema,
    featuredLabel: z.string().min(1),
    featuredImageAlt: z.string().min(1),
  }),
  qa: z.object({ heading: sectionHeadingSchema }),
  cta: z.object({
    eyebrow: z.string().min(1),
    title: z.string().min(1),
    description: z.string().min(1),
    availability: z.string().min(1),
  }),
  faqs: z.array(z.object({ question: z.string().min(1), answer: z.string().min(1) })),
});

export const interfaceSettingsSchema = z.object({
  skipToContent: z.string().min(1),
  backToTop: z.string().min(1),
  openMenu: z.string().min(1),
  navigation: z.object({
    primaryLabel: z.string().min(1),
    mobileLabel: z.string().min(1),
    socialLabel: z.string().min(1),
    footerSocialLabel: z.string().min(1),
  }),
  progress: z.object({
    railLabel: z.string().min(1),
    readingLabel: z.string().min(1),
    initialSection: z.string().min(1),
    initialValue: z.string().min(1),
  }),
  separators: z.object({ slash: z.string(), dot: z.string() }),
  contentFormatting: z.object({
    readingTimeTemplate: z.string().includes('{minutes}'),
    dateLocale: z.string().min(2),
  }),
});

export const archiveSettingsSchema = z.object({
  projects: archiveGroupSchema,
  blog: archiveGroupSchema,
  detail: z.object({
    projectOverviewLabel: z.string().min(1),
    projectResultLabel: z.string().min(1),
    articleByLabel: z.string().min(1),
    articlePublishedLabel: z.string().min(1),
    tagsLabel: z.string().min(1),
  }),
});

export const footerSettingsSchema = z.object({
  contactLabel: z.string().min(1),
  menuLabel: z.string().min(1),
  legalLabel: z.string().min(1),
  locationLabel: z.string().min(1),
  copyrightSymbol: z.string().min(1),
  buildLabel: z.string().min(1),
});

export const systemStatesSettingsSchema = z.object({
  notFound: systemStateSchema,
  empty: systemStateSchema,
  comingSoon: systemStateSchema,
  maintenance: systemStateSchema,
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
  tone: z.enum(['light', 'dark']),
  sections: z.array(contentSectionSchema).min(1),
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
  sections: z.array(contentSectionSchema).min(1),
});

export const policyEntrySchema = z.object({
  eyebrow: z.string().min(1),
  title: z.string().min(1),
  description: z.string().min(1),
  lastUpdatedLabel: z.string().min(1),
  lastUpdated: z.string().min(1),
  sections: z.array(contentSectionSchema).min(1),
});
