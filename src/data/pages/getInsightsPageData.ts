import { getArchiveSettings, getInsights, getPage } from "@/data/cms";
import { mapInsightToCard } from "@/data/mappers/card";
import type { InsightsPageData } from "@/types/components/pages/insights/InsightsPage.types";

export interface InsightsPageSelection {
  category?: string;
  tag?: string;
}

export async function getInsightCategoryPaths() {
  const insights = await getInsights();
  return Array.from(
    new Set(insights.map((insight) => insight.categorySlug)),
  ).map((categorySlug) => ({
    params: { category: categorySlug },
    props: { categorySlug },
  }));
}

export async function getInsightTagPaths() {
  const insights = await getInsights();
  return Array.from(
    new Set(insights.flatMap((insight) => insight.tags.map((tag) => tag.slug))),
  ).map((tagSlug) => ({
    params: { tag: tagSlug },
    props: { tagSlug },
  }));
}

export async function getInsightsPageData(
  selection: InsightsPageSelection = {},
): Promise<InsightsPageData> {
  const [insights, archive, page] = await Promise.all([
    getInsights(),
    getArchiveSettings(),
    getPage("/blog"),
  ]);
  const section = page.content.sections.find((item) => item.id === "blog-archive");
  if (!section) throw new Error("Missing blog archive section");
  const content = section.content as unknown as {
    hero: { eyebrow: string; title: string; accent: string; image: { src: string; alt: string; width: number; height: number } };
    labels: Record<string, string>;
    newsletter: { image: { src: string; alt: string; width: number; height: number }; href: string };
    cards: { template: string; layout: string; columns: number; gap: string; pageSize: number; slots: Record<string, boolean> };
  };
  const labels = content.labels;
  const categories = Array.from(
    new Map(
      insights.map((insight) => [
        insight.categorySlug,
        { label: insight.category, slug: insight.categorySlug },
      ]),
    ).values(),
  );
  const tags = Array.from(
    new Map(
      insights.flatMap((insight) => insight.tags.map((tag) => [tag.slug, tag])),
    ).values(),
  );
  const selectedCategory = categories.find(
    (category) => category.slug === selection.category,
  );
  const selectedTag = tags.find((tag) => tag.slug === selection.tag);
  const visibleInsights = insights.filter(
    (insight) =>
      (!selection.category || insight.categorySlug === selection.category) &&
      (!selection.tag ||
        insight.tags.some((tag) => tag.slug === selection.tag)),
  );
  const separator = "·";

  return {
    metadata: {
      title: selectedCategory?.label ?? selectedTag?.label ?? page.meta.title,
      description: page.meta.description ?? archive.blog.description,
    },
    builder: {
      layout: { template: "fluid" },
      regions: [
        {
          key: "lead",
          component: "page-header",
          placement: "header",
          section: {
            id: "insights-hero",
            theme: "canvas",
            spacing: "lead",
            container: "site",
          },
          props: {
            template: "split-benefits",
            data: {
              id: "insights-hero",
              eyebrow: content.hero.eyebrow,
              title: content.hero.title,
              accent: content.hero.accent,
              description: page.meta.description ?? archive.blog.description,
              benefits: {
                items: [
                  { icon: "folder01", label: `${insights.length} articles` },
                  { icon: "lightBulb", label: `${categories.length} topics` },
                  {
                    icon: "clock01",
                    label: `${insights.reduce((total, item) => total + Number(item.duration.slice(2, -1)), 0)} min`,
                  },
                ],
              },
              image: {
                ...content.hero.image,
              },
            },
          },
        },
        {
          key: "archive",
          component: "archive",
          section: {
            id: "insights",
            theme: "canvas",
            spacing: "body",
            container: "site",
          },
          props: {
            mode: "faceted",
            toolbar: {
              data: {
                search: {
                  id: "insights-search",
                  label: labels.search,
                  name: "search",
                  placeholder: labels.placeholder,
                },
                selects: [
                  {
                    control: "category",
                    id: "insights-category",
                    label: labels.allTopics,
                    value: selection.category ?? "all",
                    options: [
                      { label: labels.allTopics, value: "all" },
                      ...categories.map((category) => ({
                        label: category.label,
                        value: category.slug,
                      })),
                    ],
                  },
                ],
                sort: {
                  label: labels.newest,
                  value: "newest",
                  options: [
                    { label: "Newest", value: "newest" },
                    { label: "Oldest", value: "oldest" },
                  ],
                },
                view: {
                  label: "Article view",
                  gridLabel: "Grid view",
                  listLabel: "List view",
                },
              },
            },
            sidebar: {
              label: "Insight navigation",
              filter: {
                data: {
                  groups: [
                    {
                      appearance: "navigation",
                      control: "category",
                      legend: "Topics",
                      name: "insight-category",
                      type: "radio",
                      options: [
                        {
                          label: "All",
                          value: "all",
                          href: "/blog",
                          count: insights.length,
                          checked: !selectedCategory,
                        },
                        ...categories.map((category) => ({
                          label: category.label,
                          value: category.slug,
                          href: `/blog/category/${category.slug}`,
                          count: insights.filter(
                            (insight) => insight.categorySlug === category.slug,
                          ).length,
                          checked: category.slug === selectedCategory?.slug,
                        })),
                      ],
                    },
                  ],
                },
              },
              cardsHeader: {
                data: { title: labels.featured },
                appearance: "compact",
                headingLevel: 2,
              },
              cards: {
                template: "compact-media",
                layout: "list",
                columns: 1,
                gap: "sm",
                items: insights.slice(0, 4).map((insight) => ({
                  ...mapInsightToCard(insight, separator),
                  excerpt: undefined,
                })),
                slots: {
                  excerpt: false,
                  tags: false,
                },
              },
              advertisement: {
                template: "form-first",
                data: {
                  title: labels.newsletterTitle,
                  description: labels.newsletterDescription,
                  image: content.newsletter.image,
                  action: {
                    label: labels.subscribe,
                    href: content.newsletter.href,
                  },
                  form: {
                    formName: "insights-sidebar-newsletter",
                    inputId: "insights-sidebar-email",
                    inputLabel: labels.email,
                    placeholder: labels.emailPlaceholder,
                    submitLabel: labels.subscribe,
                    tone: "dark",
                  },
                },
              },
            },
            result: {
              header: {
                appearance: "compact",
                data: { title: labels.allArticles },
                headingLevel: 2,
              },
            },
            cards: {
              template: "editorial",
              layout: "grid",
              columns: 3,
              gap: "sm",
              items: visibleInsights.map((insight) =>
                mapInsightToCard(insight, separator),
              ),
              slots: { tags: false, action: false },
            },
            emptyLabel: labels.empty,
            pagination: {
              label: "Article pages",
              previousLabel: "Previous page",
              nextLabel: "Next page",
              pageSize: content.cards.pageSize,
              totalPages: Math.max(1, Math.ceil(visibleInsights.length / content.cards.pageSize)),
            },
          },
        },
        {
          key: "newsletter",
          component: "cta",
          placement: "cta",
          section: {
            id: "insights-newsletter",
            theme: "canvas",
            spacing: "compact",
            container: "site",
          },
          props: {
            template: "subscription",
            data: {
              id: "insights-newsletter",
              title: labels.newsletterTitle,
              description: labels.newsletterDescription,
              action: {
                label: labels.subscribe,
                href: content.newsletter.href,
              },
              image: {
                ...content.newsletter.image,
              },
              form: {
                formName: "insights-newsletter",
                inputId: "insights-newsletter-email",
                inputLabel: labels.email,
                placeholder: labels.emailPlaceholder,
                submitLabel: labels.subscribe,
                  tone: "light",
              },
            },
          },
        },
      ],
    },
  };
}
