import { createTRPCRouter } from "../../trpc";
import { getRules } from "./getRules";
import { updateRule } from "./updateRule";
import { deleteRule } from "./deleteRule";

export const rulesRouter = createTRPCRouter({
  getRules,
  updateRule,
  deleteRule,
}); 