import { getProductCategories, getProducts, getPage } from "@/data/cms";
import { mapProductToCard } from "@/data/mappers/card";
import type { ProductsPageData } from "@/types/components/pages/products/ProductsPage.types";
import type { PAdvertisementData } from "@/types/components/object/project/advertisement/PAdvertisement.types";
import type { PCtaData } from "@/types/components/object/project/cta/PCta.types";
import type { PFilterPanelData } from "@/types/components/object/project/filter-panel/PFilterPanel.types";
import type { PPageHeaderSplitBenefitsData } from "@/types/components/object/project/page-header/PPageHeader.types";
import type { CFeatureData } from "@/types/components/object/component/CFeature.types";

export interface ProductsPageQuery {
  categorySlug?: string;
}

interface ProductsPageCopy {
  hero: {
    id: string; eyebrow: string; title: string; accent: string; description: string;
    benefits: Array<{ label: string; icon: string }>;
    image: { src: string; alt: string; width: number; height: number };
  };
  catalog: {
    filterLabel: string;
    resultLabel: string;
    emptyLabel: string;
    searchLabel: string;
    searchPlaceholder: string;
    categoryLabel: string;
    platformLabel: string;
    sortLabel: string;
    sortOptions: Array<{ label: string; value: string }>;
    viewLabel: string;
    gridViewLabel: string;
    listViewLabel: string;
    paginationLabel: string;
    previousLabel: string;
    nextLabel: string;
    pageSize: number;
    priceLabel: string;
    licenseLabel: string;
    freeLabel: string;
    proLabel: string;
    ratingsLabel: string;
  };
  access: {
    id: string; title: string; description: string; actionLabel: string;
    image: { src: string; alt: string; width: number; height: number };
    features: Array<{ icon: string; label: string }>;
    price: { current: string; period: string; previous?: string };
  };
  advertisement: PAdvertisementData;
}

