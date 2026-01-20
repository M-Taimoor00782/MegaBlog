import React from "react";

function HelpCenter() {
  return (
    <section className="min-h-[80vh] text-white">
      <div className="max-w-5xl mx-auto px-4 py-20">

        {/* Header */}
        <div className="mb-16">
          <p className="text-cyan-400 uppercase tracking-widest text-sm mb-3">
            Support
          </p>
          <h1 className="text-4xl sm:text-5xl font-bold mb-6">
            Help Center
          </h1>
          <p className="text-gray-300 max-w-3xl leading-relaxed">
            Find answers to common questions, learn how to use Mega Blogs
            effectively, and get the most out of your publishing experience.
          </p>
        </div>

        {/* Help Topics */}
        <div className="space-y-10 border-l border-white/10 pl-6">
          <HelpItem
            title="Creating an account"
            desc="Learn how to sign up, verify your email, and get started on Mega Blogs."
          />
          <HelpItem
            title="Publishing a blog post"
            desc="Step-by-step guidance on writing, saving drafts, and publishing posts."
          />
          <HelpItem
            title="Managing your profile"
            desc="Update your personal information, avatar, and public bio."
          />
          <HelpItem
            title="Resetting your password"
            desc="Instructions on securely resetting your account password."
          />
          <HelpItem
            title="Post visibility & privacy"
            desc="Understand public posts, private drafts, and content visibility rules."
          />
        </div>

        {/* Footer */}
        <div className="mt-16 pt-8 border-t border-white/10">
          <p className="text-gray-400 text-lg">
            Can’t find what you’re looking for?
          </p>
          <p className="mt-2 text-white">
            Contact our{" "}
            <span className="text-cyan-400 font-medium">
              customer support
            </span>{" "}
            team for personalized assistance.
          </p>
        </div>

      </div>
    </section>
  );
}

const HelpItem = ({ title, desc }) => (
  <div>
    <h3 className="text-xl font-semibold mb-2">
      {title}
    </h3>
    <p className="text-gray-400 leading-relaxed max-w-3xl">
      {desc}
    </p>
  </div>
);

export default HelpCenter;
