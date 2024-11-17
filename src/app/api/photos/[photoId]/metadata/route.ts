import { getAlbumbyId } from "app/api/albums/getAlbumById";
import { getPhotobyId } from "app/api/photos/getPhotoById";
import { getUserbyId } from "app/api/users/getUserById";
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
  console.log("photoId", photoId);

  try {
    const photo = await getPhotobyId({ photoId });
    console.log("photo", photo);
    const album = await getAlbumbyId({ albumId: String(photo.albumId) });
    console.log("album", album);
    const user = await getUserbyId({ userId: String(album.userId) });
    console.log("user", user);
    return NextResponse.json(
      {
        ...photo,
        album: {
          ...album,
          user,
        },
      },
      { status: 200 },
    );
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch photo metadata" },
      { status: 500 },
    );
  }
}
