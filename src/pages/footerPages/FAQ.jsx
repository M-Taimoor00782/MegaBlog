/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const FAQ = () => {
  const faqs = [
    { q: "Is Mega Blogs free?", a: "Yes, creating and publishing posts is completely free. We believe in empowering creators." },
    { q: "Can I edit my posts?", a: "Absolutely! You can edit or delete posts anytime from your dashboard." },
    { q: "Is my data secure?", a: "Your data is protected using secure authentication, encryption, and strict access control." },
    { q: "Can I upload images?", a: "Yes, you can add featured images and embed media to make your posts visually engaging." },
    { q: "Can I schedule posts?", a: "Yes, you can schedule posts to publish at a specific date and time." },
    { q: "Is there a mobile app?", a: "Currently, we are web-only, but a mobile-friendly design ensures smooth access on phones and tablets." },
    { q: "Can I collaborate with others?", a: "Yes, you can collaborate with co-authors and team members on posts." },
  ];

  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="min-h-[70vh] max-w-5xl mx-auto px-4 py-16 text-white">
      <motion.h1 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-4xl sm:text-5xl font-bold text-cyan-400 mb-12 text-center"
      >
        Frequently Asked Questions
      </motion.h1>

      <div className="space-y-4">
        {faqs.map((item, index) => {
          const isOpen = openIndex === index;
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex justify-between items-center p-5 hover:bg-white/10 transition-colors duration-300 cursor-pointer text-left"
              >
                <span className={`text-lg font-semibold transition-colors duration-300 ${isOpen ? 'text-cyan-400' : 'text-white'}`}>
                  {item.q}
                </span>

                <motion.span
                  animate={{ rotate: isOpen ? 135 : 0 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="text-cyan-400 text-2xl font-light ml-4"
                >
                  +
                </motion.span>
              </button>

              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    key="content"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: [0.04, 0.62, 0.23, 0.98] }}
                  >
                    <div className="px-5 pb-5 text-gray-300 text-base sm:text-lg leading-relaxed">
                      {item.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>

      <motion.p 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="mt-12 text-center text-gray-400 text-sm"
      >
        Didn't find what you're looking for? Contact our{" "}
        <a href="mailto:support@example.com" className="text-cyan-400 hover:underline">
          support team
        </a>.
      </motion.p>
    </section>
  );
};

export default FAQ;