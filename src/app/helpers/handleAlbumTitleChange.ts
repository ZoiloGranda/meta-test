import { getAlbums } from "@/api/external/getAlbums";
import { getPhotos } from "@/api/external/getPhotos";
import { Photo } from "@/api/types/Photo";
import { handlePhotoTitleChange } from "@/app/helpers/handlePhotoTitleChange";

interface HandleAlbumTitleChangeParams {
  value: string;
  setAlbumTitleFilter: (value: string) => void;
  setPhotoTitleFilter: (value: string) => void;
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
}: HandleAlbumTitleChangeParams) => {
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
  const filteredAlbums = userEmailFilter
    ? await getAlbums({ title: value, userId: currentUserId })
    : await getAlbums({ title: value });
  const albumIds = filteredAlbums.map((album) => album.id);
  console.log("albumIds ", albumIds);
  const albumPhotosPromises = photoTitleFilter
    ? filteredPhotos.filter((photo) => albumIds.includes(photo.albumId))
    : await getPhotos({
        albumId: albumIds,
        start: (currentPage - 1) * 25,
      });
  console.log("photoTitleFilter ", photoTitleFilter);
  setAlbumTitleFilter(value);
  setFilteredPhotos(albumPhotosPromises);
  setIsLoading(false);
};
