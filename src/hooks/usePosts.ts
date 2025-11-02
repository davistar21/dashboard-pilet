import { useEffect } from "react";
import { type Post, usePostsStore } from "../store/PostStore";

export interface UsePostsResult {
  posts: Post[];
  loading: boolean;
  error: string | null;
  page: number;
  perPage: number;
  setPage: (page: number) => void;
  addLocalPost: (post: Omit<Post, "id">) => void;
}

export function usePosts(): UsePostsResult {
  const {
    posts,
    loading,
    error,
    currentPage,
    perPage,
    fetchAll,
    setPage,
    addLocalPost,
  } = usePostsStore();

  useEffect(() => {
    fetchAll(currentPage, perPage);
  }, []);

  return {
    posts,
    loading,
    error,
    page: currentPage,
    perPage,
    setPage,
    addLocalPost,
  };
}
