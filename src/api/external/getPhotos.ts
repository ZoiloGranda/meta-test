import { Photo } from "@/api/types/Photo";

export async function getPhotos(): Promise<Photo[]> {
 try {
  const response = await fetch('https://jsonplaceholder.typicode.com/photos');
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