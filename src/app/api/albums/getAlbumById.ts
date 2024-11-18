import { Album } from "@/models/Album";
import "dotenv/config";

export async function getAlbumbyId({ albumId }: { albumId: string }) {
  try {
    const { API_URL } = process.env;
    const response = await fetch(`${API_URL}/albums/${albumId}`);

    if (!response.ok) {
      throw new Error("Album by id response was not ok");
    }
    const album: Album = await response.json();
    return album;
  } catch {
    throw new Error("Failed to fetch Album by id");
  }
}
