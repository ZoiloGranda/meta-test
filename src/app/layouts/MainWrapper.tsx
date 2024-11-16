"use client";
import { getAlbums } from "@/api/external/getAlbums";
import { getPhotos } from "@/api/external/getPhotos";
import { getUsers } from "@/api/external/getUsers";
import { Photo } from "@/api/types/Photo";
import { parseFilter } from "@/app/helpers/filterName";
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

  const handleUserEmailChange = async ({ value }: { value: string }) => {
    if (!value) {
      setUserEmailFilter("");
      if (photoTitleFilter) {
        handlePhotoTitleChange({ value: photoTitleFilter });
      }
      if (!photoTitleFilter && !albumTitleFilter) {
        const fetchedPhotos = await getPhotos();
        setIsLoading(false);
        setFilteredPhotos(fetchedPhotos);
        return;
      }
      return;
    }
    const filteredUsers = await getUsers({ email: value });
    const userAlbums = await getAlbums({ userId: filteredUsers[0].id });
    if (photoTitleFilter) {
      const albumIds = userAlbums.map((album) => album.id);
      const photosByUser = filteredPhotos.filter((photo) =>
        albumIds.includes(photo.albumId),
      );
      setUserEmailFilter(value);
      setFilteredPhotos(photosByUser);
      setIsLoading(false);
      return;
    }
    const userPhotos = await getPhotos({ albumId: userAlbums[0].id });
    setUserEmailFilter(value);
    setFilteredPhotos(userPhotos);
    setIsLoading(false);
  };

  const handleAlbumTitleChange = async ({ value }: { value: string }) => {
    if (!value) {
      setAlbumTitleFilter("");
      if (photoTitleFilter) {
        handlePhotoTitleChange({ value: photoTitleFilter });
        return;
      }
      if (!photoTitleFilter && !userEmailFilter) {
        const fetchedPhotos = await getPhotos();
        setIsLoading(false);
        setFilteredPhotos(fetchedPhotos);
        return;
      }
      return;
    }
    const filteredAlbums = await getAlbums({ title: value });
    const albumPhotosPromises = filteredAlbums.map((album) =>
      getPhotos({ albumId: album.id }),
    );
    const allAlbumPhotos = await Promise.all(albumPhotosPromises);
    let aggregatedPhotos = allAlbumPhotos.flat();
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
    if (!value) {
      setPhotoTitleFilter("");
      if (albumTitleFilter) {
        return handleAlbumTitleChange({ value: albumTitleFilter });
      }
      if (!albumTitleFilter && !userEmailFilter) {
        const fetchedPhotos = await getPhotos();
        setIsLoading(false);
        setFilteredPhotos(fetchedPhotos);
        return;
      }
      return;
    }
    const photosByTitle = await getPhotos({ title: value });
    setPhotoTitleFilter(value);
    setIsLoading(false);
    setFilteredPhotos(photosByTitle);
  };

  const handleFilterChange = async (filterName: string, value: string) => {
    setIsLoading(true);
    const filters = parseFilter(filterName);
    switch (filters.type) {
      case "photo":
        handlePhotoTitleChange({ value });
        break;
      case "album":
        handleAlbumTitleChange({ value });
        break;
      case "user":
        handleUserEmailChange({ value });
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
