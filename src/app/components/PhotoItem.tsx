"use client";
import { Photo } from "@/api/types/Photo";
import { ERROR_IMAGE } from "@/constants";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

interface PhotoItemProps {
  photo: Photo;
}

const PhotoItem: React.FC<PhotoItemProps> = ({ photo }) => {
  const [photoSrc, setPhotoSrc] = useState(photo.thumbnailUrl);
  const [isLoading, setIsLoading] = useState(true);
  const image = useRef<HTMLImageElement | null>(null);

  const onLoadEvent = () => {
    setIsLoading(false);
  };
  const onErrorEvent = () => {
    setIsLoading(false);
    setPhotoSrc(ERROR_IMAGE);
  };

  useEffect(() => {
    if (image.current?.complete) setIsLoading(false);
  }, []);

  const loaderClasses = isLoading
    ? "loader justify-items-center object-cover w-32 h-32"
    : "hidden";
  const imgClasses = isLoading
    ? "justify-items-center object-cover hidden"
    : "justify-items-center border-2 border-solid border-indigo-600 object-cover hover:border-4 cursor-pointer hover:border-indigo-800";

  return (
    <>
      <div className={loaderClasses}></div>
      <Link href={`/${photo.id}`}>
        <img
          ref={image}
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
    </>
  );
};
export default PhotoItem;
