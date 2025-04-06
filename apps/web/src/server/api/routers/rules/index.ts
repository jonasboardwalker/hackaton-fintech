import { createTRPCRouter } from "../../trpc";
import { getRules } from "./getRules";
import { updateRule } from "./updateRule";
import { deleteRule } from "./deleteRule";
import { createRule } from "~/server/api/routers/rules/createRule";

export const rulesRouter = createTRPCRouter({
  getRules,
  updateRule,
  deleteRule,
  createRule,
});
