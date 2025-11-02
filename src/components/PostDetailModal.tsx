import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { Post } from "../store/PostStore";
import { useHistory } from "react-router-dom";
import { X, ArrowRight } from "lucide-react";

interface PostDetailModalProps {
  post: Post | null;
  onClose: () => void;
}

export const PostDetailModal: React.FC<PostDetailModalProps> = ({
  post,
  onClose,
}) => {
  const history = useHistory();

  return (
    <AnimatePresence>
      {post && (
        <motion.div
          className="fixed inset-0 bg-indigo-900/30 flex items-center justify-center z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={onClose}
        >
          <motion.div
            onClick={(e) => e.stopPropagation()}
            initial={{ y: 50, opacity: 0, scale: 0.95 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 50, opacity: 0, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="bg-background p-6 rounded-2xl w-[90%] max-w-lg shadow-xl border border-indigo-100 relative"
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X size={20} />
            </button>

            <h2 className="text-2xl font-bold text-[var(--color-primar] mb-4">
              {post.title}
            </h2>

            <p className="text-text mb-6 whitespace-pre-line">{post.body}</p>

            <div className="flex justify-end gap-3">
              <button
                onClick={onClose}
                className="flex items-center gap-1 px-4 py-2 rounded-md font-medium text-[var(--color-primary)] bg-indigo-100 hover:bg-indigo-200 transition-colors"
              >
                Close
                <X size={16} />
              </button>
              <button
                onClick={() => history.push(`/dashboard/${post.id}`)}
                className="flex items-center gap-2 px-4 py-2 rounded-md font-medium text-white bg-[var(--color-primary)] hover:bg-[var(--color-secondary)] transition-colors"
              >
                View Full
                <ArrowRight size={16} />
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PostDetailModal;
