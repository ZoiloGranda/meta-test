import { PhotoWithMetadata } from "@/api/types/Photo";
import { getPhotoById } from "@/api/external/getPhotoById";
import { getUserById } from "@/api/external/getUserById";

export async function getPhotoWithMetadata(
  photoId: number,
): Promise<PhotoWithMetadata> {
  try {
    const photo = await getPhotoById(photoId);
    const albumResponse = await fetch(
      `/api/albumid?id=${encodeURIComponent(photo.albumId)}`,
    );
    const albumData = await albumResponse.json();
    const album = albumData.album;
    const user = await getUserById(album.userId);
    return {
      ...photo,
      album: {
        ...album,
        user,
      },
    };
  } catch (error) {
    console.error("Error fetching photo with metadata:", error);
    throw error;
  }
}
