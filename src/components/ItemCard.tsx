import React from "react";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import type { Post } from "../store/PostStore";

export interface ItemCardProps<T = Post> {
  item: T;
  onClick?: (item: T) => void;
  snippet?: (item: T) => string;
}

export function ItemCard<T extends { title?: string; body?: string }>({
  item,
  onClick,
  snippet,
}: ItemCardProps<T>) {
  const summary = snippet
    ? snippet(item)
    : item.body
    ? (item.body as string).slice(0, 100)
    : "";

  return (
    <motion.article
      role="button"
      tabIndex={0}
      onClick={() => onClick?.(item)}
      onKeyDown={(e) => {
        if (e.key === "Enter") onClick?.(item);
      }}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      className="card cursor-pointer w-80 h-44 sm:h-48 lg:h-52 p-4 flex flex-col justify-between rounded-2xl shadow-md border border-gray-100 bg-white transition-all relative"
    >
      <div>
        <h3 className="text-lg font-semibold mb-2 text-[var(--color-primary)] truncate">
          {(item.title as string) ?? "Untitled"}
        </h3>
        <p className="text-sm text-[var(--color-secondary)]">{summary}</p>
      </div>
      <div className="absolute bottom-4 right-4 text-[var(--color-accent)]">
        <ArrowRight size={20} />
      </div>
    </motion.article>
  );
}

export default ItemCard;
