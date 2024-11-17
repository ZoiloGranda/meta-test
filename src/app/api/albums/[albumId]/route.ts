import { getAlbumbyId } from "@/app/api/albums/getAlbumById";
import { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export async function GET(req: NextRequest, { params }) {
  const { albumId } = await params;
  try {
    const album = await getAlbumbyId({ albumId });
    return NextResponse.json({ album }, { status: 200 });
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch album data" },
      { status: 500 },
    );
  }
}
