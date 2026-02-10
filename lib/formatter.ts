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
