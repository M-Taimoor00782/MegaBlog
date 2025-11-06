/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import {
  FiMail,
  FiLock,
  FiUser,
  FiArrowRight,
  FiGithub,
  FiLinkedin,
} from "react-icons/fi";
import { FcGoogle } from "react-icons/fc";
import authservice from "../appwrite/auth";
import { login } from "../store/authSlice";
import { Button, Input } from "./index";

function SignUp() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const create = async (data) => {
    setError("");
    setIsLoading(true);
    try {
      const user = await authservice.createAccount(data);
      if (user) {
        const userData = await authservice.getCurrentUser();
        if (userData) {
          dispatch(login(userData));
          navigate("/");
        }
      }
    } catch (err) {
      setError(err.message || "Sign up failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  //OAuth Login
  const handleOAuthLogin = async (provider) => {
    try {
      await authservice.loginWithProvider(provider);
      const userData = await authservice.getCurrentUser();
      if (userData) {
        dispatch(login(userData));
        navigate("/");
      }
    } catch (err) {
      setError(err.message || `Login with ${provider} failed.`);
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
    <div className="flex items-start justify-center w-full h-lg px-4 ">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        {/* Glassmorphism Card */}
        <div className="glass-card w-full flex flex-col gap-4 text-white p-4 md:p-8">
          {/* Main Content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-4 flex flex-col justify-center"
          >
            {/* Heading */}
            <motion.div variants={itemVariants} className="text-center">
              <h1 className="text-2xl md:text-3xl font-bold">Create Account</h1>
              <p className="mt-2 text-sm text-white/80">
                Sign up to get started with your account
              </p>
            </motion.div>

            {/* Error Message */}
            {error && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                className="bg-red-600/30 text-center text-red-200 p-2 rounded-lg text-sm"
              >
                {error}
              </motion.div>
            )}

            {/* Form */}
            <motion.form
              variants={itemVariants}
              onSubmit={handleSubmit(create)}
              className="space-y-4"
            >
              <Input
                className=" "
                label="Full Name"
                placeholder="Enter your name"
                type="text"
                leftIcon={<FiUser className="text-gray-900" />}
                error={errors.name?.message}
                {...register("name", { required: "Name is required" })}
              />

              <Input
                className=" "
                label="Email Address"
                placeholder="Enter your email"
                type="email"
                leftIcon={<FiMail className="text-gray-900" />}
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
                className=" "
                label="Password"
                placeholder="Enter your password"
                type="password"
                leftIcon={<FiLock className="text-gray-900" />}
                error={errors.password?.message}
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                })}
              />

              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-cyan-600 to-teal-600 hover:from-cyan-700 hover:to-teal-700 text-white py-3 rounded-xl font-medium flex items-center justify-center gap-2"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-t-transparent border-white rounded-full animate-spin"></div>
                    Creating...
                  </>
                ) : (
                  <>
                    Create Account <FiArrowRight size={18} />
                  </>
                )}
              </Button>
            </motion.form>

            {/* Login Link */}
            <motion.div variants={itemVariants} className="text-center text-sm">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-cyan-300 hover:underline font-medium"
              >
                Sign In
              </Link>
            </motion.div>

            {/* Divider */}
            <motion.div
              variants={itemVariants}
              className="flex items-center gap-2"
            >
              <div className="flex-1 border-t border-white/30"></div>
              <span className="px-2 text-sm text-white/70 whitespace-nowrap">
                Or Sign Up with
              </span>
              <div className="flex-1 border-t border-white/30"></div>
            </motion.div>
          </motion.div>

          {/* Social Buttons + Footer */}
          <div>
            <motion.div
              variants={itemVariants}
              className="flex justify-center gap-4 mb-6"
            >
              <button
                onClick={() => handleOAuthLogin("github")}
                className="p-3 rounded-full bg-white/70 hover:bg-white/90 transition-colors backdrop-blur-md cursor-pointer"
              >
                <FiGithub className="text-black" size={18} />
              </button>
              <button
                onClick={() => handleOAuthLogin("google")}
                className="p-3 rounded-full bg-white/80 hover:bg-white/90 transition-colors backdrop-blur-md cursor-pointer"
              >
                <FcGoogle size={20} />
              </button>
              <button
                onClick={() => handleOAuthLogin("linkedin")}
                className="p-3 rounded-full bg-white/80 hover:bg-white/90 transition-colors backdrop-blur-md cursor-pointer"
              >
                <FiLinkedin className="text-sky-500" size={18} />
              </button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-center text-xs text-white/70"
            >
              © {new Date().getFullYear()} Mega Blog Post. All rights reserved.
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default SignUp;
  