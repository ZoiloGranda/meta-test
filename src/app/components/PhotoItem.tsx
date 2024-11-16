"use client";
import { Photo } from "@/api/types/Photo";
import { ERROR_IMAGE } from "@/constants";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

interface PhotoItemProps {
  photo: Photo;
}

const PhotoItem: React.FC<PhotoItemProps> = ({ photo }) => {
  const [photoSrc, setPhotoSrc] = useState(photo.url);
  const [isLoading, setIsLoading] = useState(true);

  const onLoadEvent = () => {
    setIsLoading(false);
    setPhotoSrc(photo.url);
  };
  const onErrorEvent = () => {
    setIsLoading(false);
    setPhotoSrc(ERROR_IMAGE);
  };
  const loaderClasses = isLoading
    ? "loader justify-items-center object-cover w-32 h-32"
    : "";
  const imgClasses = isLoading
    ? "justify-items-center object-cover"
    : "justify-items-center border-2 border-solid border-indigo-600 object-cover hover:border-4 cursor-pointer hover:border-indigo-800";

  return (
    <>
      <div className={loaderClasses}>
        <Link href={`/${photo.id}`}>
          <Image
            key={photo.id}
            src={photoSrc}
            alt={photo.title}
            className={imgClasses}
            width={128}
            height={128}
            onLoad={onLoadEvent}
            onError={onErrorEvent}
          />
        </Link>
      </div>
    </>
  );
};
export default PhotoItem;
