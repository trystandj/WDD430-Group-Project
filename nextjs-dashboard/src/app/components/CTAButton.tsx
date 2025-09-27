"use client";
import React from "react";

interface CTAButtonProps {
  text: string;
  onClick?: () => void;
}

const CTAButton: React.FC<CTAButtonProps> = ({ text, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors duration-300"
    >
      {text}
    </button>
  );
};

export default CTAButton;