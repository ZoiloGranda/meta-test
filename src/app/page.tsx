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
    <>
      <CameraLogo />
      <div className="flex w-full justify-evenly">
        <MainFilters />
      </div>
      <div className="flex w-full justify-evenly">
        <PhotoGrid photos={fetchedPhotos} isLoading={isLoading} />
      </div>
      <Footer />
    </>
  );
};

export default App;
