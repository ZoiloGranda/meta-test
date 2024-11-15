import { getPhotoWithMetadata } from "@/api/internal/getPhotoWithMetadata";

const PhotoPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const getData = async () => {
    try {
      const { id } = await params;
      return await getPhotoWithMetadata(Number(id));
    } catch (error) {
      console.error("Error loading photo:", error);
    }
  };
  const photoWithMetadata = await getData();

  return (
    <>
      {photoWithMetadata && (
        <div>
          <h1>Photo</h1>
          <img src={photoWithMetadata.url} alt={photoWithMetadata.title} />
          <p>Photo ID: {photoWithMetadata.id}</p>
        </div>
      )}
    </>
  );
};

export default PhotoPage;
