import axios from "axios";

const client = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com",
  timeout: 8000,
});

export async function fetchPosts(page = 1, limit = 10) {
  const start = (page - 1) * limit;
  const { data } = await client.get("/posts", {
    params: { _start: start, _limit: limit },
  });
  return data;
}

export async function fetchPost(id: number) {
  const { data } = await client.get(`/posts/${id}`);
  return data;
}
