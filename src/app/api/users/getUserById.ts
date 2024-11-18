import { User } from "@/models/User";
import "dotenv/config";

export async function getUserbyId({ userId }: { userId: string }) {
  try {
    const { API_URL } = process.env;
    const response = await fetch(`${API_URL}/users/${userId}`);
    if (!response.ok) {
      throw new Error("User by id response was not ok");
    }
    const user: User = await response.json();
    return user;
  } catch {
    throw new Error("Failed to fetch User by id");
  }
}
