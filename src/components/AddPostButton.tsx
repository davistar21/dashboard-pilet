import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Plus } from "lucide-react";
import { AddItemForm } from "./AddItemForm";

export const AddPostButton: React.FC = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <motion.button
        onClick={() => setShowModal(true)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="flex items-center gap-2 px-4 py-2 bg-[var(--color-primary)] text-white font-semibold rounded-2xl shadow-md hover:bg-indigo-700/70 transition"
      >
        <Plus size={18} />
        Add Post
      </motion.button>

      <AnimatePresence>
        {showModal && (
          <motion.div
            className="fixed inset-0 bg-indigo-900/30 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowModal(false)}
          >
            <motion.div
              onClick={(e) => e.stopPropagation()}
              initial={{ y: 50, opacity: 0, scale: 0.95 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 50, opacity: 0, scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="bg-white dark:bg-gray-900 p-6 rounded-2xl w-[90%] max-w-lg shadow-2xl relative"
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-[var(--color-primary)]">
                  Add New Post
                </h2>
                <button
                  onClick={() => setShowModal(false)}
                  aria-label="Close modal"
                  className="text-gray-400 hover:text-gray-700 transition"
                >
                  <X size={20} />
                </button>
              </div>

              <AddItemForm onSuccess={() => setShowModal(false)} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AddPostButton;
