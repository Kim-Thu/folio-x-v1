import { z } from "astro/zod";

const sectionSettingsSchema = z.object({
  theme: z.enum(["dark", "light", "canvas", "accent", "none"]),
  spacing: z.enum(["compact", "default", "none", "lead", "body", "closing"]),
  container: z.enum(["site", "content", "none"]),
});

const collectionLabelsSchema = z.object({
  collectionLabel: z.string().min(1),
});

export const publicationDetailSettingsSchema = z.object({
  page: z.object({
    template: z.enum(["fluid", "contained", "boxed", "sidebar", "centered"]),
  }),
  collections: z.object({
    comics: collectionLabelsSchema,
    novels: collectionLabelsSchema,
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
    sort: z.object({
      id: z.string().min(1),
      label: z.string().min(1),
      value: z.string().min(1),
      options: z.array(z.object({ label: z.string().min(1), value: z.string().min(1) })).min(1),
    }),
    itemAction: z.object({
      label: z.string().min(1),
      icon: z.literal("arrowUpRight"),
      iconPosition: z.literal("end"),
      size: z.literal("sm"),
      variant: z.literal("primary"),
    }),
  }),
  reader: z.object({
    template: z.enum(["fluid", "contained", "boxed", "sidebar", "centered"]),
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
  }),
});
