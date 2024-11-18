import { PAGE_LIMIT } from "@/app/constants";
import { Album } from "@/models/Album";
import { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import "dotenv/config";

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const start = searchParams.get("start");
  const limit = searchParams.get("limit");
  const title = searchParams.get("title");
  const userId = searchParams.get("userId");
  const page = searchParams.get("page");
  const { API_URL } = process.env;

  try {
    const params = new URLSearchParams({
      ...(start ? { _start: String(start) } : { _start: "0" }),
      ...(limit ? { _limit: String(limit) } : { _limit: String(PAGE_LIMIT) }),
      ...(title ? { title_like: title } : {}),
      ...(userId ? { userId: userId } : {}),
      ...(page ? { _page: page } : {}),
    });

    const response = await fetch(`${API_URL}/albums?${params.toString()}`);

    if (!response.ok) {
      throw new Error("Albums response was not ok");
    }
    const albums: Album[] = await response.json();
    return NextResponse.json({ albums }, { status: 200 });
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch Albums" },
      { status: 500 },
    );
  }
}
