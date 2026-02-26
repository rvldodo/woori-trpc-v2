import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getUrlBranchMap = (lat: string, long: string): string => {
  return `https://www.google.com/maps/search/?api=1&query=${lat},${long}`;
};

export const getPastCarYears = (yearsBack: number) => {
  const currentYear = new Date().getFullYear();
  return Array.from({ length: yearsBack }, (_, index) => {
    const year = currentYear - index;
    return {
      value: year.toString(),
      label: year.toString(),
    };
  }).reverse();
};
