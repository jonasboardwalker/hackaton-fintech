import { DefaultService, OpenAPI } from "./generated";
import { AuthorizeParams } from "./types";

export function createTrustLimitClient(token: string) {
  OpenAPI.BASE = "/";
  OpenAPI.TOKEN = token;

  return {
    authorize: (...args: AuthorizeParams) =>
      DefaultService.postApiTransactionsAuthorize(...args),
  };
}
