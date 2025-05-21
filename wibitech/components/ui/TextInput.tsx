'use client';
import React from "react";

interface TextInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  placeholder?: string;
  error?: string;
}

export const TextInput = ({ label, error, placeholder, ...props }: TextInputProps) => {
  return (
    <div className="flex flex-col gap-2 w-full">
      <label className="justify-start text-black dark:text-white text-sm font-semibold leading-none">{label}</label>
      <input
        {...props}
        className="bg-neutral-100 dark:bg-zinc-800 rounded-2xl p-4 w-full min-w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder={placeholder}
      />
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};
