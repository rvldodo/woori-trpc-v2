"use client";

import Img from "@/components/html/img";
import { Text } from "@/components/html/text";
import { TextHTML } from "@/components/html/text-html";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Spinner } from "@/components/ui/spinner";
import { api } from "@/trpc/react";
import { skipToken } from "@tanstack/react-query";
import { Locale } from "next-intl";

type Props = { id: string | null; close: () => void; l: Locale };

export default function BoardDetail({ id, close, l }: Props) {
  const show = !!id;

  const { data, isLoading } = api.main.boards.detail.useQuery(
    id ? { id: String(id) } : skipToken,
  );

  return (
    <Dialog open={show} onOpenChange={close}>
      <DialogTitle></DialogTitle>
      <DialogContent className="max-w-4xl max-h-3xl flex-col gap-5 justify-start items-center">
        {isLoading || !data?.data ? (
          <div>
            <Spinner />
          </div>
        ) : (
          <>
            <div className="flex items-center gap-6">
              <Img
                src={`/api/files${data?.data.imgUrl}`}
                alt={data?.data.title?.[l] ?? ""}
                width={250}
                height={250}
                className="rounded-full"
              />
              <div className="flex flex-col gap-3">
                <Text variant="body-lg-semi">{data?.data.name}</Text>
                <Text variant="body-lg-medium">
                  {data?.data.title?.[l] ?? ""}
                </Text>
              </div>
            </div>
            <TextHTML
              variant="body-lg-regular"
              html={data?.data.text?.[l] ?? ""}
            />
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
