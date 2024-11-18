import { getAlbumbyId } from "@/app/api/albums/getAlbumById";
import { getPhotosRouteHandler } from "@/app/api/photos/handler";
import { getUserbyId } from "@/app/api/users/getUserById";
import { Photo } from "@/models/Photo";
import { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  {
    params,
  }: {
    params: Promise<{ ids: string }>;
  },
) {
  const { ids } = await params;
  try {
    const photos: Photo[] = await getPhotosRouteHandler({
      photoIds: ids,
    });
    const results = await Promise.all(
      photos.map(async (photo) => {
        const album = await getAlbumbyId({ albumId: String(photo.albumId) });
        const user = await getUserbyId({ userId: String(album.userId) });
        return {
          ...photo,
          album: {
            ...album,
            user,
          },
        };
      }),
    );
    return NextResponse.json(results, { status: 200 });
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch photo metadata" },
      { status: 500 },
    );
  }
}
