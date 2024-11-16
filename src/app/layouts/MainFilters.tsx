"use client";
import InputFilter from "@/app/components/InputFilter";
import React, { useCallback, useRef } from "react";

interface MainFiltersProps {
  onFilterChange: (filter: string, value: string) => void;
}

const MainFilters: React.FC<MainFiltersProps> = ({ onFilterChange }) => {
  const debounceTimeout = useRef<NodeJS.Timeout | null>(null);

  const debounce = useCallback(
    (filter: string, value: string) => {
      if (debounceTimeout.current) {
        clearTimeout(debounceTimeout.current);
      }
      debounceTimeout.current = setTimeout(() => {
        onFilterChange(filter, value);
      }, 300);
    },
    [onFilterChange],
  );

  return (
    <>
      <div className="flex flex-col">
        <InputFilter label="Photo Title" onFilterChange={debounce} />
      </div>
      <div className="flex flex-col">
        <InputFilter label="Album Title" onFilterChange={debounce} />
      </div>
      <div className="flex flex-col">
        <InputFilter label="User Email" onFilterChange={debounce} />
      </div>
    </>
  );
};

export default MainFilters;
