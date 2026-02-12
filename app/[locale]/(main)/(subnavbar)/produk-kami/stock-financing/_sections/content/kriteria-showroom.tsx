import { Text } from "@/components/html/text";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Locale } from "next-intl";
import { useTranslations } from "use-intl";

type Props = {
  l: Locale;
};

const tableHeader: Array<Record<Locale, string>> = [
  { en: "Criteria", id: "Kriteria" },
  { en: "Detail", id: "Detail" },
];

export default function KriteriaProduk({ l }: Props) {
  const t = useTranslations("OurProduct.stockFinancing.kriteriaShowroom");
  const items: Array<Record<Locale, string>> = t.raw("items");

  return (
    <section className="relative w-full py-3 flex flex-col gap-6 overflow-hidden z-10">
      <Text variant="display-md">{t("title")}</Text>

      {/* Table */}
      <Table>
        <TableHeader>
          <TableRow className="bg-hover-blue hover:bg-hover-blue">
            {tableHeader.map((e, idx: number) => (
              <TableHead key={idx.toString()} className="text-center">
                <Text variant="body-md-semi">{e[l]}</Text>
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {items.map((e, idx: number) => {
            return (
              <TableRow className="bg-[#ffffff]" key={idx.toString()}>
                <TableCell className="text-center">
                  <Text variant="body-md-regular">{e.kriteria}</Text>
                </TableCell>
                <TableCell className="text-center">
                  <Text variant="body-md-regular">{e.detail}</Text>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </section>
  );
}
