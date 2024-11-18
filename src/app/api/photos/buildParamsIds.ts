export function buildAlbumsIds(ids: string): string {
  return ids
    .split(",")
    .map((id) => `&albumId=${id}`)
    .join("");
}

export function buildPhotoIds(ids: string): string {
  return ids
    .split(",")
    .map((id) => `&id=${id}`)
    .join("");
}
