/* eslint-disable no-unused-vars */
import React from "react";
import { Link } from "react-router-dom";
import Logo from "../logo";
import { motion } from "framer-motion";
import { FaFacebook, FaTwitter, FaInstagram, FaGithub, FaHeart } from "react-icons/fa";
import { FaX, FaXTwitter } from "react-icons/fa6";

function Footer() {
  const footerLinks = {
    Company: ["Features", "Pricing", "Affiliate Program", "Press Kit"],
    Support: ["Account", "Help", "Contact Us", "Customer Support"],
    Legals: ["Terms & Conditions", "Privacy Policy", "Licensing"],
  };

  return (
    <footer className="relative overflow-hidden py-12 backdrop-blur-lg bg-gradient-to-b from-white/10 to-white/10 border-t border-white/30">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-400 to-purple-500 opacity-80"></div>
      <div className="absolute -top-10 -right-10 w-40 h-40 bg-cyan-400/10 rounded-full blur-xl"></div>
      <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-purple-500/10 rounded-full blur-xl"></div>
      
      <div className="relative z-10 mx-auto max-w-7xl px-4">
        <div className="flex flex-wrap -m-6 items-center justify-between">
          {/* Logo & Description */}
          <div className="w-full p-6 md:w-1/2 lg:w-4/12">
            <div className="flex h-full flex-col justify-between">
              <div className="mb-4 inline-flex items-center">
                <Logo />
              </div>
              <p className="text-sm text-white dark:text-white max-w-xs mb-6 opacity-90">
                Mega Blogs Post - Where ideas meet innovation. The ultimate platform for creators and readers to connect.
              </p>
              
              {/* Social Links */}
              <div className="flex space-x-4 mt-4">
                {[
                  { icon: <FaFacebook />, href: "#", color: "hover:text-blue-500" },
                  { icon: <FaXTwitter />, href: "#", color: "hover:text-gray-900" },
                  { icon: <FaInstagram />, href: "#", color: "hover:text-pink-500" },
                  { icon: <FaGithub />, href: "#", color: "hover:text-zinc-950" },
                ].map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.href}
                    whileHover={{ scale: 1.2, y: -3 }}
                    whileTap={{ scale: 0.9 }}
                    className={`text-white dark:text-white ${social.color} transition-colors duration-300 text-xl p-2 rounded-full bg-white/5 backdrop-blur-sm`}
                  >
                    {social.icon}
                  </motion.a>
                ))}
              </div>
            </div>
          </div>

          {/* Links Sections */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title} className="w-full p-6 md:w-1/2 lg:w-2/12">
              <h3 className="mb-6 text-lg font-semibold uppercase tracking-wider text-white dark:text-white">
                {title}
              </h3>
              <ul className="space-y-3">
                {links.map((link) => (
                  <motion.li
                    key={link}
                    whileHover={{ x: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Link
                      to="/"
                      className="text-base font-medium text-white dark:text-white hover:text-cyan-300 dark:hover:text-cyan-300 transition-colors duration-300 flex items-center"
                    >
                      {link}
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        
        {/* Copyright Section - Centered at the bottom */}
        <div className="mt-12 pt-8 border-t border-white/20 dark:border-white/20 text-center">
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-sm text-white dark:text-white opacity-80 mb-2"
          >
            © {new Date().getFullYear()} Mega Blogs. Crafted with <FaHeart className="text-red-400 inline mx-1" /> for the community.
          </motion.p>
          <p className="text-xs text-white dark:text-white opacity-60">
            Designed by Muhammad Taimoor
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;