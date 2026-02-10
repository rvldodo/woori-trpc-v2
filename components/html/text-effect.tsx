"use client";

import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "motion/react";
import type {
  TargetAndTransition,
  Transition,
  Variant,
  Variants,
} from "motion/react";
import React from "react";
import { cva, type VariantProps } from "class-variance-authority";

export type PresetType = "blur" | "fade-in-blur" | "scale" | "fade" | "slide";

export type PerType = "word" | "char" | "line";

const textVariant = cva("", {
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
    color: {
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
    color: "default",
  },
});

export type TextEffectProps = {
  children: string;
  per?: PerType;
  as?: keyof React.JSX.IntrinsicElements;
  variants?: {
    container?: Variants;
    item?: Variants;
  };
  className?: string;
  preset?: PresetType;
  delay?: number;
  speedReveal?: number;
  speedSegment?: number;
  trigger?: boolean;
  onAnimationComplete?: () => void;
  onAnimationStart?: () => void;
  segmentWrapperClassName?: string;
  containerTransition?: Transition;
  segmentTransition?: Transition;
  style?: React.CSSProperties;
} & VariantProps<typeof textVariant>;

const defaultStaggerTimes: Record<PerType, number> = {
  char: 0.03,
  word: 0.05,
  line: 0.1,
};

const defaultContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
    },
  },
  exit: {
    transition: { staggerChildren: 0.05, staggerDirection: -1 },
  },
};

const defaultItemVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
  },
  exit: { opacity: 0 },
};

const presetVariants: Record<
  PresetType,
  { container: Variants; item: Variants }
> = {
  blur: {
    container: defaultContainerVariants,
    item: {
      hidden: { opacity: 0, filter: "blur(12px)" },
      visible: { opacity: 1, filter: "blur(0px)" },
      exit: { opacity: 0, filter: "blur(12px)" },
    },
  },
  "fade-in-blur": {
    container: defaultContainerVariants,
    item: {
      hidden: { opacity: 0, y: 20, filter: "blur(12px)" },
      visible: { opacity: 1, y: 0, filter: "blur(0px)" },
      exit: { opacity: 0, y: 20, filter: "blur(12px)" },
    },
  },
  scale: {
    container: defaultContainerVariants,
    item: {
      hidden: { opacity: 0, scale: 0 },
      visible: { opacity: 1, scale: 1 },
      exit: { opacity: 0, scale: 0 },
    },
  },
  fade: {
    container: defaultContainerVariants,
    item: {
      hidden: { opacity: 0 },
      visible: { opacity: 1 },
      exit: { opacity: 0 },
    },
  },
  slide: {
    container: defaultContainerVariants,
    item: {
      hidden: { opacity: 0, y: 20 },
      visible: { opacity: 1, y: 0 },
      exit: { opacity: 0, y: 20 },
    },
  },
};

const AnimationComponent: React.FC<{
  segment: string;
  variants: Variants;
  per: "line" | "word" | "char";
  segmentWrapperClassName?: string;
}> = React.memo(({ segment, variants, per, segmentWrapperClassName }) => {
  const content =
    per === "line" ? (
      <motion.span variants={variants} className="block">
        {segment}
      </motion.span>
    ) : per === "word" ? (
      <motion.span
        aria-hidden="true"
        variants={variants}
        className="inline-block whitespace-pre"
      >
        {segment}
      </motion.span>
    ) : (
      <motion.span className="inline-block whitespace-pre">
        {segment.split("").map((char, charIndex) => (
          <motion.span
            key={`char-${charIndex.toString()}`}
            aria-hidden="true"
            variants={variants}
            className="inline-block whitespace-pre"
          >
            {char}
          </motion.span>
        ))}
      </motion.span>
    );

  if (!segmentWrapperClassName) {
    return content;
  }

  const defaultWrapperClassName = per === "line" ? "block" : "inline-block";

  return (
    <span className={cn(defaultWrapperClassName, segmentWrapperClassName)}>
      {content}
    </span>
  );
});

AnimationComponent.displayName = "AnimationComponent";

const splitText = (text: string, per: PerType) => {
  if (per === "line") return text.split("\n");
  return text.split(/(\s+)/);
};

const hasTransition = (
  variant?: Variant,
): variant is TargetAndTransition & { transition?: Transition } => {
  if (!variant) return false;
  return typeof variant === "object" && "transition" in variant;
};

const createVariantsWithTransition = (
  baseVariants: Variants,
  transition?: Transition & { exit?: Transition },
): Variants => {
  if (!transition) return baseVariants;

  const { exit: _, ...mainTransition } = transition;

  return {
    ...baseVariants,
    visible: {
      ...baseVariants.visible,
      transition: {
        ...(hasTransition(baseVariants.visible)
          ? baseVariants.visible.transition
          : {}),
        ...mainTransition,
      },
    },
    exit: {
      ...baseVariants.exit,
      transition: {
        ...(hasTransition(baseVariants.exit)
          ? baseVariants.exit.transition
          : {}),
        ...mainTransition,
        staggerDirection: -1,
      },
    },
  };
};

export function TextEffect({
  children,
  per = "word",
  as = "p",
  variants,
  className,
  preset = "fade",
  delay = 0,
  speedReveal = 1,
  speedSegment = 1,
  trigger = true,
  onAnimationComplete,
  onAnimationStart,
  segmentWrapperClassName,
  containerTransition,
  segmentTransition,
  style,
  variant,
  color,
}: TextEffectProps) {
  const segments = splitText(children, per);
  const MotionTag = motion[as as keyof typeof motion] as typeof motion.div;

  const baseVariants = preset
    ? presetVariants[preset]
    : { container: defaultContainerVariants, item: defaultItemVariants };

  const stagger = defaultStaggerTimes[per] / speedReveal;

  const baseDuration = 0.3 / speedSegment;

  const customStagger = hasTransition(variants?.container?.visible ?? {})
    ? (variants?.container?.visible as TargetAndTransition).transition
        ?.staggerChildren
    : undefined;

  const customDelay = hasTransition(variants?.container?.visible ?? {})
    ? (variants?.container?.visible as TargetAndTransition).transition
        ?.delayChildren
    : undefined;

  const computedVariants = {
    container: createVariantsWithTransition(
      variants?.container || baseVariants.container,
      {
        staggerChildren: customStagger ?? stagger,
        delayChildren: customDelay ?? delay,
        ...containerTransition,
        exit: {
          staggerChildren: customStagger ?? stagger,
          staggerDirection: -1,
        },
      },
    ),
    item: createVariantsWithTransition(variants?.item || baseVariants.item, {
      duration: baseDuration,
      ...segmentTransition,
    }),
  };

  return (
    <AnimatePresence mode="popLayout">
      {trigger && (
        <MotionTag
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={computedVariants.container}
          className={cn(textVariant({ variant, color }), className)}
          onAnimationComplete={onAnimationComplete}
          onAnimationStart={onAnimationStart}
          style={style}
        >
          {per !== "line" ? <span className="sr-only">{children}</span> : null}
          {segments.map((segment, index) => (
            <AnimationComponent
              key={`${per}-${index}-${segment}`}
              segment={segment}
              variants={computedVariants.item}
              per={per}
              segmentWrapperClassName={segmentWrapperClassName}
            />
          ))}
        </MotionTag>
      )}
    </AnimatePresence>
  );
}
