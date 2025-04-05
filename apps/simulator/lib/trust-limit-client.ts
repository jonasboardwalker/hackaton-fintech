import { createTrustLimitClient } from "@admin-shad-template/api";

export const trustLimitClient = createTrustLimitClient(
  process.env.TRUST_LIMIT_API_KEY || "",
);
trustLimitClient.authorize();
