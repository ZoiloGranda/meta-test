"use client";
import { Photo } from "@/models/Photo";
import { parseFilter } from "@/app/helpers/filterName";
import MainFilters from "@/app/layouts/MainFilters";
import PhotoGrid from "@/app/layouts/PhotoGrid";
import React, { useState, useEffect } from "react";
import { handlePhotoTitleChange } from "@/app/helpers/handlePhotoTitleChange";
import { handleAlbumTitleChange } from "@/app/helpers/handleAlbumTitleChange";
import { handleUserEmailChange } from "@/app/helpers/handleUserEmailChange";
import Pagination from "@/app/components/Pagination";

const MainWrapper = () => {
  const [filteredPhotos, setFilteredPhotos] = useState<Photo[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [photoTitleFilter, setPhotoTitleFilter] = useState("");
  const [albumTitleFilter, setAlbumTitleFilter] = useState("");
  const [userEmailFilter, setUserEmailFilter] = useState("");
  const [currentUserId, setCurrentUserId] = useState(0);

  const emptyFilters =
    !photoTitleFilter && !albumTitleFilter && !userEmailFilter;

  const fetchPhotos = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `/api/photos?start=${(currentPage - 1) * 25}`,
      );
      const data = await response.json();
      const photos = data.photos;
      setFilteredPhotos(photos);
    } catch (error) {
      console.error("Error fetching photos:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (emptyFilters) {
      fetchPhotos();
      return;
    }
    if (photoTitleFilter) {
      doPhotoTitleChange();
      return;
    }
    if (albumTitleFilter) {
      doAlbumTitleChange();
      return;
    }
    if (userEmailFilter) {
      doUserEmailChange();
      return;
    }
  }, [currentPage]);

  const doPhotoTitleChange = async () => {
    await handlePhotoTitleChange({
      value: photoTitleFilter,
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
      currentPage,
      setCurrentPage,
    });
  };

  const doAlbumTitleChange = async () => {
    handleAlbumTitleChange({
      value: albumTitleFilter,
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
      currentPage,
      setCurrentPage,
    });
  };

  const doUserEmailChange = async () => {
    handleUserEmailChange({
      value: userEmailFilter,
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
      currentPage,
      setCurrentPage,
      setUserEmailFilter,
    });
  };

  useEffect(() => {
    doPhotoTitleChange();
  }, [photoTitleFilter]);

  useEffect(() => {
    doAlbumTitleChange();
  }, [albumTitleFilter]);

  useEffect(() => {
    doUserEmailChange();
  }, [userEmailFilter]);

  const handleFilterChange = async (filterName: string, value: string) => {
    setIsLoading(true);
    const filters = parseFilter(filterName);
    switch (filters.type) {
      case "photo":
        setPhotoTitleFilter(value);
        break;
      case "album":
        setAlbumTitleFilter(value);
        break;
      case "user":
        setUserEmailFilter(value);
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
          onPageChange={handlePageChange}
          currentResults={filteredPhotos.length}
        />
      </div>
      <div className="flex w-full justify-evenly">
        <PhotoGrid photos={filteredPhotos} isLoading={isLoading} />
      </div>
    </>
  );
};

export default MainWrapper;
