import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { Post } from "../store/PostStore";
import { useHistory } from "react-router-dom";

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
          className="fixed inset-0 bg-black opacity-50 flex items-center justify-center z-50"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.5 }}
          onClick={onClose}
        >
          <motion.div
            onClick={(e) => e.stopPropagation()}
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="bg-white dark:bg-gray-900 p-6 rounded-2xl w-[90%] max-w-lg shadow-2xl"
          >
            <h2 className="text-2xl font-bold text-primary mb-4">
              {post.title}
            </h2>
            <p className="text-secondary mb-6 whitespace-pre-line">
              {post.body}
            </p>

            <div className="flex justify-end gap-3">
              <button
                onClick={onClose}
                className="btn bg-gray-200 text-gray-700 hover:bg-gray-300"
              >
                Close
              </button>
              <button
                onClick={() => history.push(`/dashboard/${post.id}`)}
                className="btn bg-primary text-white hover:opacity-90"
              >
                View Full
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PostDetailModal;
