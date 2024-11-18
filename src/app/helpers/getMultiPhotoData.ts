import { PhotoWithMetadata } from "@/models/Photo";

export const getMultiPhotoData = async (params: {
  ids: string[];
}): Promise<PhotoWithMetadata[] | undefined> => {
  try {
    const { ids } = params;
    const photoResponse = await fetch(
      `/api/photos/metadata/${ids.map(String)}`,
    );
    const photoData = await photoResponse.json();
    return photoData;
  } catch {
    return undefined;
  }
};
