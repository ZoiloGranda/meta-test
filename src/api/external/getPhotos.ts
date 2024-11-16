import { Photo } from "@/api/types/Photo";

interface GetPhotosParams {
 limit?: number;
 start?: number;
 title?: string;
}

export async function getPhotos({
 limit = 25,
 start = 0,
 title,
}: GetPhotosParams = {}): Promise<Photo[]> {
 try {
  let url = `https://jsonplaceholder.typicode.com/photos?_limit=${limit}&_start=${start}`;
  if (title) {
   url += `&title_like=${encodeURIComponent(title)}`;
  }
  const response = await fetch(url);
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
