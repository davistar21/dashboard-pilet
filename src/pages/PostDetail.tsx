import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { usePostsStore, type Post } from "../store/PostStore";
import { ArrowLeft } from "lucide-react";
import { Skeleton } from "../components/Skeleton";

const PostDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  // const [post, setPost] = useState<Post | null>(null);
  // const [loading, setLoading] = useState(true);
  const { posts, fetchAll, loading } = usePostsStore();
  useEffect(() => {
    if (posts.length === 0) fetchAll();
  }, [posts.length, fetchAll]);
  const post = posts.find((p) => String(p.id) === id);
  if (loading)
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="max-w-3xl mx-auto mt-10 bg-white rounded-xl shadow-md border border-gray-100 p-6 space-y-4"
      >
        <Skeleton className="h-8 w-2/3 rounded-md" />
        <Skeleton className="h-4 w-full rounded-md" />
        <Skeleton className="h-4 w-11/12 rounded-md" />
        <Skeleton className="h-4 w-10/12 rounded-md" />
      </motion.div>
    );
  if (!post) return <p className="p-6 text-red-500">Post not found.</p>;

  return (
    <div className="p-6 flex flex-col gap-px">
      <h1 className="text-3xl font-bold text-[var(--color-primary)] mb-4">
        {post.title}
      </h1>
      <p className="text-[var(--color-secondary)] text-lg whitespace-pre-line">
        {post.body}
      </p>
      <Link to="/dashboard">
        <div className="flex items-center gap-px text-[var(--color-primary)] hover:bg-[var(--color-secondary)]/10 bg-[var(--color-accent)]/30 transition-colors  rounded-md px-2 py-1 md:px-3 md:py-1 w-fit">
          <ArrowLeft size={16} /> Back
        </div>
      </Link>
    </div>
  );
};

export default PostDetail;
