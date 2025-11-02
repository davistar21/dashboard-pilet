import { motion } from "framer-motion";
import React, { useState } from "react";
import { usePosts } from "../hooks/usePosts";
import ItemList from "../components/ItemList";
import Pagination from "../components/Pagination";
import PostDetailModal from "../components/PostDetailModal";
import type { Post } from "../store/PostStore";
import AddPostButton from "../components/AddPostButton";
import { LayoutDashboard } from "lucide-react";
import { Skeleton } from "../components/Skeleton";

const Dashboard: React.FC = () => {
  const { posts, loading, error, page, perPage, setPage } = usePosts();
  const [selected, setSelected] = useState<Post | null>(null);

  return (
    <div className="p-6 relative w-full">
      <h1 className="title flex items-center gap-1">
        <LayoutDashboard /> Dashboard
      </h1>
      <AddPostButton />
      {/* {loading && <p className="text-secondary mt-4">Loading posts...</p>} */}
      {error && <p className="text-red-500 mt-4">{error}</p>}

      <div className="mt-4">
        {loading ? (
          <div className="items-center justify-center flex gap-6 flex-wrap">
            {Array.from({ length: 10 }).map((_, idx) => (
              <motion.div
                key={`skeleton-${idx}`}
                variants={{
                  hidden: { opacity: 0, y: 10 },
                  visible: { opacity: 1, y: 0 },
                }}
                transition={{ delay: idx * 0.05 }}
                className="w-80 h-44 sm:h-48 lg:h-52 p-4 rounded-2xl shadow-md border border-gray-100 bg-white"
              >
                <div className="space-y-3">
                  <Skeleton className="h-5 w-2/3 rounded-md" />
                  <Skeleton className="h-4 w-full rounded-md" />
                  <Skeleton className="h-4 w-5/6 rounded-md" />
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <ItemList items={posts} onItemClick={(p) => setSelected(p)} />
        )}
      </div>

      <Pagination page={page} perPage={perPage} onPageChange={setPage} />

      <PostDetailModal post={selected} onClose={() => setSelected(null)} />
    </div>
  );
};

export default Dashboard;
