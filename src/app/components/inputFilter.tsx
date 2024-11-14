import React from "react";

interface InputProps {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputFilter: React.FC<InputProps> = ({ label, value, onChange }) => {
  return (
    <div className="flex flex-col mb-4">
      <label className="mb-2 text-sm font-medium text-gray-700">{label}</label>
      <input
        type="text"
        value={value}
        onChange={onChange}
        className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
      />
    </div>
  );
};

export default InputFilter;
