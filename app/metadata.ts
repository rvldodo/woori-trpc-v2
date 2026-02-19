import type { Metadata } from "next";
import type { Locale } from "next-intl";
import { LOCALES, MAIN_DESCRIPTION, MAIN_TITLE } from "@/lib/constants";

type Props = {
  path?: string;
  locale: Locale | string;
  description?: string | null;
  title?: string | null;
  imageUrl?: string | null;
  keywords?: string[] | null;
  openGraphArticle?: {
    publishedTime?: string;
    modifiedTime?: string;
    expirationTime?: string;
    section?: null | string;
  };
};

export const getMetadata = async ({
  locale,
  title,
  description,
  imageUrl,
  openGraphArticle,
  keywords,
  path,
}: Props): Promise<Metadata> => {
  // Define base values
  const mainTitle = MAIN_TITLE;
  const mainDescription = MAIN_DESCRIPTION;
  const mainUrl = process.env.NEXT_PUBLIC_URL || "https://yourdomain.com";

  // Build updated title and description
  const updatedTitle = title || mainTitle;
  const updatedDescription = description || mainDescription;

  // Build keywords array
  const words = keywords && keywords.length > 0 ? keywords : undefined;

  // Build URL
  const url = `${mainUrl}${path}`;

  // Build images array
  const images = imageUrl
    ? [{ url: imageUrl, alt: updatedTitle }]
    : [{ url: `${mainUrl}/og-image.png`, alt: mainTitle }];

  // Determine Open Graph type
  const openGraphType = openGraphArticle
    ? {
        type: "article" as const,
        publishedTime: openGraphArticle.publishedTime,
        modifiedTime: openGraphArticle.modifiedTime,
        expirationTime: openGraphArticle.expirationTime,
        section: openGraphArticle.section,
      }
    : { type: "website" as const };

  return {
    generator: mainTitle,
    applicationName: mainTitle,
    creator: mainTitle,
    publisher: mainTitle,
    referrer: "origin-when-cross-origin",
    authors: [{ name: mainTitle, url: mainUrl }],
    metadataBase: new URL(mainUrl),
    alternates: { canonical: path },
    title: { default: updatedTitle, template: `%s | ${mainTitle}` },
    description: updatedDescription,
    keywords: words,
    openGraph: {
      title: { default: updatedTitle, template: `%s | ${mainTitle}` },
      description: updatedDescription,
      url,
      siteName: mainTitle,
      images,
      locale: LOCALES[locale as Locale]
        ? LOCALES[locale as Locale].locale.split("-").join("_")
        : "en_US",
      ...(words && { tags: words }),
      ...openGraphType,
    },
    twitter: {
      card: "summary_large_image",
      title: { default: updatedTitle, template: `%s | ${mainTitle}` },
      description: updatedDescription,
      images,
    },
    robots: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    appleWebApp: {
      capable: true,
      title: mainTitle,
      statusBarStyle: "default",
    },
  };
};
