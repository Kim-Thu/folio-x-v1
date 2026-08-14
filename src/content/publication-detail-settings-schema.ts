import { z } from "astro/zod";

const sectionSettingsSchema = z.object({
  theme: z.enum(["dark", "light", "canvas", "accent", "none"]),
  spacing: z.enum(["compact", "default", "none", "lead", "body", "closing"]),
  container: z.enum(["fluid", "wide", "boxed", "none"]),
});

const collectionLabelsSchema = z.object({
  collectionLabel: z.string().min(1),
  basePath: z.string().startsWith("/"),
});

const iconSchema = z.enum([
  "star",
  "eye",
  "bookOpen",
  "bookmark",
  "arrowUpRight",
  "calendar03",
  "clock01",
  "listView",
  "arrowLeft",
  "arrowRight",
]);

const buttonPresentationSchema = z.object({
  icon: iconSchema,
  iconPosition: z.enum(["start", "end"]).optional(),
  size: z.enum(["sm", "md"]),
  variant: z.enum(["primary", "outline"]),
});

export const publicationDetailSettingsSchema = z.object({
  page: z.object({
    template: z.literal("lead-navigation-content"),
  }),
  collections: z.object({
    comics: collectionLabelsSchema,
    novels: collectionLabelsSchema,
  }),
  routes: z.object({
    categorySegment: z.string().min(1),
    tagSegment: z.string().min(1),
    chapterSegment: z.string().min(1),
  }),
  header: z.object({
    id: z.string().min(1),
    template: z.literal("cover-summary"),
    settings: sectionSettingsSchema,
    labels: z.object({
      breadcrumb: z.string().min(1),
      tags: z.string().min(1),
      author: z.string().min(1),
      rating: z.string().min(1),
      reads: z.string().min(1),
      chapters: z.string().min(1),
      followers: z.string().min(1),
      actions: z.string().min(1),
      primaryAction: z.string().min(1),
      factsTitle: z.string().min(1),
      language: z.string().min(1),
      status: z.string().min(1),
      updated: z.string().min(1),
      views: z.string().min(1),
      ongoing: z.string().min(1),
      complete: z.string().min(1),
    }),
    metrics: z.object({
      rating: z.object({ icon: iconSchema }),
      reads: z.object({ icon: iconSchema }),
      chapters: z.object({ icon: iconSchema }),
      followers: z.object({ icon: iconSchema }),
    }),
    primaryAction: buttonPresentationSchema,
  }),
  navigation: z.object({
    id: z.string().min(1),
    settings: sectionSettingsSchema,
    label: z.string().min(1),
    appearance: z.literal("underline"),
    tone: z.literal("light"),
    tabs: z.object({
      chapters: z.object({ label: z.string().min(1), value: z.string().min(1), href: z.string().min(1) }),
      overview: z.object({ label: z.string().min(1), value: z.string().min(1), href: z.string().min(1) }),
    }),
  }),
  chapters: z.object({
    id: z.string().min(1),
    settings: sectionSettingsSchema,
    labels: z.object({
      aside: z.string().min(1),
      introduction: z.string().min(1),
      tags: z.string().min(1),
      index: z.string().min(1),
      title: z.string().min(1),
      listView: z.string().min(1),
      numberPrefix: z.string(),
      chapter: z.string().min(1),
    }),
    overviewLayout: z.object({
      columns: z.enum(["one", "two", "three", "four", "five", "compact-three", "twelve"]),
      gap: z.enum(["none", "xs", "sm", "md", "lg", "xl"]),
    }),
    sort: z.object({
      id: z.string().min(1),
      label: z.string().min(1),
      value: z.string().min(1),
      options: z.array(z.object({ label: z.string().min(1), value: z.string().min(1) })).min(1),
    }),
    itemAction: z.object({
      label: z.string().min(1),
      icon: iconSchema,
      iconPosition: z.enum(["start", "end"]),
      size: z.enum(["sm", "md"]),
      variant: z.enum(["primary", "outline"]),
    }),
  }),
  reader: z.object({
    template: z.literal("reader"),
    settings: sectionSettingsSchema,
    labels: z.object({
      breadcrumb: z.string().min(1),
      chapter: z.string().min(1),
      viewsSuffix: z.string().min(1),
      actions: z.string().min(1),
      chapterList: z.string().min(1),
      settings: z.string().min(1),
      theme: z.string().min(1),
      next: z.string().min(1),
      previous: z.string().min(1),
      share: z.string().min(1),
      reactions: z.string().min(1),
      bookmark: z.string().min(1),
      navigation: z.string().min(1),
    }),
    metadata: z.object({
      published: z.object({ icon: iconSchema, display: z.literal("icon-text") }),
      readTime: z.object({ icon: iconSchema, display: z.literal("icon-text") }),
    }),
    controls: z.object({
      chapterList: buttonPresentationSchema,
      previous: buttonPresentationSchema,
      next: buttonPresentationSchema,
    }),
  }),
});
