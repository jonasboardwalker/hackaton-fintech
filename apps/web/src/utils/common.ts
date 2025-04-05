import { randomBytes } from "crypto";

export const generateApiKey = () => {
  // returns a 64-char hex string
  return randomBytes(32).toString("hex");
};
