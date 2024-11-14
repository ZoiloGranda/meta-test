import { Photo } from "@/api/types/Photo";

export async function getPhotos(limit: number = 25, start: number = 0, title?: string): Promise<Photo[]> {
 try {
  let url = `https://jsonplaceholder.typicode.com/photos?_limit=${limit}&_start=${start}`;
  if (title) {
   url += `&title=${encodeURIComponent(title)}`;
  }
  const response = await fetch(url);
  if (!response.ok) {
   throw new Error('Photos response was not ok');
  }
  const data: Photo[] = await response.json();
  return data;
 } catch (error) {
  console.error('Failed to fetch photos:', error);
  throw error;
 }
}