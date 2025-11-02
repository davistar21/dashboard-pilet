// src/components/ItemCard.tsx
import React from "react";
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
    ? (item.body as string).slice(0, 120)
    : "";

  return (
    <article
      role="button"
      tabIndex={0}
      onClick={() => onClick?.(item)}
      onKeyDown={(e) => {
        if (e.key === "Enter") onClick?.(item);
      }}
      className="card cursor-pointer"
    >
      <h3 className="text-lg font-semibold mb-2 text-[var(--color-primary)]">
        {(item.title as string) ?? "Untitled"}
      </h3>
      <p className="text-sm text-[var(--color-secondary)]">{summary}</p>
    </article>
  );
}

export default ItemCard;
