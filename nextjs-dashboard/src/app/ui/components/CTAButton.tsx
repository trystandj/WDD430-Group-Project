"use client";
import clsx from "clsx";
import React, { ButtonHTMLAttributes } from "react";

interface CTAButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  text?: string;
  onClick?: () => void;
  className?: string; 
}

const CTAButton: React.FC<CTAButtonProps> = ({ text, onClick, className, ...props }) => {
  return (
    <button
      onClick={onClick}
      className={clsx(`hero-cta ${className ?? ""}`)}
      {...props}
    >
      {text ?? props.children}
    </button>
  );
};

export default CTAButton;
