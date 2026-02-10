import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import DOMPurify from "dompurify";
import { cn } from "@/lib/utils";

const textVariant = cva(
  "data-[state=active]:text-[#007bc7] text-typography-title",
  {
    variants: {
      variant: {
        // Caption variants (10px)
        "caption-xs-regular":
          "text-[10px] leading-[12px] font-normal tracking-[0.05em]",
        "caption-xs-medium":
          "text-[10px] leading-[12px] font-medium tracking-[0.05em]",

        // Caption variants (12px)
        "caption-sm-regular":
          "text-[12px] leading-[16px] font-normal tracking-[0.05em]",
        "caption-sm-medium":
          "text-[12px] leading-[16px] font-medium tracking-[0.05em]",

        // Caption variants (14px)
        "caption-md-regular": "text-[14px] leading-[20px] font-normal",
        "caption-md-medium": "text-[14px] leading-[20px] font-medium",
        "caption-md-semi": "text-[14px] leading-[20px] font-semibold",

        // Body variants (14px)
        "body-sm-regular": "text-[14px] leading-[20px] font-normal",
        "body-sm-medium": "text-[14px] leading-[20px] font-medium",
        "body-sm-semi": "text-[14px] leading-[20px] font-semibold",

        // Body variants (16px)
        "body-md-regular": "text-[16px] leading-[24px] font-normal",
        "body-md-medium": "text-[16px] leading-[24px] font-medium",
        "body-md-semi": "text-[16px] leading-[24px] font-semibold",

        // Body variants (18px)
        "body-lg-regular": "text-[18px] leading-[24px] font-normal",
        "body-lg-medium": "text-[18px] leading-[24px] font-medium",
        "body-lg-semi": "text-[18px] leading-[24px] font-semibold",

        // Title variants (14px)
        "title-sm-regular": "text-[14px] leading-[20px] font-normal",
        "title-sm-medium": "text-[14px] leading-[20px] font-medium",
        "title-sm-semi": "text-[14px] leading-[20px] font-semibold",

        // Title variants (16px)
        "title-md-regular": "text-[16px] leading-[24px] font-normal",
        "title-md-medium": "text-[16px] leading-[24px] font-medium",
        "title-md-semi": "text-[16px] leading-[24px] font-semibold",

        // Title variants (20px)
        "title-lg-regular": "text-[20px] leading-[28px] font-normal",
        "title-lg-medium": "text-[20px] leading-[28px] font-medium",
        "title-lg-semi": "text-[20px] leading-[28px] font-semibold",

        // Title Extra Large variants (22px)
        "title-xl-regular": "text-[22px] leading-[32px] font-normal",
        "title-xl-medium": "text-[22px] leading-[32px] font-medium",
        "title-xl-semi": "text-[22px] leading-[32px] font-semibold",

        // Display variants (24px)
        "display-sm": "text-[24px] leading-[36px] font-medium",

        // Display variants (27px)
        "display-md": "text-[27px] leading-[40px] font-semibold",

        // Display variants (32px)
        "display-lg": "text-[32px] leading-[44px] font-semibold",

        // Display variants (35px)
        "display-xl": "text-[35px] leading-[48px] font-semibold",

        // Legacy variants for backward compatibility
        default: "text-[10px] font-normal",
      },
      textColor: {
        default: "text-foreground",
        primary: "text-[#007BC7]",
        secondary: "text-[#5E6ED4]",
        tertiary: "text-[#E7E7E7]",
        heading: "text-[#161616]",
        title: "text-[#2D2D2D]",
        body: "text-[#434343]",
        caption: "text-[#787878]",
        inactive: "text-[#CFCFCF]",
        white: "text-white",
        error: "text-[#E54141]",
        success: "text-[#149D47]",
        warning: "text-[#EA980B]",
        muted: "text-muted-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
      textColor: "default",
    },
  },
);

export interface TextProps
  extends Omit<React.HTMLAttributes<HTMLParagraphElement>, "color">,
    VariantProps<typeof textVariant> {
  asChild?: boolean;
  html: string;
}

const TextHTML = React.forwardRef<HTMLParagraphElement, TextProps>(
  ({ className, variant, textColor, html, ...props }, ref) => {
    const sanitizedHTML = DOMPurify.sanitize(html, {
      ALLOWED_TAGS: [
        "ol",
        "li",
        "ul",
        "p",
        "strong",
        "h1",
        "h2",
        "a",
        "br",
        "table",
        "thead",
        "tbody",
        "tr",
        "th",
        "td",
      ],
      ALLOWED_ATTR: ["href", "target", "rel"],
    });

    return (
      <p
        className={cn(
          textVariant({ variant, textColor }),
          className,
          "[&_h1]:text-3xl [&_h1]:font-bold [&_h1]:my-6 [&_h2]:text-2xl [&_h2]:font-semibold [&_h2]:my-4 [&_ul]:list-disc [&_ul]:ml-5 [&_ul]:space-y-2 [&_ol]:list-decimal [&_ol]:ml-5 [&_ol]:space-y-2 [&_a]:text-blue-600 [&_a]:underline [&_table]:w-full [&_table]:my-4 [&_table]:border-collapse [&_th]:bg-gray-100 [&_th]:p-3 [&_th]:text-left [&_th]:border [&_th]:border-gray-300 [&_td]:p-3 [&_td]:border [&_td]:border-gray-300 [&_tr]:hover:bg-gray-50",
        )}
        ref={ref}
        // biome-ignore lint/security/noDangerouslySetInnerHtml: Sanitized with DOMPurify
        dangerouslySetInnerHTML={{ __html: sanitizedHTML }}
        {...props}
      />
    );
  },
);

TextHTML.displayName = "TextHTML";

export { TextHTML };
