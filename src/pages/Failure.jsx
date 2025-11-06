/* eslint-disable no-unused-vars */
import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FiAlertTriangle, FiArrowLeft } from "react-icons/fi";

function Failure() {
  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900 text-white">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="glass-card p-8 max-w-md w-full text-center"
      >
        <div className="flex justify-center mb-4">
          <FiAlertTriangle className="text-red-500 w-12 h-12" />
        </div>

        <h1 className="text-2xl font-bold mb-2">Authentication Failed</h1>
        <p className="text-white/80 mb-6">
          Something went wrong during sign-in. Please try again with another
          method.
        </p>

        <Link
          to="/login"
          className="inline-flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 rounded-xl font-medium text-white transition-colors"
        >
          <FiArrowLeft size={18} />
          Back to Login
        </Link>
      </motion.div>
    </div>
  );
}

export default Failure;
