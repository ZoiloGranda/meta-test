import React from "react";
import Footer from "@/app/layouts/Footer";
import CameraLogo from "@/app/layouts/CameraLogo";
import { getPhotos } from "@/api/external/getPhotos";
import MainWrapper from "@/app/layouts/MainWrapper";

const App: React.FC = async () => {
  const fetchedPhotos = await getPhotos();

  return (
    <>
      <CameraLogo />
      <MainWrapper photos={fetchedPhotos} />
      <Footer />
    </>
  );
};

export default App;
