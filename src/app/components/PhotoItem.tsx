"use client";
import { ERROR_IMAGE, IMAGE_THUMBNAIL_SIZE } from "@/app/constants";
import { getPhotoItemClasses } from "@/app/helpers/getClasses";
import { Photo, PhotoWithMetadata } from "@/models/Photo";
import Link from "next/link";
import React, { useState, useRef, useEffect } from "react";
import PhotoTooltip from "./PhotoTooltip";
import { getData } from "@/app/helpers/getPhotoData";

interface PhotoItemProps {
  photo: Photo;
}

const PhotoItem: React.FC<PhotoItemProps> = ({ photo }) => {
  const [photoSrc, setPhotoSrc] = useState(photo.thumbnailUrl);
  const [isLoading, setIsLoading] = useState(true);
  const [photoWithMetadata, setPhotoWithMetadata] =
    useState<PhotoWithMetadata>();
  const { loaderClasses, imgClasses } = getPhotoItemClasses(isLoading);
  const image = useRef<HTMLImageElement | null>(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (!photo || isLoading) return;
    const fetchData = async () => {
      const data = await getData({ id: String(photo.id) });
      if (data) {
        setPhotoWithMetadata(data);
      }
    };
    fetchData();
  }, [isLoading]);

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
        {isHovered && <PhotoTooltip photoWithMetadata={photoWithMetadata} />}
      </div>
    </>
  );
};

export default PhotoItem;
