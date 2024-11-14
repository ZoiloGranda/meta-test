import React from "react";
import MainFilters from "@/app/layouts/MainFilters";
import Footer from "@/app/layouts/Footer";
import CameraLogo from "@/app/layouts/CameraLogo";

const App: React.FC = () => {
  return (
    <div className="font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-wrap items-center gap-8 py-6 sm:items-start">
        <CameraLogo />
        <div className="flex w-full justify-evenly">
          <MainFilters />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default App;
