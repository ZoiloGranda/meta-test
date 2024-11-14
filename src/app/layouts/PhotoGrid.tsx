import React from "react";
import Image from "next/image";

const PhotoGrid: React.FC = () => {
  const photos = [
    "/images/photo1.jpg",
    "/images/photo2.jpg",
    "/images/photo3.jpg",
    // Add more photo paths as needed
  ];

  return (
    <div className="flex flex-wrap gap-2">
      {photos.map((src, index) => (
        <Image
          key={index}
          src={src}
          alt={`Photo ${index + 1}`}
          className="h-24 w-24 object-cover"
          width={96}
          height={96}
        />
      ))}
    </div>
  );
};

export default PhotoGrid;
