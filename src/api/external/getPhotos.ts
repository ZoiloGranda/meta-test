import { Photo } from "@/api/types/Photo";

export async function getPhotos(start: number = 0, limit: number = 25): Promise<Photo[]> {
 try {
  const response = await fetch(`https://jsonplaceholder.typicode.com/photos?_start=${start}&_limit=${limit}`);
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