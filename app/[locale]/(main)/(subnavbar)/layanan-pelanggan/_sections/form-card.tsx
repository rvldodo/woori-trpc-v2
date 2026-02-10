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

type Props = {
  l: Locale;
};

type Schema = z.infer<typeof schema.complaint.complaint_form>;

export default function LayananPelangganForm({ l }: Props) {
  const t = useTranslations();

  const {
    handleSubmit,
    register,
    control,
    formState: { isValid, errors },
  } = useForm<Schema>({
    mode: "all",
    resolver: zodResolver(schema.complaint.complaint_form),
  });

  const { data, isLoading } = api.main.complaintType.list.useQuery();

  console.log(errors, isValid);

  return (
    <section className="main-padding-x flex flex-col justify-start items-center gap-3 z-10">
      <Card className="w-full">
        <CardContent className="main-padding-x w-full">
          <CardHeader className="w-full justify-center">
            <CardTitle>
              <Text variant="display-sm" className="text-center">
                Complaint Submission
              </Text>
            </CardTitle>
            <CardDescription>
              <Text variant="body-lg-regular" className="text-center">
                If you get any complaints or feedbacks toward us, let us know
                through this form
              </Text>
            </CardDescription>
          </CardHeader>

          {isLoading || !data ? (
            <div className="w-full h-full flex justify-center items-center">
              <Spinner />
            </div>
          ) : (
            <form
              onSubmit={handleSubmit((e) => {
                console.log(e);
              })}
              className="main-padding-x flex flex-col gap-3"
            >
              <div className="flex flex-col gap-3">
                <Label>Nama</Label>
                <Input
                  {...register("name")}
                  placeholder="Masukan nama Anda..."
                />
              </div>

              <div className="flex flex-col gap-3">
                <Label>Email</Label>
                <Input
                  {...register("email")}
                  placeholder="Masukan email Anda..."
                />
              </div>

              <Controller
                name="type"
                control={control}
                render={({ field }) => {
                  return (
                    <div className="flex flex-col gap-3">
                      <Label>Compaint Type</Label>
                      <Select>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Pilih Complaint Type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            {data.data.map((e) => (
                              <SelectItem
                                key={e.id.toString()}
                                value={e.type!["id"]}
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
                <Label>Message</Label>
                <Textarea
                  {...register("message")}
                  placeholder="Masukan pesan Anda..."
                  className="h-32"
                />
              </div>

              <div className="flex gap-2 items-start">
                <MailWarningIcon className="h-5 w-5 text-gray-500" />
                <Text className="text-[#007bc7]" variant="caption-md-regular">
                  Sesuai dengan peraturan OJK NOMOR 18/POJK.07/2018 MTF, WFI
                  Indonesia berhak menolak penanganan pengaduan apabila Nasabah
                  dan/atau Perwakilan Nasabah tidak melengkapi persyaratan
                  dokumen pengaduan. Untuk Dokumen Pengaduan dapat dikirimkan
                  melalui email:cs@woorifinance.co.id
                </Text>
              </div>

              <Button type="submit" disabled={isValid}>
                Submit Complaint
              </Button>
            </form>
          )}
        </CardContent>
      </Card>
    </section>
  );
}
