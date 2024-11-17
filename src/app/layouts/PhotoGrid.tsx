import React from "react";
import { Photo } from "@/models/Photo";
import PhotoItem from "@/app/components/PhotoItem";

interface PhotoGridProps {
  photos: Photo[];
  isLoading: boolean;
}

const PhotoGrid: React.FC<PhotoGridProps> = ({ photos, isLoading }) => {
  return (
    <div className="flex w-full flex-wrap justify-center gap-2">
      {isLoading ? (
        <div className="loader h-32 w-32 justify-items-center object-cover"></div>
      ) : (
        <>
          {photos.map((photo) => (
            <PhotoItem key={photo.id} photo={photo} />
          ))}
        </>
      )}
    </div>
  );
};

export default PhotoGrid;
