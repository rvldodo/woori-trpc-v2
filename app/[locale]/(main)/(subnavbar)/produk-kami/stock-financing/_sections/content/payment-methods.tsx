"use client";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Text } from "@/components/html/text";
import { Locale } from "next-intl";
import { parseAsString, useQueryStates } from "nuqs";
import { api } from "@/trpc/react";
import { Spinner } from "@/components/ui/spinner";

type Props = {
  l: Locale;
};

export default function PaymentMethods({ l }: Props) {
  const [filter, setFilter] = useQueryStates({
    payment_methods: parseAsString.withDefault("transfer bank bca"),
  });

  const { data, isLoading } = api.main.paymentMethods.listByProductId.useQuery({
    productId: 4,
    key: filter.payment_methods,
  });
  const { data: type, isLoading: typeLoading } =
    api.main.paymentMethods.typeByProductID.useQuery({ productId: 4 });

  console.log({ data: data?.data });

  return (
    <article className="relative w-full py-3 flex flex-col gap-6 overflow-hidden z-10">
      <Card className="w-full">
        <CardContent>
          {typeLoading || isLoading ? (
            <div className="w-full h-full flex justify-center items-center">
              <Spinner />
            </div>
          ) : (
            <Tabs
              value={filter.payment_methods}
              onValueChange={(e) => setFilter({ payment_methods: e })}
              className="w-full"
            >
              <TabsList
                className={`grid rounded-none border-b-2 border-b-muted w-full bg-transparent gap-3 grid-cols-${type?.data.length}`}
              >
                {type?.data.map((e, idx: number) => (
                  <TabsTrigger
                    value={e.type!["id"].toLowerCase()}
                    key={idx.toString()}
                    className="data-active:border-b-primary w-full flex rounded-none justify-center items-center"
                  >
                    <Text
                      variant="body-md-regular"
                      className="text-center w-full"
                    >
                      {e.type![l]}
                    </Text>
                  </TabsTrigger>
                ))}
              </TabsList>

              <TabsContent value="tab1" className="mt-4">
                <Text variant="body-md-regular">
                  {l === "id"
                    ? "Konten untuk Metode Pembayaran 1"
                    : "Content for Payment Method 1"}
                </Text>
              </TabsContent>

              <TabsContent value="tab2" className="mt-4">
                <Text variant="body-md-regular">
                  {l === "id"
                    ? "Konten untuk Metode Pembayaran 2"
                    : "Content for Payment Method 2"}
                </Text>
              </TabsContent>
            </Tabs>
          )}
        </CardContent>
      </Card>
    </article>
  );
}
