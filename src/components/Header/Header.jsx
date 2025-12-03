/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Logo, LogoutBtn } from "../index";
import { motion, AnimatePresence } from "framer-motion";
import { HiMenu, HiX, HiHome, HiPlus, HiCollection } from "react-icons/hi";
import { FaSignInAlt, FaUserPlus, FaUserCircle } from "react-icons/fa";
import appwriteService from "../../appwrite/config";

const Header = () => {
  const authStatus = useSelector((state) => state.auth.status);
  const userData = useSelector((state) => state.auth.userData);
  const [profileImg, setProfileImg] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // 🔹 Fetch profile image dynamically when user logs in or updates profile
  useEffect(() => {
    const loadProfileImg = async () => {
      if (!authStatus || !userData) {
        setProfileImg(null);
        return;
      }
      try {
        const profile = await appwriteService.getProfile(userData.$id);
        if (profile?.avatar) {
          const imgUrl = appwriteService.getFilePreview(profile.avatar);
          setProfileImg(imgUrl);
        } else {
          setProfileImg(null);
        }
      } catch (err) {
        console.error("Failed to load profile image:", err);
      }
    };
    loadProfileImg();
  }, [authStatus, userData]);

  const navItems = [
    { name: "Home", slug: "/", active: true, icon: <HiHome /> },
    { name: "Login", slug: "/login", active: !authStatus, icon: <FaSignInAlt /> },
    { name: "Signup", slug: "/signup", active: !authStatus, icon: <FaUserPlus /> },
    { name: "All Posts", slug: "/all-posts", active: authStatus, icon: <HiCollection /> },
    { name: "Add Post", slug: "/add-post", active: authStatus, icon: <HiPlus /> },
  ];

  // Lock scroll when mobile menu opens
  useEffect(() => {
    document.body.classList.toggle("overflow-hidden", mobileMenuOpen);
    return () => document.body.classList.remove("overflow-hidden");
  }, [mobileMenuOpen]);

  return (
    <header className="sticky top-0 left-0 w-full z-50">
      <div
        className="flex items-center justify-between py-3 px-4 sm:px-8 relative z-50
        border-b border-white/20 backdrop-blur-2xl"
        style={{
          background:
            "linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.02) 100%)",
          boxShadow:
            "0 8px 32px rgba(0,0,0,0.25), inset 0 1px 1px rgba(255,255,255,0.2)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
        }}
      >
        {/* Mobile hamburger */}
        <div className="sm:hidden flex items-center">
          <motion.button
            onClick={() => setMobileMenuOpen(true)}
            className="text-white text-4xl p-2 rounded-lg hover:bg-white/10 transition"
            whileTap={{ scale: 0.9 }}
          >
            <HiMenu />
          </motion.button>
        </div>

        {/* Logo */}
        <div className="flex-1 flex justify-center sm:justify-start">
          <Link to="/" className="flex items-center z-50">
            <Logo />
          </Link>
        </div>

        {/* Desktop Nav */}
        <ul className="hidden sm:flex items-center space-x-2">
          {navItems.map(
            (item) =>
              item.active && (
                <li key={item.name}>
                  <button
                    onClick={() => navigate(item.slug)}
                    className={`px-4 py-2 rounded-xl text-lg font-semibold transition-all
                      ${
                        location.pathname === item.slug
                          ? "text-cyan-400 bg-white/20"
                          : "text-white hover:text-cyan-300 hover:bg-white/10"
                      }
                    `}
                  >
                    {item.name}
                  </button>
                </li>
              )
          )}

          {/* Profile Avatar */}
          {authStatus && (
            <li className="relative">
              <button
                onClick={() => setProfileOpen((p) => !p)}
                className="ml-3 flex items-center gap-2 px-3 py-2 rounded-full text-white hover:bg-white/10 transition"
              >
                {profileImg ? (
                  <img
                    src={profileImg}
                    alt="Profile"
                    className="w-10 h-10 rounded-full border-2 border-cyan-400 shadow-md object-cover transition-all duration-300 hover:scale-105"
                  />
                ) : (
                  <FaUserCircle className="text-3xl text-cyan-300 cursor-pointer" />
                )}
              </button>

              {/* Profile Dropdown */}
              <AnimatePresence>
                {profileOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 mt-3 w-52 rounded-2xl border border-white/20 
                    bg-white/10 backdrop-blur-2xl shadow-[0_4px_24px_rgba(0,0,0,0.3)]
                    overflow-hidden text-white"
                  >
                    <Link
                      to="/profile"
                      onClick={() => setProfileOpen(false)}
                      className="block px-5 py-3 hover:bg-white/20 transition text-sm font-medium"
                    >
                      View Profile
                    </Link>
                    <LogoutBtn
                      onClick={() => setProfileOpen(false)}
                      className="block w-full text-left px-5 py-3 hover:bg-white/20 transition text-sm font-medium"
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </li>
          )}
        </ul>
      </div>
    </header>
  );
};

export default Header;
