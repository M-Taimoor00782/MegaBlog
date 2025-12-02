/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Logo, LogoutBtn } from "../index";
import { motion, AnimatePresence } from "framer-motion";
import { HiMenu, HiX, HiHome, HiPlus, HiCollection } from "react-icons/hi";
import { FaSignInAlt, FaUserPlus, FaUserCircle } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import appwriteService from "../../appwrite/config";

const Header = () => {
  const authStatus = useSelector((state) => state.auth.status);
  const userData = useSelector((state) => state.auth.userData);

  const [profileImg, setProfileImg] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  // Load profile image
  useEffect(() => {
    const loadProfileImg = async () => {
      if (!authStatus || !userData) return setProfileImg(null);

      try {
        const profile = await appwriteService.getProfile(userData.$id);
        if (profile?.profileImage) {
          setProfileImg(appwriteService.getFilePreview(profile.profileImage));
        } else {
          setProfileImg(null);
        }
      } catch (err) {
        console.error("Failed to load profile image:", err);
      }
    };

    loadProfileImg();
  }, [authStatus, userData]);

  // Lock/unlock scrolling
  useEffect(() => {
    document.body.classList.toggle("overflow-hidden", mobileMenuOpen);
    return () => document.body.classList.remove("overflow-hidden");
  }, [mobileMenuOpen]);

  const navItems = [
    { name: "Home", slug: "/", active: true, icon: <HiHome /> },
    { name: "Login", slug: "/login", active: !authStatus, icon: <FaSignInAlt /> },
    { name: "Signup", slug: "/signup", active: !authStatus, icon: <FaUserPlus /> },
    { name: "All Posts", slug: "/all-posts", active: authStatus, icon: <HiCollection /> },
    { name: "Add Post", slug: "/add-post", active: authStatus, icon: <HiPlus /> },
  ];

  return (
    <header className="sticky top-0 left-0 w-full z-50">
      <div className="flex items-center justify-between py-3 px-4 sm:px-8 backdrop-blur-md bg-white/10 border-b border-white/20 relative">

        {/* Mobile hamburger */}
        <div className="sm:hidden flex items-center">
          <motion.button
            onClick={() => setMobileMenuOpen(true)}
            className="text-white text-4xl p-2 rounded-lg hover:bg-white/20 transition"
            whileTap={{ scale: 0.9 }}
          >
            <HiMenu />
          </motion.button>
        </div>

        {/* Logo */}
        <div className="flex-1 flex justify-center sm:justify-start">
          <Link to="/" className="flex items-center">
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
                    className={`px-4 py-2 rounded-xl text-lg font-semibold transition
                      ${location.pathname === item.slug
                        ? "text-cyan-400 bg-white/20"
                        : "text-white hover:text-cyan-300 hover:bg-white/20"}`}
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
                className="ml-3 flex items-center gap-2 px-3 py-2 rounded-full text-white hover:bg-white/20 transition"
              >
                {profileImg ? (
                  <img
                    src={profileImg}
                    alt="Profile"
                    className="w-9 h-9 rounded-full border-2 border-cyan-400 object-cover"
                  />
                ) : (
                  <FaUserCircle className="text-2xl text-cyan-300" />
                )}
              </button>

              {/* Desktop Dropdown */}
              <AnimatePresence>
                {profileOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute p-4 right-0 my-2 w-48 rounded-lg bg-gray-800 border border-gray-700 shadow-lg flex flex-col gap-4 z-50"
                  >
                    <Link
                      to="/profile"
                      onClick={() => setProfileOpen(false)}
                      className="block px-4 py-3 text-white bg-gray-700 rounded-lg hover:bg-gray-600"
                    >
                      View Profile
                    </Link>
                    <LogoutBtn onClick={() => setProfileOpen(false)} />
                  </motion.div>
                )}
              </AnimatePresence>
            </li>
          )}
        </ul>
      </div>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-xl z-50 flex flex-col p-6"
          >
            {/* Close button */}
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="text-white text-4xl self-end mb-6"
            >
              <HiX />
            </button>

            {/* Nav Items */}
            <nav className="flex flex-col gap-6 text-white text-xl">
              {navItems
                .filter((item) => item.active)
                .map((item) => (
                  <button
                    key={item.name}
                    onClick={() => {
                      navigate(item.slug);
                      setMobileMenuOpen(false);
                    }}
                    className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/20 text-left"
                  >
                    {item.icon} {item.name}
                  </button>
                ))}

              {/* Mobile Profile */}
              {authStatus && (
                <div className="mt-6 border-t border-white/20 pt-6">
                  <Link
                    to="/profile"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-3 px-4 py-3 rounded-lg bg-gray-700 hover:bg-gray-600 text-white"
                  >
                    {profileImg ? (
                      <img
                        src={profileImg}
                        className="w-10 h-10 rounded-full border-2 border-cyan-400 object-cover"
                      />
                    ) : (
                      <FaUserCircle className="text-3xl text-cyan-300" />
                    )}
                    View Profile
                  </Link>

                  <div className="mt-4">
                    <LogoutBtn onClick={() => setMobileMenuOpen(false)} />
                  </div>
                </div>
              )}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
