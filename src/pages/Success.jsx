/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import authService from "../appwrite/auth";
import { login } from "../store/authSlice";

function Success() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await authService.getCurrentUser();
        if (userData) {
          dispatch(login(userData));

          //After setting Redux, redirect to home/dashboard
          navigate("/", { replace: true });
        }
      } catch (error) {
        console.error("OAuth login failed:", error);
        navigate("/failure", { replace: true });
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [dispatch, navigate]);

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900 text-white">
      {loading ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center"
        >
          <div className="relative">
            <div className="w-16 h-16 border-4 border-cyan-500/30 border-t-cyan-500 rounded-full animate-spin mx-auto"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <div className="w-8 h-8 border-4 border-cyan-500/50 border-b-cyan-500 rounded-full animate-spin"></div>
            </div>
          </div>
          <p className="mt-6 text-lg font-medium text-cyan-100 animate-pulse">
            Finishing sign-in, please wait...
          </p>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-lg font-semibold text-green-400"
        >
          You're successfully logged in! Redirecting...
        </motion.div>
      )}
    </div>
  );
}

export default Success;
