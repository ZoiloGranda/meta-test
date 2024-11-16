import React from "react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

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
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`rounded-md px-3 py-1 ${currentPage === page ? "bg-blue-700 text-white" : "bg-blue-500 text-white hover:bg-blue-600"}`}
        >
          {page}
        </button>
      ))}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`rounded-md px-3 py-1 ${currentPage === totalPages ? "cursor-not-allowed bg-gray-300" : "bg-blue-500 text-white hover:bg-blue-600"}`}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
