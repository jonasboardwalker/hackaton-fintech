import { NextResponse } from "next/server";
import { api } from "~/trpc/server";
import { handleApiError } from "~/server/api/helpers";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const result = await api.transaction.checkTransaction(body);
    return NextResponse.json(result);
  } catch (error) {
    return handleApiError(error);
  }
} 