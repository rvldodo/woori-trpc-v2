"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useModalState } from "@/hooks/useModalState";
import { schema } from "@/server/api/schema";
import { api } from "@/trpc/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Locale } from "next-intl";
import { parseAsString, useQueryStates } from "nuqs";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import z from "zod";

type Props = {
  l: Locale;
  promo_id: number;
};

type Schema = z.infer<typeof schema.promo.subscription>;

export default function FormSection({ l, promo_id }: Props) {
  const [filter, setFilter] = useQueryStates({
    user_type: parseAsString.withDefault("individual"),
  });

  const {
    handleSubmit,
    reset,
    register,
    formState: { isValid },
    setValue,
  } = useForm<Schema>({
    mode: "all",
    resolver: zodResolver(schema.promo.subscription),
  });

  const { modal, onChangeModal } = useModalState();

  const { mutate, isPending } = api.main.promos.subscription.useMutation({
    onSuccess: async () => {
      reset();
      onChangeModal("success", true);
    },
  });

  useEffect(() => {
    if (promo_id) {
      setValue("promo_id", promo_id);
      setValue(
        "user_type",
        filter.user_type === "individual" ? "INDIVIDU" : "KORPORAT",
      );
    }
  }, [promo_id, filter, setValue]);

  return (
    <article className=" bg-[#ffffff] w-full">
      <section className="main-padding-x py-8 flex flex-col justify-center items-center gap-4">
        <Tabs className="w-full" defaultValue="individual">
          <TabsList className="w-full flex justify-evenly bg-transparent data-[state=active]:bg-transparent">
            <TabsTrigger
              value="individual"
              className="data-[state=active]:border-b-primary-blue rounded-none data-[state=active]:text-primary-blue"
              onClick={() => setFilter({ user_type: "individual" })}
            >
              Individu
            </TabsTrigger>
            <TabsTrigger
              value="corporate"
              className="data-[state=active]:border-b-primary-blue rounded-none data-[state=active]:text-primary-blue"
              onClick={() => setFilter({ user_type: "corporate" })}
            >
              Corporate
            </TabsTrigger>
          </TabsList>

          <form
            onSubmit={handleSubmit((e) => mutate(e))}
            className="w-full flex flex-col justify-end gap-5"
          >
            <TabsContent
              value="individual"
              className="py-3 flex flex-col gap-5"
            >
              <div className="flex flex-col gap-3">
                <Label>Nama Anda</Label>
                <Input
                  {...register("name")}
                  placeholder="Masukan nama Anda..."
                />
              </div>

              <div className="flex flex-col gap-3">
                <Label>Nomor Telepon</Label>
                <Input
                  {...register("phone")}
                  placeholder="Masukan nomor telepon Anda..."
                />
              </div>
            </TabsContent>
            <TabsContent value="corporate" className="py-3 flex flex-col gap-5">
              <div className="flex flex-col gap-3">
                <Label>Nama PIC</Label>
                <Input
                  {...register("name")}
                  placeholder="Masukan nama Anda..."
                />
              </div>

              <div className="flex flex-col gap-3">
                <Label>Nama Company</Label>
                <Input
                  {...register("company")}
                  placeholder="Masukan nama perusahaan Anda..."
                />
              </div>

              <div className="flex flex-col gap-3">
                <Label>Nomor Telepon</Label>
                <Input
                  {...register("phone")}
                  placeholder="Masukan nomor telepon Anda..."
                />
              </div>
            </TabsContent>

            <Button disabled={!isValid || isPending}>Subscribe</Button>
          </form>
        </Tabs>
      </section>
    </article>
  );
}
