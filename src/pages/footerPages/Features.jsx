import React from "react";

function Features() {
  const features = [
    {
      title: "Create & Manage Posts",
      desc: "Easily write, edit, publish, or save drafts with a smooth and distraction-free editor experience.",
    },
    {
      title: "Secure Authentication",
      desc: "Email/password and OAuth authentication with secure session handling and data protection.",
    },
    {
      title: "Profile Management",
      desc: "Customize your profile with avatar, bio, and personal details to reflect your identity.",
    },
    {
      title: "Likes & Comments",
      desc: "Engage with the community through likes and interactive real-time discussions.",
    },
    {
      title: "Media Uploads",
      desc: "Upload featured images and manage media efficiently with cloud storage support.",
    },
    {
      title: "Privacy Control",
      desc: "Control post visibility by publishing publicly or keeping drafts private until ready.",
    },
  ];

  return (
    <section className="min-h-[70vh] max-w-5xl mx-auto px-4 py-16 text-white">
      {/* Heading */}
      <h1 className="text-4xl font-bold text-cyan-400 mb-6 text-center">
        Platform Features
      </h1>

      {/* Subtitle */}
      <p className="text-center text-gray-400 max-w-3xl mx-auto mb-14">
        Mega Blogs Post is built with powerful yet simple tools designed to help
        creators focus on what truly matters — writing, sharing, and connecting.
      </p>

      {/* Feature List */}
      <div className="space-y-10">
        {features.map((item, index) => (
          <div key={index} className="flex gap-6">
            {/* Number */}
            <span className="text-cyan-400 text-xl font-semibold">
              {String(index + 1).padStart(2, "0")}
            </span>

            {/* Content */}
            <div>
              <h3 className="text-xl font-semibold mb-2">
                {item.title}
              </h3>
              <p className="text-gray-300 leading-relaxed">
                {item.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Features;
