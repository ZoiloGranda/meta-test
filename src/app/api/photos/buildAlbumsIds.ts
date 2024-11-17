export function buildAlbumsIds(ids: string): string {
  return ids
    .split(",")
    .map((id) => `&albumid=${id}`)
    .join("");
}
