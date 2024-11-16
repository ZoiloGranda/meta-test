"use client";
import InputFilter from "@/app/components/InputFilter";
import React from "react";

interface MainFiltersProps {
  onFilterChange: (filter: string, value: string) => void;
}

const MainFilters: React.FC<MainFiltersProps> = ({ onFilterChange }) => {
  return (
    <>
      <div className="flex flex-col">
        <InputFilter label="Photo Title" onFilterChange={onFilterChange} />
      </div>
      <div className="flex flex-col">
        <InputFilter label="Album Title" onFilterChange={onFilterChange} />
      </div>
      <div className="flex flex-col">
        <InputFilter label="User Email" onFilterChange={onFilterChange} />
      </div>
    </>
  );
};

export default MainFilters;
