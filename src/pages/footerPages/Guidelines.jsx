import React from "react";

function Guidelines() {
  return (
    <div className="min-h-[70vh] max-w-4xl mx-auto px-4 py-14 text-white">
      {/* Header */}
      <h1 className="text-4xl sm:text-5xl font-bold text-cyan-400 mb-6">
        Community Guidelines
      </h1>

      <p className="text-gray-300 leading-relaxed mb-12">
        Mega Blogs is a platform built to encourage creativity, thoughtful
        discussions, and responsible content sharing. To ensure a positive
        experience for everyone, we ask all users to follow the guidelines
        outlined below.
      </p>

      {/* Guidelines */}
      <div className="space-y-10">
        {/* Item */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-2">
            Respectful Communication
          </h3>
          <div className="h-px w-full bg-gradient-to-r from-cyan-400/40 to-transparent mb-4" />
          <p className="text-gray-300 leading-relaxed">
            Always communicate respectfully. Harassment, hate speech,
            discrimination, or abusive behavior toward individuals or groups
            will not be tolerated under any circumstances.
          </p>
        </div>

        {/* Item */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-2">
            Original & Ethical Content
          </h3>
          <div className="h-px w-full bg-gradient-to-r from-cyan-400/40 to-transparent mb-4" />
          <p className="text-gray-300 leading-relaxed">
            Share content that is original or properly credited. Plagiarism,
            copyright violations, or reposting content without permission is
            strictly prohibited.
          </p>
        </div>

        {/* Item */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-2">
            No Spam or Misleading Information
          </h3>
          <div className="h-px w-full bg-gradient-to-r from-cyan-400/40 to-transparent mb-4" />
          <p className="text-gray-300 leading-relaxed">
            Do not publish spam, clickbait, or false information. Content should
            be honest, relevant, and provide value to readers.
          </p>
        </div>

        {/* Item */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-2">
            Safe & Responsible Publishing
          </h3>
          <div className="h-px w-full bg-gradient-to-r from-cyan-400/40 to-transparent mb-4" />
          <p className="text-gray-300 leading-relaxed">
            Avoid sharing content that is illegal, harmful, or sensitive in
            nature. We encourage responsible blogging that aligns with ethical
            standards and community well-being.
          </p>
        </div>
      </div>

      {/* Footer Note */}
      <p className="mt-14 text-sm text-gray-400 leading-relaxed">
        Failure to comply with these guidelines may result in content removal,
        temporary suspension, or permanent account termination. Our mission is
        to keep Mega Blogs a safe, inspiring, and professional platform for all.
      </p>
    </div>
  );
}

export default Guidelines;
