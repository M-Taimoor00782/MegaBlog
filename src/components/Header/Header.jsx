/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Logo, LogoutBtn } from "../index";
import { motion, AnimatePresence } from "framer-motion";
import { HiMenu, HiX, HiHome, HiPlus, HiCollection } from "react-icons/hi";
import { FaFacebookF, FaInstagram, FaGithub, FaSignInAlt, FaUserPlus } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaUserCircle } from "react-icons/fa";

const Header = () => {
  const authStatus = useSelector((state) => state.auth.status);
  const userData = useSelector((state) => state.auth.userData);
  const navigate = useNavigate();
  const location = useLocation();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false); // dropdown state

  // Nav items
  const navItems = [
    { name: "Home", slug: "/", active: true, icon: <HiHome /> },
    { name: "Login", slug: "/login", active: !authStatus, icon: <FaSignInAlt /> },
    { name: "Signup", slug: "/signup", active: !authStatus, icon: <FaUserPlus /> },
    { name: "All Posts", slug: "/all-posts", active: authStatus, icon: <HiCollection /> },
    { name: "Add Post", slug: "/add-post", active: authStatus, icon: <HiPlus /> },
  ];

  // Lock scroll on mobile menu
  useEffect(() => {
    document.body.classList.toggle("overflow-hidden", mobileMenuOpen);
    return () => document.body.classList.remove("overflow-hidden");
  }, [mobileMenuOpen]);

  return (
    <header className="sticky top-0 left-0 w-full z-50">
      <div className="flex items-center justify-between py-3 px-4 sm:px-8
                      backdrop-blur-md bg-white/10 dark:bg-gray-900/40
                      border-b border-white/20 dark:border-gray-700 relative z-50">

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
                    className={`px-4 py-2 rounded-xl text-lg font-semibold transition
                      ${location.pathname === item.slug
                        ? "text-cyan-400 bg-white/20"
                        : "text-white hover:text-cyan-300 hover:bg-white/20"}
                    `}
                  >
                    {item.name}
                  </button>
                </li>
              )
          )}

          {/* If logged in → Profile Avatar with dropdown */}
          {authStatus && (
            <li className="relative">
              <button
                onClick={() => setProfileOpen((p) => !p)}
                className="ml-3 flex items-center gap-2 px-3 py-2 rounded-full 
                 text-white hover:bg-white/20 transition"
              >
                <FaUserCircle className="text-2xl text-cyan-300 cursor-pointer" />
                
              </button>

              {/* Profile Dropdown */}
              <AnimatePresence>
                {profileOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute p-4 right-0 my-2 w-48 rounded-lg bg-gray-800 border border-gray-700 shadow-lg overflow-hidden z-50 flex flex-col gap-4 "
                  >
                    <Link
                      to="/profile"
                      onClick={() => setProfileOpen(false)}
                      className="block w-full text-left px-4 py-3 text-white bg-gray-500 rounded-lg hover:bg-gray-700 "
                    >
                      View Profile
                    </Link>
                    <LogoutBtn
                      onClick={() => setProfileOpen(false)}
                      className="block w-full text-left px-4 py-3 text-white hover:bg-gray-700"
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </li>
          )}

        </ul>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black/20 backdrop-blur-md z-40"
              onClick={() => setMobileMenuOpen(false)}
            />

            {/* Slide-in Menu */}
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed top-0 left-0 h-full w-[80vw] z-50
                         bg-white/20 backdrop-blur-md border-r border-white/20 dark:border-gray-800
                         flex flex-col p-6"
            >
              {/* Close */}
              <div className="flex justify-end mb-8">
                <motion.button
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-white text-3xl p-2 rounded-lg hover:bg-white/20 transition"
                  whileTap={{ scale: 0.9 }}
                >
                  <HiX />
                </motion.button>
              </div>

              {/* Mobile Nav Items */}
              <ul className="flex flex-col space-y-6">
                {navItems.map(
                  (item) =>
                    item.active && (
                      <motion.li key={item.name}>
                        <button
                          onClick={() => {
                            navigate(item.slug);
                            setMobileMenuOpen(false);
                          }}
                          className={`flex items-center gap-4 px-5 py-4 rounded-lg w-full text-2xl font-semibold transition
                            ${location.pathname === item.slug
                              ? "text-cyan-400 bg-white/20"
                              : "text-white hover:text-cyan-300 hover:bg-white/20"}
                          `}
                        >
                          <span className="text-3xl">{item.icon}</span>
                          <span>{item.name}</span>
                        </button>
                      </motion.li>
                    )
                )}

                {/* Profile + Logout at bottom */}
                {authStatus && (
                  <>
                    <Link
                      to="/profile"
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center gap-4 px-5 py-4 rounded-lg text-2xl font-semibold
                 text-white hover:text-cyan-300 hover:bg-white/20 transition"
                    >
                      <FaUserCircle className="text-3xl text-cyan-300" />
                      <span>{userData?.name || "Profile"}</span>
                    </Link>
                    <LogoutBtn />
                  </>
                )}

              </ul>

              {/* Footer with socials */}
              <div className="mt-auto mb-6 pt-6 text-center text-white text-sm space-y-4">
                <div className="flex justify-center space-x-6 text-3xl">
                  <a href="https://facebook.com" target="_blank" rel="noreferrer" className="hover:text-indigo-500 transition"><FaFacebookF /></a>
                  <a href="https://instagram.com" target="_blank" rel="noreferrer" className="hover:text-indigo-500 transition"><FaInstagram /></a>
                  <a href="https://twitter.com" target="_blank" rel="noreferrer" className="hover:text-indigo-500 transition"><FaXTwitter /></a>
                  <a href="https://github.com" target="_blank" rel="noreferrer" className="hover:text-indigo-500 transition"><FaGithub /></a>
                </div>
                <div>© {new Date().getFullYear()} Mega Blogs Post</div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
