import { AppConfig, initializeApp } from "@admin-shad-template/api";

const config: AppConfig = {
  apiKey: process.env.NEXT_PUBLIC_TRUST_LIMIT_API_KEY || "",
  serviceUrl: process.env.NEXT_PUBLIC_TRUST_SERVICE_URL || "",
};

export const trustClient = initializeApp(config);
