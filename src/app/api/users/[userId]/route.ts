import { User } from "@/api/types/User";
import { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export async function GET(req: NextRequest, { params }) {
  const { userId } = await params;
  console.log("userId", userId);

  try {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/users/${userId}`,
    );

    if (!response.ok) {
      throw new Error("User by id response was not ok");
    }
    const user: User = await response.json();
    return NextResponse.json({ user }, { status: 200 });
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch Wser by id" },
      { status: 500 },
    );
  }
}
