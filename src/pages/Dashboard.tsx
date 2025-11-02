// src/pages/Dashboard.tsx
import React from "react";
import { usePosts } from "../hooks/usePosts";
import ItemList from "../components/ItemList";
import Pagination from "../components/Pagination";

const Dashboard: React.FC = () => {
  const { posts, loading, error, page, perPage, setPage } = usePosts();

  return (
    <div className="p-6">
      <h1 className="title">📊 Dashboard</h1>

      <div className="flex items-center justify-between">
        <p className="text-sm text-[var(--color-secondary)]">
          Showing page {page}
        </p>
        <button
          className="btn"
          onClick={() =>
            // example: add a demo local post
            // addLocalPost({ title: 'Local post', body: 'This is a local-only optimistic post' })
            null
          }
        >
          New Post
        </button>
      </div>

      {loading && (
        <p className="text-[var(--color-secondary)] mt-4">Loading posts...</p>
      )}
      {error && <p className="text-red-500 mt-4">{error}</p>}

      <div className="mt-4">
        <ItemList
          items={posts}
          onItemClick={(p) => alert(`Open post ${p.id}`)}
        />
      </div>

      <Pagination
        page={page}
        perPage={perPage}
        onPageChange={(p) => setPage(p)}
      />
    </div>
  );
};

export default Dashboard;
