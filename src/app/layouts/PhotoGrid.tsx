import PhotoItem from "@/app/components/PhotoItem";
import { getMultiPhotoData } from "@/app/helpers/getMultiPhotoData";
import { Photo, PhotoWithMetadata } from "@/models/Photo";
import React, { useEffect, useState } from "react";

interface PhotoGridProps {
  photos: Photo[];
  isLoading: boolean;
}

const PhotoGrid: React.FC<PhotoGridProps> = ({ photos, isLoading }) => {
  const [photoWithMetadata, setPhotoWithMetadata] =
    useState<PhotoWithMetadata[]>();

  useEffect(() => {
    if (photos.length === 0 || isLoading) {
      setPhotoWithMetadata([]);
      return;
    }
    const fetchData = async () => {
      const photoIds = photos.map((photo) => String(photo.id));
      const data = await getMultiPhotoData({
        ids: photoIds,
      });
      if (data) {
        setPhotoWithMetadata(data);
      }
    };
    fetchData();
  }, [isLoading, photos]);
  return (
    <div className="flex w-full flex-wrap justify-center gap-2">
      {isLoading ? (
        <div className="loader h-32 w-32 justify-items-center object-cover"></div>
      ) : (
        <>
          {photoWithMetadata?.map((photo) => (
            <PhotoItem key={photo.id} photoWithMetadata={photo} />
          ))}
        </>
      )}
    </div>
  );
};

export default PhotoGrid;
