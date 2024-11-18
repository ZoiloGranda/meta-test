import { PAGE_LIMIT } from "@/app/constants";
import { HandleFilterChangeParams } from "@/app/helpers/types/FiltersParamsType";
import { handlePhotoTitleChange } from "@/app/helpers/handlePhotoTitleChange";
import { Album } from "@/models/Album";
import { fetchData } from "@/app/helpers/fetchData";
import { Photo } from "@/models/Photo";
import { handleUserEmailChange } from "@/app/helpers/handleUserEmailChange";

export const handleAlbumTitleChange = async (
  params: HandleFilterChangeParams,
) => {
  const {
    value,
    setAlbumTitleFilter,
    setPhotoTitleFilter,
    setFilteredPhotos,
    setIsLoading,
    albumTitleFilter,
    userEmailFilter,
    photoTitleFilter,
    filteredPhotos,
    currentUserId,
    setCurrentUserId,
    currentPage,
    setCurrentPage,
    setUserEmailFilter,
  } = params;
  if (!value) {
    setAlbumTitleFilter("");
    if (photoTitleFilter) {
      await handlePhotoTitleChange({
        ...params,
        value: photoTitleFilter,
        pageChanged: true,
      });
      return;
    }
    if (userEmailFilter) {
      await handleUserEmailChange({
        ...params,
        value: userEmailFilter,
        pageChanged: true,
      });
      return;
    }
    if (!photoTitleFilter && !userEmailFilter) {
      const fetchedPhotos: Photo[] = await fetchData("/api/photos");
      setFilteredPhotos(fetchedPhotos);
      setIsLoading(false);
      return;
    }
    return;
  }

  const url = userEmailFilter
    ? `/api/albums?title=${encodeURIComponent(value)}&userId=${currentUserId}`
    : `/api/albums?title=${encodeURIComponent(value)}`;
  const filteredAlbums: Album[] = await fetchData(url);
  if (filteredAlbums.length === 0) {
    setAlbumTitleFilter(value);
    setFilteredPhotos([]);
    setIsLoading(false);
    return;
  }
  const albumIds = filteredAlbums.map((album) => album.id);
  if (photoTitleFilter && filteredPhotos.length > 0) {
    const albumPhotos: Photo[] = filteredPhotos.filter((photo) =>
      albumIds.includes(photo.albumId),
    );
    setAlbumTitleFilter(value);
    setFilteredPhotos(albumPhotos);
    setIsLoading(false);
    return;
  }
  if (photoTitleFilter && filteredPhotos.length === 0) {
    const albumPhotos: Photo[] = await fetchData(
      `/api/photos?albumIds=${albumIds}&title=${photoTitleFilter}&start=${(currentPage - 1) * Number(PAGE_LIMIT)}`,
    );
    setAlbumTitleFilter(value);
    setFilteredPhotos(albumPhotos);
    setIsLoading(false);
    return;
  }
  const albumPhotos: Photo[] = await fetchData(
    `/api/photos?albumIds=${albumIds}&start=${(currentPage - 1) * Number(PAGE_LIMIT)}`,
  );
  setAlbumTitleFilter(value);
  setFilteredPhotos(albumPhotos);
  setIsLoading(false);
};
