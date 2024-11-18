"use client";
import React, { useState } from "react";

interface InputProps {
  label: string;
  filterName: string;
  type: string;
  onFilterChange: (filter: string, value: string) => void;
}

const InputFilter: React.FC<InputProps> = ({
  label,
  filterName,
  type,
  onFilterChange,
}) => {
  const [value, setValue] = useState("");
  const [error, setError] = useState("");

  const isValidEmail = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value.trim();
    if (value === newValue) return;
    if (!newValue && !value) return;

    if (type === "email") {
      if (newValue === "" || isValidEmail(newValue)) {
        setError("");
        setValue(newValue);
        onFilterChange(filterName, newValue);
      } else {
        setValue(newValue);
        setError("Invalid email address");
      }
    } else {
      setValue(newValue);
      onFilterChange(filterName, newValue);
    }
  };

  const getInputClassNames = () => {
    return `rounded-md border px-3 py-2 focus:outline-none focus:ring ${
      error ? "border-red-500" : "border-gray-300 focus:border-blue-300"
    }`;
  };

  return (
    <div className="mb-4 flex flex-col">
      <label className="mb-2 text-sm font-medium text-gray-700">{label}</label>
      <input
        type={type}
        value={value}
        onChange={handleValueChange}
        className={getInputClassNames()}
      />
      {error && <span className="text-sm text-red-500">{error}</span>}
    </div>
  );
};

export default InputFilter;
