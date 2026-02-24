import { Text } from "@/components/html/text";
import { Spinner } from "@/components/ui/spinner";
import { api } from "@/trpc/server";
import { Locale } from "next-intl";

type Props = { l: Locale };

export default async function HeroSectionTanggungJawab({ l }: Props) {
  const data = await api.logged.main.hero.heroTabsByTabId.query({
    subnavbarId: 9,
  });

  if (!data) {
    return (
      <div className="w-full h-full flex justify-center items-center">
        <Spinner />
      </div>
    );
  }

  const imgURL = `/api/files${data?.data.imgUrl}`;

  return (
    <article
      className="relative w-full h-[60vh] bg-center bg-cover"
      style={{ backgroundImage: `url('${imgURL}')` }}
    >
      <section className="absolute md:wrapper px-[24px] w-full h-full flex flex-col text-white justify-center items-center md:items-start gap-4">
        {data && (
          <>
            <Text
              variant="display-xl"
              className="md:w-[40vw] w-full text-center md:text-start"
              color="white"
            >
              {data.data.title![l]}
            </Text>
            <Text
              variant="display-sm"
              className="md:w-[40vw] w-full text-center md:text-start"
              color="white"
            >
              {data.data.subtitle![l]}
            </Text>
          </>
        )}
      </section>
    </article>
  );
}
