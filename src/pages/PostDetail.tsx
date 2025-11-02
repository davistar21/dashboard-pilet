// src/pages/PostDetail.tsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchPost } from "../api/posts";
import type { Post } from "../store/PostStore";

const PostDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      fetchPost(Number(id))
        .then(setPost)
        .catch(() => setPost(null))
        .finally(() => setLoading(false));
    }
  }, [id]);

  if (loading) return <p className="p-6 text-secondary">Loading post...</p>;
  if (!post) return <p className="p-6 text-red-500">Post not found.</p>;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-[var(--color-primary)] mb-4">
        {post.title}
      </h1>
      <p className="text-[var(--color-secondary)] text-lg whitespace-pre-line">
        {post.body}
      </p>
    </div>
  );
};

export default PostDetail;
