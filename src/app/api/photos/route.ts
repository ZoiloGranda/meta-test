import { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import "dotenv/config";
import { Photo } from "@/models/Photo";
import { getPhotosRouteHandler } from "@/app/api/photos/handler";

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const limit = searchParams.get("limit");
  const start = searchParams.get("start");
  const title = searchParams.get("title");
  const page = searchParams.get("page");
  const albumIds = searchParams.get("albumIds");
  const photoIds = searchParams.get("photoIds");
  try {
    const photos: Photo[] = await getPhotosRouteHandler({
      limit,
      start,
      title,
      page,
      albumIds,
      photoIds,
    });
    return NextResponse.json(photos, { status: 200 });
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch photos" },
      { status: 500 },
    );
  }
}
