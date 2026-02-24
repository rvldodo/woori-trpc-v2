import { PATHS } from "@/app/urls";
import Img from "@/components/html/img";
import { Text } from "@/components/html/text";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import Link from "next/link";
import sendEmailIlus from "@/public/assets/ilus/send-email.png";

type Props = { show: boolean; close: () => void };

export default function SuccessSendSubscription({ show, close }: Props) {
  return (
    <Dialog open={show} onOpenChange={close}>
      <DialogContent className="max-w-4xl max-h-4xl flex flex-col justify-center items-center gap-5">
        <DialogTitle></DialogTitle>

        <Img alt="ilus" src={sendEmailIlus} width={200} height={200} />
        <Text variant="display-md">
          Anda telah ditambahkan ke Mailist kami!
        </Text>
        <Text className="w-[30vw]" variant="body-lg-medium">
          Kami akan segera mengabari Anda jika ada promosi dan informasi terbaru
          yang tersedia.
        </Text>
        <Link href={PATHS.home.base}>
          <Button variant="woori" className="p-5 rounded-lg">
            Kembali ke Halaman Utama
          </Button>
        </Link>
        <Link href={PATHS.home.promo}>
          <Text variant="body-sm-regular" color="primary">
            Lihat Promosi Lainnya
          </Text>
        </Link>
      </DialogContent>
    </Dialog>
  );
}
