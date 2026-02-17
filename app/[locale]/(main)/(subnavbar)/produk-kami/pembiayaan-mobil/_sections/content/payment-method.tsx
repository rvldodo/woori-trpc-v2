"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Text } from "@/components/html/text";
import { Locale } from "next-intl";
import { parseAsString, useQueryStates } from "nuqs";
import { api } from "@/trpc/react";
import { Spinner } from "@/components/ui/spinner";
import { Button } from "@/components/ui/button";
import { TextHTML } from "@/components/html/text-html";
import { useEffect } from "react";

type Props = {
  l: Locale;
};

export default function PaymentMethods({ l }: Props) {
  const [filter, setFilter] = useQueryStates({
    payment_methods: parseAsString.withDefault("bank transfer"),
    method: parseAsString.withDefault("transfer bank bca"),
  });

  const { data, isLoading } = api.main.paymentMethods.listByProductId.useQuery({
    productId: 1,
    key: filter.payment_methods,
  });

  const { data: type, isLoading: typeLoading } =
    api.main.paymentMethods.typeByProductID.useQuery({ productId: 1 });

  // Auto-select first method when data changes
  useEffect(() => {
    if (data?.data && data.data.length > 0) {
      const currentMethodExists = data.data.some(
        (e) => e.type!["id"].toLowerCase() === filter.method,
      );

      if (!currentMethodExists) {
        setFilter({ method: data.data[0].type!["id"].toLowerCase() });
      }
    }
  }, [data?.data, filter.method, setFilter]);

  console.log({ data: data });

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
                className={`grid rounded-none border-b-2 border-b-muted w-full bg-transparent gap-3 grid-cols-5`}
              >
                {type?.data.map((e, idx: number) => (
                  <TabsTrigger
                    value={e.category!.toLowerCase()}
                    key={idx.toString()}
                    className="data-[state=active]:border-b-primary w-full flex rounded-none justify-center items-center"
                  >
                    <Text
                      variant="body-md-regular"
                      className="text-center w-full"
                    >
                      {e.category!}
                    </Text>
                  </TabsTrigger>
                ))}
              </TabsList>

              {/* Outer TabsContent - one for each payment category */}
              {type?.data.map((tabType) => (
                <TabsContent
                  value={tabType.category!.toLowerCase()}
                  className="mt-2"
                  key={tabType.category!.toLowerCase()}
                >
                  <div className="w-full">
                    {/* Inner Tabs for payment methods */}
                    <Tabs
                      value={filter.method}
                      onValueChange={(e) => setFilter({ method: e })}
                      className="w-full flex flex-row items-start gap-4"
                    >
                      <TabsList
                        className={`grid grid-cols-${data?.data.length || 2} justify-start gap-2 bg-transparent h-auto p-0 shrink-0`}
                        style={{ flexDirection: "column" }}
                        aria-orientation="vertical"
                      >
                        {data?.data.map((e) => (
                          <TabsTrigger
                            value={e.type!["id"].toLowerCase()}
                            key={e.id.toString()}
                            className="
    p-2 rounded-md border bg-transparent shadow-none
    data-[state=inactive]:border-primary data-[state=inactive]:text-primary
    data-[state=active]:bg-primary data-[state=active]:text-white data-[state=active]:border-primary
  "
                          >
                            {e.type![l]}
                          </TabsTrigger>
                        ))}
                      </TabsList>

                      <div className="flex-1">
                        {data?.data.map((e) => (
                          <TabsContent
                            value={e.type!["id"].toLowerCase()}
                            key={e.id.toString()}
                            className="mt-0 w-full"
                          >
                            <TextHTML
                              variant="body-md-regular"
                              html={e.description![l]}
                              className="py-3"
                            />
                          </TabsContent>
                        ))}
                      </div>
                    </Tabs>
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          )}
        </CardContent>
      </Card>
    </article>
  );
}
