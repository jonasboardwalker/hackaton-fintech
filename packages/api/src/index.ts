// file: src/api/index.ts
import { DefaultService, OpenAPI } from "./generated";

/**
 * App configuration for the TrustLimit API client.
 */
export interface AppConfig {
  apiKey: string;
  serviceUrl: string;
}

/**
 * Initializes the TrustLimit API client.
 *
 * Usage:
 *
 * import { AppConfig, initializeApp } from "@admin-shad-template/api";
 *
 * const config: AppConfig = {
 *   apiKey: process.env.TRUST_LIMIT_API_KEY!,
 *   serviceUrl: process.env.TRUST_SERVICE_URL!,
 * };
 *
 * export const trustLimitClient = initializeApp(config);
 *
 * Then, elsewhere you can call:
 *   trustLimitClient.checkTx({
 *     amount: 1500,
 *     metadata: { location: "DE" },
 *     clientId: "customer-id"
 *   });
 */
export function initializeApp(config: AppConfig) {
  OpenAPI.BASE = config.serviceUrl;
  OpenAPI.HEADERS = {
    "x-api-key": config.apiKey,
  };

  return {
    checkTx: (
      data: Parameters<typeof DefaultService.postApiTransactionsAuthorize>[0]
    ): ReturnType<typeof DefaultService.postApiTransactionsAuthorize> => {
      return DefaultService.postApiTransactionsAuthorize(data);
    },
  };
}
