import { auth } from "@clerk/nextjs/server";
import { type Role } from "~/types/globals";

export const checkRole = async (role: Role) => {
  const { sessionClaims } = await auth();
  return sessionClaims?.metadata.role === role;
};
