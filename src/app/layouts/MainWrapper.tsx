"use client";
import { getAlbums } from "@/api/external/getAlbums";
import { getPhotos } from "@/api/external/getPhotos";
import { getUsers } from "@/api/external/getUsers";
import { Photo } from "@/api/types/Photo";
import { FiltersObject, parseFilter } from "@/app/helpers/filterName";
import MainFilters from "@/app/layouts/MainFilters";
import PhotoGrid from "@/app/layouts/PhotoGrid";
import React, { useState } from "react";

interface MainWrapperProps {
  photos: Photo[];
}

const MainWrapper: React.FC<MainWrapperProps> = ({ photos }) => {
  const [filteredPhotos, setFilteredPhotos] = useState(photos);
  const [isLoading, setIsLoading] = useState(false);
  const [photoTitleFilter, setPhotoTitleFilter] = useState("");
  const [albumTitleFilter, setAlbumTitleFilter] = useState("");
  const [userEmailFilter, setUserEmailFilter] = useState("");

  const handleUserEmailChange = async ({
    filters,
    value,
  }: {
    filters: FiltersObject;
    value: string;
  }) => {
    if (!value) {
      setUserEmailFilter("");
      if (photoTitleFilter) {
        handlePhotoTitleChange({ value: photoTitleFilter });
      }
      return;
    }
    const filteredUsers = await getUsers({ [filters.field]: value });
    console.log("filteredUsers", filteredUsers);
    const userAlbums = await getAlbums({ userId: filteredUsers[0].id });
    console.log("userAlbums", userAlbums);
    if (photoTitleFilter) {
      const albumIds = userAlbums.map((album) => album.id);
      const photosByUser = filteredPhotos.filter((photo) =>
        albumIds.includes(photo.albumId),
      );
      console.log("photosByUser", photosByUser);
      setUserEmailFilter(value);
      setFilteredPhotos(photosByUser);
      setIsLoading(false);
      return;
    }
    const userPhotos = await getPhotos({ albumId: userAlbums[0].id });
    console.log("userPhotos", userPhotos);
    setUserEmailFilter(value);
    setFilteredPhotos(userPhotos);
    setIsLoading(false);
  };

  const handleAlbumTitleChange = async ({
    filters,
    value,
  }: {
    filters: FiltersObject;
    value: string;
  }) => {
    if (!value) {
      setAlbumTitleFilter("");
      if (photoTitleFilter) {
        handlePhotoTitleChange({ value: photoTitleFilter });
      }
      return;
    }
    const filteredAlbums = await getAlbums({ [filters.field]: value });
    console.log("filteredAlbums", filteredAlbums);
    const albumPhotosPromises = filteredAlbums.map((album) =>
      getPhotos({ albumId: album.id }),
    );
    const allAlbumPhotos = await Promise.all(albumPhotosPromises);
    let aggregatedPhotos = allAlbumPhotos.flat();
    console.log("aggregatedPhotos", aggregatedPhotos);
    if (photoTitleFilter) {
      const albumIds = filteredAlbums.map((album) => album.id);
      aggregatedPhotos = filteredPhotos.filter((photo) =>
        albumIds.includes(photo.albumId),
      );
    }
    setAlbumTitleFilter(value);
    setIsLoading(false);
    setFilteredPhotos(aggregatedPhotos);
  };

  const handlePhotoTitleChange = async ({ value }: { value: string }) => {
    const photosByTitle = await getPhotos({ title: value });
    console.log("photosByTitle", photosByTitle);
    setPhotoTitleFilter(value);
    setIsLoading(false);
    setFilteredPhotos(photosByTitle);
  };

  const handleFilterChange = async (filterName: string, value: string) => {
    setIsLoading(true);
    console.log("InputFilter", filterName, value);
    const filters = parseFilter(filterName);
    switch (filters.type) {
      case "photo":
        handlePhotoTitleChange({ value });
        break;
      case "album":
        handleAlbumTitleChange({ filters, value });
        break;
      case "user":
        handleUserEmailChange({ filters, value });
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
