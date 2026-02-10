"use client";

import { Text } from "@/components/html/text";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Spinner } from "@/components/ui/spinner";
import { Textarea } from "@/components/ui/textarea";
import { schema } from "@/server/api/schema";
import { api } from "@/trpc/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { MailWarningIcon } from "lucide-react";
import { Locale, useTranslations } from "next-intl";
import { Controller, useForm } from "react-hook-form";
import z from "zod";
import { useModalState } from "@/hooks/useModalState";
import { Fragment } from "react/jsx-runtime";
import SuccessSendEmail from "../success-send";

type Props = {
  l: Locale;
};

type Schema = z.infer<typeof schema.complaint.complaint_form>;

export default function LayananPelangganForm({ l }: Props) {
  const t = useTranslations("CustomerSupport.complaint");

  const {
    handleSubmit,
    register,
    control,
    formState: { isValid, errors },
    reset,
  } = useForm<Schema>({
    mode: "onChange",
    resolver: zodResolver(schema.complaint.complaint_form),
  });

  const { data, isLoading } = api.main.complaintType.list.useQuery();

  const { modal, onChangeModal } = useModalState();

  const { mutate, isPending } = api.main.complaints.send.useMutation({
    onSuccess: () => {
      reset();
      onChangeModal("success", true);
    },
  });

  console.log(errors, isValid, " ========= errors ");

  return (
    <Fragment>
      <SuccessSendEmail
        show={modal.success}
        close={() => onChangeModal("success", false)}
      />

      <section className="main-padding-x flex flex-col justify-start items-center gap-3 z-10">
        <Card className="w-full">
          <CardContent className="main-padding-x w-full">
            <CardHeader className="w-full justify-center">
              <CardTitle>
                <Text variant="display-sm" className="text-center">
                  {t("title")}
                </Text>
              </CardTitle>
              <CardDescription>
                <Text variant="body-lg-regular" className="text-center">
                  {t("description")}
                </Text>
              </CardDescription>
            </CardHeader>

            {isLoading || !data ? (
              <div className="w-full h-full flex justify-center items-center">
                <Spinner />
              </div>
            ) : (
              <form
                onSubmit={handleSubmit((e) => mutate(e))}
                className="main-padding-x flex flex-col gap-3"
              >
                <div className="flex flex-col gap-3">
                  <Label>{t("form.name.label")}</Label>
                  <Input
                    {...register("name")}
                    placeholder={t("form.name.placeholder")}
                  />
                </div>

                <div className="flex flex-col gap-3">
                  <Label>{t("form.email.label")}</Label>
                  <Input
                    {...register("email")}
                    placeholder={t("form.email.placeholder")}
                  />
                </div>

                <Controller
                  name="type"
                  control={control}
                  render={({ field }) => {
                    return (
                      <div className="flex flex-col gap-3">
                        <Label>{t("form.type.label")}</Label>
                        <Select
                          value={field.value}
                          onValueChange={field.onChange}
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue
                              placeholder={t("form.type.placeholder")}
                            />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              {data.data.map((e) => (
                                <SelectItem
                                  key={e.id.toString()}
                                  value={e.id.toString()}
                                >
                                  {e.type![l]}
                                </SelectItem>
                              ))}
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      </div>
                    );
                  }}
                />

                <div className="flex flex-col gap-3">
                  <Label>{t("form.message.label")}</Label>
                  <Textarea
                    {...register("message")}
                    placeholder={t("form.message.placeholder")}
                    className="h-32"
                  />
                </div>

                <div className="flex gap-2 items-start">
                  <MailWarningIcon className="h-5 w-5 text-gray-500" />
                  <Text className="text-[#007bc7]" variant="caption-md-regular">
                    {t("disclaimer")}
                  </Text>
                </div>

                <Button type="submit" disabled={!isValid || isPending}>
                  {t("submitButton")}
                </Button>
              </form>
            )}
          </CardContent>
        </Card>
      </section>
    </Fragment>
  );
}
