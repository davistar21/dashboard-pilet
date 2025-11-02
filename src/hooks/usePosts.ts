import { useEffect } from "react";
import { usePostsStore } from "../store/PostStore";

export function usePosts() {
  const { posts, loading, error, fetchAll } = usePostsStore();

  useEffect(() => {
    fetchAll();
  }, [fetchAll]);

  return { posts, loading, error };
}
