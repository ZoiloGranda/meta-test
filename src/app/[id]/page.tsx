"use client";
import PhotoData from "@/app/layouts/PhotoData";
import { PhotoWithMetadata } from "@/models/Photo";
import React, { useState, useEffect } from "react";

const PhotoPage = ({ params }: { params: Promise<{ id: string }> }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isImageLoading, setIsImageLoading] = useState(true);

  const [photoWithMetadata, setPhotoWithMetadata] =
    useState<PhotoWithMetadata>();

  useEffect(() => {
    const getData = async () => {
      try {
        const { id } = await params;

        const photoResponse = await fetch(
          `/api/photos/${encodeURIComponent(id)}/metadata`,
        );
        console.log("photoResponse", photoResponse);
        const photoData = await photoResponse.json();
        console.log("photoData", photoData);
        //
        setPhotoWithMetadata(photoData);
      } catch (error) {
        console.error("Error loading photo:", error);
      } finally {
        setIsLoading(false);
      }
    };
    getData();
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
          <div className="flex w-full flex-wrap justify-between">
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
