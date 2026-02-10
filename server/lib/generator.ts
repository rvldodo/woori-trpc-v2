import "server-only";
import { encryptAES } from "./encrypt";
import { env } from "@/env.mjs";

export const generateAuthToken = () => {
  const encrypt = encryptAES(env.API_PRIVATE_KEY);
  return `${encrypt.encrypted}.${encrypt.iv}.${encrypt.tag}`;
};
