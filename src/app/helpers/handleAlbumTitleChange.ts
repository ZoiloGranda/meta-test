import { PAGE_LIMIT } from "@/app/constants";
import { HandleFilterChangeParams } from "@/app/helpers/types/FiltersParamsType";
import { handlePhotoTitleChange } from "@/app/helpers/handlePhotoTitleChange";
import { Album } from "@/models/Album";
import { fetchData } from "@/app/helpers/fetchData";

export const handleAlbumTitleChange = async ({
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
}: HandleFilterChangeParams) => {
  console.log("album value", value);
  if (!value) {
    setAlbumTitleFilter("");
    if (photoTitleFilter) {
      await handlePhotoTitleChange({
        value: photoTitleFilter,
        setPhotoTitleFilter,
        setAlbumTitleFilter,
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
  const response = await fetch(url);
  const data = await response.json();
  const filteredAlbums: Album[] = data.albums;
  const albumIds = filteredAlbums.map((album) => album.id);
  const albumPhotos = photoTitleFilter
    ? filteredPhotos.filter((photo) => albumIds.includes(photo.albumId))
    : await (async () => {
        return await fetchData(
          `/api/photos?albumIds=${albumIds}&start=${(currentPage - 1) * Number(PAGE_LIMIT)}`,
        );
      })();
  setAlbumTitleFilter(value);
  setFilteredPhotos(albumPhotos);
  setIsLoading(false);
};
