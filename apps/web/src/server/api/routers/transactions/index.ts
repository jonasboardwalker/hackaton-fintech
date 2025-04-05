// file: ~/server/api/routers/transaction.ts

import { createTRPCRouter } from "../../trpc";
import { checkTransaction } from "./checkTransaction";
import { checkTransactionFromApp } from "./checkTransactionFromApp";
import { getPublicData } from "./getPublicData";
import { getTransactions } from "./getTransactions";

export const transactionRouter = createTRPCRouter({
  checkTransaction,
  checkTransactionFromApp,
  getPublicData,
  getTransactions,
});
