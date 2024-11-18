import { PhotoWithMetadata } from "@/models/Photo";

export const getData = async (params: {
  id: string;
}): Promise<PhotoWithMetadata | undefined> => {
  try {
    const { id } = await params;
    const photoResponse = await fetch(
      `/api/photos/${encodeURIComponent(id)}/metadata`,
    );
    console.log("photoResponse", photoResponse);
    const photoData = await photoResponse.json();
    console.log("photoData", photoData);
    return photoData;
  } catch (error) {
    console.error("Error loading photo:", error);
    return undefined;
  }
};
