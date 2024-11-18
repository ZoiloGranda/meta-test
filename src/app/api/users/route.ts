import { PAGE_LIMIT } from "@/app/constants";
import { User } from "@/models/User";
import { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import "dotenv/config";

export async function GET(req: NextRequest) {
  const { API_URL } = process.env;
  const searchParams = req.nextUrl.searchParams;
  const email = searchParams.get("email");
  const limit = searchParams.get("limit");
  const start = searchParams.get("start");

  try {
    const params = new URLSearchParams({
      ...(start ? { _start: String(start) } : { _start: "0" }),
      ...(limit ? { _limit: String(limit) } : { _limit: String(PAGE_LIMIT) }),
      ...(email ? { email } : {}),
    });

    const response = await fetch(`${API_URL}/users?${params.toString()}`);

    if (!response.ok) {
      throw new Error("Users response was not ok");
    }
    const users: User[] = await response.json();
    return NextResponse.json({ users }, { status: 200 });
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch users" },
      { status: 500 },
    );
  }
}
