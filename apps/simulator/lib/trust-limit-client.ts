import { createTrustLimitClient } from "@admin-shad-template/api/generated";

export const trustLimitClient = createTrustLimitClient(
  process.env.TRUST_LIMIT_API_KEY || "",
);
// trustLimitClient.authorize()