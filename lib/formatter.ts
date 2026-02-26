export const dateFormat = (time: string) => {
  let dateNow = time;
  if (!time) dateNow = String(new Date());
  const date = new Date(dateNow);

  return new Intl.DateTimeFormat("id-ID", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(date);
};

export const toPascalCase = (str: string) =>
  str
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join("");

export const toTitleCase = (str: string) =>
  str
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

export const hyphenToPascalCase = (str: string): string => {
  return str
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
};

export const toTitle = (str: string) =>
  str
    .toLowerCase()
    .split(" ")
    .map((word) => {
      // preserve hyphenated parts like benz-glc
      return word
        .split("-")
        .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
        .join("-");
    })
    .join(" ");

export const toURLCase = (str: string) =>
  str.toLowerCase().split(" ").join("-");

export const extractTitleFromPath = (filePath: string): string => {
  const fileName = filePath.split("/").pop() || "";
  const nameWithoutExt = fileName.replace(/\.[^/.]+$/, "");
  const cleanedName = nameWithoutExt.replace(/-\d+$/, "");
  const title = cleanedName.replace(/[_-]+/g, " ");
  return title.trim();
};

export const createExcerpt = (htmlContent: string, maxSentences = 2) => {
  const textOnly = htmlContent.replace(/<[^>]*>/g, "");
  const sentences = textOnly.split(/(?<=[.!?])\s+/);
  return sentences.slice(0, maxSentences).join(" ").trim();
};

export const formatCurrency = (amount: number) => {
  const amounFormatter = amount.toLocaleString("en-US", {
    maximumFractionDigits: 2,
    maximumSignificantDigits: 2,
  });

  return `Rp ${amounFormatter}`;
};
