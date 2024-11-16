import { getAlbums } from "@/api/external/getAlbums";
import { getPhotos } from "@/api/external/getPhotos";
import { getUsers } from "@/api/external/getUsers";

export type EntityType = 'photo' | 'album' | 'user';

export function parseFilter(input: string): { type: EntityType; field: string } {
 const [type, field] = input.split('.');
 return { type: type as EntityType, field };
}

export const endpointsMap = {
 photo: getPhotos,
 album: getAlbums,
 user: getUsers,
}

export function getEndpoint(type: EntityType) {
 return endpointsMap[type];
}