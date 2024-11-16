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

}: HandleAlbumTitleChangeParams) => {
 console.log('album value', value)
 if (!value) {
  setAlbumTitleFilter("");
  if (photoTitleFilter) {
   await handlePhotoTitleChange({
    value,
    setPhotoTitleFilter,
    setAlbumTitleFilter,
    setFilteredPhotos,
    setIsLoading,
    albumTitleFilter,
    userEmailFilter,
    photoTitleFilter,
    filteredPhotos
   });
   return;
  }
  if (!photoTitleFilter && !userEmailFilter) {
   const fetchedPhotos = await getPhotos();
   setIsLoading(false);
   setFilteredPhotos(fetchedPhotos);
   return;
  }
  return;
 }
 const filteredAlbums = await getAlbums({ title: value });
 const albumPhotosPromises = filteredAlbums.map((album) =>
  getPhotos({ albumId: album.id }),
 );
 const allAlbumPhotos = await Promise.all(albumPhotosPromises);
 let aggregatedPhotos = allAlbumPhotos.flat();
 console.log('photoTitleFilter ', photoTitleFilter)
 if (photoTitleFilter) {
  const albumIds = filteredAlbums.map((album) => album.id);
  aggregatedPhotos = filteredPhotos.filter((photo) =>
   albumIds.includes(photo.albumId),
  );
 }
 setAlbumTitleFilter(value);
 setFilteredPhotos(aggregatedPhotos);
 setIsLoading(false);
};