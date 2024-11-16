"use client";
import { Photo } from "@/api/types/Photo";
import { parseFilter } from "@/app/helpers/filterName";
import MainFilters from "@/app/layouts/MainFilters";
import PhotoGrid from "@/app/layouts/PhotoGrid";
import React, { useState, useEffect } from "react";
import { handlePhotoTitleChange } from "@/app/helpers/handlePhotoTitleChange";
import { handleAlbumTitleChange } from "@/app/helpers/handleAlbumTitleChange";
import { handleUserEmailChange } from "@/app/helpers/handleUserEmailChange";
import Pagination from "@/app/components/Pagination";
import { getPhotos } from "@/api/external/getPhotos";

const MainWrapper = () => {
  const [filteredPhotos, setFilteredPhotos] = useState<Photo[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [photoTitleFilter, setPhotoTitleFilter] = useState("");
  const [albumTitleFilter, setAlbumTitleFilter] = useState("");
  const [userEmailFilter, setUserEmailFilter] = useState("");
  const [currentUserId, setCurrentUserId] = useState(0);

  const fetchPhotos = async (page: number) => {
    setIsLoading(true);
    try {
      const photos = await getPhotos({ limit: 25, start: (page - 1) * 25 });
      setFilteredPhotos(photos);
    } catch (error) {
      console.error("Error fetching photos:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPhotos(currentPage);
  }, [currentPage]);

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
          currentUserId,
          setCurrentUserId,
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
          currentUserId,
          setCurrentUserId,
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
          setCurrentUserId,
          currentUserId,
        });
        break;
      default:
        break;
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <>
      <div className="flex w-full justify-evenly">
        <MainFilters onFilterChange={handleFilterChange} />
      </div>
      <div className="flex w-full justify-evenly">
        <Pagination
          currentPage={currentPage}
          totalPages={5}
          onPageChange={handlePageChange}
        />
      </div>
      <div className="flex w-full justify-evenly">
        <PhotoGrid photos={filteredPhotos} isLoading={isLoading} />
      </div>
    </>
  );
};

export default MainWrapper;
