"use client";
import React, { useState, useEffect } from "react";
import { Photo } from "@/models/Photo";
import { parseFilter } from "@/app/helpers/filterName";
import MainFilters from "@/app/layouts/MainFilters";
import PhotoGrid from "@/app/layouts/PhotoGrid";
import { handlePhotoTitleChange } from "@/app/helpers/handlePhotoTitleChange";
import { handleAlbumTitleChange } from "@/app/helpers/handleAlbumTitleChange";
import { handleUserEmailChange } from "@/app/helpers/handleUserEmailChange";
import Pagination from "@/app/components/Pagination";
import { PAGE_LIMIT } from "@/app/constants";
import { fetchData } from "@/app/helpers/fetchData";
import NoPhotosFound from "@/app/components/NoPhotosFound";

const MainWrapper = () => {
  const [filteredPhotos, setFilteredPhotos] = useState<Photo[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [photoTitleFilter, setPhotoTitleFilter] = useState("");
  const [albumTitleFilter, setAlbumTitleFilter] = useState("");
  const [userEmailFilter, setUserEmailFilter] = useState("");
  const [currentUserId, setCurrentUserId] = useState(0);
  const [initFilters, setInitFilters] = useState(false);

  const emptyFilters =
    !photoTitleFilter && !albumTitleFilter && !userEmailFilter;

  const fetchPhotos = async () => {
    setIsLoading(true);
    try {
      const photos: Photo[] = await fetchData(
        `/api/photos?start=${(currentPage - 1) * PAGE_LIMIT}`,
      );
      setFilteredPhotos(photos);
    } catch (error) {
      console.error("Error fetching photos:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handlerParams = {
    value: "",
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
  };

  useEffect(() => {
    if (emptyFilters) {
      fetchPhotos();
      return;
    }
    if (photoTitleFilter) {
      doPhotoTitleChange({ pageChanged: true });
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

  const doPhotoTitleChange = async ({
    pageChanged = false,
  }: {
    pageChanged: boolean;
  }) => {
    await handlePhotoTitleChange({ ...handlerParams, pageChanged });
  };

  const doAlbumTitleChange = async () => {
    handleAlbumTitleChange({ ...handlerParams, value: albumTitleFilter });
  };

  const doUserEmailChange = async () => {
    handleUserEmailChange({
      ...handlerParams,
      value: userEmailFilter,
    });
  };

  useEffect(() => {
    if (!initFilters) return;
    doPhotoTitleChange({ pageChanged: false });
  }, [photoTitleFilter]);

  useEffect(() => {
    if (!initFilters) return;
    doAlbumTitleChange();
  }, [albumTitleFilter]);

  useEffect(() => {
    if (!initFilters) return;
    doUserEmailChange();
  }, [userEmailFilter]);

  useEffect(() => {
    setInitFilters(true);
  }, [initFilters]);

  const handleFilterChange = async (filterName: string, value: string) => {
    setIsLoading(true);
    const filters = parseFilter(filterName);
    switch (filters.type) {
      case "photo":
        setPhotoTitleFilter(value);
        setCurrentPage(1);
        break;
      case "album":
        setAlbumTitleFilter(value);
        setCurrentPage(1);
        break;
      case "user":
        setUserEmailFilter(value);
        setCurrentPage(1);
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
      <div className="mt-4 flex w-full justify-evenly text-center">
        <NoPhotosFound photoCount={filteredPhotos.length} />
      </div>
    </>
  );
};

export default MainWrapper;
