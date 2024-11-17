"use client";
import { ERROR_IMAGE, IMAGE_THUMBNAIL_SIZE } from "app/constants";
import { getPhotoItemClasses } from "app/helpers/getClasses";
import { Photo } from "models/Photo";
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
          src={photoSrc}
          alt={photo.title}
          className={imgClasses}
          width={IMAGE_THUMBNAIL_SIZE.width}
          height={IMAGE_THUMBNAIL_SIZE.height}
          onLoad={onLoadEvent}
          onError={onErrorEvent}
        />
      </Link>
    </>
  );
};
export default PhotoItem;
