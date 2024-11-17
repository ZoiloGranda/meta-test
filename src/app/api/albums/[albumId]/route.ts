import { getAlbumbyId } from "@/app/api/albums/getAlbumById";
import { NextResponse, NextRequest } from "next/server";

export async function GET(
  request: NextRequest,
  {
    params,
  }: {
    params: Promise<{ albumId: string }>;
  },
) {
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
