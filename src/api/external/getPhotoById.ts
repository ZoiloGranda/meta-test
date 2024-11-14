import { Photo } from "@/api/types/Photo";

export async function getPhotoById(photoId: number): Promise<Photo> {
 try {
  const response = await fetch(`https://jsonplaceholder.typicode.com/photos/${photoId}`);
  if (!response.ok) {
   throw new Error('Failed to fetch photo data');
  }
  const data: Photo = await response.json();
  return data;
 } catch (error) {
  console.error('Error fetching photo:', error);
  throw error;
 }
}