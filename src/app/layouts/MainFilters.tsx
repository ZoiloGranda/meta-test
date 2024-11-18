"use client";
import InputFilter from "@/app/components/InputFilter";
import { DEBOUNCE_DELAY } from "@/app/constants";
import useDebounce from "@/app/hooks/useDebounce";
import React from "react";

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
          type="text"
          onFilterChange={debounce}
        />
      </div>
      <div className="flex flex-col">
        <InputFilter
          label="Album Title"
          filterName="album.title"
          type="text"
          onFilterChange={debounce}
        />
      </div>
      <div className="flex flex-col">
        <InputFilter
          label="User Email"
          filterName="user.email"
          type="email"
          onFilterChange={debounce}
        />
      </div>
    </>
  );
};

export default MainFilters;
