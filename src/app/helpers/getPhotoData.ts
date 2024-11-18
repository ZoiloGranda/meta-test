import { PhotoWithMetadata } from "@/models/Photo";

export const getData = async (params: {
  id: string;
}): Promise<PhotoWithMetadata | undefined> => {
  try {
    const { id } = params;
    const photoResponse = await fetch(
      `/api/photos/${encodeURIComponent(id)}/metadata`,
    );
    const photoData = await photoResponse.json();
    return photoData;
  } catch {
    return undefined;
  }
};
