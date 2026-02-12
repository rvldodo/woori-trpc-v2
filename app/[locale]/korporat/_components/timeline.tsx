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
      className={cn(className)}
      sx={{
        // Mobile: right-aligned
        [`@media (max-width: 768px)`]: {
          padding: 0,
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
              // Even items: content on right (default)
              // Odd items: content on left (reversed)
              ...(idx % 2 !== 0 && {
                flexDirection: "row-reverse",
              }),
              "&::before": {
                flex: 1,
              },
            },
          }}
        >
          <TimelineOppositeContent
            sx={{
              [`@media (max-width: 768px)`]: {
                flex: "0 0 auto",
                minWidth: "60px",
                maxWidth: "80px",
                paddingLeft: "8px",
                paddingRight: "8px",
              },
              [`@media (min-width: 769px)`]: {
                flex: 1,
                textAlign: idx % 2 === 0 ? "right" : "left", // Align text based on position
              },
            }}
          >
            <Text variant="body-lg-semi">{e.date}</Text>
          </TimelineOppositeContent>
          <TimelineSeparator>
            <TimelineDot sx={{ bgcolor: "#007bc7" }} />
            {idx !== data.length - 1 && <TimelineConnector />}
          </TimelineSeparator>
          <TimelineContent
            sx={{
              [`@media (max-width: 768px)`]: {
                flex: 1,
                paddingLeft: "12px",
                paddingRight: "8px",
              },
              [`@media (min-width: 769px)`]: {
                flex: 1,
                textAlign: idx % 2 === 0 ? "left" : "right", // Align text based on position
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
