import { PAGE_LIMIT } from "@/app/constants";
import { HandleFilterChangeParams } from "@/app/helpers/types/FiltersParamsType";
import { handlePhotoTitleChange } from "@/app/helpers/handlePhotoTitleChange";
import { Album } from "@/models/Album";
import { fetchData } from "@/app/helpers/fetchData";

export const handleAlbumTitleChange = async (
  params: HandleFilterChangeParams,
) => {
  const {
    value,
    setAlbumTitleFilter,
    setFilteredPhotos,
    setIsLoading,
    userEmailFilter,
    photoTitleFilter,
    filteredPhotos,
    currentUserId,
    currentPage,
  } = params;

  console.log("album value", value);

  if (!value) {
    setAlbumTitleFilter("");
    if (photoTitleFilter) {
      await handlePhotoTitleChange({
        ...params,
        pageChanged: true,
      });
      return;
    }
    if (!photoTitleFilter && !userEmailFilter) {
      const fetchedPhotos = await fetchData("/api/photos");
      setFilteredPhotos(fetchedPhotos);
      setIsLoading(false);
      return;
    }
    return;
  }

  const url = userEmailFilter
    ? `/api/albums?title=${encodeURIComponent(value)}&userId=${currentUserId}`
    : `/api/albums?title=${encodeURIComponent(value)}`;
  console.log("url", url);

  const filteredAlbums: Album[] = await fetchData(url);
  console.log("filteredAlbums", filteredAlbums);

  const albumIds = filteredAlbums.map((album) => album.id);
  const albumPhotos = photoTitleFilter
    ? filteredPhotos.filter((photo) => albumIds.includes(photo.albumId))
    : await fetchData(
        `/api/photos?albumIds=${albumIds}&start=${(currentPage - 1) * Number(PAGE_LIMIT)}`,
      );

  setAlbumTitleFilter(value);
  setFilteredPhotos(albumPhotos);
  setIsLoading(false);
};
