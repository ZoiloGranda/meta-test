import { Photo } from "@/api/types/Photo";
import { handleAlbumTitleChange } from "@/app/helpers/handleAlbumTitleChange";

interface HandlePhotoTitleChangeParams {
  value: string;
  setPhotoTitleFilter: (value: string) => void;
  setAlbumTitleFilter: (value: string) => void;
  setFilteredPhotos: (photos: Photo[]) => void;
  setIsLoading: (loading: boolean) => void;
  albumTitleFilter: string;
  userEmailFilter: string;
  photoTitleFilter: string;
  filteredPhotos: Photo[];
  currentUserId: number;
  setCurrentUserId: (id: number) => void;
  currentPage: number;
  setCurrentPage: (page: number) => void;
}

export const handlePhotoTitleChange = async ({
  value,
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
}: HandlePhotoTitleChangeParams) => {
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
      });
    }
    if (!albumTitleFilter && !userEmailFilter) {
      const response = await fetch("/api/photos");
      const data = await response.json();
      const fetchedPhotos = data.photos;
      setIsLoading(false);
      setFilteredPhotos(fetchedPhotos);
      return;
    }
    return;
  }
  if (albumTitleFilter || userEmailFilter) {
    const updatedPhotos = filteredPhotos.filter((photo) => {
      return photo.title.toLowerCase().includes(value.toLowerCase());
    });
    setFilteredPhotos(updatedPhotos);
    setPhotoTitleFilter(value);
    setIsLoading(false);
    return;
  }

  const response = await fetch(
    `/api/photos?title=${encodeURIComponent(value)}&start=${(currentPage - 1) * 25}`,
  );
  const data = await response.json();
  const photosByTitle = data.photos;
  console.log("photosByTitle", photosByTitle);
  setPhotoTitleFilter(value);
  setFilteredPhotos(photosByTitle);
  setIsLoading(false);
};
