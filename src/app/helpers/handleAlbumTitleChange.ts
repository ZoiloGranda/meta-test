import { Photo } from "@/models/Photo";
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
  const url = userEmailFilter
    ? `/api/albums?title=${encodeURIComponent(value)}&userId=${currentUserId}`
    : `/api/albums?title=${encodeURIComponent(value)}`;
  const response = await fetch(url);
  const data = await response.json();
  const filteredAlbums = data.albums;
  const albumIds = filteredAlbums.map((album) => album.id);
  const albumPhotos = photoTitleFilter
    ? filteredPhotos.filter((photo) => albumIds.includes(photo.albumId))
    : await (async () => {
        const response = await fetch(
          `/api/photos?albumId=${albumIds}&start=${(currentPage - 1) * 25}`,
        );
        const data = await response.json();
        console.log("data ", data);
        return data.photos as Photo[];
      })();
  setAlbumTitleFilter(value);
  setFilteredPhotos(albumPhotos);
  setIsLoading(false);
};
