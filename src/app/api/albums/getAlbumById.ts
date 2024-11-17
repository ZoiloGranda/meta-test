import { Album } from "@/models/Album";

export async function getAlbumbyId({ albumId }: { albumId: string }) {
  try {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/albums/${albumId}`,
    );

    if (!response.ok) {
      throw new Error("Album by id response was not ok");
    }
    const album: Album = await response.json();
    return album;
  } catch {
    throw new Error("Failed to fetch Album by id");
  }
}
