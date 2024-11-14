import { PhotoWithMetadata } from "@/api/types/Photo";
import { getPhotoById } from "@/api/external/getPhotoById";
import { getAlbumById } from "@/api/external/getAlbumById";
import { getUserById } from "@/api/external/getUserById";

export async function getPhotoWithMetadata(
  photoId: number,
): Promise<PhotoWithMetadata> {
  try {
    const photo = await getPhotoById(photoId);
    const album = await getAlbumById(photo.albumId);
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
