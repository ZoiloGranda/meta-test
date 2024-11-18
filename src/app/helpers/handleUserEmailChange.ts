import { handleAlbumTitleChange } from "@/app/helpers/handleAlbumTitleChange";
import { Album } from "@/models/Album";
import { PAGE_LIMIT } from "@/app/constants";
import { HandleFilterChangeParams } from "@/app/helpers/types/FiltersParamsType";
import { fetchData } from "@/app/helpers/fetchData";
import { User } from "@/models/User";

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
      const fetchedPhotos = await fetchData("/api/photos");
      setIsLoading(false);
      setFilteredPhotos(fetchedPhotos);
      return;
    }
    return;
  }
  const user: User = await fetchData(
    `/api/users?email=${encodeURIComponent(value)}`,
  );
  setCurrentUserId(user.id);
  const userAlbums: Album[] = await fetchData(`/api/albums?userId=${user.id}`);
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
    const userPhotos = await fetchData(
      `/api/photos?albumIds=${albumIds}&start=${(currentPage - 1) * PAGE_LIMIT}&title=${encodeURIComponent(photoTitleFilter)}`,
    );
    setUserEmailFilter(value);
    setFilteredPhotos(userPhotos);
    setIsLoading(false);
    return;
  }
  if (!photoTitleFilter && pageChanged) {
    const userPhotos = await fetchData(
      `/api/photos?albumIds=${albumIds}&start=${(currentPage - 1) * PAGE_LIMIT}`,
    );
    setUserEmailFilter(value);
    setFilteredPhotos(userPhotos);
    setIsLoading(false);
    return;
  }
  const userPhotos = await fetchData(
    `/api/photos?albumIds=${albumIds}&start=${(currentPage - 1) * PAGE_LIMIT}`,
  );
  setUserEmailFilter(value);
  setFilteredPhotos(userPhotos);
  setIsLoading(false);
};
