import { User } from "@/models/User";

export async function getUserbyId({ userId }: { userId: string }) {
  try {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/users/${userId}`,
    );
    if (!response.ok) {
      throw new Error("User by id response was not ok");
    }
    const user: User = await response.json();
    return user;
  } catch {
    throw new Error("Failed to fetch User by id");
  }
}
