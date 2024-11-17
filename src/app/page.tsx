import CameraLogo from "app/layouts/CameraLogo";
import Footer from "app/layouts/Footer";
import MainWrapper from "app/layouts/MainWrapper";
import React from "react";

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
