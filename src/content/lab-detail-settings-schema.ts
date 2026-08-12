import { z } from "astro/zod";

const iconSchema = z.enum([
  "arrowLeft", "arrowRight", "arrowUp", "arrowUpRight", "arrowPath",
  "archiveBox", "bars3", "bolt", "chevronLeft", "chevronDown",
  "chevronRight", "github", "globeAlt", "lightBulb", "linkedin", "xMark",
  "folder01", "facebook", "link", "twitter", "userCircle", "calendar03",
  "check", "clock01", "gridView", "listView", "play", "search",
  "shoppingBag", "star", "questionMarkCircle", "bookOpen", "bookmark",
  "eye", "lockClosed", "adjustmentsHorizontal", "moon", "handThumbUp",
  "heart", "faceSmile", "faceFrown",
]);
const cardTemplateSchema = z.enum([
  "stacked", "horizontal", "overlay", "featured", "boxed", "compact-media",
  "compact-bordered", "editorial", "icon-panel", "icon-summary", "media-banner",
  "media-caption", "media-details", "media-only", "media-summary", "media-metrics",
]);
const cardLayoutSchema = z.enum([
  "grid", "list", "three-column", "twelve-column", "content-three-column",
  "mosaic", "asymmetric", "showcase",
]);
const cardColumnsSchema = z.union([
  z.literal(1), z.literal(2), z.literal(3), z.literal(4), z.literal(5),
]);
const gapSchema = z.enum(["none", "xs", "sm", "md", "lg", "xl"]);
const sectionSettingsSchema = z.object({
  theme: z.enum(["dark", "light", "canvas", "accent", "none"]),
  spacing: z.enum(["compact", "default", "none", "lead", "body", "closing"]),
  container: z.enum(["site", "content", "none"]),
});
const stackSchema = z.object({
  columns: z.literal("one"),
  gap: gapSchema,
});
const sectionHeaderSchema = z.object({
  appearance: z.enum(["default", "compact"]),
  headingLevel: z.union([
    z.literal(1), z.literal(2), z.literal(3), z.literal(4), z.literal(5), z.literal(6),
  ]),
});
const cardPresentationSchema = z.object({
  template: cardTemplateSchema,
  layout: cardLayoutSchema,
  columns: cardColumnsSchema,
  gap: z.enum(["none", "sm", "md", "lg", "xl"]),
});

export const labDetailSettingsSchema = z.object({
  page: z.object({
    template: z.enum(["fluid", "contained", "boxed", "sidebar", "centered"]),
  }),
  header: z.object({
    id: z.string().min(1),
    template: z.literal("media-aside"),
    settings: sectionSettingsSchema,
    labels: z.object({
      breadcrumb: z.string().min(1),
      collection: z.string().min(1),
      actionsTemplate: z.string().includes("{title}"),
      live: z.string().min(1),
      source: z.string().min(1),
    }),
    routes: z.object({
      base: z.string().min(1),
      categoryBase: z.string().min(1),
      technologyBase: z.string().min(1),
    }),
    metrics: z.array(z.object({
      icon: iconSchema,
      source: z.enum(["stars", "forks", "updatedLabel"]),
    })).min(1),
    actions: z.object({
      live: z.object({ icon: iconSchema, variant: z.enum(["primary", "outline"]) }),
      source: z.object({ icon: iconSchema, variant: z.enum(["primary", "outline"]) }),
    }),
  }),
  navigation: z.object({
    labelTemplate: z.string().includes("{title}"),
    settings: sectionSettingsSchema,
    appearance: z.literal("underline"),
    tone: z.literal("light"),
  }),
  content: z.object({
    id: z.string().min(1),
    settings: sectionSettingsSchema,
    article: z.object({
      template: z.literal("flow"),
    }),
  }),
  sidebar: z.object({
    labelTemplate: z.string().includes("{title}"),
    position: z.enum(["start", "end"]),
    sticky: z.boolean(),
    stack: stackSchema,
    panel: z.object({
      surface: z.enum(["plain", "accent", "bordered", "canvas", "dark", "glass", "glass-dark", "soft"]),
      radius: z.enum(["none", "md", "lg"]),
      spacing: gapSchema,
      stack: stackSchema,
    }),
    labels: z.object({
      projectInformation: z.string().min(1),
      technologyTemplate: z.string().includes("{title}"),
    }),
    header: sectionHeaderSchema,
  }),
  gallery: z.object({
    id: z.string().min(1),
    title: z.string().min(1),
    openImageLabelTemplate: z.string().includes("{index}"),
    imageTitleLabelTemplate: z.string().includes("{index}"),
    settings: sectionSettingsSchema,
    stack: stackSchema,
    header: sectionHeaderSchema,
    cards: cardPresentationSchema,
  }),
  resources: z.object({
    id: z.string().min(1),
    title: z.string().min(1),
    actionIcon: iconSchema,
    settings: sectionSettingsSchema,
    stack: stackSchema,
    header: sectionHeaderSchema,
    cards: cardPresentationSchema,
  }),
  related: z.object({
    id: z.string().min(1),
    title: z.string().min(1),
    actionLabel: z.string().min(1),
    actionIcon: iconSchema,
    metricIcon: iconSchema,
    categoryDisplay: z.literal("text"),
    settings: sectionSettingsSchema,
    stack: stackSchema,
    header: sectionHeaderSchema,
    cards: cardPresentationSchema,
    slots: z.object({
      excerpt: z.boolean(),
      tags: z.boolean(),
      action: z.boolean(),
    }),
  }),
});
