import { generateAuthToken } from "@/server/lib/generator";
import { NextResponse } from "next/server";

export async function GET() {
  const token = generateAuthToken();
  return NextResponse.json({ key: token });
}
