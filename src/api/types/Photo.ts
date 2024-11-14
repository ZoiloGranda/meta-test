import { Album } from "@/api/types/Album";
import { User } from "@/api/types/User";

export interface Photo {
  albumId: number;
  id: number;
  title: string;
  url: string;
  thumbnailUrl: string;
}

export interface PhotoWithMetadata extends Photo {
  album: Album & {
    user: User;
  };
}
