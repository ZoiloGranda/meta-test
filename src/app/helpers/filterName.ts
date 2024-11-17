export type EntityType = "photo" | "album" | "user";

export function parseFilter(input: string) {
  const [type, field] = input.split(".");
  return { type: type as EntityType, field };
}
