"use client";

import { Text } from "@/components/html/text";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { api } from "@/trpc/react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Locale, useTranslations } from "next-intl";
import { Fragment, useState } from "react";

type Props = {
  l: Locale;
};

export default function CompanyProfile({ l }: Props) {
  const t = useTranslations("Corporate");

  const [activeId, setActiveId] = useState<string>("1");

  const handleNextId = () => {
    setActiveId((prevId) => {
      const nextId = Number(prevId) + 1;
      return nextId > 3 ? "1" : nextId.toString();
    });
  };

  const handlePreviousId = () => {
    setActiveId((prevId) => {
      const previousId = Number(prevId) - 1;
      return previousId < 1 ? "3" : previousId.toString();
    });
  };

  const { data: profileCompany, isLoading: loadingProfilCompany } =
    api.main.profilCompany.profileCompany.useQuery();

  const {
    data: profileCompanyContents,
    isLoading: loadingProfilCompanyContents,
  } = api.main.profilCompany.profilCompanyContent.useQuery();

  return (
    <section
      id="profil"
      className="main-padding-x flex md:flex-row flex-col gap-4 py-8"
    >
      {loadingProfilCompany || loadingProfilCompanyContents ? (
        <div className="w-full h-full flex justify-center items-center">
          <Spinner />
        </div>
      ) : (
        <Fragment>
          <div className="w-full flex flex-col gap-3">
            <Text variant="display-lg" className="md:text-start text-center">
              {t("profile")}
            </Text>
            <Text
              variant="body-lg-medium"
              className="md:text-start text-center"
            >
              {profileCompany!.data.content![l]}
            </Text>
          </div>
          <div className="w-full flex flex-col gap-3">
            {profileCompanyContents?.data.map((e: any) => (
              <Text
                key={e.id}
                variant="body-lg-regular"
                className={`text-justify ${activeId === e.id.toString() ? "" : "hidden"}`}
                id={e.id.toString()}
                html={e.content[l]}
              />
            ))}
            <div className="w-full flex justify-end gap-3">
              <Button
                className="w-12 h-12 rounded-full"
                variant="woori"
                onClick={handlePreviousId}
              >
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <Button
                className="w-12 h-12 rounded-full"
                variant="woori"
                onClick={handleNextId}
              >
                <ArrowRight className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </Fragment>
      )}
    </section>
  );
}
