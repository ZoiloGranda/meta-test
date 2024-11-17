import { Album } from "@/api/types/Album";
import { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export async function GET(req: NextRequest, { params }) {
  const { albumId } = await params;
  try {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/albums/${albumId}`,
    );

    if (!response.ok) {
      throw new Error("Album by id response was not ok");
    }
    const album: Album = await response.json();
    return NextResponse.json({ album }, { status: 200 });
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch Album by id" },
      { status: 500 },
    );
  }
}
