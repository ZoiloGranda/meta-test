import { Photo } from "@/api/types/Photo";

export async function getPhotosByFields(filters: Partial<Photo>): Promise<Photo[]> {
 const queryParams = new URLSearchParams();

 Object.entries(filters).forEach(([key, value]) => {
  if (value !== undefined && value !== null) {
   queryParams.append(key, value.toString());
  }
 });

 const response = await fetch(`https://jsonplaceholder.typicode.com/photos?${queryParams.toString()}`);

 if (!response.ok) {
  throw new Error('Get photo by fields error');
 }

 return response.json();
}