"use client";
import React, { useState } from "react";

interface InputProps {
  label: string;
  filterName: string;
  onFilterChange: (filter: string, value: string) => void;
}

const InputFilter: React.FC<InputProps> = ({
  label,
  filterName,
  onFilterChange,
}) => {
  const [value, setValue] = useState("");
  const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value.trim();
    if (value === newValue) return;
    if (!newValue && !value) return;
    setValue(newValue);
    onFilterChange(filterName, newValue);
  };

  return (
    <div className="mb-4 flex flex-col">
      <label className="mb-2 text-sm font-medium text-gray-700">{label}</label>
      <input
        type="text"
        value={value}
        onChange={handleValueChange}
        className="rounded-md border border-gray-300 px-3 py-2 focus:border-blue-300 focus:outline-none focus:ring"
      />
    </div>
  );
};

export default InputFilter;
