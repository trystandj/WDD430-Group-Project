"use client";
import React from "react";

interface CTAButtonProps {
  text: string;
  onClick?: () => void;
  className?: string; 
}

const CTAButton: React.FC<CTAButtonProps> = ({ text, onClick, className }) => {
  return (
    <button
      onClick={onClick}
      className={`hero-cta ${className ?? ""}`} 
    >
      {text}
    </button>
  );
};

export default CTAButton;
