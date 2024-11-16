"use client";
import { Photo } from "@/api/types/Photo";
import { parseFilter } from "@/app/helpers/filterName";
import MainFilters from "@/app/layouts/MainFilters";
import PhotoGrid from "@/app/layouts/PhotoGrid";
import React, { useState } from "react";
import { handlePhotoTitleChange } from "@/app/helpers/handlePhotoTitleChange";
import { handleAlbumTitleChange } from "@/app/helpers/handleAlbumTitleChange";
import { handleUserEmailChange } from "@/app/helpers/handleUserEmailChange";

interface MainWrapperProps {
  photos: Photo[];
}

const MainWrapper: React.FC<MainWrapperProps> = ({ photos }) => {
  const [filteredPhotos, setFilteredPhotos] = useState(photos);
  const [isLoading, setIsLoading] = useState(false);
  const [photoTitleFilter, setPhotoTitleFilter] = useState("");
  const [albumTitleFilter, setAlbumTitleFilter] = useState("");
  const [userEmailFilter, setUserEmailFilter] = useState("");

  const handleFilterChange = async (filterName: string, value: string) => {
    setIsLoading(true);
    const filters = parseFilter(filterName);
    switch (filters.type) {
      case "photo":
        await handlePhotoTitleChange({
          value,
          setPhotoTitleFilter,
          setAlbumTitleFilter,
          setFilteredPhotos,
          setIsLoading,
          albumTitleFilter,
          userEmailFilter,
          photoTitleFilter,
          filteredPhotos,
        });
        break;
      case "album":
        await handleAlbumTitleChange({
          value,
          setAlbumTitleFilter,
          setPhotoTitleFilter,
          setFilteredPhotos,
          setIsLoading,
          albumTitleFilter,
          userEmailFilter,
          photoTitleFilter,
          filteredPhotos,
        });
        break;
      case "user":
        handleUserEmailChange({
          value,
          setUserEmailFilter,
          setPhotoTitleFilter,
          setAlbumTitleFilter,
          setFilteredPhotos,
          setIsLoading,
          albumTitleFilter,
          userEmailFilter,
          photoTitleFilter,
          filteredPhotos,
        });
        break;
      default:
        break;
    }
  };

  return (
    <>
      <div className="flex w-full justify-evenly">
        <MainFilters onFilterChange={handleFilterChange} />
      </div>
      <div className="flex w-full justify-evenly">
        <PhotoGrid photos={filteredPhotos} isLoading={isLoading} />
      </div>
    </>
  );
};

export default MainWrapper;
