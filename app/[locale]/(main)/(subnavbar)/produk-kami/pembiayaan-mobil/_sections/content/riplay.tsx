"use client";

import { Text } from "@/components/html/text";
import { Button } from "@/components/ui/button";
import { api } from "@/trpc/react";
import { Locale } from "next-intl";
import Link from "next/link";

type Props = {
  l: Locale;
};

export default function RiplayTabs({ l }: Props) {
  const { data, isLoading } = api.main.riplay.list.useQuery({ lang: l });

  return (
    <article className="w-full h-full flex flex-col py-3 gap-5">
      <section className="flex flex-col gap-3">
        <Text variant="display-md">RIPLAY</Text>
        <Text variant="body-lg-regular">
          Download Ringkasan Informasi Produk dan Layanan (RIPLAY) sebagai
          informasi kepada seluruh debitur Woori Finance
        </Text>
      </section>

      <section className="w-[30vw] flex justify-between items-center gap-5">
        {data?.data.map((e) => (
          <Link href={`/api/files${e.fileUrl}`} target="_blank" key={e.id}>
            <Button
              variant="woori"
              className="p-5 rounded-lg"
              disabled={isLoading}
            >
              {e.name![l]}
            </Button>
          </Link>
        ))}
      </section>
    </article>
  );
}
