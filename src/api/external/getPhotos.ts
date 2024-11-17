import { Photo } from "@/api/types/Photo";

interface GetPhotosParams {
  limit?: number;
  start?: number;
  title?: string;
  albumId?: number[];
  page?: number;
}

export async function getPhotos({
  limit = 25,
  start = 0,
  title,
  albumId,
  page,
}: GetPhotosParams = {}): Promise<Photo[]> {
  try {
    const params = new URLSearchParams({
      _limit: limit.toString(),
      _start: start.toString(),
      ...(title ? { title_like: title } : {}),
      ...(page ? { _page: String(page) } : {}),
    });
    if (albumId && albumId.length > 0) {
      albumId.forEach((id) => params.append("albumId", id.toString()));
    }

    const response = await fetch(
      `https://jsonplaceholder.typicode.com/photos?${params.toString()}`,
    );
    //

    if (!response.ok) {
      throw new Error("Photos response was not ok");
    }
    const data: Photo[] = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to fetch photos:", error);
    throw error;
  }
}
