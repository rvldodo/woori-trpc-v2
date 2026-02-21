"use client";

import Img from "@/components/html/img";
import { Text } from "@/components/html/text";
import { TextHTML } from "@/components/html/text-html";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useModalState } from "@/hooks/useModalState";
import { api } from "@/trpc/react";
import { Locale } from "next-intl";
import { parseAsStringEnum, useQueryStates } from "nuqs";
import { Fragment } from "react/jsx-runtime";
import BoardDetail from "../detail";

type Props = { l: Locale };

export default function DewanDireksiSection({ l }: Props) {
  const [filter, setFilter] = useQueryStates({
    manajemen: parseAsStringEnum(["direksi", "komisaris"]).withDefault(
      "direksi",
    ),
  });

  const { modal, onChangeModal } = useModalState();

  const { data: wording, isLoading: wordingLoading } =
    api.main.boards.wording.useQuery();
  const { data: types, isLoading: typesLoading } =
    api.main.boards.types.useQuery();
  const { data: direksi, isLoading: direksiLoading } =
    api.main.boards.direksi.useQuery();
  const { data: komisaris, isLoading: komisarisLoading } =
    api.main.boards.komisaris.useQuery();

  const isLoading =
    wordingLoading || typesLoading || direksiLoading || komisarisLoading;

  if (isLoading) return null;

  return (
    <Fragment>
      <BoardDetail
        name={modal.detail_manajemen}
        close={() => onChangeModal("detail_manajemen", null)}
        l={l}
      />

      <article className="w-full md:wrapper px-[24px] py-8 flex flex-col gap-4 justify-center items-center">
        <div className="main-padding-x flex md:flex-row flex-col gap-4 md:justify-start justify-center">
          <Text
            variant="display-lg"
            className="w-full md:text-center text-center"
          >
            {wording?.wording.title?.[l]}
          </Text>
          <TextHTML
            variant="body-lg-regular"
            html={wording?.wording.description?.[l] ?? ""}
          />
        </div>

        <Text variant="display-lg" className="pt-12">
          {l === "id" ? "Manajemen Kami" : "Our Management"}
        </Text>

        <Tabs
          defaultValue={filter.manajemen}
          className="flex w-full justify-center items-center flex-col"
        >
          <div className="relative w-[50vw] h-[65px] border-b-[1px] border-b-[#B1B1B1] border-spacing-y-9">
            <TabsList className="flex justify-between items-center gap-3 bg-transparent pt-10 w-full">
              {types?.data.map((e, idx: number) => (
                <TabsTrigger
                  value={e.type!.toLowerCase()}
                  className="w-full bg-none rounded-none data-[state=active]:border-b-primary-blue data-[state=active]:bg-none data-[state=active]:bg-transparent border-spacing-y-28 h-auto border-b-[2px]"
                  key={idx.toString()}
                  onClick={() =>
                    setFilter({
                      manajemen: e.type!.toLowerCase() as
                        | "direksi"
                        | "komisaris",
                    })
                  }
                >
                  <Text variant="display-sm">
                    {e.type!.charAt(0).toUpperCase() +
                      e.type!.slice(1).toLowerCase()}
                  </Text>
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          <TabsContent
            value={types?.data?.[0]?.type?.toLowerCase() ?? "direksi"}
            className="w-full py-5 flex flex-wrap justify-center items-center gap-12"
          >
            {direksi?.data.map((e) => (
              <button
                key={e.id.toString()}
                type="button"
                tabIndex={0}
                className="flex flex-col gap-3 justify-center items-center cursor-pointer"
                onClick={() => onChangeModal("detail_manajemen", e.name)}
                onKeyDown={(ev) => {
                  if (ev.key === "Enter" || ev.key === " ")
                    onChangeModal("detail_manajemen", e.name);
                }}
              >
                <Img
                  src={`/api/files${e.imgUrl}`}
                  alt={e.name}
                  width={250}
                  height={250}
                  className="rounded-full"
                />
                <Text variant="body-lg-semi">{e.name}</Text>
                <Text variant="body-lg-regular">{e.title![l]}</Text>
              </button>
            ))}
          </TabsContent>

          <TabsContent
            value={types?.data?.[1]?.type?.toLowerCase() ?? "komisaris"}
            className="w-full py-5 flex flex-wrap justify-center items-center gap-12"
          >
            {komisaris?.data.map((e) => (
              <button
                key={e.id.toString()}
                type="button"
                tabIndex={0}
                className="flex flex-col gap-3 justify-center items-center cursor-pointer"
                onClick={() => onChangeModal("detail_manajemen", e.name)}
                onKeyDown={(ev) => {
                  if (ev.key === "Enter" || ev.key === " ")
                    onChangeModal("detail_manajemen", e.name);
                }}
              >
                <Img
                  src={`/api/files${e.imgUrl}`}
                  alt={e.name}
                  width={250}
                  height={250}
                  className="rounded-full"
                />
                <Text variant="body-lg-semi">{e.name}</Text>
                <Text variant="body-lg-regular">{e.title![l]}</Text>
              </button>
            ))}
          </TabsContent>
        </Tabs>
      </article>
    </Fragment>
  );
}
