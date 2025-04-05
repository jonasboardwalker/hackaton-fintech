import { writeFileSync } from "fs";
import { join } from "path";
import { createDocument } from "zod-openapi";
import {
  checkTransactionInputSchema,
  checkTransactionOutputSchema
} from "~/server/api/routers/transactions/checkTransaction.schema";

const openapi = createDocument({
  openapi: "3.0.0",
  info: {
    title: "Transaction API",
    version: "1.0.0",
  },
  paths: {
    "/api/transactions/authorize": {
      post: {
        summary: "Authorize a transaction",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: checkTransactionInputSchema,
            },
          },
        },
        responses: {
          "200": {
            description: "Transaction authorization result",
            content: {
              "application/json": {
                schema: checkTransactionOutputSchema,
              },
            },
          },
          "400": {
            description: "Bad request",
          },
          "401": {
            description: "Unauthorized",
          },
          "500": {
            description: "Internal server error",
          },
        },
      },
    },
  },
});

const outputPath = join(process.cwd(), "openapi.json");
writeFileSync(outputPath, JSON.stringify(openapi, null, 2));
