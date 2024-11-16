import { getPhotos } from "@/api/external/getPhotos";
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
 setCurrentUserId
}: HandlePhotoTitleChangeParams) => {
 console.log('photo value', value)
 if (!value) {
  setPhotoTitleFilter("");
  if (albumTitleFilter) {
   handleAlbumTitleChange({
    value: albumTitleFilter, setPhotoTitleFilter,
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
  if (!albumTitleFilter && !userEmailFilter) {
   const fetchedPhotos = await getPhotos();
   setIsLoading(false);
   setFilteredPhotos(fetchedPhotos);
   return;
  }
  return;
 }
 const photosByTitle = await getPhotos({ title: value });
 console.log('photosByTitle', photosByTitle)
 setPhotoTitleFilter(value);
 setIsLoading(false);
 setFilteredPhotos(photosByTitle);
};