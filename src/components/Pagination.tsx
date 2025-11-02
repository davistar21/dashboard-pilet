import React from "react";

export interface PaginationProps {
  page: number;
  perPage?: number;
  total?: number; // optional if you know total
  onPageChange: (page: number) => void;
  maxPagesToShow?: number;
}

export function Pagination({
  page,
  perPage = 10,
  total,
  onPageChange,
  maxPagesToShow = 5,
}: PaginationProps) {
  const totalPages = total ? Math.max(1, Math.ceil(total / perPage)) : 10; // default to 10 pages if unknown
  const current = Math.max(1, page);

  // compute window of pages
  const half = Math.floor(maxPagesToShow / 2);
  let start = Math.max(1, current - half);
  let end = Math.min(totalPages, start + maxPagesToShow - 1);
  if (end - start < maxPagesToShow - 1) {
    start = Math.max(1, end - maxPagesToShow + 1);
  }

  const pages = Array.from({ length: end - start + 1 }, (_, i) => start + i);

  return (
    <nav className="flex items-center gap-2 mt-6">
      <button
        className="btn bg-gray-200 text-gray-700 hover:bg-gray-300"
        onClick={() => onPageChange(Math.max(1, current - 1))}
        disabled={current === 1}
      >
        Prev
      </button>

      {pages.map((p) => (
        <button
          key={p}
          onClick={() => onPageChange(p)}
          className={`px-3 py-1 rounded-md ${
            p === current
              ? "bg-[var(--color-primary)] text-white"
              : "bg-white border"
          }`}
          aria-current={p === current ? "page" : undefined}
        >
          {p}
        </button>
      ))}

      <button
        className="btn bg-gray-200 text-gray-700 hover:bg-gray-300"
        onClick={() => onPageChange(Math.min(totalPages, current + 1))}
        disabled={current === totalPages}
      >
        Next
      </button>
    </nav>
  );
}

export default Pagination;
