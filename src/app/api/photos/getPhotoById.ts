import { Photo } from "@/api/types/Photo";

export async function getPhotobyId({ photoId }: { photoId: string }) {
  try {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/photos/${photoId}`,
    );
    if (!response.ok) {
      throw new Error("Photo by id response was not ok");
    }
    const photo: Photo = await response.json();
    return photo;
  } catch {
    throw new Error("Failed to fetch Photo by id");
  }
}
