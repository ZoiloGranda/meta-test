import { PhotoWithMetadata } from "@/api/types/Photo";
import { getUserById } from "@/api/external/getUserById";

export async function getPhotoWithMetadata(
  photoId: number,
): Promise<PhotoWithMetadata> {
  try {
    const photoResponse = await fetch(
      `/api/photoid?id=${encodeURIComponent(photoId)}`,
    );
    const photoData = await photoResponse.json();
    const photo = photoData.photo;
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
