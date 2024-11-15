"use client";
import React, { useState } from "react";

interface InputProps {
  label: string;
}

const InputFilter: React.FC<InputProps> = ({ label }) => {
  const [value, setValue] = useState("");
  const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
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
