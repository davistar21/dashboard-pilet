import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";

export interface PaginationProps {
  page: number;
  perPage?: number;
  total?: number;
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
  const totalPages = total ? Math.max(1, Math.ceil(total / perPage)) : 10;
  const current = Math.max(1, page);

  const half = Math.floor(maxPagesToShow / 2);
  let start = Math.max(1, current - half);
  let end = Math.min(totalPages, start + maxPagesToShow - 1);
  if (end - start < maxPagesToShow - 1) {
    start = Math.max(1, end - maxPagesToShow + 1);
  }

  const pages = Array.from({ length: end - start + 1 }, (_, i) => start + i);

  return (
    <div className="flex items-center gap-2 mt-6 justify-center flex-nowrap w-full">
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => onPageChange(Math.max(1, current - 1))}
        disabled={current === 1}
        className="flex items-center gap-1 px-3 py-1 rounded-md bg-indigo-100 text-[var(--color-primary)] hover:bg-indigo-200 disabled:opacity-50 transition-colors"
      >
        <ChevronLeft size={16} />
        Prev
      </motion.button>
      <div className="inline">
        {pages.map((p) => (
          <motion.button
            key={p}
            onClick={() => onPageChange(p)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`px-3 py-1 rounded-md border font-medium transition-colors ${
              p === current
                ? "bg-[var(--color-primary)] text-white border-[var(--color-primary)]"
                : "bg-white text-text border-gray-300 hover:bg-indigo-50"
            }`}
            aria-current={p === current ? "page" : undefined}
          >
            {p}
          </motion.button>
        ))}
      </div>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => onPageChange(Math.min(totalPages, current + 1))}
        disabled={current === totalPages}
        className="flex items-center gap-1 px-3 py-1 rounded-md bg-indigo-100 text-[var(--color-primary)] hover:bg-indigo-200 disabled:opacity-50 transition-colors"
      >
        Next
        <ChevronRight size={16} />
      </motion.button>
    </div>
  );
}

export default Pagination;
