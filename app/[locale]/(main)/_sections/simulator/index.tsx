"use client";

import { TextEffect } from "@/components/html/text-effect";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Locale, useTranslations } from "next-intl";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Icon } from "@iconify-icon/react";
import { Text } from "@/components/html/text";
import { AnimatedGroup } from "@/components/html/animated-group";
import NewCarForm from "./form/new-car";
import UsedCarForm from "./form/used-car";
import Image from "next/image";
import usedCarIcon from "@/public/assets/icons/used_car.png";
import newCarIcon from "@/public/assets/icons/new_car.png";
import { api } from "@/trpc/react";
import { USPCards } from "@/server/api/routers/usp_router";

type Props = {
  l: Locale;
};

const transitionVariants = {
  item: {
    hidden: {
      opacity: 0,
      filter: "blur(12px)",
      y: 12,
    },
    visible: {
      opacity: 1,
      filter: "blur(0px)",
      y: 0,
      transition: {
        type: "spring" as const,
        bounce: 0.3,
        duration: 1.5,
      },
    },
  },
};

export default function SimulatorSection({ l }: Props) {
  const t = useTranslations("Simulator");
  const { data, isLoading } = api.main.usp.list.useQuery();
  const mobilBaruUsp = data?.data.find((e) => e.type === "Mobil Baru");
  const mobilBekasUsp = data?.data.find((e) => e.type === "Mobil Bekas");

  return (
    <section className="main-padding-x flex flex-col gap-3 py-8 relative overflow-hidden">
      <Tabs defaultValue="used-car">
        <div className="grid md:grid-cols-2 grid-cols-1 gap-5 md:px-20">
          <TabsContent
            value="used-car"
            className="md:w-xl h-full flex md:justify-start justify-center items-center"
          >
            {isLoading || !data || !mobilBekasUsp ? (
              <Skeleton className="w-full h-15" />
            ) : (
              <div className="flex flex-col gap-3">
                <TextEffect
                  variant="display-lg"
                  preset="fade-in-blur"
                  speedSegment={0.3}
                  as="p"
                >
                  {mobilBekasUsp.title![l]}
                </TextEffect>
                <TextEffect
                  variant="body-md-regular"
                  preset="fade-in-blur"
                  speedSegment={0.3}
                  as="p"
                >
                  {mobilBekasUsp.description![l]}
                </TextEffect>

                <div className="flex flex-col gap-3 md:items-start items-center">
                  {mobilBekasUsp.cards!.map((e: USPCards, idx: number) => (
                    <AnimatedGroup
                      key={idx.toString()}
                      variants={{
                        container: {
                          visible: {
                            transition: {
                              staggerChildren: 0.05,
                              delayChildren: 0.75,
                            },
                          },
                        },
                        ...transitionVariants,
                      }}
                    >
                      <Link href={e.redirectURL || "/"} key={e.id}>
                        <Button
                          variant="woori"
                          className="md:p-5 p-3 py-5 flex gap-2 shadow-xl"
                        >
                          <Icon
                            icon={e.prefixIcon}
                            width={25}
                            className="text-white"
                          />
                          <Text
                            variant="body-md-semi"
                            className="text-sm text-[#fff] md:text-base"
                          >
                            {e.text![l]}
                          </Text>
                          <Icon
                            icon={e.suffixIcon}
                            width={25}
                            className="text-white"
                          />
                        </Button>
                      </Link>
                    </AnimatedGroup>
                  ))}
                </div>
              </div>
            )}
          </TabsContent>
          <TabsContent
            value="new-car"
            className="md:w-xl h-full flex md:justify-start justify-center items-center"
          >
            {isLoading || !data || !mobilBaruUsp ? (
              <Skeleton className="w-full h-15" />
            ) : (
              <div className="flex flex-col gap-3">
                <TextEffect
                  variant="display-lg"
                  preset="fade-in-blur"
                  speedSegment={0.3}
                  as="p"
                >
                  {mobilBaruUsp.title![l]}
                </TextEffect>
                <TextEffect
                  variant="body-md-regular"
                  preset="fade-in-blur"
                  speedSegment={0.3}
                  as="p"
                >
                  {mobilBaruUsp.description![l]}
                </TextEffect>

                <div className="flex flex-col gap-3 md:items-start items-center">
                  {mobilBaruUsp.cards!.map((e: USPCards, idx: number) => (
                    <AnimatedGroup
                      key={idx.toString()}
                      variants={{
                        container: {
                          visible: {
                            transition: {
                              staggerChildren: 0.05,
                              delayChildren: 0.75,
                            },
                          },
                        },
                        ...transitionVariants,
                      }}
                    >
                      <Link href={e.redirectURL || "/"} key={e.id}>
                        <Button
                          variant="woori"
                          className="md:p-5 p-3 py-5 flex gap-2 shadow-xl"
                        >
                          <Icon
                            icon={e.prefixIcon}
                            width={25}
                            className="text-white"
                          />
                          <Text
                            variant="body-md-semi"
                            className="text-sm text-[#fff] md:text-base"
                          >
                            {e.text![l]}
                          </Text>
                          <Icon
                            icon={e.suffixIcon}
                            width={25}
                            className="text-white"
                          />
                        </Button>
                      </Link>
                    </AnimatedGroup>
                  ))}
                </div>
              </div>
            )}
          </TabsContent>

          <Card className="h-auto md:px-[24px] px-[12px] shadow-xl w-full bg-[#ffffff] pt-12">
            <CardContent className="">
              <TabsList className="flex gap-3 justify-evenly h-[12vh] bg-transparent w-max min-w-full">
                <TabsTrigger
                  value="used-car"
                  className="w-full flex flex-col data-[state=active]:shadow-md data-[state=active]:hover:shadow-lg data-[state=active]:transition-shadow data-[state=active]:border-[1px] data-[state=active]:border-[#007BC7] data-[state=active]:rounded-md h-auto"
                >
                  <div className="w-32 h-auto flex flex-col items-center justify-center relative">
                    <Image
                      alt="icon"
                      src={usedCarIcon}
                      width={100}
                      className="absolute -top-10"
                    />
                    <Text
                      variant="body-md-semi"
                      className="pt-8 pb-2 data-[state=active]:text-[#007BC7]"
                    >
                      {t("trigger.usedCar")}
                    </Text>
                  </div>
                </TabsTrigger>
                <TabsTrigger
                  value="new-car"
                  className="w-full flex flex-col data-[state=active]:shadow-md data-[state=active]:hover:shadow-lg data-[state=active]:transition-shadow data-[state=active]:border-[1px] data-[state=active]:border-[#007BC7] data-[state=active]:rounded-md h-auto"
                >
                  <div className="w-32 h-14 flex flex-col items-center justify-center relative">
                    <Image
                      alt="icon"
                      src={newCarIcon}
                      width={100}
                      className="absolute -top-10"
                    />
                    <Text
                      variant="body-md-semi"
                      className="pt-8 pb-2 data-[state=active]:text-[#007BC7]"
                    >
                      {t("trigger.newCar")}
                    </Text>
                  </div>
                </TabsTrigger>
              </TabsList>
              <div className="w-full h-full">
                <TabsContent value="used-car" className="flex flex-col gap-6">
                  <UsedCarForm />
                </TabsContent>
                <TabsContent value="new-car" className="flex flex-col gap-6">
                  <NewCarForm />
                </TabsContent>
              </div>
            </CardContent>
          </Card>
        </div>
      </Tabs>
    </section>
  );
}
