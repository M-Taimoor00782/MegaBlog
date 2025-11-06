/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FiMail,
  FiLock,
  FiArrowRight,
} from "react-icons/fi";
import authServices from "../appwrite/auth";
import { login as authLogin } from "../store/authSlice";
import { Button, Input, Logo } from "./index";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const userLogin = async (data) => {
    setError("");
    setIsLoading(true);
    try {
      const session = await authServices.login(data);
      if (session) {
        const userData = await authServices.getCurrentUser();
        if (userData) {
          dispatch(authLogin(userData));
          navigate("/");
        }
      }
    } catch (err) {
      setError(err.message || "Login failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 120 } },
  };

  return (
    <div className="flex items-start justify-center w-full h-lg px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        {/* Glassmorphism Card */}
        <div className="glass-card w-full flex flex-col text-white p-4 md:p-8 rounded-2xl">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-5"
          >
            {/* Heading */}
            <motion.div variants={itemVariants} className="text-center">
              <h1 className="text-xl sm:text-2xl font-bold">Welcome To Mega Blog Post</h1>
              <p className="mt-2 text-white/80">Login to access your account</p>
            </motion.div>

            {/* Error Message */}
            {error && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                className="bg-red-600/30 text-red-200 p-3 rounded-lg text-sm"
              >
                {error}
              </motion.div>
            )}

            {/* Form */}
            <motion.form
              variants={itemVariants}
              onSubmit={handleSubmit(userLogin)}
              className="space-y-5"
            >
              <Input
                className="text-white"
                label="Email Address"
                placeholder="Enter your email"
                type="email"
                leftIcon={<FiMail className="text-gray-800" />}
                error={errors.email?.message}
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
                    message: "Enter a valid email address",
                  },
                })}
              />

              <Input
                className="text-white placeholder:text-gray-800 "
                label="Password"
                placeholder="Enter your password"
                type="password"
                leftIcon={<FiLock className="text-gray-800" />}
                error={errors.password?.message}
                {...register("password", { required: "Password is required" })}
              />

              <div className="flex justify-end text-sm">
                <Link
                  to="/forgot-password"
                  className="text-cyan-300 hover:underline font-medium"
                >
                  Forgot password?
                </Link>
              </div>

              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-cyan-600 to-teal-600 hover:from-cyan-700 hover:to-teal-700 text-white py-3 rounded-xl font-medium flex items-center justify-center gap-2"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-t-transparent border-white rounded-full animate-spin"></div>
                    Logging in...
                  </>
                ) : (
                  <>
                    Login <FiArrowRight size={18} />
                  </>
                )}
              </Button>
            </motion.form>

            {/* Signup Link */}
            <motion.div variants={itemVariants} className="text-center text-sm">
              Don&apos;t have an account?{" "}
              <Link
                to="/signup"
                className="text-cyan-300 hover:underline font-medium"
              >
                Create account
              </Link>
            </motion.div>
          </motion.div>

          {/* Footer */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-center text-xs text-white/70 mt-8"
          >
            © {new Date().getFullYear()} Mega Blog Post. All rights reserved.
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}

export default Login;