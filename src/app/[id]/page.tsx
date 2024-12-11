"use client";
import { getData } from "@/app/helpers/getPhotoData";
import PhotoData from "@/app/layouts/PhotoData";
import { PhotoWithMetadata } from "@/models/Photo";
import React, { useState, useEffect, useRef } from "react";

const PhotoPage = ({ params }: { params: Promise<{ id: string }> }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isImageLoading, setIsImageLoading] = useState(true);
  const [photoWithMetadata, setPhotoWithMetadata] =
    useState<PhotoWithMetadata>();
  const hasFetched = useRef(false);

  useEffect(() => {
    if (hasFetched.current) return;
    hasFetched.current = true;

    const fetchData = async () => {
      const { id } = await params;
      const data = await getData({ id });
      if (data) {
        setPhotoWithMetadata(data);
      }
      setIsLoading(false);
    };
    fetchData();
  }, [params]);

  const onLoad = () => setIsImageLoading(false);

  return (
    <>
      {isLoading && (
        <div className="loader h-32 w-32 justify-items-center object-cover"></div>
      )}
      {photoWithMetadata && (
        <div className="flex w-full flex-wrap">
          <h1 className="mb-4 w-full text-3xl font-bold">Photo Title</h1>
          <h2 className="w-full text-xl capitalize text-gray-600">
            {photoWithMetadata.title}
          </h2>
          <div className="flex w-full flex-wrap justify-evenly">
            <div className="flex flex-wrap">
              {isImageLoading && (
                <div className="loader h-32 w-32 justify-items-center object-cover"></div>
              )}
              <img
                src={photoWithMetadata.url}
                alt={photoWithMetadata.title}
                width="600"
                height="600"
                onError={onLoad}
                onLoad={onLoad}
                className={`${isImageLoading ? "hidden" : "block h-fit"}`}
              />
            </div>
            <PhotoData photoWithMetadata={photoWithMetadata} />
          </div>
        </div>
      )}
    </>
  );
};

export default PhotoPage;
