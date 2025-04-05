import { NextResponse } from "next/server";
import { TRPCError } from "@trpc/server";

export function handleApiError(error: unknown) {
  if (error instanceof TRPCError) {
    return NextResponse.json(
      { error: error.message },
      { status: error.code === "UNAUTHORIZED" ? 401 : 400 }
    );
  }

  console.error("Unhandled API error:", error);
  return NextResponse.json(
    { error: "Internal server error" },
    { status: 500 }
  );
} 