"use client";
import React, { useState, useEffect } from "react";
import { getPhotoWithMetadata } from "@/api/internal/getPhotoWithMetadata";
import { PhotoWithMetadata } from "@/api/types/Photo";

const PhotoPage = ({ params }: { params: Promise<{ id: string }> }) => {
  const [isLoading, setIsLoading] = useState(true);
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
      {isLoading && <div>Loading...</div>}
      {photoWithMetadata && (
        <div className="flex w-full flex-wrap">
          <h1 className="w-full">Photo Title</h1>
          <h2 className="w-full">{photoWithMetadata.title}</h2>
          <div className="flex w-full flex-wrap justify-between">
            <div className="flex flex-wrap">
              <img
                src={photoWithMetadata.thumbnailUrl}
                alt={photoWithMetadata.title}
              />
            </div>
            <div className="flex flex-wrap">
              <p className="w-full">Album: {photoWithMetadata.album.title}</p>
              <p className="w-full">
                User: {photoWithMetadata.album.user.name}
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PhotoPage;
