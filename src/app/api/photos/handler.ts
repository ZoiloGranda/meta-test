import { buildAlbumsIds, buildPhotoIds } from "@/app/api/photos/buildParamsIds";
import { PAGE_LIMIT } from "@/app/constants";
import { Photo } from "@/models/Photo";
import "dotenv/config";

export async function getPhotosRouteHandler({
  albumIds,
  photoIds,
  start,
  limit,
  title,
  page,
}: {
  albumIds?: string | null;
  photoIds?: string | null;
  start?: string | null;
  limit?: string | null;
  title?: string | null;
  page?: string | null;
}) {
  const { API_URL } = process.env;
  try {
    const params = new URLSearchParams({
      ...(start ? { _start: start } : { _start: "0" }),
      ...(limit ? { _limit: limit } : { _limit: String(PAGE_LIMIT) }),
      ...(title ? { title_like: title } : {}),
      ...(page ? { _page: page } : {}),
    });
    const albumIdsParams =
      albumIds && albumIds.length > 0 ? buildAlbumsIds(albumIds) : "";
    const photoIdsParams =
      photoIds && photoIds.length > 0 ? buildPhotoIds(photoIds) : "";
    const url = `${API_URL}/photos?${params.toString()}${albumIdsParams}${photoIdsParams}`;
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("Photos response was not ok");
    }
    const photos: Photo[] = await response.json();
    return photos;
  } catch {
    throw new Error("Failed to fetch photos");
  }
}
