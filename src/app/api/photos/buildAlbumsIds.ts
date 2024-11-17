export const buildAlbumIds = (albumIds: number[]): string => {
  return albumIds.map((id) => `&albumid=${id}`).join("");
};
