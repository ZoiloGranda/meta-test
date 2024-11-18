import { handleAlbumTitleChange } from "@/app/helpers/handleAlbumTitleChange";
import { Album } from "@/models/Album";
import { PAGE_LIMIT } from "@/app/constants";
import { HandleFilterChangeParams } from "@/app/helpers/FiltersParamsType";

export const handleUserEmailChange = async ({
  value,
  setUserEmailFilter,
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
  pageChanged = false,
}: HandleFilterChangeParams) => {
  if (!value) {
    setUserEmailFilter("");
    setCurrentUserId(0);
    console.log("photoTitleFilter", photoTitleFilter);
    console.log("albumTitleFilter", albumTitleFilter);
    if (albumTitleFilter) {
      await handleAlbumTitleChange({
        value: albumTitleFilter,
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
    }

    if (!photoTitleFilter && !albumTitleFilter) {
      const response = await fetch("/api/photos");
      const data = await response.json();
      const fetchedPhotos = data.photos;
      setIsLoading(false);
      setFilteredPhotos(fetchedPhotos);
      return;
    }
    return;
  }
  const response = await fetch(`/api/users?email=${encodeURIComponent(value)}`);
  const data = await response.json();
  console.log("data", data);
  const userId = data.users[0].id;
  setCurrentUserId(userId);
  const albumResponse = await fetch(`/api/albums?userId=${userId}`);
  const albumData = await albumResponse.json();
  const userAlbums: Album[] = albumData.albums;
  const albumIds = userAlbums.map((album) => album.id);
  console.log("photoTitleFilter", photoTitleFilter);
  if (photoTitleFilter && !pageChanged) {
    const photosByUser = filteredPhotos.filter((photo) =>
      albumIds.includes(photo.albumId),
    );
    setUserEmailFilter(value);
    setFilteredPhotos(photosByUser);
    setIsLoading(false);
    return;
  }
  if (albumTitleFilter && !pageChanged) {
    const photosByUser = filteredPhotos.filter((photo) =>
      albumIds.includes(photo.albumId),
    );
    setUserEmailFilter(value);
    setFilteredPhotos(photosByUser);
    setIsLoading(false);
    return;
  }
  if (photoTitleFilter && pageChanged) {
    const photosResponse = await fetch(
      `/api/photos?albumIds=${albumIds}&start=${(currentPage - 1) * PAGE_LIMIT}&title=${encodeURIComponent(photoTitleFilter)}`,
    );
    const photosData = await photosResponse.json();
    const userPhotos = photosData.photos;
    setUserEmailFilter(value);
    setFilteredPhotos(userPhotos);
    setIsLoading(false);
    return;
  }
  if (!photoTitleFilter && pageChanged) {
    const photosResponse = await fetch(
      `/api/photos?albumIds=${albumIds}&start=${(currentPage - 1) * PAGE_LIMIT}`,
    );
    const photosData = await photosResponse.json();
    const userPhotos = photosData.photos;
    setUserEmailFilter(value);
    setFilteredPhotos(userPhotos);
    setIsLoading(false);
    return;
  }
  const photosResponse = await fetch(
    `/api/photos?albumIds=${albumIds}&start=${(currentPage - 1) * PAGE_LIMIT}`,
  );
  const photosData = await photosResponse.json();
  const userPhotos = photosData.photos;

  setUserEmailFilter(value);
  setFilteredPhotos(userPhotos);
  setIsLoading(false);
};
