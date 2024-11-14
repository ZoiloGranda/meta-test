import { Album } from "@/api/types/Album";

export async function getAlbums(limit: number = 25, start: number = 0, title?: string): Promise<Album[]> {
 try {
  const params = new URLSearchParams({
   _limit: limit.toString(),
   _start: start.toString(),
  });

  if (title) {
   params.append('title', title);
  }

  const response = await fetch(`https://jsonplaceholder.typicode.com/albums?${params.toString()}`);
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