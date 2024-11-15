"use client";
import React, { useState, useEffect } from "react";
import MainFilters from "@/app/layouts/MainFilters";
import Footer from "@/app/layouts/Footer";
import CameraLogo from "@/app/layouts/CameraLogo";
import PhotoGrid from "@/app/layouts/PhotoGrid";
import { Photo } from "@/api/types/Photo";
import { getPhotos } from "@/api/external/getPhotos";

const App: React.FC = () => {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        const fetchedPhotos = await getPhotos();
        setPhotos(fetchedPhotos);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching photos:", error);
      }
    };

    fetchPhotos();
  }, []);

  return (
    <div className="font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-wrap items-center gap-8 px-6 py-6 sm:items-start">
        <CameraLogo />
        <div className="flex w-full justify-evenly">
          <MainFilters />
        </div>
        <div className="flex w-full justify-evenly">
          <PhotoGrid photos={photos} isLoading={isLoading} />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default App;
