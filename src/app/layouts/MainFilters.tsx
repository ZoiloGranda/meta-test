"use client";
import InputFilter from "@/app/components/InputFilter";
import React from "react";
import useDebounce from "@/app/hooks/useDebounce";
import { DEBOUNCE_DELAY } from "@/constants";

interface MainFiltersProps {
  onFilterChange: (filter: string, value: string) => void;
}

const MainFilters: React.FC<MainFiltersProps> = ({ onFilterChange }) => {
  const debounce = useDebounce(onFilterChange, DEBOUNCE_DELAY);

  return (
    <>
      <div className="flex flex-col">
        <InputFilter
          label="Photo Title"
          filterName="photo.title"
          onFilterChange={debounce}
        />
      </div>
      <div className="flex flex-col">
        <InputFilter
          label="Album Title"
          filterName="album.title"
          onFilterChange={debounce}
        />
      </div>
      <div className="flex flex-col">
        <InputFilter
          label="User Email"
          filterName="user.email"
          onFilterChange={debounce}
        />
      </div>
    </>
  );
};

export default MainFilters;
