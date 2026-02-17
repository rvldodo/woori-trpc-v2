"use client";

import Image from "next/image";
import wooriLogo from "@/public/assets/logo.svg";
import googlePlay from "@/public/assets/google-play.png";
import iso from "@/public/assets/iso.svg";
import Link from "next/link";
import { PATHS } from "@/app/urls";
import { usePathname } from "next/navigation";
import { api } from "@/trpc/react";
import { Fragment } from "react";
import logoLaps from "@/public/assets/logo_laps.png";
import { Text } from "./html/text";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { Separator } from "./ui/separator";
import { useTranslations } from "next-intl";
import Img from "./html/img";
import { Skeleton } from "./ui/skeleton";
import { FaLinkedinIn } from "react-icons/fa";
import { FaFacebookF } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

type FooterProps = {
  className?: string;
};

const Footer = (props: FooterProps) => {
  const path = usePathname();
  const { className } = props;
  const t = useTranslations("Footer");

  const isSimulasiPath = path.split("/");

  const { data, isLoading } = api.main.globalParams.getByKey.useQuery({
    key: "QR",
  });

  const imgUrl = `/api/files${data?.data.value as string}`;

  return (
    <Fragment>
      <section
        className={cn(
          `main-padding-x min-h-full py-5 w-full flex-col bg-[#F7F7F7] ${path.split("/")[2] === "user-verifikasi" ? "hidden" : "flex"}`,
          className,
        )}
      >
        <div className="flex w-full justify-between border-b-[1.5px]">
          <Image alt="logo" src={wooriLogo} width={200} />
        </div>
        <div className="flex md:flex-row flex-col justify-between gap-5">
          <div className="flex flex-col gap-5 pt-6">
            <Text variant="body-lg-semi">{t("mainOffice")}</Text>
            <Text className="w-[15rem]" variant="caption-md-regular">
              Chase Plaza Kav.21 16th Floor, Jl. Jend Sudirman, South Jakarta
            </Text>
            <Text className="text-[#007BC7]" variant="caption-md-regular">
              <Link href={PATHS.home.cabangKami}>{t("seeOtherBranches")}</Link>
            </Text>
          </div>
          <div className="flex flex-col gap-5 pt-6">
            <Text variant="body-lg-semi">{t("contactUs")}</Text>
            <Text variant="caption-md-regular">+62-21-520-0434</Text>
            <div className="flex gap-2 items-center">
              <MdEmail className="w-5 h-5" />
              <Text variant="caption-md-regular">cs@woorifinance.co.id</Text>
            </div>
          </div>
          <div className="flex flex-col gap-5 pt-6">
            <Text variant="body-lg-semi">{t("socialMedia")}</Text>
            <div className="flex gap-3 items-center">
              <FaLinkedinIn className="w-5 h-5 text-gray-700" />
              <Text variant="caption-md-regular">
                PT WOORI FINANCE INDONESIA Tbk.
              </Text>
            </div>
            <div className="flex gap-3 items-center">
              <FaFacebookF className="w-5 h-5 text-gray-700" />
              <Text variant="caption-md-regular">Woori Finance Indonesia</Text>
            </div>
            <div className="flex gap-3 items-center">
              <FaInstagram className="w-5 h-5 text-gray-700" />
              <Text variant="caption-md-regular">@woorifinance.indonesia</Text>
            </div>
          </div>

          <div className="md:flex hidden pt-6 flex-col gap-1 items-start">
            <Text variant="body-lg-semi">{t("partOf")}</Text>
            <Image alt="google play" src={logoLaps} width={200} />
          </div>
          <div className="md:flex hidden pt-6 flex-col gap-1 items-end">
            <Text variant="body-lg-semi">{t("downloadApp")}</Text>
            <Image alt="google play" src={googlePlay} width={100} />
            <Text variant="caption-md-regular">{t("scanBarcode")}</Text>
            {isLoading ? (
              <Skeleton className="w-10 h-10" />
            ) : (
              <>
                <Img
                  alt="qr-woorifinance"
                  src={imgUrl}
                  className="size-40"
                  width={1000}
                  height={1000}
                />
              </>
            )}
          </div>
        </div>
        <div className="flex flex-col gap-3 w-full pt-5">
          <div className="flex md:flex-row flex-col md:items-center gap-3">
            <div className="flex md:flex-row flex-row-reverse items-center gap-2 w-full bg-[#E3F4FF]">
              <Image alt="iso" src={iso} width={70} />
              <Text className="text-[#5F5F5F]" variant="caption-md-regular">
                {t("isoText")}
              </Text>
            </div>
            <div className="md:hidden flex pt-6 flex-col gap-1 items-start">
              <Text variant="display-lg">{t("downloadApp")}</Text>
              <Image alt="google play" src={googlePlay} width={100} />
            </div>
            <div className="flex gap-3 md:w-[40vw] h-5 w-full md:justify-center justify-start md:items-center items-start">
              <Link href={PATHS.kebijakanPrivasi}>
                <Text
                  className="flex justify-center md:w-full items-center text-blue underline text-primary"
                  variant="caption-md-regular"
                >
                  {t("privacyPolicy")}
                </Text>
              </Link>
              <Separator className="bg-black" orientation="vertical" />
              <Link href={PATHS.syaratDanKetentuan}>
                <Text
                  className="flex justify-center md:w-full items-center underline text-primary hover:text-background-tertiary"
                  variant="caption-md-regular"
                >
                  {t("termsCondition")}
                </Text>
              </Link>
            </div>
          </div>
          <Text variant="caption-md-regular">
            Copyright &copy; 2024 by Woori Finance Indonesia
          </Text>
        </div>
      </section>

      {isSimulasiPath[isSimulasiPath.length - 1] ===
        "pembiayaan-alat-berat" && (
        <div className="bg-blue w-full flex justify-center items-center sticky bottom-0 py-2 gap-5 z-10 bg-primary">
          <Text variant="body-md-medium" className="text-[#ffffff]">
            Ajukan Pembiayaan Alat Berat Sekarang
          </Text>
          <Link href={PATHS.home.pinjaman.alatBerat.base}>
            <Button
              variant="woori_white"
              className="p-3 rounded-lg border-none"
            >
              Ajukan Sekarang
            </Button>
          </Link>
        </div>
      )}

      {isSimulasiPath[isSimulasiPath.length - 1] === "pembiayaan-mobil" && (
        <div className="bg-blue w-full flex justify-center items-center sticky bottom-0 py-2 gap-5 z-10 bg-primary">
          <Text variant="body-md-medium" className="text-[#ffffff]">
            Ajukan Pembiayaan Mobil Sekarang
          </Text>
          <Link href={PATHS.home.pinjaman.mobilBekas}>
            <Button
              variant="woori_white"
              className="p-3 rounded-lg border-none"
            >
              Mulai Simulasi Pinjaman
            </Button>
          </Link>
        </div>
      )}
    </Fragment>
  );
};

export { Footer };
