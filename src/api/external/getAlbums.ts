import { Album } from "@/api/types/Album";

interface GetAlbumsParams {
  limit?: number;
  start?: number;
  title?: string;
  userId?: number;
  page?: number;
}

export async function getAlbums({
  limit = 25,
  start = 0,
  title,
  userId,
  page,
}: GetAlbumsParams = {}): Promise<Album[]> {
  try {
    const params = new URLSearchParams({
      _limit: limit.toString(),
      _start: start.toString(),
      ...(title ? { title_like: title } : {}),
      ...(userId ? { userId: String(userId) } : {}),
      ...(page ? { _page: String(page) } : {}),
    });

    const response = await fetch(
      `https://jsonplaceholder.typicode.com/albums?${params.toString()}`,
    );
    if (!response.ok) {
      throw new Error("Albums response was not ok");
    }
    const albums: Album[] = await response.json();
    return albums;
  } catch (error) {
    console.error("Failed to fetch albums:", error);
    throw error;
  }
}
