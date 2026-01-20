import React from "react";

function Careers() {
  return (
    <section className="min-h-[80vh] text-white">
      <div className="max-w-5xl mx-auto px-4 py-20">

        {/* Header */}
        <div className="mb-20">
          <p className="text-cyan-400 uppercase tracking-widest text-sm mb-4">
            Careers
          </p>
          <h1 className="text-4xl sm:text-5xl font-bold leading-tight mb-6">
            Build the future of<br /> digital publishing
          </h1>
          <p className="text-gray-300 text-lg max-w-3xl leading-relaxed">
            Mega Blogs is a modern publishing platform where technology,
            creativity, and community come together. We’re looking for
            talented people who want to create meaningful products with
            real-world impact.
          </p>
        </div>

        {/* Roles */}
        <div className="mb-20">
          <h2 className="text-2xl font-semibold mb-8 text-cyan-400">
            Open Roles
          </h2>

          <div className="space-y-8 border-l border-white/10 pl-6">
            <Role
              title="Frontend Engineer"
              desc="Build fast, accessible, and beautiful user interfaces using React and modern tooling."
            />
            <Role
              title="Backend Engineer"
              desc="Design scalable APIs and services using Node.js and Appwrite."
            />
            <Role
              title="UI / UX Designer"
              desc="Craft elegant user experiences and maintain a cohesive design system."
            />
            <Role
              title="Technical Content Writer"
              desc="Create high-quality articles, guides, and documentation for our platform."
            />
          </div>
        </div>

        {/* Culture */}
        <div className="mb-20 max-w-3xl">
          <h2 className="text-2xl font-semibold mb-6 text-cyan-400">
            Our Culture
          </h2>
          <p className="text-gray-300 leading-relaxed">
            We believe in ownership, continuous learning, and remote-first
            collaboration. At Mega Blogs, every team member has a voice
            and the freedom to experiment, learn, and grow.
          </p>
        </div>

        {/* CTA */}
        <div className="pt-10 border-t border-white/10">
          <p className="text-gray-400 text-lg">
            Ready to join us?
          </p>
          <p className="mt-2 text-white text-lg">
            Send your resume or portfolio to{" "}
            <span className="text-cyan-400 font-medium">
              careers@megablogs.com
            </span>
          </p>
        </div>

      </div>
    </section>
  );
}

const Role = ({ title, desc }) => (
  <div>
    <h3 className="text-xl font-semibold mb-2">
      {title}
    </h3>
    <p className="text-gray-400 leading-relaxed max-w-2xl">
      {desc}
    </p>
  </div>
);

export default Careers;
