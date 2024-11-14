import { Album } from "@/api/types/Album";

export async function getAlbums(): Promise<Album[]> {
 try {
  const response = await fetch('https://jsonplaceholder.typicode.com/albums');
  if (!response.ok) {
   throw new Error('Albums response was not ok');
  }
  const albums: Album[] = await response.json();
  return albums;
 } catch (error) {
  console.error('Failed to fetch albums:', error);
  throw error;
 }
}