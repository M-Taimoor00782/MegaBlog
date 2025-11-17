/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import gsap from "gsap";

import appwriteService from "../appwrite/config";
import { Container, PostCard } from "../components";

function Home() {
  const [posts, setPosts] = useState([]);
  const titleRef = useRef(null);
  const cursorRef = useRef(null);
  const navigate = useNavigate();

  // Current logged-in user
  const userData = useSelector((state) => state.auth?.userData);

  // Fetch posts from Appwrite
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await appwriteService.getPosts();
        setPosts(res?.documents || []);
      } catch (error) {
        console.error("Error fetching posts:", error.message);
      }
    };
    fetchPosts();
  }, []);

  // Typing animation for heading
  useEffect(() => {
    if (!titleRef.current) return;
    const text = "Mega Blogs Post.";
    let isCancelled = false;

    const typeEffect = async () => {
      if (!titleRef.current) return;
      titleRef.current.innerHTML = "";
      for (let i = 0; i < text.length && !isCancelled; i++) {
        await new Promise((r) => setTimeout(r, 130 + Math.random() * 120));
        if (!titleRef.current) return;
        const current = text.substring(0, i + 1);
        titleRef.current.innerHTML = `
          <span class="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent font-bold">
            ${current}
          </span>`;
      }
      if (!isCancelled) setTimeout(typeEffect, 3000);
    };

    typeEffect();

    if (cursorRef.current) {
      gsap.to(cursorRef.current, {
        opacity: 0,
        duration: 0.5,
        repeat: -1,
        yoyo: true,
      });
    }

    return () => {
      isCancelled = true;
    };
  }, []);

  // Welcome section
  const WelcomeSection = () => (
    <div className="flex items-center justify-center min-h-[70vh] text-center px-4">
      <Container>
        <div className="max-w-3xl mx-auto">
          <h1 className="font-extrabold mb-6 text-white text-[34px] sm:text-[40px] lg:text-[48px] leading-snug">
            <div className="flex flex-col sm:flex-row justify-center items-center gap-2 sm:gap-3">
              <span>Welcome to</span>
              <span className="flex items-center">
                <span ref={titleRef}></span>
                <span ref={cursorRef} className="ml-1 text-cyan-300">
                  |
                </span>
              </span>
            </div>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="text-start text-lg lg:text-xl text-gray-300 leading-relaxed mb-8"
          >
            Mega Blogs Post is a modern platform for creators and readers.
            Discover inspiring content, share your own stories, and explore
            community posts in one seamless experience.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            {userData ? (
              <Link
                to="/add-post"
                className="px-8 py-4 rounded-lg bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold text-lg
                           shadow-lg transition transform hover:scale-110 duration-300 ease-in-out
                           hover:from-green-600 hover:to-emerald-700"
              >
                Create a New Post
              </Link>
            ) : (
              <Link
                to="/login"
                className="px-8 py-4 rounded-lg bg-gradient-to-r from-cyan-400 to-blue-600 text-white font-bold text-lg
                           shadow-lg transition transform hover:scale-110 duration-300 ease-in-out
                           hover:from-cyan-500 hover:to-blue-700"
              >
                Get Started
              </Link>
            )}
          </motion.div>
        </div>
      </Container>
    </div>
  );

  return (
    <div className="w-full py-8 min-h-[80vh] flex flex-col">
      <WelcomeSection />

      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-8"
        >
          <h2 className="text-3xl font-bold text-white mb-2">Latest Posts</h2>
          <p className="text-gray-400">
            Discover recent stories from our community
          </p>
        </motion.div>

        <div className="flex flex-wrap -mx-2">
          {posts.length === 0 ? (
            <p className="text-gray-400 text-center w-full">
              No posts found.
            </p>
          ) : (
            posts.map(
              (post) =>
                post && (
                  <motion.div
                    key={post.$id}
                    className="p-2 w-full sm:w-1/2 lg:w-1/4"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                  >
                    <PostCard {...post} />
                  </motion.div>
                )
            )
          )}
        </div>
      </Container>
    </div>
  );
}

export default Home;
