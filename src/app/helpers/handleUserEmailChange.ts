import { getAlbums } from "@/api/external/getAlbums";
import { Photo } from "@/api/types/Photo";
import { handleAlbumTitleChange } from "@/app/helpers/handleAlbumTitleChange";

interface HandleUserEmailChangeParams {
  value: string;
  setUserEmailFilter: (value: string) => void;
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
}: HandleUserEmailChangeParams) => {
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
  const userAlbums = await getAlbums({ userId });
  const albumIds = userAlbums.map((album) => album.id);
  if (photoTitleFilter) {
    const photosByUser = filteredPhotos.filter((photo) =>
      albumIds.includes(photo.albumId),
    );
    setUserEmailFilter(value);
    setFilteredPhotos(photosByUser);
    setIsLoading(false);
    return;
  }
  const photosResponse = await fetch(
    `/api/photos?albumId=${albumIds}&start=${(currentPage - 1) * 25}`,
  );
  const photosData = await photosResponse.json();
  const userPhotos = photosData.photos;

  setUserEmailFilter(value);
  setFilteredPhotos(userPhotos);
  setIsLoading(false);
};
