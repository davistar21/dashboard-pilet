import { create } from "zustand";
import { fetchPosts } from "../api/posts";
import { persist } from "zustand/middleware";

export interface Post {
  userId?: number;
  id: number | string;
  title: string;
  body: string;
}

interface PostsState {
  posts: Post[];
  currentPage: number;
  perPage: number;
  loading: boolean;
  error: string | null;
  fetchAll: (page?: number, limit?: number) => Promise<void>;
  setPage: (page: number) => Promise<void>;
  addLocalPost: (post: Omit<Post, "id">) => void;
}

export const usePostsStore = create<PostsState>()(
  persist(
    (set, get) => ({
      posts: [],
      currentPage: 1,
      perPage: 10,
      loading: false,
      error: null,

      fetchAll: async (page = 1, limit = 10) => {
        set({ loading: true, error: null });
        try {
          const data = await fetchPosts(page, limit);
          set((state) => ({
            posts: [
              ...state.posts.filter((p) => String(p.id).startsWith("local-")),
              ...data,
            ],
            currentPage: page,
            perPage: limit,
            loading: false,
          }));
        } catch (err: any) {
          set({
            loading: false,
            error: err?.message ?? "Failed to fetch posts",
          });
        }
      },

      setPage: async (page: number) => {
        await get().fetchAll(page, get().perPage);
      },

      addLocalPost: (post) =>
        set((state) => ({
          posts: [{ id: `local-${Date.now()}`, ...post }, ...state.posts],
        })),
    }),
    {
      name: "posts-store",
      partialize: (state) => ({
        posts: state.posts,
      }),
    }
  )
);
