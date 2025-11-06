import React from "react";

const Logo = ({ width = "130px" }) => {
  return (
    <div style={{ width }}>
      <img
        src="/logo-gray.png"  
        alt="Logo"
        className="w-full h-auto object-cover"
      />
    </div>
  );
};

export default Logo;
