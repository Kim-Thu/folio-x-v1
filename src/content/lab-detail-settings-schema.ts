import { z } from "astro/zod";

const iconSchema = z.enum([
  "arrowLeft", "arrowRight", "arrowUp", "arrowUpRight", "arrowPath", "archiveBox", "bars3", "bolt", "chevronLeft", "chevronDown", "chevronRight", "github", "globeAlt", "lightBulb", "linkedin", "xMark", "folder01", "facebook", "link", "twitter", "userCircle", "calendar03", "check", "clock01", "gridView", "listView", "play", "search", "shoppingBag", "star", "questionMarkCircle", "bookOpen", "bookmark", "eye", "lockClosed", "adjustmentsHorizontal", "moon", "handThumbUp", "heart", "faceSmile", "faceFrown",
]);
const gapSchema = z.enum(["none", "xs", "sm", "md", "lg", "xl"]);
const sectionSettingsSchema = z.object({ theme: z.enum(["dark", "light", "canvas", "accent", "none"]), spacing: z.enum(["compact", "default", "none", "lead", "body", "closing"]), container: z.enum(["site", "content", "none"]) });
const stackSchema = z.object({ columns: z.literal("one"), gap: gapSchema });
const sectionHeaderSchema = z.object({ appearance: z.enum(["default", "compact"]), headingLevel: z.union([z.literal(1), z.literal(2), z.literal(3), z.literal(4), z.literal(5), z.literal(6)]) });
const classSchema = z.string().min(1);
const copySchema = z.object({ stack: stackSchema, headingLevel: z.literal(3), headingVariant: z.literal("h5"), bodyVariant: z.literal("body-sm"), bodyTone: z.literal("muted") });

export const labDetailSettingsSchema = z.object({
  page: z.object({ template: z.enum(["fluid", "contained", "boxed", "sidebar", "centered"]) }),
  header: z.object({
    id: z.string().min(1), template: z.literal("media-aside"), settings: sectionSettingsSchema,
    labels: z.object({ breadcrumb: z.string().min(1), collection: z.string().min(1), actionsTemplate: z.string().includes("{title}"), live: z.string().min(1), source: z.string().min(1) }),
    routes: z.object({ base: z.string().min(1), categoryBase: z.string().min(1), technologyBase: z.string().min(1) }),
    metrics: z.array(z.object({ icon: iconSchema, source: z.enum(["stars", "forks", "updatedLabel"]) })).min(1),
    actions: z.object({ live: z.object({ icon: iconSchema, variant: z.enum(["primary", "outline"]) }), source: z.object({ icon: iconSchema, variant: z.enum(["primary", "outline"]) }) }),
  }),
  navigation: z.object({ labelTemplate: z.string().includes("{title}"), settings: sectionSettingsSchema, appearance: z.literal("underline"), tone: z.literal("light"), frameClass: classSchema }),
  content: z.object({ id: z.string().min(1), settings: sectionSettingsSchema, article: z.object({ template: z.literal("flow"), frameClass: classSchema }) }),
  sidebar: z.object({
    labelTemplate: z.string().includes("{title}"), position: z.enum(["start", "end"]), sticky: z.boolean(), stack: stackSchema,
    panel: z.object({ surface: z.enum(["plain", "accent", "bordered", "canvas", "dark", "glass", "glass-dark", "soft"]), radius: z.enum(["none", "md", "lg"]), spacing: gapSchema, stack: stackSchema, dividerClass: classSchema }),
    labels: z.object({ projectInformation: z.string().min(1), technologyTemplate: z.string().includes("{title}") }), header: sectionHeaderSchema,
  }),
  gallery: z.object({
    id: z.string().min(1), title: z.string().min(1), openImageLabelTemplate: z.string().includes("{index}"), imageTitleLabelTemplate: z.string().includes("{index}"), settings: sectionSettingsSchema, stack: stackSchema, header: sectionHeaderSchema,
    gridClass: classSchema, linkClass: classSchema, mediaRatio: z.literal("editorial"), imageVariant: z.literal("fill"), imageClass: classSchema, captionClass: classSchema, captionVariant: z.literal("caption"), captionTone: z.literal("muted"),
  }),
  resources: z.object({
    id: z.string().min(1), title: z.string().min(1), actionIcon: iconSchema, settings: sectionSettingsSchema, stack: stackSchema, header: sectionHeaderSchema, gridClass: classSchema,
    card: z.object({ surface: z.literal("bordered"), radius: z.literal("md"), spacing: z.literal("md"), stack: stackSchema }),
    row: z.object({ align: z.literal("center"), justify: z.literal("between"), gap: z.literal("md") }), iconClass: classSchema,
    action: z.object({ size: z.literal("xs"), variant: z.literal("outline"), tone: z.literal("light") }), copy: copySchema,
  }),
  related: z.object({
    id: z.string().min(1), title: z.string().min(1), actionLabel: z.string().min(1), actionIcon: iconSchema, metricIcon: iconSchema, settings: sectionSettingsSchema, stack: stackSchema, header: sectionHeaderSchema, gridClass: classSchema, linkClass: classSchema,
    card: z.object({ surface: z.literal("bordered"), radius: z.literal("md"), overflow: z.literal("hidden"), class: classSchema }), mediaRatio: z.literal("editorial"), imageVariant: z.literal("fill"), contentClass: classSchema,
    copy: copySchema, metaRow: z.object({ justify: z.literal("between"), align: z.literal("center"), gap: z.literal("sm"), metadataTone: z.literal("brand"), metricAppearance: z.literal("caption") }),
  }),
});
