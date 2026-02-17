import Timeline from "@mui/lab/Timeline";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";
import { timelineOppositeContentClasses } from "@mui/lab/TimelineOppositeContent";
import { Text } from "@/components/html/text";
import { Button } from "@/components/ui/button";
import Img from "@/components/html/img";
import { StaticImageData } from "next/image";

type Props = {
  proses: Array<{ image: StaticImageData; title: string; description: string }>;
};

export default function ProcessTimelineComponent({ proses }: Props) {
  return (
    <Timeline
      position="right"
      sx={{
        [`& .${timelineOppositeContentClasses.root}`]: {
          flex: 0,
          padding: 0,
        },
        [`& .MuiTimelineItem-root`]: {
          "&::before": {
            display: "none", // removes the default left spacer
          },
        },
        padding: 0,
        margin: 0,
      }}
    >
      {proses.map((e, idx) => (
        <TimelineItem key={idx.toString()}>
          <TimelineSeparator>
            <TimelineDot
              sx={{
                padding: 0,
                border: "none",
                boxShadow: "none",
                background: "transparent",
              }}
            >
              <Button
                variant="woori_active"
                className="cursor-default py-5 px-4 rounded-lg"
              >
                <Text variant="body-md-medium" color="primary">
                  {idx + 1}
                </Text>
              </Button>
            </TimelineDot>
            {idx < proses.length - 1 && <TimelineConnector />}
          </TimelineSeparator>
          <TimelineContent>
            <div className="flex md:flex-row flex-col gap-3 items-center px-3 pb-6">
              <Img src={e.image} alt={e.title} width={150} />
              <div className="flex flex-col gap-1">
                <Text variant="body-md-semi">{e.title}</Text>
                <Text variant="body-sm-regular">{e.description}</Text>
              </div>
            </div>
          </TimelineContent>
        </TimelineItem>
      ))}
    </Timeline>
  );
}
