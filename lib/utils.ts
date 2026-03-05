import { clsx, type ClassValue } from "clsx";
import crypto from "crypto";
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

export const getCurrentTimestamp = (format = "YYYYMMDDHHIISS"): string => {
  const now = new Date();

  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  const seconds = String(now.getSeconds()).padStart(2, "0");
  const milliseconds = String(now.getMilliseconds()).padStart(3, "0");

  return format
    .replace("YYYY", year.toString())
    .replace("MM", month)
    .replace("DD", day)
    .replace("HH", hours)
    .replace("II", minutes) // Using II instead of MM to avoid conflict with month
    .replace("SS", seconds)
    .replace("MSS", milliseconds);
};

export const generateSHA256Hash = (text: string): string => {
  return crypto.createHash("sha256").update(text).digest("hex");
};

export const generateOTP = (): string => {
  const otp = Math.floor(100000 + Math.random() * 900000);
  return otp.toString();
};
