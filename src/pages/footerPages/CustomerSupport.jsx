import React, { useEffect, useRef } from "react";
import { FiMail, FiMessageSquare, FiLifeBuoy } from "react-icons/fi";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const CustomerSupport = () => {
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    // Header animation
    gsap.fromTo(
      ".support-header",
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
      }
    );

    // Cards entrance animation
    gsap.fromTo(
      cardsRef.current,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
        },
      }
    );

    // Subtle floating animations
    const floatDistances = [4, 6, 5];
    const floatDurations = [2.5, 3, 2.8];

    cardsRef.current.forEach((card, index) => {
      const floatAnim = gsap.to(card, {
        y: `-${floatDistances[index]}px`,
        duration: floatDurations[index],
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      // Pause animation on hover
      card.addEventListener("mouseenter", () => floatAnim.pause());
      card.addEventListener("mouseleave", () => floatAnim.resume());
    });
  }, []);

  return (
    <section
      ref={sectionRef}
      className="min-h-[75vh] px-4 py-16 flex justify-center text-white"
    >
      <div className="w-full max-w-6xl">
        {/* Header */}
        <div className="support-header mb-16 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-cyan-400 to-teal-400 bg-clip-text text-transparent">
            Customer Support
          </h1>
          <p className="mt-5 text-gray-300 max-w-2xl mx-auto text-lg leading-relaxed">
            Our support team is always here to help you create, manage, and grow
            your presence on Mega Blogs.
          </p>
        </div>

        {/* Support Cards */}
        <div className="grid gap-8 md:grid-cols-3">
          {/* Email Support */}
          <div
            ref={(el) => (cardsRef.current[0] = el)}
            className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-8 transition-all hover:border-cyan-400/50 hover:shadow-[0_0_20px_rgba(0,255,255,0.4)]"
          >
            <FiMail className="text-cyan-400 text-4xl mb-6" />
            <h3 className="text-xl font-semibold mb-3">Email Support</h3>
            <p className="text-gray-300 text-sm mb-5 leading-relaxed">
              Reach out for help with accounts, publishing issues, or platform
              feedback anytime.
            </p>
            <a
              href="mailto:mtaimoorjamali82@gmail.com"
              className="text-cyan-400 font-medium hover:underline"
            >
              mtaimoorjamali82@gmail.com
            </a>
          </div>

          {/* Help Center */}
          <div
            ref={(el) => (cardsRef.current[1] = el)}
            className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-8 transition-all hover:border-teal-400/50 hover:shadow-[0_0_20px_rgba(0,255,200,0.4)]"
          >
            <FiLifeBuoy className="text-teal-400 text-4xl mb-6" />
            <h3 className="text-xl font-semibold mb-3">Help Center</h3>
            <p className="text-gray-300 text-sm mb-5 leading-relaxed">
              Explore guides and tutorials covering everything from writing
              posts to managing your profile.
            </p>
            <span className="text-gray-400 text-sm">Available 24/7</span>
          </div>

          {/* Community */}
          <div
            ref={(el) => (cardsRef.current[2] = el)}
            className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-8 transition-all hover:border-purple-400/50 hover:shadow-[0_0_20px_rgba(200,0,255,0.4)]"
          >
            <FiMessageSquare className="text-purple-400 text-4xl mb-6" />
            <h3 className="text-xl font-semibold mb-3">Community Support</h3>
            <p className="text-gray-300 text-sm mb-5 leading-relaxed">
              Connect with fellow creators, exchange ideas, and learn best
              practices from the community.
            </p>
            <span className="text-gray-400 text-sm">Growing creator network</span>
          </div>
        </div>

        {/* Footer text */}
        <div className="mt-20 text-center text-gray-400 text-sm">
          We typically respond within{" "}
          <span className="text-cyan-400 font-medium">24 hours</span>.  
          Thank you for being part of Mega Blogs.
        </div>
      </div>
    </section>
  );
};

export default CustomerSupport;
