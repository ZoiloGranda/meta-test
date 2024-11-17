import { Album } from "@/models/Album";
import { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  console.log("searchParams", searchParams);
  const start = searchParams.get("start");
  const limit = searchParams.get("limit");
  const title = searchParams.get("title");
  const userId = searchParams.get("userId");
  const page = searchParams.get("page");

  try {
    const params = new URLSearchParams({
      ...(start ? { _start: String(start) } : { _start: "0" }),
      ...(limit ? { _limit: String(limit) } : { _limit: "25" }),
      ...(title ? { title_like: title } : {}),
      ...(userId ? { userId: userId } : {}),
      ...(page ? { _page: page } : {}),
    });

    const response = await fetch(
      `https://jsonplaceholder.typicode.com/albums?${params.toString()}`,
    );

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
