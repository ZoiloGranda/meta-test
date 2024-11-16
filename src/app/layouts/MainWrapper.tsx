"use client";
import { getPhotos } from "@/api/external/getPhotos";
import { Photo } from "@/api/types/Photo";
import MainFilters from "@/app/layouts/MainFilters";
import PhotoGrid from "@/app/layouts/PhotoGrid";
import React, { useState } from "react";

interface MainWrapperProps {
  photos: Photo[]; // Replace with your actual photo type
}

const MainWrapper: React.FC<MainWrapperProps> = ({ photos }) => {
  const [filteredPhotos, setFilteredPhotos] = useState(photos);
  const [isLoading, setIsLoading] = useState(false);

  const handleFilterChange = async (filter: string, value: string) => {
    setIsLoading(true);
    // Implement your filtering logic here, e.g., fetch filtered photos
    console.log("InputFilter", filter, value);
    const fetchedPhotos = await getPhotos(5);
    console.log(fetchedPhotos);
    // const newPhotos = await fetchFilteredPhotos(filter, value);
    // setFilteredPhotos(newPhotos);
    // setIsLoading(false);
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
