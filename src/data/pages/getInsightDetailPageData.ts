import { getInsights } from "@/data/cms";
import { mapInsightToCard } from "@/data/mappers/card";
import type { InsightDetailPageData } from "@/types/components/pages/insight-detail/InsightDetailPage.types";

export async function getInsightDetailPaths() {
  const insights = await getInsights();
  return insights.map((post) => ({
    params: { slug: post.slug },
    props: { slug: post.slug },
  }));
}

export async function getInsightDetailPageData(
  slug: string,
): Promise<InsightDetailPageData> {
  const insights = await getInsights();
  const post = insights.find((insight) => insight.slug === slug);
  if (!post) throw new Error(`Unknown insight slug: ${slug}`);

  const content = post.content.map((item) =>
    item.type === "image"
      ? { type: "image" as const, image: item.image }
      : { ...item },
  );
  const tocItems = content
    .filter((item) => item.type === "heading")
    .map((item, index) => ({
      label: `${index + 1}. ${item.text}`,
      href: `#${item.id}`,
    }));
  const shareUrl = new URL(
    post.href,
    import.meta.env.SITE ?? "https://folio-x-v1.netlify.app",
  ).toString();
  const encodedShareUrl = encodeURIComponent(shareUrl);
  const encodedTitle = encodeURIComponent(post.title);
  const separator = "·";
  const related = insights
    .filter((insight) => insight.slug !== post.slug)
    .slice(0, 4)
    .map((insight) => ({
      ...mapInsightToCard(insight, separator),
      excerpt: undefined,
    }));

  return {
    post: {
      title: post.title,
      excerpt: post.excerpt,
    },
    builder: {
      layout: { template: "fluid" },
      regions: [
        {
          key: "article-layout",
          component: "group",
          section: {
            id: "article-layout",
            theme: "canvas",
            spacing: "lead",
            container: "site",
          },
          props: {
            template: "sidebar",
            asideLabel: "Article information",
            gap: "sm",
            asidePosition: "end",
            stickyAside: false,
            regions: [
              {
                key: "summary",
                component: "page-header",
                section: false,
                props: {
                  template: "editorial",
                  data: {
                    breadcrumb: {
                      label: "Breadcrumb",
                      items: [
                        { label: "Stories", href: "/blog" },
                        {
                          label: post.category,
                          href: `/blog/category/${post.categorySlug}`,
                        },
                      ],
                      current: post.title,
                    },
                    category: {
                      label: post.category,
                      href: `/blog/category/${post.categorySlug}`,
                    },
                    title: post.title,
                    description: post.excerpt,
                    author: post.author,
                    authorImage: {
                      src: "/uploads/avatar-placehoder.png",
                      alt: post.author,
                      width: 160,
                      height: 160,
                    },
                    publishedAt: post.publishedAt,
                    publishedLabel: post.publishedLabel,
                    readTime: post.readTime,
                    image: {
                      src: post.image ?? "/uploads/page-header-insight.png",
                      alt: post.imageAlt,
                      width: 1400,
                      height: 900,
                    },
                    share: {
                      label: "Share article",
                      links: [
                        {
                          label: `Share ${post.title} on Twitter`,
                          href: `https://twitter.com/intent/tweet?url=${encodedShareUrl}&text=${encodedTitle}`,
                          icon: "twitter",
                        },
                        {
                          label: `Share ${post.title} on Facebook`,
                          href: `https://www.facebook.com/sharer/sharer.php?u=${encodedShareUrl}`,
                          icon: "facebook",
                        },
                        {
                          label: `Share ${post.title} on LinkedIn`,
                          href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedShareUrl}`,
                          icon: "linkedin",
                        },
                        {
                          label: `Open ${post.title} link`,
                          href: shareUrl,
                          icon: "link",
                        },
                      ],
                    },
                  },
                },
              },
              {
                key: "article",
                component: "article",
                section: false,
                props: {
                  template: "flow",
                  content,
                },
              },
              {
                key: "author",
                component: "profile",
                placement: "aside",
                section: false,
                props: {
                  label: "Author",
                  name: post.author,
                  role: "Product and systems writer",
                  bio: "Writing about maintainable products, design systems, and dependable engineering.",
                  image: {
                    src: "/uploads/avatar-placehoder.png",
                    alt: post.author,
                    width: 160,
                    height: 160,
                  },
                  action: {
                    label: "View all articles",
                    href: "/blog",
                  },
                },
              },
              {
                key: "table-of-contents",
                component: "toc",
                placement: "aside",
                section: false,
                props: {
                  label: "Article contents",
                  items: tocItems,
                  appearance: "panel",
                  sticky: true,
                },
              },
              {
                key: "related",
                component: "cards",
                placement: "aside",
                section: false,
                props: {
                  panel: true,
                  header: {
                    data: { title: "Related articles" },
                    appearance: "compact",
                    headingLevel: 2,
                  },
                  cards: {
                    template: "compact-media",
                    layout: "list",
                    columns: 1,
                    gap: "sm",
                    items: related,
                    slots: {
                      excerpt: false,
                      tags: false,
                    },
                  },
                  action: {
                    label: "View all articles",
                    href: "/blog",
                    icon: "arrowRight",
                    variant: "outline",
                    tone: "light",
                    size: "sm",
                  },
                },
              },
              {
                key: "newsletter",
                component: "advertisement",
                placement: "aside",
                section: false,
                props: {
                  template: "form-first",
                  data: {
                    title: "Get new articles by email",
                    description:
                      "Selected notes about design, engineering, and product systems.",
                    image: {
                      src: "/uploads/ads-1.png",
                      alt: "",
                      width: 1402,
                      height: 1122,
                    },
                    action: {
                      label: "Subscribe",
                      href: "mailto:thunk.work.91@gmail.com",
                    },
                    form: {
                      formName: "article-sidebar-newsletter",
                      inputId: "article-sidebar-email",
                      inputLabel: "Email address",
                      placeholder: "Your email...",
                      submitLabel: "Subscribe",
                      tone: "dark",
                    },
                  },
                },
              },
            ],
          },
        },
      ],
    },
  };
}
