import { User } from "@/api/types/User";
import { buildAlbumIds } from "@/app/api/photos/buildAlbumsIds";
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
  console.log("albumIds", albumIds);
  // const albumIdsParams =
  //   albumIds && albumIds.length > 0 ? buildAlbumIds(albumIds) : "";
  // console.log("albumIdsParams", albumIdsParams);
  try {
    const params = new URLSearchParams({
      ...(start ? { _start: start } : { _start: "0" }),
      ...(limit ? { _limit: limit } : { _limit: "25" }),
      ...(title ? { title_like: title } : {}),
      ...(page ? { _page: page } : {}),
    });

    const response = await fetch(
      `https://jsonplaceholder.typicode.com/photos?${params.toString()}`,
    );

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
