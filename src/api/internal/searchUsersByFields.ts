import { getUsers } from "@/api/external/getUsers";
import { User } from "@/api/types/User";

export async function searchUsersByFields(filters: Partial<User>): Promise<User[]> {
 const users = await getUsers();
 return users.filter(user =>
  Object.entries(filters).every(([key, value]) => user[key as keyof User] === value)
 );
}