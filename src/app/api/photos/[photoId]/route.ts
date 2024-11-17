import { getPhotobyId } from "@/app/api/photos/getPhotoById";
import { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  {
    params,
  }: {
    params: Promise<{ photoId: string }>;
  },
) {
  const { photoId } = await params;
  console.log("photoId in 2", photoId);
  try {
    const photo = await getPhotobyId({ photoId });
    return NextResponse.json({ photo }, { status: 200 });
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch photo metadata" },
      { status: 500 },
    );
  }
}
