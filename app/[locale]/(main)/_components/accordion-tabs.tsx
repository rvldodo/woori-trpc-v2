import { Text } from "@/components/html/text";
import { TextHTML } from "@/components/html/text-html";
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import DOMPurify from "dompurify";

export type AccordionTabsType = {
  id: number;
  question: string;
  answer: string;
};

export function AccordionTabs(props: AccordionTabsType) {
  const { id, question, answer } = props;
  return (
    <AccordionItem value={`item-${id}`}>
      <AccordionTrigger>
        <Text variant="body-lg-medium" className="text-start">
          {question}
        </Text>
      </AccordionTrigger>
      <AccordionContent className="h-auto">
        <TextHTML
          variant="body-md-regular"
          html={DOMPurify.sanitize(answer, {
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
            ],
            ALLOWED_ATTR: ["href", "target", "rel"],
          })}
        />
      </AccordionContent>
    </AccordionItem>
  );
}
