import { create } from "zustand";
import { fetchPosts } from "../api/posts";

export interface Post {
  id: number;
  title: string;
  body: string;
}

interface PostsState {
  posts: Post[];
  loading: boolean;
  error: string | null;
  fetchAll: (page?: number, limit?: number) => Promise<void>;
}

export const usePostsStore = create<PostsState>((set) => ({
  posts: [],
  loading: false,
  error: null,
  fetchAll: async (page = 1, limit = 10) => {
    set({ loading: true, error: null });
    try {
      const data = await fetchPosts(page, limit);
      set({ posts: data, loading: false });
    } catch (err: any) {
      set({ loading: false, error: err.message || "Failed to fetch posts" });
    }
  },
}));
