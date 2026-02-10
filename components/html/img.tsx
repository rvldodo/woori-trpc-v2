import Image, { type StaticImageData } from "next/image";
import { MAIN_TITLE } from "@/lib/constants";
import { cn } from "@/lib/utils";
import type React from "react";

// Use Next.js ImageProps type
type Props = Omit<React.ComponentProps<typeof Image>, "alt" | "src"> & {
  src: string | StaticImageData;
  alt: string | null | undefined;
  priority?: boolean;
};

export default function Img({
  alt,
  src,
  className,
  priority,
  style,
  ...props
}: Props) {
  if (!src) return null;

  return (
    <Image
      style={style}
      alt={alt ? `${alt} - ${MAIN_TITLE}` : MAIN_TITLE}
      src={src}
      priority={priority}
      className={cn(className)}
      {...props}
    />
  );
}
