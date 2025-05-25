'use client';
import React, { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";

interface TextInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  placeholder?: string;
  error?: string;
}

export const TextInput = ({ label, error, placeholder, type, ...props }: TextInputProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === 'password';

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="flex flex-col gap-2 w-full">
      <label className="justify-start text-black dark:text-white text-sm font-semibold leading-none">{label}</label>
      <div className="relative">
        <input
          {...props}
          type={isPassword ? (showPassword ? 'text' : 'password') : type}
          className="bg-neutral-100 dark:bg-zinc-800 rounded-2xl p-4 w-full min-w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder={placeholder}
        />
        {isPassword && (
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
          >
            {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
          </button>
        )}
      </div>
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};
