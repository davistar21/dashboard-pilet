import React from "react";
import { usePosts } from "../hooks/usePosts";

const Dashboard: React.FC = () => {
  const { posts, loading, error } = usePosts();

  return (
    <div className="p-6">
      <h1 className="title">📊 Dashboard</h1>

      {loading && (
        <p className="text-[var(--color-secondary)]">Loading posts...</p>
      )}
      {error && <p className="text-red-500">{error}</p>}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
        {posts.map((post) => (
          <div key={post.id} className="card">
            <h2 className="font-semibold text-lg text-[--color-primary] mb-2">
              {post.title}
            </h2>
            <p className="text-[--color-secondary] text-sm">{post.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
