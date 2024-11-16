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
 setCurrentUserId
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
    setCurrentUserId
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
 if (photoTitleFilter) {
  const albumIds = userAlbums.map((album) => album.id);
  const photosByUser = filteredPhotos.filter((photo) =>
   albumIds.includes(photo.albumId),
  );
  setUserEmailFilter(value);
  setFilteredPhotos(photosByUser);
  setIsLoading(false);
  return;
 }
 const userPhotosPromises = userAlbums.map(album => getPhotos({ albumId: [album.id] }));
 const userPhotosArrays = await Promise.all(userPhotosPromises);
 const userPhotos = userPhotosArrays.flat();
 setUserEmailFilter(value);
 setFilteredPhotos(userPhotos);
 setIsLoading(false);
};