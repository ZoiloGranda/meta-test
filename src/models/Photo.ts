import { Album } from "models/Album";
import { User } from "models/User";

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
