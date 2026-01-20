import React from "react";
import { FiMail, FiPhone, FiMapPin } from "react-icons/fi";

function ContactUs() {
  return (
    <section className="min-h-screen text-cyan-300 py-20 px-4">
      <div className="max-w-6xl mx-auto text-center">

        {/* Heading */}
        <h2 className="text-5xl font-bold mb-4">
          Get in Touch with Mega Blogs
        </h2>
        <p className="text-gray-400 text-lg mb-12">
          Have questions, suggestions, or collaboration ideas? Reach out to us through any of the methods below — we respond promptly and professionally.
        </p>

        {/* Info Cards */}
        <div className="grid md:grid-cols-3 gap-10">
          <Info 
            icon={<FiMail />} 
            title="Email" 
            text="mtaimoorjamali82@gmail.com" 
            description="Send us an email anytime. We usually respond within 24 hours."
          />
          <Info 
            icon={<FiPhone />} 
            title="Phone" 
            text="+92 310 1979989" 
            description="Call us during business hours. We love hearing from you!"
          />
          <Info 
            icon={<FiMapPin />} 
            title="Location" 
            text="Remote / Global" 
            description="We operate globally. Wherever you are, we’re ready to connect."
          />
        </div>    
      </div>
    </section>
  );
}

const Info = ({ icon, title, text, description }) => (
  <div className="bg-white/5 rounded-2xl p-8 flex flex-col items-center text-center shadow-lg hover:shadow-xl transition duration-300">
    <div className="mb-4 w-16 h-16 flex items-center justify-center rounded-full bg-white/5 text-cyan-400 text-3xl">
      {icon}
    </div>
    <h4 className="font-semibold text-xl mb-1">{title}</h4>
    <p className="text-gray-300 mb-2">{text}</p>
    <p className="text-gray-400 text-sm">{description}</p>
  </div>
);

export default ContactUs;
