import { getUserbyId } from "@/app/api/users/getUserById";
import { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  {
    params,
  }: {
    params: Promise<{ userId: string }>;
  },
) {
  const { userId } = await params;
  console.log("userId", userId);
  try {
    const user = await getUserbyId({ userId });
    return NextResponse.json({ user }, { status: 200 });
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch user metadata" },
      { status: 500 },
    );
  }
}
