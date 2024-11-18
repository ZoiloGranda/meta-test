import { Photo } from "@/models/Photo";
import "dotenv/config";

export async function getPhotobyId({ photoId }: { photoId: string }) {
  try {
    const { API_URL } = process.env;
    const response = await fetch(`${API_URL}/photos/${photoId}`);
    if (!response.ok) {
      throw new Error("Photo by id response was not ok");
    }
    const photo: Photo = await response.json();
    return photo;
  } catch {
    throw new Error("Failed to fetch Photo by id");
  }
}
