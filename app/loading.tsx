import { Text } from "@/components/html/text";
import LoadingComponent from "@/components/loader";

export default function Loading() {
  return (
    <section className="flex flex-col gap-5 items-center justify-center w-full h-[85vh]">
      <Text variant="display-lg" className="text-[#007bc7]">
        Woori Finance Indoensia
      </Text>
      <LoadingComponent />
    </section>
  );
}
