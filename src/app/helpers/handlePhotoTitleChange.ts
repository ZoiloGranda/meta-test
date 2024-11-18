import { PAGE_LIMIT } from "@/app/constants";
import { HandleFilterChangeParams } from "@/app/helpers/types/FiltersParamsType";
import { handleAlbumTitleChange } from "@/app/helpers/handleAlbumTitleChange";
import { handleUserEmailChange } from "@/app/helpers/handleUserEmailChange";
import { fetchData } from "@/app/helpers/fetchData";

export const handlePhotoTitleChange = async ({
  value,
  setPhotoTitleFilter,
  setAlbumTitleFilter,
  setFilteredPhotos,
  setIsLoading,
  albumTitleFilter,
  userEmailFilter,
  filteredPhotos,
  currentUserId,
  setCurrentUserId,
  currentPage,
  setCurrentPage,
  setUserEmailFilter,
  pageChanged = false,
}: HandleFilterChangeParams) => {
  console.log("photo value", value);
  if (!value) {
    setPhotoTitleFilter("");
    if (albumTitleFilter) {
      handleAlbumTitleChange({
        value: albumTitleFilter,
        setPhotoTitleFilter,
        setAlbumTitleFilter,
        setFilteredPhotos,
        setIsLoading,
        albumTitleFilter,
        userEmailFilter,
        photoTitleFilter: "",
        filteredPhotos,
        currentUserId,
        setCurrentUserId,
        currentPage,
        setCurrentPage,
        setUserEmailFilter,
      });
    }
    if (userEmailFilter) {
      handleUserEmailChange({
        value: userEmailFilter,
        setPhotoTitleFilter,
        setAlbumTitleFilter,
        setFilteredPhotos,
        setIsLoading,
        albumTitleFilter,
        userEmailFilter,
        photoTitleFilter: "",
        filteredPhotos,
        currentUserId,
        setCurrentUserId,
        currentPage,
        setCurrentPage,
        setUserEmailFilter,
        pageChanged: true,
      });
    }
    if (!albumTitleFilter && !userEmailFilter) {
      const fetchedPhotos = await fetchData("/api/photos");
      setIsLoading(false);
      setFilteredPhotos(fetchedPhotos);
      return;
    }
    return;
  }
  if ((albumTitleFilter && !pageChanged) || (userEmailFilter && !pageChanged)) {
    const updatedPhotos = filteredPhotos.filter((photo) => {
      return photo.title.toLowerCase().includes(value.toLowerCase());
    });
    setFilteredPhotos(updatedPhotos);
    setPhotoTitleFilter(value);
    setIsLoading(false);
    return;
  }
  if (userEmailFilter && pageChanged) {
    handleUserEmailChange({
      value: userEmailFilter,
      setPhotoTitleFilter,
      setAlbumTitleFilter,
      setFilteredPhotos,
      setIsLoading,
      albumTitleFilter,
      userEmailFilter,
      photoTitleFilter: value,
      filteredPhotos,
      currentUserId,
      setCurrentUserId,
      currentPage,
      setCurrentPage,
      setUserEmailFilter,
      pageChanged,
    });
    return;
  }
  const photosByTitle = await fetchData(
    `/api/photos?title=${encodeURIComponent(value)}&start=${(currentPage - 1) * PAGE_LIMIT}`,
  );
  console.log("photosByTitle", photosByTitle);
  setPhotoTitleFilter(value);
  setFilteredPhotos(photosByTitle);
  setIsLoading(false);
};
