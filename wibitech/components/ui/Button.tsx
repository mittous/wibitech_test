'use client';

import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export const Button = ({ children, ...props }: ButtonProps) => {
  return (
    <button
      {...props}
      className="w-full h-12 px-3.5 py-3 bg-[#007FFF] rounded-2xl inline-flex justify-center items-center gap-2 text-white font-semibold transition-colors"
    >
      {children}
    </button>
  );
};
