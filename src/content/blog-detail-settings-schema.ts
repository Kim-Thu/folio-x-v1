import { z } from "astro/zod";

const sectionSettingsSchema = z.object({
  theme: z.enum(["dark", "light", "canvas", "accent", "none"]),
  spacing: z.enum(["compact", "default", "none", "lead", "body", "closing"]),
  container: z.enum(["site", "content", "none"]),
});

const columnsSchema = z.object({
  columns: z.enum(["one", "two", "three", "four", "five", "compact-three", "twelve"]),
  gap: z.enum(["none", "xs", "sm", "md", "lg", "xl"]),
});

export const blogDetailSettingsSchema = z.object({
  page: z.object({ template: z.literal("lead-content") }),
  section: z.object({ id: z.string().min(1), settings: sectionSettingsSchema }),
  header: z.object({
    template: z.literal("editorial"),
    breadcrumbLabel: z.string().min(1),
    collectionLabel: z.string().min(1),
    routes: z.object({ base: z.string().min(1), categoryBase: z.string().min(1), tagBase: z.string().min(1) }),
    imageWidth: z.number().int().positive(),
    imageHeight: z.number().int().positive(),
    authorImage: z.object({ src: z.string().min(1), width: z.number().int().positive(), height: z.number().int().positive() }),
    share: z.object({
      label: z.string().min(1),
      twitterLabel: z.string().min(1),
      linkedinLabel: z.string().min(1),
      copyLabel: z.string().min(1),
    }),
  }),
  sidebar: z.object({
    label: z.string().min(1),
    position: z.enum(["start", "end"]),
    sticky: z.boolean(),
    columns: columnsSchema,
    author: z.object({
      label: z.string().min(1),
      role: z.string().min(1),
      bio: z.string().min(1),
      actionLabel: z.string().min(1),
    }),
    toc: z.object({
      label: z.string().min(1),
      appearance: z.enum(["plain", "panel"]),
    }),
    relatedTitle: z.string().min(1),
    relatedLimit: z.number().int().positive().max(8),
    relatedCards: z.object({
      separator: z.string().min(1),
      metadataDisplay: z.literal("text"),
      imageWidth: z.number().int().positive(),
      imageHeight: z.number().int().positive(),
      box: z.object({
        surface: z.enum(["plain", "accent", "bordered", "canvas", "dark", "glass", "glass-dark", "soft"]),
        radius: z.enum(["none", "md", "lg"]),
        spacing: z.enum(["none", "xs", "sm", "md", "lg", "xl"]),
      }),
      columns: columnsSchema,
      heading: z.object({
        appearance: z.enum(["default", "compact"]),
        level: z.union([z.literal(1), z.literal(2), z.literal(3), z.literal(4), z.literal(5), z.literal(6)]),
      }),
      card: z.object({
        template: z.literal("compact-media"),
        layout: z.literal("list"),
        columns: z.literal(1),
        gap: z.enum(["none", "sm", "md", "lg", "xl"]),
        slots: z.object({
          excerpt: z.boolean(),
          tags: z.boolean(),
          metrics: z.boolean(),
          action: z.boolean(),
        }),
      }),
    }),
    newsletter: z.object({
      template: z.literal("form-first"),
      title: z.string().min(1),
      description: z.string().min(1),
      image: z.object({ src: z.string().min(1), alt: z.string(), width: z.number().int().positive(), height: z.number().int().positive() }),
      action: z.object({ href: z.string().min(1), label: z.string().min(1), icon: z.literal("arrowRight") }),
      form: z.object({
        formName: z.string().min(1),
        inputId: z.string().min(1),
        inputLabel: z.string().min(1),
        placeholder: z.string().min(1),
        submitLabel: z.string().min(1),
      }),
    }),
  }),
  content: z.object({
    template: z.literal("rich-text"),
    columns: columnsSchema,
  }),
});
