"use client";
import { ERROR_IMAGE, IMAGE_THUMBNAIL_SIZE } from "@/app/constants";
import { getPhotoItemClasses } from "@/app/helpers/getClasses";
import { PhotoWithMetadata } from "@/models/Photo";
import Link from "next/link";
import React, { useState, useRef, useEffect } from "react";
import PhotoTooltip from "./PhotoTooltip";

interface PhotoItemProps {
  photoWithMetadata: PhotoWithMetadata;
}

const PhotoItem: React.FC<PhotoItemProps> = ({ photoWithMetadata }) => {
  const [photoSrc, setPhotoSrc] = useState(photoWithMetadata.thumbnailUrl);
  const [isLoading, setIsLoading] = useState(true);
  const { loaderClasses, imgClasses } = getPhotoItemClasses(isLoading);
  const image = useRef<HTMLImageElement | null>(null);
  const [isHovered, setIsHovered] = useState(false);

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
      <div
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <Link href={`/${photoWithMetadata.id}`}>
          <img
            ref={image}
            src={photoSrc}
            alt={photoWithMetadata.title}
            className={imgClasses}
            width={IMAGE_THUMBNAIL_SIZE.width}
            height={IMAGE_THUMBNAIL_SIZE.height}
            onLoad={onLoadEvent}
            onError={onErrorEvent}
          />
        </Link>
        {isHovered && <PhotoTooltip photoWithMetadata={photoWithMetadata} />}
      </div>
    </>
  );
};

export default PhotoItem;
