import React from "react";
import MainFilters from "@/app/layouts/MainFilters";
import Footer from "@/app/layouts/Footer";
import CameraLogo from "@/app/layouts/CameraLogo";
import PhotoGrid from "@/app/layouts/PhotoGrid";
import { getPhotos } from "@/api/external/getPhotos";

const App: React.FC = async () => {
  let isLoading = true;
  const fetchedPhotos = await getPhotos();
  isLoading = false;

  return (
    <div className="font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-wrap items-center gap-8 px-10 py-6 sm:items-start">
        <CameraLogo />
        <div className="flex w-full justify-evenly">
          <MainFilters />
        </div>
        <div className="flex w-full justify-evenly">
          <PhotoGrid photos={fetchedPhotos} isLoading={isLoading} />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default App;
