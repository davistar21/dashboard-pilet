import React from "react";
import { motion } from "framer-motion";
import ItemCard from "./ItemCard";
import type { Post } from "../store/PostStore";

export interface ItemListProps<T = Post> {
  items: T[];
  onItemClick?: (item: T) => void;
  keySelector?: (item: T) => React.Key;
}

export function ItemList<T extends { title?: string; body?: string }>({
  items,
  onItemClick,
  keySelector,
}: ItemListProps<T>) {
  return (
    <motion.div
      className="grid gap-6 
    grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 
    justify-items-center"
      initial="hidden"
      animate="visible"
      variants={{
        visible: {
          transition: {
            staggerChildren: 0.1,
          },
        },
      }}
    >
      {items.map((it, idx) => (
        <motion.div
          key={
            keySelector
              ? keySelector(it)
              : ((it as unknown as { id?: string | number }).id as React.Key)
          }
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0 },
          }}
          transition={{ delay: idx * 0.05, duration: 0.3 }}
        >
          <ItemCard item={it} onClick={onItemClick} />
        </motion.div>
      ))}
    </motion.div>
  );
}

export default ItemList;
