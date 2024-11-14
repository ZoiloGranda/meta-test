import { Album } from "@/api/types/Album";

export async function getAlbumsByFields(fields: Partial<Album>): Promise<Album[]> {
 const queryParams = new URLSearchParams();

 Object.entries(fields).forEach(([key, value]) => {
  if (value !== undefined && value !== null) {
   queryParams.append(key, value.toString());
  }
 });

 const response = await fetch(`https://jsonplaceholder.typicode.com/albums?${queryParams.toString()}`);
 if (!response.ok) {
  throw new Error('Get album by fields error');
 }
 return response.json();
}