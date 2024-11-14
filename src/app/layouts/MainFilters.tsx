import InputFilter from "@/app/components/InputFilter";
import React from "react";

const MainFilters = () => {
  return (
    <>
      <div className="flex flex-col">
        <InputFilter label="Photo Title" />
      </div>
      <div className="flex flex-col">
        <InputFilter label="Album Title:" />
      </div>
      <div className="flex flex-col">
        <InputFilter label="User Email:" />
      </div>
    </>
  );
};

export default MainFilters;
