import { getAlbums } from "@/api/external/getAlbums";
import { getPhotos } from "@/api/external/getPhotos";
import { getUsers } from "@/api/external/getUsers";
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
      });
    }

    if (!photoTitleFilter && !albumTitleFilter) {
      const fetchedPhotos = await getPhotos();
      setIsLoading(false);
      setFilteredPhotos(fetchedPhotos);
      return;
    }
    return;
  }
  const filteredUsers = await getUsers({ email: value });
  const userId = filteredUsers[0].id;
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
  const userPhotos = await getPhotos({
    albumId: albumIds,
    start: (currentPage - 1) * 25,
  });
  setUserEmailFilter(value);
  setFilteredPhotos(userPhotos);
  setIsLoading(false);
};
