import React from "react";
import Footer from "@/app/layouts/Footer";
import CameraLogo from "@/app/layouts/CameraLogo";
import MainWrapper from "@/app/layouts/MainWrapper";

const App: React.FC = async () => {
  return (
    <>
      <CameraLogo />
      <MainWrapper />
      <Footer />
    </>
  );
};

export default App;
