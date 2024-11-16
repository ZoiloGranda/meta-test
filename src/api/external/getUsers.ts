import { User } from "@/api/types/User";

interface GetusersParams {
 limit?: number;
 start?: number;
 email?: string;
}

export async function getUsers({
 limit = 25,
 start = 0,
 email,
}: GetusersParams = {}): Promise<User[]> {
 try {
  let url = `https://jsonplaceholder.typicode.com/users?_limit=${limit}&_start=${start}`;
  if (email) {
   url += `&email=${encodeURIComponent(email)}`;
  }
  const response = await fetch(url);
  if (!response.ok) {
   throw new Error("Users response was not ok");
  }
  const users: User[] = await response.json();
  return users;
 } catch (error) {
  throw new Error(`Failed to fetch users: ${error}`);
 }
}
