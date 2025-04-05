import { DefaultService, OpenAPI } from "@/generated";

export function createTrustLimitClient(token: string) {
  OpenAPI.BASE = "/";
  OpenAPI.TOKEN = token;

  return {
    authorize: DefaultService.postApiTransactionsAuthorize,
  };
}