export async function getProductsPageData(
  query: ProductsPageQuery = {},
): Promise<ProductsPageData> {
  const page = await getPage("/products");
  const products = await getProducts();
  const categoryFilters = await getProductCategories();
  const copySection = page.content.sections.find((section) => section.id === "products-copy");
  if (!copySection) throw new Error("Missing products copy section");
  const copy = copySection.content as unknown as ProductsPageCopy;
  const heroCopy = copy.hero;
  const catalogCopy = copy.catalog;
  const accessCopy = copy.access;
  const platformValues = [
    "WordPress",
    "Figma",
    "HTML / Tailwind",
    "React / Next.js",
    "Other",
  ];
  const visibleProducts = query.categorySlug
    ? products.filter((product) => product.categorySlug === query.categorySlug)
    : products;

  const categoryOptions = categoryFilters.map(({ value, label }) => ({
    label,
    value,
    count:
      value === "all"
        ? products.length
        : products.filter((product) => product.categorySlug === value).length,
    checked: query.categorySlug ? value === query.categorySlug : value === "all",
  }));

  const hero = {
      id: heroCopy.id,
      eyebrow: heroCopy.eyebrow,
      title: heroCopy.title,
      accent: heroCopy.accent,
      description: heroCopy.description,
      benefits: {
        items: heroCopy.benefits.map((item) => ({ ...item, icon: item.icon as PPageHeaderSplitBenefitsData["benefits"]["items"][number]["icon"] })),
      },
      image: heroCopy.image,
    } satisfies PPageHeaderSplitBenefitsData;
  const catalog = {
      filterLabel: catalogCopy.filterLabel,
      resultLabel: catalogCopy.resultLabel,
      emptyLabel: catalogCopy.emptyLabel,
      toolbar: {
        search: {
          id: "product-search",
          label: catalogCopy.searchLabel,
          name: "search",
          placeholder: catalogCopy.searchPlaceholder,
        },
        selects: [
          {
            control: "category",
            id: "product-category",
            label: catalogCopy.categoryLabel,
            value: query.categorySlug ?? "all",
            options: categoryFilters.map(({ value, label }, index) => ({
              value,
              label: index === 0 ? catalogCopy.categoryLabel : label,
            })),
          },
          {
            control: "platform",
            id: "product-platform",
            label: catalogCopy.platformLabel,
            value: "all",
            options: [
              { label: "All platforms", value: "all" },
              ...platformValues.map((value) => ({ label: value, value })),
            ],
          },
        ],
        sort: {
          label: catalogCopy.sortLabel,
          value: "newest",
          options: catalogCopy.sortOptions,
        },
        view: {
          label: catalogCopy.viewLabel,
          gridLabel: catalogCopy.gridViewLabel,
          listLabel: catalogCopy.listViewLabel,
        },
      },
      filters: {
        category: {
          appearance: "navigation",
          control: "category",
          legend: catalogCopy.categoryLabel,
          name: "product-category",
          options: categoryOptions,
          type: "radio",
        },
        filterLabel: catalogCopy.filterLabel,
        platform: {
          appearance: "controls",
          control: "platform",
          legend: catalogCopy.platformLabel,
          name: "product-platforms",
          options: platformValues.map((value) => ({
            label: value,
            value,
            count: products.filter((product) => product.platform === value)
              .length,
          })),
          type: "checkbox",
        },
        range: {
          id: "product-price",
          label: catalogCopy.priceLabel,
          name: "price",
          min: 0,
          max: 99,
          value: 99,
          maxSuffix: "+",
          prefix: "$",
        },
        license: {
          appearance: "controls",
          control: "license",
          legend: catalogCopy.licenseLabel,
          name: "product-license",
          options: [
            { label: catalogCopy.freeLabel, value: "free", count: 0 },
            { label: catalogCopy.proLabel, value: "pro", count: products.length },
          ],
          type: "checkbox",
        },
        ratings: {
          legend: catalogCopy.ratingsLabel,
          name: "product-ratings",
          options: [5, 4, 3, 2, 1].map((value) => ({
            value,
            count: products.filter((product) => product.rating >= value).length,
          })),
        },
      } satisfies PFilterPanelData,
      advertisement: copy.advertisement,
      pagination: {
        label: catalogCopy.paginationLabel,
        previousLabel: catalogCopy.previousLabel,
        nextLabel: catalogCopy.nextLabel,
        pageSize: catalogCopy.pageSize,
        totalPages: Math.max(1, Math.ceil(visibleProducts.length / catalogCopy.pageSize)),
      },
      items: visibleProducts.map(mapProductToCard),
    };
  const access = {
      id: accessCopy.id,
      title: accessCopy.title,
      description: accessCopy.description,
      action: {
        href: "mailto:hello@nkt.studio",
        label: accessCopy.actionLabel,
      },
      image: accessCopy.image,
      features: {
        items: accessCopy.features.map((item): CFeatureData => ({ ...item, icon: item.icon as CFeatureData["icon"] })),
      },
      price: {
        current: accessCopy.price.current,
        period: accessCopy.price.period,
        previous: accessCopy.price.previous,
      },
    } satisfies PCtaData;

  return {
    metadata: {
      title: page.meta.title,
      description: page.meta.description ?? heroCopy.description,
    },
    builder: {
      layout: {
        template: "fluid",
      },
      regions: [
        {
          key: "lead",
          component: "page-header",
          placement: "header",
          section: {
            id: hero.id,
            theme: "canvas",
            spacing: "lead",
            container: "site",
          },
          props: {
            template: "split-benefits",
            data: hero,
          },
        },
        {
          key: "catalog",
          component: "archive",
          section: {
            id: "products",
            theme: "canvas",
            spacing: "body",
            container: "site",
          },
          props: {
            mode: "faceted",
            toolbar: {
              data: catalog.toolbar,
            },
            sidebar: {
              label: catalog.filterLabel,
              filter: {
                data: catalog.filters,
              },
              advertisement: {
                data: catalog.advertisement,
              },
            },
            result: {
              count: catalog.items.length,
              label: catalog.resultLabel,
            },
            cards: {
              template: "media-details",
              layout: "grid",
              columns: 3,
              gap: "md",
              items: catalog.items,
            },
            emptyLabel: catalog.emptyLabel,
            pagination: catalog.pagination,
          },
        },
        {
          key: "membership",
          component: "cta",
          placement: "cta",
          section: {
            id: access.id,
            theme: "canvas",
            spacing: "closing",
            container: "site",
          },
          props: {
            template: "media-pricing",
            data: access,
          },
        },
      ],
    },
  };
}

export async function getProductCategoryPaths() {
  return getProducts().then((products) => Array.from(
    new Set(products.map((product) => product.categorySlug)),
    (categorySlug) => ({
      params: { category: categorySlug },
      props: { categorySlug },
    }),
  ));
}
