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
    const params = new URLSearchParams({
      _limit: limit.toString(),
      _start: start.toString(),
      ...(email ? { email: email } : {}),
    });
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/users?${params.toString()}`,
    );
    if (!response.ok) {
      throw new Error("Users response was not ok");
    }
    const users: User[] = await response.json();
    return users;
  } catch (error) {
    throw new Error(`Failed to fetch users: ${error}`);
  }
}
