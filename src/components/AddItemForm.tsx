import React, { useState } from "react";
import { InputField } from "./InputField";
import { usePostsStore } from "../store/PostStore";

export const AddItemForm: React.FC = () => {
  const { addLocalPost } = usePostsStore();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim() || !body.trim()) return;

    addLocalPost({ title, body });

    setTitle("");
    setBody("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white shadow-md rounded-lg p-4 mb-6 border border-gray-100"
    >
      <h2 className="text-lg font-semibold mb-3 text-gray-800">Add New Post</h2>

      <InputField
        label="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Enter post title"
        required
      />

      <InputField
        label="Body"
        value={body}
        onChange={(e) => setBody(e.target.value)}
        placeholder="Enter post body"
        type="textarea"
        required
      />

      <button
        type="submit"
        className="mt-2 w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-md transition"
      >
        Add Post
      </button>
    </form>
  );
};
