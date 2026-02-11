import { Text } from "@/components/html/text";
import { cn } from "@/lib/utils";
import Timeline from "@mui/lab/Timeline";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";
import TimelineOppositeContent from "@mui/lab/TimelineOppositeContent";
import { TextHTML } from "@/components/html/text-html";
import { Locale } from "next-intl";

export type TimelineEntry = {
  date: number;
  content: Record<Locale, string>;
};

interface TimelineProps {
  className?: string;
  data: TimelineEntry[];
  l: Locale;
}

export default function TimelineSection({ className, data, l }: TimelineProps) {
  return (
    <Timeline
      position="right"
      className={cn(className)}
      sx={{
        // Remove default padding on mobile
        [`@media (max-width: 768px)`]: {
          padding: 0,
        },
        // Alternate position on desktop
        [`@media (min-width: 769px)`]: {
          "& .MuiTimeline-root": {
            flexDirection: "row",
          },
        },
      }}
    >
      {data.map((e, idx) => (
        <TimelineItem
          key={idx.toString()}
          sx={{
            // Mobile: dates on left, content on right
            [`@media (max-width: 768px)`]: {
              "&::before": {
                flex: 0,
                padding: 0,
              },
            },
            // Desktop: alternate positions
            [`@media (min-width: 769px)`]: {
              ...(idx % 2 === 0 ? {} : { flexDirection: "row-reverse" }),
            },
          }}
        >
          <TimelineOppositeContent
            sx={{
              // Mobile: smaller width for dates
              [`@media (max-width: 768px)`]: {
                flex: "0 0 auto",
                minWidth: "60px",
                maxWidth: "80px",
                paddingLeft: "8px",
                paddingRight: "8px",
              },
              // Desktop: default behavior
              [`@media (min-width: 769px)`]: {
                flex: 1,
              },
            }}
          >
            <Text variant="body-lg-semi">{e.date}</Text>
          </TimelineOppositeContent>

          {idx === data.length - 1 ? (
            <TimelineSeparator>
              <TimelineDot sx={{ bgcolor: "#007bc7" }} />
            </TimelineSeparator>
          ) : (
            <TimelineSeparator>
              <TimelineDot sx={{ bgcolor: "#007bc7" }} />
              <TimelineConnector />
            </TimelineSeparator>
          )}

          <TimelineContent
            sx={{
              // Mobile: take remaining space
              [`@media (max-width: 768px)`]: {
                flex: 1,
                paddingLeft: "12px",
                paddingRight: "8px",
              },
              // Desktop: default behavior
              [`@media (min-width: 769px)`]: {
                flex: 1,
              },
            }}
          >
            <TextHTML
              variant="body-lg-regular"
              className="rounded-xl py-2 tracking-tight xl:mb-4 xl:px-3"
              html={e.content[l]}
            />
          </TimelineContent>
        </TimelineItem>
      ))}
    </Timeline>
  );
}
