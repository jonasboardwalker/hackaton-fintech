import { DefaultService } from "@/generated";

export type AuthorizeParams = Parameters<
  typeof DefaultService.postApiTransactionsAuthorize
>;