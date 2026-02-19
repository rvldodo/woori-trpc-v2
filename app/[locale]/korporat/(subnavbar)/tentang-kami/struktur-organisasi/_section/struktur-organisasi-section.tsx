import Img from "@/components/html/img";
import { Text } from "@/components/html/text";
import { Spinner } from "@/components/ui/spinner";
import { api } from "@/trpc/server";
import { Locale } from "next-intl";
import { Fragment } from "react/jsx-runtime";

type Props = { l: Locale };

export default async function StrukturOrganisasiSection({ l }: Props) {
  const data =
    await api.logged.main.template4.getDataByTabsAndSubnavbarId.query({
      tabId: 5,
      subnavbarId: 6,
    });

  return (
    <article className="w-full md:wrapper px-[24px] py-8 flex flex-col gap-4 justify-center items-center z-10">
      {!data ? (
        <div className="w-full h-full flex justify-center items-center">
          <Spinner />
        </div>
      ) : (
        data?.data.map((e) => (
          <Fragment key={e.id}>
            <Text variant="display-lg">{e.title![l]}</Text>
            <Img
              src={`/api/files${e.imgUrl}`}
              alt={e.title!["id"]}
              className="md:rounded-none rounded-lg"
              width={1000}
              height={1000}
            />
          </Fragment>
        ))
      )}
    </article>
  );
}
