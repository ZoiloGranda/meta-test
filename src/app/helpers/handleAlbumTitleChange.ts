import { PAGE_LIMIT } from "@/app/constants";
import { HandleFilterChangeParams } from "@/app/helpers/FiltersParamsType";
import { handlePhotoTitleChange } from "@/app/helpers/handlePhotoTitleChange";
import { Album } from "@/models/Album";
import { Photo } from "@/models/Photo";

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
      const response = await fetch("/api/photos");
      const data = await response.json();
      const fetchedPhotos = data.photos;
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
        const response = await fetch(
          `/api/photos?albumIds=${albumIds}&start=${(currentPage - 1) * Number(PAGE_LIMIT)}`,
        );
        const data = await response.json();
        console.log("data ", data);
        return data.photos as Photo[];
      })();
  setAlbumTitleFilter(value);
  setFilteredPhotos(albumPhotos);
  setIsLoading(false);
};
