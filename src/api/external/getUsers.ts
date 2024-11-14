import { User } from "@/api/types/User";

export async function getUsers(): Promise<User[]> {
 try {
  const response = await fetch('https://jsonplaceholder.typicode.com/users');
  if (!response.ok) {
   throw new Error('Users response was not ok');
  }
  const users: User[] = await response.json();
  return users;
 } catch (error) {
  throw new Error(`Failed to fetch users: ${error}`);
 }
}
