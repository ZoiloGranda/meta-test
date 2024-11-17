import PaginationButton from "@/app/components/PaginationButton";
import React from "react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  currentResults: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  currentResults,
  onPageChange,
}) => {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  const disableNext = currentPage === totalPages || currentResults < 25;

  return (
    <div className="mt-4 flex items-center justify-center space-x-2">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`rounded-md px-3 py-1 ${currentPage === 1 ? "cursor-not-allowed bg-gray-300" : "bg-blue-500 text-white hover:bg-blue-600"}`}
      >
        Previous
      </button>
      {pages.map((page) => (
        <PaginationButton
          key={page}
          page={page}
          currentPage={currentPage}
          onPageChange={onPageChange}
        />
      ))}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={disableNext}
        className={`rounded-md px-3 py-1 ${disableNext ? "cursor-not-allowed bg-gray-300" : "bg-blue-500 text-white hover:bg-blue-600"}`}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
