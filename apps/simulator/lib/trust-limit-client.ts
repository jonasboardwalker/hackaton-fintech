import process from "node:process";
import { DefaultService, OpenAPI } from "@admin-shad-template/api";

OpenAPI.BASE = process.env.TRUST_LIMIT_BASE_URL || "";
OpenAPI.HEADERS = {
  "x-api-key": process.env.TRUST_LIMIT_API_KEY || "",
};

export function authorizeTx(
  requestBody: Parameters<
    typeof DefaultService.postApiTransactionsAuthorize
  >[0],
): ReturnType<typeof DefaultService.postApiTransactionsAuthorize> {
  return DefaultService.postApiTransactionsAuthorize(requestBody);
}