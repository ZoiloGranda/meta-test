import React from "react";

interface PaginationButtonProps {
  page: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

const getButtonClass = (currentPage: number, page: number): string => {
  return `rounded-md px-3 py-1 ${
    currentPage === page
      ? "bg-blue-700 text-white"
      : "bg-blue-500 text-white hover:bg-blue-600"
  }`;
};

const PaginationButton: React.FC<PaginationButtonProps> = ({
  page,
  currentPage,
  onPageChange,
}) => {
  return (
    <button
      key={page}
      onClick={() => onPageChange(page)}
      className={getButtonClass(currentPage, page)}
    >
      {page}
    </button>
  );
};

export default PaginationButton;
