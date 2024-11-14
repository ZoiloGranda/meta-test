import { User } from "@/api/types/User";

export async function getUserById(userId: number): Promise<User> {
 try {
  const response = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`);
  if (!response.ok) {
   throw new Error('Failed to fetch user data');
  }
  const user: User = await response.json();
  return user;
 } catch (error) {
  console.error('Error fetching user:', error);
  throw error;
 }
}