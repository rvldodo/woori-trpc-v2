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
    <Timeline position="alternate" className={cn(className)}>
      {data.map((e, idx) => (
        <TimelineItem key={idx.toString()}>
          <TimelineOppositeContent>
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
          <TimelineContent>
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
