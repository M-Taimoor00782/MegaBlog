import React from "react";
import { Container } from "../../components";
import { motion } from "framer-motion";

function AboutUs() {
  return (
    <div className="py-16 min-h-[80vh] text-white">
      <Container>

        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-3xl sm:text-4xl font-bold mb-6 text-center text-cyan-400"
        >
          About Us
        </motion.h1>

        {/* Intro */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="text-center max-w-3xl mx-auto text-gray-300 mb-14 leading-relaxed"
        >
          Welcome to Mega Blogs Post — a modern platform where ideas, stories, and
          innovation come together. Our goal is to create meaningful connections
          between writers and readers through thoughtful, high-quality content.
        </motion.p>

        {/* Text Sections */}
        <div className="max-w-4xl mx-auto space-y-10">

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.4 }}
          >
            <h2 className="text-xl font-semibold text-cyan-300 mb-2">
              Our Vision
            </h2>
            <p className="text-gray-300 leading-relaxed">
              To build a global community where every voice matters and ideas
              flow freely. We believe knowledge grows when it is shared openly
              and responsibly.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.4 }}
          >
            <h2 className="text-xl font-semibold text-cyan-300 mb-2">
              Our Mission
            </h2>
            <p className="text-gray-300 leading-relaxed">
              Our mission is to empower creators and readers by providing a
              simple, secure, and inspiring platform that encourages learning,
              collaboration, and personal growth.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.4 }}
          >
            <h2 className="text-xl font-semibold text-cyan-300 mb-2">
              Our Values
            </h2>
            <p className="text-gray-300 leading-relaxed">
              Integrity, innovation, accessibility, and community are at the
              core of everything we build. These values guide our decisions and
              shape our platform.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.4 }}
          >
            <h2 className="text-xl font-semibold text-cyan-300 mb-2">
              Why Mega Blogs
            </h2>
            <p className="text-gray-300 leading-relaxed">
              Mega Blogs Post is designed with simplicity and quality in mind —
              offering creators the freedom to express and readers a smooth,
              distraction-free experience.
            </p>
          </motion.div>

        </div>
      </Container>
    </div>
  );
}

export default AboutUs;
