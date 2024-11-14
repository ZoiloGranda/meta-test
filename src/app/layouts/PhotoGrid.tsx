import React from "react";
import Image from "next/image";

const PhotoGrid: React.FC = () => {
  const photos = [
    "/loading.gif",
    "/loading.gif",
    "/loading.gif",
    "/loading.gif",
    "/loading.gif",
  ];

  return (
    <div className="flex w-full flex-wrap justify-center gap-2">
      {photos.map((src, index) => (
        <Image
          key={index}
          src={src}
          alt={`Photo ${index + 1}`}
          className="grow justify-items-center object-cover"
          width={128}
          height={128}
        />
      ))}
    </div>
  );
};

export default PhotoGrid;
