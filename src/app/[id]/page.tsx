"use client";
import React, { useState, useEffect } from "react";
import { getPhotoWithMetadata } from "@/api/internal/getPhotoWithMetadata";
import { PhotoWithMetadata } from "@/api/types/Photo";
import PhotoData from "@/app/layouts/PhotoData";

const PhotoPage = ({ params }: { params: Promise<{ id: string }> }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isImageLoading, setIsImageLoading] = useState(true);

  const [photoWithMetadata, setPhotoWithMetadata] =
    useState<PhotoWithMetadata>();

  useEffect(() => {
    const getData = async () => {
      try {
        const { id } = await params;
        const data = await getPhotoWithMetadata(Number(id));
        setPhotoWithMetadata(data);
      } catch (error) {
        console.error("Error loading photo:", error);
      } finally {
        setIsLoading(false);
      }
    };
    getData();
  }, [params]);

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
                onLoad={() => setIsImageLoading(false)}
                onError={() => setIsImageLoading(false)}
                className={`${isImageLoading ? "hidden" : "block"}`}
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
