"use client";
import { Photo } from "@/api/types/Photo";
import { getPhotoItemClasses } from "@/app/helpers/getClasses";
import { ERROR_IMAGE } from "@/constants";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

interface PhotoItemProps {
  photo: Photo;
}

const PhotoItem: React.FC<PhotoItemProps> = ({ photo }) => {
  const [photoSrc, setPhotoSrc] = useState(photo.thumbnailUrl);
  const [isLoading, setIsLoading] = useState(true);
  const { loaderClasses, imgClasses } = getPhotoItemClasses(isLoading);
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
