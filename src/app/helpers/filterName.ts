export type EntityType = "photo" | "album" | "user";

export type FiltersObject = { type: EntityType; field: string };

export function parseFilter(input: string): FiltersObject {
  const [type, field] = input.split(".");
  return { type: type as EntityType, field };
}
