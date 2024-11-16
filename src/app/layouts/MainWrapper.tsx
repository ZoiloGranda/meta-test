"use client";
import { getPhotos } from "@/api/external/getPhotos";
import { Photo } from "@/api/types/Photo";
import { getEndpoint, parseFilter } from "@/app/helpers/filterName";
import MainFilters from "@/app/layouts/MainFilters";
import PhotoGrid from "@/app/layouts/PhotoGrid";
import React, { useState } from "react";

interface MainWrapperProps {
  photos: Photo[];
}

const MainWrapper: React.FC<MainWrapperProps> = ({ photos }) => {
  const [filteredPhotos, setFilteredPhotos] = useState(photos);
  const [isLoading, setIsLoading] = useState(false);

  const handleFilterChange = async (filterName: string, value: string) => {
    setIsLoading(true);
    console.log("InputFilter", filterName, value);
    const filters = parseFilter(filterName);
    console.log(filters);
    const getFn = getEndpoint(filters.type);
    const filteredPhotos = await getFn({ [filters.field]: value });
    console.log(filteredPhotos);
    // setFilteredPhotos(filteredPhotos);
    setIsLoading(false);
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
