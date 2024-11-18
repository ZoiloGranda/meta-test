import React from "react";
import { PhotoWithMetadata } from "@/models/Photo";

interface PhotoTooltipProps {
  photoWithMetadata: PhotoWithMetadata | undefined;
}

const PhotoTooltip: React.FC<PhotoTooltipProps> = ({ photoWithMetadata }) => {
  return (
    <div className="absolute left-1/2 z-50 mt-2 -translate-x-1/2 transform whitespace-nowrap rounded bg-black bg-opacity-75 p-2 text-white">
      <h4 className="text-lg font-semibold">{photoWithMetadata?.title}</h4>
      <p className="text-sm">{photoWithMetadata?.album.title}</p>
      <p className="text-sm">{photoWithMetadata?.album.user.email}</p>
    </div>
  );
};

export default PhotoTooltip;
