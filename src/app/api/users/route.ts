import { User } from "models/User";
import { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  console.log("searchParams", searchParams);
  const email = searchParams.get("email");
  const limit = searchParams.get("limit");
  const start = searchParams.get("start");

  try {
    const params = new URLSearchParams({
      ...(start ? { _start: String(start) } : { _start: "0" }),
      ...(limit ? { _limit: String(limit) } : { _limit: "25" }),
      ...(email ? { email } : {}),
    });

    const response = await fetch(
      `https://jsonplaceholder.typicode.com/users?${params.toString()}`,
    );

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
