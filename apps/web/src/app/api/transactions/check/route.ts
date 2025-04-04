// file: app/api/transaction-check/route.ts
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { api } from "~/trpc/server";

export async function POST(req: NextRequest) {
  try {
    // 1) Parse JSON body
    const json = await req.json(); // e.g. { userRole, amount }

    const result = await api.transaction.checkTransaction({ ...json });

    // 5) Return the result (outcome + message) as JSON
    return NextResponse.json(result);
  } catch (error) {
    console.error("Error in /api/transaction-check route:", error);

    // Return a generic 500 or a more specific error if you prefer
    return NextResponse.json(
      {
        error: (error as Error).message || "Internal Server Error",
      },
      { status: 500 },
    );
  }
}
