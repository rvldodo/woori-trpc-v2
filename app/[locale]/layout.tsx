import type { Metadata } from "next";
import "../../styles/globals.css";
import { routing } from "@/i18n/routing";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { getMetadata } from "../metadata";
import { PATHS } from "../urls";
import { Suspense } from "react";
import { noto } from "@/styles/fonts";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import TRPCReactProvider from "@/trpc/react";
// import { Navbar } from "@/components/example-navbar";
import Navbar from "@/components/main-navbar";
import { Footer } from "@/components/footer";
import ScrollToTop from "@/components/scroll-to-top";
import ReduxProvider from "@/store/provider";

export const dynamic = "force-dynamic";

export const generateStaticParams = () => {
  return routing.locales.map((locale) => ({ locale }));
};

export const generateMetadata = async (
  props: LayoutProps<"/[locale]">,
): Promise<Metadata> => {
  const { locale } = await props.params;

  return await getMetadata({
    path: PATHS.home.base,
    locale,
  });
};

export default async function LocaleLayout(props: LayoutProps<"/[locale]">) {
  const { locale } = await props.params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);

  return (
    <html
      lang={locale}
      suppressHydrationWarning
      className={`${noto.variable} font-noto antialiased`}
    >
      <body className={`antialiased`}>
        <NextIntlClientProvider locale={locale}>
          <TRPCReactProvider>
            <NuqsAdapter>
              <article className="min-h-screen min-w-screen">
                <Navbar />
                <ScrollToTop />
                <Suspense>
                  <ReduxProvider>{props.children}</ReduxProvider>
                </Suspense>
                <Footer className="w-full md:mb-0 mb-32" />
              </article>
            </NuqsAdapter>
          </TRPCReactProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
