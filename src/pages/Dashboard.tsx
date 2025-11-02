// src/pages/Dashboard.tsx
import React, { useState } from "react";
import { usePosts } from "../hooks/usePosts";
import ItemList from "../components/ItemList";
import Pagination from "../components/Pagination";
import PostDetailModal from "../components/PostDetailModal";
import type { Post } from "../store/PostStore";
import { AddItemForm } from "../components/AddItemForm";
import AddPostButton from "../components/AddPostButton";

const Dashboard: React.FC = () => {
  const { posts, loading, error, page, perPage, setPage } = usePosts();
  const [selected, setSelected] = useState<Post | null>(null);

  return (
    <div className="p-6 relative">
      <h1 className="title">📊 Dashboard</h1>
      <AddPostButton />
      {loading && <p className="text-secondary mt-4">Loading posts...</p>}
      {error && <p className="text-red-500 mt-4">{error}</p>}

      <div className="mt-4">
        <ItemList items={posts} onItemClick={(p) => setSelected(p)} />
      </div>

      <Pagination page={page} perPage={perPage} onPageChange={setPage} />

      <PostDetailModal post={selected} onClose={() => setSelected(null)} />
    </div>
  );
};

export default Dashboard;
