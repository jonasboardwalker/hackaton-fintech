// file: ~/server/api/routers/transaction.ts

import { createTRPCRouter } from "../../trpc";
import { checkTransaction } from "./checkTransaction";
import { getTransactions } from "./getTransactions";

export const transactionRouter = createTRPCRouter({
  checkTransaction,
  getTransactions,
});
