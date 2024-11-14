import React from "react";
import MainFilters from "@/app/layouts/main-filters";
import Footer from "@/app/layouts/footer";

const App: React.FC = () => {
  return (
    <div className="font-[family-name:var(--font-geist-sans)]">
      <main className="row-start-2 flex items-center gap-8 py-6 sm:items-start">
        <div className="flex w-full justify-evenly">
          <MainFilters />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default App;
