"use client";
import { Text } from "@/components/html/text";
import { api } from "@/trpc/react";
import { Locale, useTranslations } from "next-intl";
import Timeline, { TimelineEntry } from "../_components/timeline";
import { Spinner } from "@/components/ui/spinner";

type Props = {
  l: Locale;
};

export default function MilestoneSection({ l }: Props) {
  const t = useTranslations("Corporate");
  const { data: milestonesData, isLoading: loadingMilestones } =
    api.main.milestones.list.useQuery();

  if (loadingMilestones) {
    return (
      <div className="w-full h-full justify-center items-center">
        <Spinner />
      </div>
    );
  }

  const milestones: TimelineEntry[] =
    milestonesData!.data!.map((e) => ({
      date: e.year!,
      content: e.content!,
    })) || [];

  return (
    <section className="main-padding-x px-52 py-8 flex flex-col justify-start items-center gap-3">
      <Text variant="display-lg" className="text-center">
        {t("milestone")}
      </Text>
      <Timeline
        data={milestones}
        className="flex justify-center items-center"
        l={l}
      />
    </section>
  );
}
