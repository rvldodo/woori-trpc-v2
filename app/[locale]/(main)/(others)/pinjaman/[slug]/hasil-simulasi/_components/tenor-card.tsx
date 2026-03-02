import { Text } from "@/components/html/text";
import { Card, CardContent } from "@/components/ui/card";
import { formatCurrency } from "@/lib/formatter";
import { cn } from "@/lib/utils";

type Props = {
  isActive?: boolean;
  month: number;
  amount: number;
  onClick: () => void;
};

export default function TenorCard({
  month,
  amount,
  onClick,
  isActive = false,
}: Props) {
  return (
    <Card
      className={cn("border bg-muted hover:bg-hover-blue", {
        "bg-hover-blue border-primary-blue": isActive,
      })}
      onClick={onClick}
    >
      <CardContent className="flex items-center gap-4">
        <div
          className={`flex flex-col justify-center items-center text-center ${
            isActive ? "text-[#007bc7]" : "text-[#B1B1B1]"
          }`}
        >
          <div
            className={`flex justify-center items-center w-6 h-6 bg-transparent border-[1.5px] ${
              isActive ? "border-[#007bc7]" : "border-[#B1B1B1]"
            } rounded-full`}
          >
            <div
              className={`w-3 h-3 ${
                isActive ? "bg-[#007bc7]" : "hidden"
              } rounded-full`}
            />
          </div>
        </div>
        <div className="flex flex-col">
          <Text variant="body-sm-regular">{month} bulan</Text>
          <div className="flex gap-1 items-end">
            <Text variant="display-sm">{formatCurrency(amount)}</Text>
            <Text variant="body-md-regular">/bln</Text>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
