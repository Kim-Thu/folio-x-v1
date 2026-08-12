import { z } from "astro/zod";

const sectionSettingsSchema = z.object({
  theme: z.enum(["dark", "light", "canvas", "accent", "none"]),
  spacing: z.enum(["compact", "default", "none", "lead", "body", "closing"]),
  container: z.enum(["site", "content", "none"]),
});

export const blogDetailSettingsSchema = z.object({
  page: z.object({ template: z.enum(["fluid", "contained", "boxed", "sidebar", "centered"]) }),
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
    author: z.object({
      label: z.string().min(1),
      role: z.string().min(1),
      bio: z.string().min(1),
      actionLabel: z.string().min(1),
    }),
    tocLabel: z.string().min(1),
    relatedTitle: z.string().min(1),
    relatedLimit: z.number().int().positive().max(8),
    relatedCards: z.object({
      separator: z.string().min(1),
      metadataDisplay: z.literal("text"),
      imageWidth: z.number().int().positive(),
      imageHeight: z.number().int().positive(),
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
  content: z.object({ template: z.literal("flow") }),
});
