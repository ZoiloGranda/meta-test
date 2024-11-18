import React from "react";

interface NoPhotosFoundProps {
  photoCount: number;
}

const NoPhotosFound: React.FC<NoPhotosFoundProps> = ({ photoCount }) => {
  return (
    photoCount === 0 && (
      <div className="mt-4 flex w-full items-center justify-center rounded-lg bg-gray-100 p-6 shadow-md">
        <p className="text-xl font-semibold text-gray-700">No Photos Found</p>
      </div>
    )
  );
};

export default NoPhotosFound;
