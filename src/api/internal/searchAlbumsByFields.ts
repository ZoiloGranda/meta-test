import { getAlbums } from "@/api/external/getAlbums";
import { Album } from "@/api/types/Album";

export async function searchAlbumsByFields(filters: Partial<Album>): Promise<Album[]> {
 const albums = await getAlbums();
 return albums.filter(album =>
  Object.entries(filters).every(([key, value]) => album[key as keyof Album] === value)
 );
}