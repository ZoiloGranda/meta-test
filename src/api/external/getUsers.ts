import { User } from "@/api/types/User";

export async function getUsers(limit: number = 25, start: number = 0): Promise<User[]> {
 try {
  const response = await fetch(`https://jsonplaceholder.typicode.com/users?_limit=${limit}&_start=${start}`);
  if (!response.ok) {
   throw new Error('Users response was not ok');
  }
  const users: User[] = await response.json();
  return users;
 } catch (error) {
  throw new Error(`Failed to fetch users: ${error}`);
 }
}
