import { getPhotos } from "@/api/external/getPhotos";
import { getPhotoWithMetadata } from "@/api/internal/getPhotoWithMetadata";
import { Photo, PhotoWithMetadata } from "@/api/types/Photo";

/**
 * Filters photos by a specified field and value, then retrieves their metadata.
 * @param field - The field of the Photo to filter by.
 * @param value - The value to match in the specified field.
 * @returns A promise that resolves to an array of PhotoWithMetadata.
 */
export async function searchPhotosByField<K extends keyof Photo>(
 field: K,
 value: Photo[K]
): Promise<PhotoWithMetadata[]> {
 try {
  const photos = await getPhotos();
  const filteredPhotos = photos.filter(photo => photo[field] === value);
  const metadataPromises = filteredPhotos.map(photo => getPhotoWithMetadata(photo.id));
  const photosWithMetadata = await Promise.all(metadataPromises);
  return photosWithMetadata;
 } catch (error) {
  console.error("Error searching photos by field:", error);
  throw error;
 }
}