/* eslint-disable no-unused-vars */
import React from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../store/authSlice";
import authservice from "../../appwrite/auth";
import { motion } from "framer-motion";
import { FiLogOut } from "react-icons/fi";

const LogoutBtn = () => {
  const dispatch = useDispatch();

  const logoutHandler = async () => {
    try {
      await authservice.logout();
      dispatch(logout());
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <motion.button
      onClick={logoutHandler}
      whileHover={{ scale: 1.08, y: -2 }}
      whileTap={{ scale: 0.92 }}
      transition={{ type: "spring", stiffness: 200, damping: 15 }}
      className="
        flex items-center gap-2 px-5 py-2.5 rounded-full font-semibold
        text-white text-sm sm:text-base
        bg-gradient-to-r from-rose-500 via-red-500 to-pink-500
        shadow-md shadow-red-500/30
        hover:from-rose-600 hover:via-red-600 hover:to-pink-600
        active:scale-95
        dark:from-rose-600 dark:via-red-600 dark:to-pink-600
        dark:hover:from-rose-700 dark:hover:via-red-700 dark:hover:to-pink-700
        focus:outline-none focus:ring-2 focus:ring-rose-400/40
        transition-all duration-300 cursor-pointer
      "
    >
      <FiLogOut className="text-lg sm:text-xl" />
      <span>Logout</span>
    </motion.button>
  );
};

export default LogoutBtn;
