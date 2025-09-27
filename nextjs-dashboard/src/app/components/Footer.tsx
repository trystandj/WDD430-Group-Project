"use client";
import React from "react";
import CTAButton from "./CTAButton";

const Footer: React.FC = () => {
  const handleClick = () => {
    alert("CTA Button clicked!");
  };

  return (
    <footer className="bg-gray-900 text-white py-8 px-4 flex flex-col md:flex-row justify-between items-center">
      <div className="mb-4 md:mb-0 text-center md:text-left">
        <h2 className="text-xl font-bold">Group Project</h2>
        <p className="text-gray-400">© 2025 All rights reserved.</p>
      </div>
      <CTAButton text="Join Now" onClick={handleClick} />
    </footer>
  );
};

export default Footer;
