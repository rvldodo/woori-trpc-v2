import "server-only";
import crypto from "crypto";
import { env } from "@/env.mjs";

const ALGORITHM = "aes-256-gcm";
const SECRET_KEY = crypto.scryptSync(
  env.NEXT_PUBLIC_ENCRYPT_SECRET,
  "salt",
  32,
);

export const encryptAES = (
  plainText: string,
): { encrypted: string; iv: string; tag: string } => {
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv(ALGORITHM, SECRET_KEY, iv);
  cipher.setAAD(Buffer.from(env.NEXT_PUBLIC_ENCRYPT_SECRET, "utf8"));
  let encrypted = cipher.update(plainText, "utf8", "hex");
  encrypted += cipher.final("hex");
  const tag = cipher.getAuthTag();
  return {
    encrypted,
    iv: iv.toString("hex"),
    tag: tag.toString("hex"),
  };
};

export const decryptAES = (encryptedData: {
  encrypted: string;
  iv: string;
  tag: string;
}): string => {
  try {
    const decipher = crypto.createDecipheriv(
      ALGORITHM,
      SECRET_KEY,
      Buffer.from(encryptedData.iv, "hex"),
    );
    decipher.setAAD(Buffer.from(env.NEXT_PUBLIC_ENCRYPT_SECRET, "utf8"));
    decipher.setAuthTag(Buffer.from(encryptedData.tag, "hex"));
    let decrypted = decipher.update(encryptedData.encrypted, "hex", "utf8");
    decrypted += decipher.final("utf8");
    return decrypted;
  } catch (error) {
    console.error("Decryption error:", error);
    throw new Error(`Decryption failed: ${error}`);
  }
};
