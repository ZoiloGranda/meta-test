import { User } from "@/api/types/User";

export async function getUsersByFields(fields: Partial<User>): Promise<User[]> {
 const query = new URLSearchParams();

 Object.entries(fields).forEach(([key, value]) => {
  if (value !== undefined) {
   query.append(key, String(value));
  }
 });

 const response = await fetch(`https://jsonplaceholder.typicode.com/users?${query.toString()}`);

 if (!response.ok) {
  throw new Error('Get users by fields error');
 }

 return response.json();
}