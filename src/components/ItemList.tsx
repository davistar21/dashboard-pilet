// src/components/ItemList.tsx
import React from "react";
import ItemCard from "./ItemCard";
import type { Post } from "../store/PostStore";

export interface ItemListProps<T = Post> {
  items: T[];
  onItemClick?: (item: T) => void;
  renderItem?: (item: T) => React.ReactNode;
  keySelector?: (item: T) => React.Key;
}

export function ItemList<T extends { title?: string; body?: string }>({
  items,
  onItemClick,
  renderItem,
  keySelector,
}: ItemListProps<T>) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {items.map((it) => (
        <div
          key={
            keySelector
              ? keySelector(it)
              : ((it as unknown as { id?: string | number }).id as React.Key)
          }
        >
          {renderItem ? (
            renderItem(it)
          ) : (
            <ItemCard item={it} onClick={onItemClick} />
          )}
        </div>
      ))}
    </div>
  );
}

export default ItemList;
