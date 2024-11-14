import { Album } from "@/api/types/Album";

export async function getAlbumById(id: number): Promise<Album> {
 try {
  const response = await fetch(`https://jsonplaceholder.typicode.com/albums/${id}`);
  if (!response.ok) {
   throw new Error('Failed to fetch album data');
  }
  const album: Album = await response.json();
  return album;
 } catch (error) {
  console.error('Error fetching album:', error);
  throw error;
 }
}