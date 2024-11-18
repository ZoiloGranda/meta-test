import PaginationButton from "@/app/components/PaginationButton";
import { PAGE_LIMIT } from "@/app/constants";
import { getPages } from "@/app/helpers/getPages";
import React from "react";

interface PaginationProps {
  currentPage: number;
  currentResults: number;
  onPageChange: (page: number) => void;
}

const getPrevButtonClass = (currentPage: number): string => {
  return `rounded-md px-3 py-1 ${
    currentPage === 1
      ? "cursor-not-allowed bg-gray-300"
      : "bg-blue-500 text-white hover:bg-blue-600"
  }`;
};

const getNextButtonClass = (disableNext: boolean): string => {
  return `rounded-md px-3 py-1 ${
    disableNext
      ? "cursor-not-allowed bg-gray-300"
      : "bg-blue-500 text-white hover:bg-blue-600"
  }`;
};

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  currentResults,
  onPageChange,
}) => {
  const pages = getPages(currentResults, PAGE_LIMIT, currentPage);
  const disableNext = currentResults < Number(PAGE_LIMIT);
  const handlePrevPage = () => onPageChange(currentPage - 1);
  const handleNextPage = () => onPageChange(currentPage + 1);
  return (
    <div className="mt-4 flex items-center justify-center space-x-2">
      <button
        onClick={handlePrevPage}
        disabled={currentPage === 1}
        className={getPrevButtonClass(currentPage)}
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
        onClick={handleNextPage}
        disabled={disableNext}
        className={getNextButtonClass(disableNext)}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
