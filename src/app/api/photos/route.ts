import { buildAlbumsIds } from "@/app/api/photos/buildAlbumsIds";
import { PAGE_LIMIT } from "@/app/constants";
import { User } from "@/models/User";
import { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  console.log("searchParams", searchParams);
  const limit = searchParams.get("limit");
  const start = searchParams.get("start");
  const title = searchParams.get("title");
  const page = searchParams.get("page");
  const albumIds = searchParams.get("albumIds");
  const albumIdsParams =
    albumIds && albumIds.length > 0 ? buildAlbumsIds(albumIds) : "";
  console.log("albumIdsParams", albumIdsParams);
  try {
    const params = new URLSearchParams({
      ...(start ? { _start: start } : { _start: "0" }),
      ...(limit ? { _limit: limit } : { _limit: String(PAGE_LIMIT) }),
      ...(title ? { title_like: title } : {}),
      ...(page ? { _page: page } : {}),
    });
    const url = `https://jsonplaceholder.typicode.com/photos?${params.toString()}${albumIdsParams}`;
    console.log("url", url);
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("Photos response was not ok");
    }
    const photos: User[] = await response.json();
    return NextResponse.json({ photos }, { status: 200 });
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch photos" },
      { status: 500 },
    );
  }
}
