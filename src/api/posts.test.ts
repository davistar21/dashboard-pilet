import { fetchPosts } from "./posts";

describe("fetchPosts", () => {
  it("returns posts array", async () => {
    const posts = await fetchPosts(1, 5);
    expect(Array.isArray(posts)).toBe(true);
    expect(posts.length).toBe(5);
  });
});
