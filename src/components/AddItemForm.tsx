import React, { useState } from "react";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { InputField } from "./InputField";
import { usePostsStore } from "../store/PostStore";

interface AddItemFormProps {
  onSuccess?: () => void;
}

export const AddItemForm: React.FC<AddItemFormProps> = ({ onSuccess }) => {
  const { addLocalPost } = usePostsStore();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !body.trim()) return;

    addLocalPost({ title, body });
    setTitle("");
    setBody("");

    onSuccess?.();
  };

  const container = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="bg-white dark:bg-gray-900 shadow-md rounded-xl p-6 border border-gray-100"
      variants={container}
      initial="hidden"
      animate="show"
    >
      {/* <motion.h2
        className="text-xl font-semibold mb-4 text-[var(--color-primary)]"
        variants={item}
      >
        Add New Post
      </motion.h2> */}

      <motion.div variants={item}>
        <InputField
          label="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter post title"
          required
        />
      </motion.div>

      <motion.div variants={item} className="mt-3">
        <InputField
          label="Body"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          placeholder="Enter post body"
          type="textarea"
          required
        />
      </motion.div>

      <motion.button
        type="submit"
        className="mt-4 w-full flex items-center justify-center gap-2 bg-[var(--color-primary)] hover:opacity-90 text-white font-semibold py-2 rounded-md transition"
        variants={item}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
      >
        <Check size={18} />
        Add Post
      </motion.button>
    </motion.form>
  );
};
