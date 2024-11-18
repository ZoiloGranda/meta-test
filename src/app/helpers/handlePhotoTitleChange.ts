import { PAGE_LIMIT } from "@/app/constants";
import { HandleFilterChangeParams } from "@/app/helpers/types/FiltersParamsType";
import { handleAlbumTitleChange } from "@/app/helpers/handleAlbumTitleChange";
import { handleUserEmailChange } from "@/app/helpers/handleUserEmailChange";
import { fetchData } from "@/app/helpers/fetchData";
import { Photo } from "@/models/Photo";

export const handlePhotoTitleChange = async (
  params: HandleFilterChangeParams,
) => {
  const {
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
    photoTitleFilter,
    pageChanged = false,
  } = params;
  const baseParams = {
    ...params,
    photoTitleFilter: value || "",
  };

  if (!value) {
    setPhotoTitleFilter("");
    if (albumTitleFilter) {
      handleAlbumTitleChange({
        ...baseParams,
        value: albumTitleFilter,
        pageChanged: true,
      });
    }
    if (userEmailFilter) {
      handleUserEmailChange({
        ...baseParams,
        value: userEmailFilter,
        pageChanged: true,
      });
    }
    if (!albumTitleFilter && !userEmailFilter) {
      const fetchedPhotos: Photo[] = await fetchData("/api/photos");
      setIsLoading(false);
      setFilteredPhotos(fetchedPhotos);
    }
    return;
  }

  if ((albumTitleFilter && !pageChanged) || (userEmailFilter && !pageChanged)) {
    const updatedPhotos = filteredPhotos.filter((photo) =>
      photo.title.toLowerCase().includes(value.toLowerCase()),
    );
    setFilteredPhotos(updatedPhotos);
    setPhotoTitleFilter(value);
    setIsLoading(false);
    return;
  }

  if (userEmailFilter && pageChanged) {
    await handleUserEmailChange({
      ...params,
      value: userEmailFilter,
      pageChanged: true,
    });
    return;
  }

  const photosByTitle: Photo[] = await fetchData(
    `/api/photos?title=${encodeURIComponent(value)}&start=${(currentPage - 1) * PAGE_LIMIT}`,
  );
  if (photosByTitle.length === 0) {
    setPhotoTitleFilter(value);
    setFilteredPhotos([]);
    setIsLoading(false);
    return;
  }
  setPhotoTitleFilter(value);
  setFilteredPhotos(photosByTitle);
  setIsLoading(false);
};
